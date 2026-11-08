# Progress

## YouTube → site automation (2026-11-08)

**Goal:** every new video on youtube.com/@kennedyish automatically gets a page
at kennedyish.com/<n>/.

**Status:** live since 2026-11-08. First successful run created /10/ and /11/
(commit 717c96f) and deployed them.

### How it works
- `.github/workflows/youtube-sync.yml` runs once a day at 02:00 UTC
  (+ manual "Run workflow" in the Actions tab to publish immediately).
- `scripts/sync-youtube-videos.mjs` reads the channel RSS feed
  (channel ID `UCFOVDf2I596jgOde6PCcNYg`, no API key), skips Shorts (feed link
  contains `/shorts/`) and anything already in `lib/videos.ts`, and only adds
  videos dated on/after the newest `publishedDate` on the site.
- New entry: next number, slug from title, `listed: true`, title used for both
  `title` and `shortTitle`, description = first paragraph of the YouTube
  description with no URLs/hashtags, date in Pacific time, `products: []`.
- Thumbnail: `i.ytimg.com/vi/<id>/maxresdefault.jpg` (falls back to sd/hq) →
  `public/images/video-<n>/thumb.jpg` (1280×720, same as videos 7–9).
- Workflow commits as github-actions[bot], then runs `gh workflow run pages.yml`
  because pushes made with `GITHUB_TOKEN` don't trigger the Pages workflow.

### Decisions
- Once-a-day schedule (was every 30 min). Brian didn't want it running
  constantly; also considered YouTube WebSub push via a Cloudflare Worker
  (more setup) and a manual-only button (an extra tap every upload).
- RSS polling over the YouTube Data API: no key/secret to manage, and the feed
  includes everything needed.
- ~~Feed failures exit 0 quietly~~ — wrong: first real run on GitHub got a
  404 from the RSS feed and silently did nothing. The feed was 404ing from
  the Mac too at the same moment, then 200 minutes later, so it's YouTube-side
  flakiness. Fix: fall back to `@kennedyish/videos` (ytInitialData,
  `lockupViewModel.contentId`) + each new video's watch page
  (ytInitialPlayerResponse: title, shortDescription, microformat.publishDate).
  Both paths verified to produce identical entries. If both fail → exit 1 so
  GitHub emails. `--source page` forces the fallback for testing.

### Verified
- Dry run and real run against the live feed: found exactly the two videos
  missing from the site, the WattCycle solar video (Oct 10 → #10) and the
  crawlspace video (Oct 24 → #11). Second run: "No new videos."
- `tsc` passes; `next build` (Pages export) renders `/10/` and `/11/` with the
  correct embeds; homepage lists 11, 10, 9 first. Changes reverted after test.

### Open questions / notes
- #10 and #11 are live with empty product lists — add products by hand.
- GitHub disables scheduled workflows after 60 days with no repo activity;
  re-enable from the Actions tab if that happens.
- Titles/descriptions come straight from YouTube; hand-edit `shortTitle` etc.
  afterwards if wanted.
