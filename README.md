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

## Shortlinks

Shortlinks are static redirect pages in `public/<shortlink>/index.html`, so
GitHub Pages serves them directly. Each page uses `location.replace`, a
no-JavaScript meta refresh, and a clickable fallback. Keep all destination
URLs in a page identical, including affiliate and product-variant parameters.

- `/watt-combo` — WattCycle battery/combo, `ref=bk`, variant `52234109550888`
- `/12kw-inverter` — WattCycle 12 kW inverter, `ref=lyhbkprs`
- `/16kwh-battery` — WattCycle 16 kWh battery, `ref=lyhbkprs`
