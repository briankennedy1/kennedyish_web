#!/usr/bin/env node
// Adds a page for every new @kennedyish upload.
//
// Reads the channel's public RSS feed (no API key), and for each long-form
// video that isn't in lib/videos.ts yet and is at least as new as the newest
// video already on the site, it:
//   - downloads the YouTube thumbnail to public/images/video-<n>/thumb.jpg
//   - inserts a new entry at the top of lib/videos.ts with the next number
//
// Shorts are skipped. Products/projects are left empty to fill in by hand.
//
// Usage:
//   node scripts/sync-youtube-videos.mjs            # write changes
//   node scripts/sync-youtube-videos.mjs --dry-run  # print what would change
//   node scripts/sync-youtube-videos.mjs --feed path/to/feed.xml

import { mkdir, readFile, writeFile, appendFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CHANNEL_ID = "UCFOVDf2I596jgOde6PCcNYg"; // youtube.com/@kennedyish
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const TIME_ZONE = "America/Los_Angeles";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const videosPath = join(root, "lib/videos.ts");
const listStart = "export const videos: Video[] = [\n";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const feedFileIndex = args.indexOf("--feed");
const feedFile = feedFileIndex >= 0 ? args[feedFileIndex + 1] : undefined;

const dateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  month: "long",
  day: "numeric",
  year: "numeric",
});

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "kennedyish-site-sync" },
      });
      if (response.ok) return response;
      lastError = new Error(`${url} returned HTTP ${response.status}`);
      if (response.status === 404 && url !== FEED_URL) break;
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 5000));
    }
  }
  throw lastError;
}

function decodeXml(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function tag(xml, name) {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  return match ? decodeXml(match[1]).trim() : "";
}

function parseFeed(xml) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => {
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "";
    return {
      youtubeId: tag(entry, "yt:videoId"),
      title: tag(entry, "title"),
      published: new Date(tag(entry, "published")),
      description: tag(entry, "media:description"),
      isShort: link.includes("/shorts/"),
    };
  });
  if (!xml.includes("<feed") || entries.some((e) => !e.youtubeId || !e.title || isNaN(e.published))) {
    throw new Error("Unexpected feed format");
  }
  return entries;
}

// First paragraph of the YouTube description that isn't links/promo.
function summarize(description) {
  const paragraph = description
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").replace(/(\s*#\w+)+$/, "").trim())
    .find((p) => p && !/https?:\/\//i.test(p) && !/^#/.test(p));
  return paragraph ?? "";
}

function slugify(title, taken) {
  const words = title
    .split("|")[0]
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  let slug = "";
  for (const word of words) {
    if (slug && slug.length + word.length + 1 > 50) break;
    slug = slug ? `${slug}-${word}` : word;
  }
  slug ||= "video";
  let unique = slug;
  for (let i = 2; taken.has(unique); i++) unique = `${slug}-${i}`;
  return unique;
}

function renderEntry(video) {
  const s = JSON.stringify;
  return [
    "  {",
    `    number: ${video.number},`,
    `    slug: ${s(video.slug)},`,
    `    youtubeId: ${s(video.youtubeId)},`,
    "    listed: true,",
    `    title: ${s(video.title)},`,
    `    shortTitle: ${s(video.title)},`,
    "    description:",
    `      ${s(video.description)},`,
    `    published: ${s(video.date)},`,
    `    publishedDate: ${s(video.date)},`,
    `    image: ${s(video.image)},`,
    "    products: [],",
    "  },",
    "",
  ].join("\n");
}

async function downloadThumbnail(youtubeId, destination) {
  let lastError;
  for (const size of ["maxresdefault", "sddefault", "hqdefault"]) {
    try {
      const response = await fetchWithRetry(`https://i.ytimg.com/vi/${youtubeId}/${size}.jpg`, 2);
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, Buffer.from(await response.arrayBuffer()));
      return size;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

const source = await readFile(videosPath, "utf8");
if (!source.includes(listStart)) throw new Error(`Couldn't find "${listStart.trim()}" in lib/videos.ts`);

const existingIds = new Set([...source.matchAll(/youtubeId:\s*"([^"]+)"/g)].map(([, id]) => id));
const existingSlugs = new Set([...source.matchAll(/slug:\s*"([^"]+)"/g)].map(([, slug]) => slug));
const numbers = [...source.matchAll(/^\s{4}number:\s*(\d+),/gm)].map(([, n]) => Number(n));
const newestSiteDate = Math.max(
  ...[...source.matchAll(/publishedDate:\s*"([^"]+)"/g)].map(([, d]) => Date.parse(d)).filter(Number.isFinite),
);

let xml;
if (feedFile) {
  xml = await readFile(feedFile, "utf8");
} else {
  try {
    xml = await (await fetchWithRetry(FEED_URL)).text();
  } catch (error) {
    // YouTube's feed endpoint has occasional outages; the next scheduled run will catch up.
    console.warn(`::warning::Skipping this run, couldn't fetch the YouTube feed: ${error.message}`);
    process.exit(0);
  }
}

const candidates = parseFeed(xml)
  .filter((video) => !video.isShort && !existingIds.has(video.youtubeId))
  .map((video) => ({ ...video, date: dateFormat.format(video.published) }))
  // Only videos on or after the newest video already on the site, so older
  // uploads that were deliberately left off never get resurrected.
  .filter((video) => Date.parse(video.date) >= newestSiteDate)
  .sort((a, b) => a.published - b.published);

if (candidates.length === 0) {
  console.log("No new videos.");
  process.exit(0);
}

let nextNumber = Math.max(0, ...numbers) + 1;
const added = [];
for (const video of candidates) {
  const number = nextNumber++;
  const slug = slugify(video.title, existingSlugs);
  existingSlugs.add(slug);
  const image = `/images/video-${number}/thumb.jpg`;
  const entry = { ...video, number, slug, image, description: summarize(video.description) };

  if (!dryRun) {
    const size = await downloadThumbnail(video.youtubeId, join(root, "public", image));
    console.log(`  thumbnail: ${size}.jpg -> public${image}`);
  }
  added.push(entry);
  console.log(`Video ${number}: ${video.title} (${video.youtubeId}, ${video.date}) -> /${number}/`);
}

const newEntries = added.slice().reverse().map(renderEntry).join("");
const updated = source.replace(listStart, listStart + newEntries);

if (dryRun) {
  console.log("\n--dry-run: would insert:\n");
  console.log(newEntries);
} else {
  await writeFile(videosPath, updated);
  if (process.env.GITHUB_OUTPUT) {
    const summary = added.map((v) => `#${v.number} ${v.title}`).join("; ");
    await appendFile(process.env.GITHUB_OUTPUT, `added=${summary.replace(/\n/g, " ")}\n`);
  }
}
