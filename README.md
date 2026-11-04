# Big Play ATL — website

Marketing site for Big Play ATL (2480 Mt Vernon Rd, Dunwoody, GA). React 19 + Vite + Tailwind,
prerendered to static HTML at build time so every page ships real content, titles and
structured data to search engines before JavaScript loads.

## Commands

```bash
npm install
npm run dev      # local dev server on http://localhost:3000
npm run build    # type-check, build, prerender every route into dist/
npm run preview  # serve dist/ (note: SPA fallback hides the 404 page here)
npm run lint
```

Deploy the `dist/` folder to any static host. Each route is a real file
(`dist/parties.html` → served at `/parties`), plus `404.html`, `sitemap.xml`, `robots.txt`
and `_headers` (Cloudflare Pages: caching, security headers, and `noindex` on `*.pages.dev`).

### Cloudflare Pages settings
Framework preset **None** (or Vite) · Build command `npm run build` · Output directory `dist` ·
Node version comes from `.node-version` (22).

## Where things live

| What | File |
| --- | --- |
| Phone, address, booking/VIP links, **hours** | `src/chrome.tsx` (top of file) |
| Page titles & descriptions, business structured data | `src/seo.ts` |
| Party FAQs (also emitted as FAQPage structured data) | `src/content/partyFaqs.ts` |
| Pages | `src/pages/*.tsx` |
| Photos (WebP, 1600w + `-800` variant) | `public/photos/` — sizes in `src/photos.ts` |
| Prerender + sitemap | `scripts/prerender.mjs` |

If you change opening hours, update **both** `HOURS` in `src/chrome.tsx` and
`openingHoursSpecification` in `src/seo.ts`. "Open now" is always computed in Atlanta time.

### Adding a photo
Export a JPG, then create `name.webp` (max 1600px wide) and `name-800.webp` (800px wide) in
`public/photos/`, add `name: [width, height]` to `src/photos.ts`, and use
`<img {...photo('/photos/name.webp')} alt="…" />`.

## Launch checklist

- [ ] Set `STAGING = false` in `src/chrome.tsx` (removes "redesign concept" from the footer).
- [ ] Move the logo, favicon and the two remaining images still served from
      `pub-…r2.dev` (see `IMG` in `src/chrome.tsx` and the favicon in `index.html`) into
      `public/` — Cloudflare's `r2.dev` URLs are rate-limited and not meant for production.
- [ ] Replace the stock mixed-reality photo (`IMG.vr`) with a real photo of the ValoArena.
- [ ] Add 301 redirects from every old bigplayatl.com URL to its new page (host config).
- [ ] Point bigplayatl.com DNS at the host; submit `https://bigplayatl.com/sitemap.xml`
      in Google Search Console; confirm the Google Business Profile website link and hours.
- [ ] Add analytics (GA4 / Meta Pixel) with events for Book, Call and Directions clicks.

## Content still needed from the business

- Walk-in prices for bowling, laser tag, glow golf and mixed reality.
- This week's actual specials (e.g. the $2 Tuesday bowling) for `/specials`.
- Woody's real menu with prices and kitchen hours for `/eat`.
- Real Google reviews to show on `/parties` (the AI-written testimonials were removed).
