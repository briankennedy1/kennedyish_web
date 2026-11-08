#!/usr/bin/env node
// Adds a page for every new @kennedyish upload.
//
// Reads the channel's public RSS feed (no API key), falling back to the
// channel's Videos tab + watch pages when the feed is down (it often 404s).
// If both fail, it exits non-zero so the GitHub run fails and emails.
// For each long-form
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
const sourceIndex = args.indexOf("--source");
const source_ = sourceIndex >= 0 ? args[sourceIndex + 1] : "auto"; // auto | page

const CHANNEL_VIDEOS_URL = "https://www.youtube.com/@kennedyish/videos";
const browserHeaders = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  "accept-language": "en-US,en;q=0.9",
  // Skip the EU cookie-consent interstitial if a runner lands there.
  cookie: "SOCS=CAI",
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  month: "long",
  day: "numeric",
  year: "numeric",
});

async function fetchWithRetry(url, attempts = 3, headers = { "user-agent": "kennedyish-site-sync" }) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { headers });
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

// Product links from description lines like "Name: URL", "🔶 Name - URL",
// or "Name (15% off): URL". Sentences, social links and "Get yours here"
// style lines without a product name are skipped.
const skipHosts = /(^|\.)(youtube\.com|youtu\.be|instagram\.com|tiktok\.com|facebook\.com|twitter\.com|x\.com|patreon\.com)$/i;
const genericNames = /^(get (it|one|yours)( here)?|shop( now| here)?|buy( it)?( now| here)?|link|here|click here|available here|check (it|them) out)$/i;

function parseProducts(description) {
  const products = [];
  for (const rawLine of description.split("\n")) {
    const line = rawLine.replace(/(\s+#\w+)+\s*$/u, "").trim().replace(/^[^\p{L}\p{N}]+/u, "");
    const match =
      line.match(/^(.+?)\s*(?:[:\-–—]\s*|\s)(https?:\/\/\S+)$/u) ?? line.match(/^()(https?:\/\/\S+)$/u);
    if (!match) continue;
    let [, name, url] = match;
    let note;
    const paren = name.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
    if (paren) [, name, note] = paren;
    name = name.replace(/[\s:–—-]+$/u, "").trim();
    let host;
    try {
      host = new URL(url).hostname.replace(/^www\./, "");
    } catch {
      continue;
    }
    // No usable name ("🔗 URL", "Get yours here: URL"): named later from the page title.
    if (name.length < 2 || genericNames.test(name)) name = "";
    if (
      name.length > 60 ||
      skipHosts.test(host) ||
      /^kennedyish\.com\/\d+\/?$/.test(`${host}${new URL(url).pathname}`) ||
      products.some((p) => p.url === url)
    ) {
      continue;
    }
    products.push({ name, url, ...(note ? { description: note } : {}) });
  }
  return products;
}

const knownSources = {
  amazon: "Amazon",
  amzn: "Amazon",
  kleintools: "Klein Tools",
  ugreen: "UGREEN",
  ikea: "IKEA",
  ui: "Ubiquiti",
  ubnt: "Ubiquiti",
  wattcycle: "WattCycle",
  stegoindustries: "Stego",
  homedepot: "Home Depot",
  acehardware: "Ace Hardware",
  vevor: "VEVOR",
  etsy: "Etsy",
  lowes: "Lowe's",
};

function sourceFromHost(host) {
  const parts = host.replace(/^www\./, "").split(".");
  const label = parts.length > 2 && parts.at(-2).length <= 3 ? parts.at(-3) : parts.at(-2);
  return knownSources[label] ?? label.charAt(0).toUpperCase() + label.slice(1);
}

// Where a link really goes (short links, kennedyish.com redirect pages), for
// the store label, plus the page's title for links that had no name.
async function productInfo(url) {
  const { hostname, pathname } = new URL(url);
  if (/(^|\.)kennedyish\.com$/.test(hostname)) {
    const slug = pathname.replace(/^\/|\/$/g, "");
    try {
      const page = await readFile(join(root, "public", slug, "index.html"), "utf8");
      const target = page.match(/https?:\/\/[^"'\s<]+/)?.[0];
      if (target) return { source: sourceFromHost(new URL(target).hostname) };
    } catch {
      // not a local shortlink page
    }
  }
  if (!/(^|\.)(amzn\.to|amazon\.[a-z.]+)$/.test(hostname)) {
    try {
      const response = await fetch(url, { headers: browserHeaders, signal: AbortSignal.timeout(10000) });
      const html = await response.text();
      const title = decodeXml(
        html.match(/<meta property="og:title" content="([^"]*)"/)?.[1] ||
          html.match(/<title[^>]*>([^<]*)</)?.[1] ||
          "",
      )
        .split(/\s[|–—]\s/)[0]
        .trim();
      return { source: sourceFromHost(new URL(response.url).hostname), title };
    } catch {
      // fall through to the link's own host
    }
  }
  return { source: sourceFromHost(hostname) };
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
    video.products.length === 0
      ? "    products: [],"
      : [
          "    products: [",
          ...video.products.map((p) =>
            [
              "      {",
              `        name: ${s(p.name)},`,
              ...(p.description ? [`        description: ${s(p.description)},`] : []),
              `        url: ${s(p.url)},`,
              `        source: ${s(p.source)},`,
              "      },",
            ].join("\n"),
          ),
          "    ],",
        ].join("\n"),
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

// Fallback source: the channel's Videos tab (long-form only, newest first)
// plus each new video's watch page for its exact title/date/description.
async function fromChannelPage() {
  const page = await (await fetchWithRetry(CHANNEL_VIDEOS_URL, 3, browserHeaders)).text();
  const ids = [];
  walk(jsonAfter(page, "var ytInitialData = "), (key, value) => {
    const id =
      (key === "lockupViewModel" && value.contentType === "LOCKUP_CONTENT_TYPE_VIDEO" && value.contentId) ||
      (key === "videoRenderer" && value.videoId);
    if (id && !ids.includes(id)) ids.push(id);
  });
  if (ids.length === 0) throw new Error("No videos found on the channel page");

  const videos = [];
  for (const youtubeId of ids.slice(0, 15).filter((id) => !existingIds.has(id))) {
    const watch = await (await fetchWithRetry(`https://www.youtube.com/watch?v=${youtubeId}`, 3, browserHeaders)).text();
    const player = jsonAfter(watch, "var ytInitialPlayerResponse = ");
    const details = player.videoDetails ?? {};
    const micro = player.microformat?.playerMicroformatRenderer ?? {};
    const published = new Date(micro.publishDate ?? micro.uploadDate);
    if (!details.title || isNaN(published)) {
      throw new Error(`Couldn't read details for ${youtubeId} (${player.playabilityStatus?.status})`);
    }
    if (details.isUpcoming || details.isLive) continue;
    videos.push({
      youtubeId,
      title: details.title,
      published,
      description: details.shortDescription ?? "",
      isShort: false,
    });
  }
  return videos;
}

function jsonAfter(html, marker) {
  const start = html.indexOf(marker);
  if (start < 0) throw new Error(`Missing ${marker.trim()}`);
  // Find the end of the JSON object by matching braces outside of strings.
  let depth = 0, inString = false, escaped = false;
  for (let i = start + marker.length; i < html.length; i++) {
    const c = html[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') inString = false;
    } else if (c === '"') inString = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) return JSON.parse(html.slice(start + marker.length, i + 1));
  }
  throw new Error(`Unterminated ${marker.trim()}`);
}

function walk(value, visit) {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (child && typeof child === "object") {
      visit(key, child);
      walk(child, visit);
    }
  }
}

let feedVideos;
if (feedFile) {
  feedVideos = parseFeed(await readFile(feedFile, "utf8"));
} else if (source_ === "page") {
  feedVideos = await fromChannelPage();
} else {
  try {
    feedVideos = parseFeed(await (await fetchWithRetry(FEED_URL)).text());
  } catch (error) {
    // YouTube's RSS endpoint has frequent outages (random 404s), so fall back
    // to the channel page. If that fails too, the run fails and GitHub emails.
    console.warn(`::warning::RSS feed failed (${error.message}); using the channel page instead.`);
    feedVideos = await fromChannelPage();
  }
}

const candidates = feedVideos
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
  const products = [];
  for (const product of parseProducts(video.description)) {
    const { source, title } = await productInfo(product.url);
    const name = product.name || (title && title.length <= 60 ? title : source);
    products.push({ ...product, name, source });
  }
  const entry = { ...video, number, slug, image, products, description: summarize(video.description) };

  if (!dryRun) {
    const size = await downloadThumbnail(video.youtubeId, join(root, "public", image));
    console.log(`  thumbnail: ${size}.jpg -> public${image}`);
  }
  added.push(entry);
  console.log(`Video ${number}: ${video.title} (${video.youtubeId}, ${video.date}) -> /${number}/`);
  console.log(`  products: ${products.length ? products.map((p) => `${p.name} [${p.source}]`).join(", ") : "none found"}`);
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
