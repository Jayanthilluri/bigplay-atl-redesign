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

- [x] Old WordPress URLs redirect (`public/_redirects`, 301s); legal pages carried over.
- [x] Logo, favicon and all images served from this site (no `r2.dev`); fonts self-hosted.
- [ ] Add Google Tag Manager (old site container `GTM-N6GMJQDS`) so analytics/Meta Pixel match
      the Privacy Policy.
- [ ] Cloudflare Pages → Custom domains: add `bigplayatl.com` (and `www`), then point DNS.
- [ ] Google Search Console: submit `https://bigplayatl.com/sitemap.xml`; watch for 404s.
- [ ] Google Business Profile: confirm website link and hours.
- [ ] Replace the stock Valo Arena placeholder (`public/photos/valo-placeholder*.webp`).

## Content still needed from the business

- Walk-in prices for bowling, laser tag, glow golf and mixed reality.
- This week's actual specials (e.g. the $2 Tuesday bowling) for `/specials`.
- Woody's real menu with prices and kitchen hours for `/eat`.
- Real Google reviews to show on `/parties` (the AI-written testimonials were removed).
