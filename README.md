# Brian Kennedy

The source for [www.kennedyish.com](https://www.kennedyish.com/), Brian
Kennedy's home for videos about smart homes, networking, tools, and house
projects.

## Development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:3000/`.

## Validation

```bash
npm test
npm run lint
npm run build:pages
```

## Deployment

The site is deployed exclusively through GitHub Pages. Every push to `main`
triggers [the Pages workflow](.github/workflows/pages.yml), which builds the
static export and publishes it to the custom domain.

Video pages use chronological short URLs: `/1`, `/2`, and so on. A video with
`listed: false` remains available by direct URL but is omitted from the
homepage.

### Automatic video pages

[The YouTube sync workflow](.github/workflows/youtube-sync.yml) checks the
@kennedyish RSS feed once a day (02:00 UTC; use "Run workflow" in the Actions
tab to publish right away). For each new long-form upload (Shorts
are skipped) it runs `scripts/sync-youtube-videos.mjs`, which saves the
thumbnail to `public/images/video-<n>/thumb.jpg` and adds an entry to the top
of `lib/videos.ts` with the next number, the YouTube title, and the first
paragraph of the description. Product links in the description become
"Products used" cards: lines like `Name: URL` or `🔶 Name - URL` (a
parenthetical such as `(15% off)` becomes the card's note). Links with no name
are titled from the product page. Social and YouTube links are skipped. The
workflow then commits, pushes, and starts the Pages deploy. Product art,
discount codes, and project sections are still added by hand.

YouTube's RSS feed has frequent outages (random 404s), so when it fails the
script reads the channel's Videos tab and each new video's watch page instead.
If both fail, the run fails and GitHub emails you.

Only videos published on or after the newest video already on the site are
added, so older uploads left off on purpose won't come back. Preview with
`node scripts/sync-youtube-videos.mjs --dry-run`.

## Shortlinks

Shortlinks are static redirect pages in `public/<shortlink>/index.html`, so
GitHub Pages serves them directly. Each page uses `location.replace`, a
no-JavaScript meta refresh, and a clickable fallback. Keep all destination
URLs in a page identical, including affiliate and product-variant parameters.

- `/watt-combo` — WattCycle battery/combo, `ref=bk`, variant `52234109550888`
- `/12kw-inverter` — WattCycle 12 kW inverter, `ref=lyhbkprs`
- `/16kwh-battery` — WattCycle 16 kWh battery, `ref=lyhbkprs`
