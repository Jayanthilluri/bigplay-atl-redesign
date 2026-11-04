/* Build step: render every route to static HTML so search engines, link previews
   and slow phones get real content before JavaScript loads.
   Runs after `vite build` (client) and `vite build --ssr` (server bundle). */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = path.resolve('dist')
const SSR_ENTRY = path.resolve('dist-ssr/entry-server.js')

const { render, STAGING, PAGES, NOT_FOUND, SITE_URL, SITE_NAME, OG_IMAGE, jsonLdFor } = await import(pathToFileURL(SSR_ENTRY).href)
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

function head(meta, { indexable }) {
  const url = SITE_URL + (meta.path === '/' ? '/' : meta.path)
  const tags = [
    `<title>${attr(meta.title)}</title>`,
    `<meta name="description" content="${attr(meta.description)}" />`,
    indexable ? `<link rel="canonical" href="${url}" />` : `<meta name="robots" content="noindex" />`,
    // While STAGING (src/chrome.tsx) is true, keep preview hosts out of search results.
    ...(STAGING && indexable ? [`<meta name="robots" content="noindex" />`] : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${attr(meta.title)}" />`,
    `<meta property="og:description" content="${attr(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ...(indexable ? jsonLdFor(meta.path).map((o) => `<script type="application/ld+json">${json(o)}</script>`) : []),
  ]
  return tags.join('\n    ')
}

function page(url, meta, opts) {
  const html = render(url)
  return template
    .replace(/<!--head:start-->[\s\S]*?<!--head:end-->/, head(meta, opts))
    .replace('<!--app-html-->', html)
}

for (const meta of PAGES) {
  // /parties -> dist/parties.html: static hosts (Cloudflare Pages, Netlify) serve it at
  // /parties with no trailing-slash redirect, matching the canonical URLs.
  const out = meta.path === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${meta.path.slice(1)}.html`)
  fs.writeFileSync(out, page(meta.path, meta, { indexable: true }))
  console.log('prerendered', meta.path)
}

fs.writeFileSync(path.join(DIST, '404.html'), page('/404', NOT_FOUND, { indexable: false }))
console.log('prerendered 404.html')

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url><loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap)
console.log('wrote sitemap.xml')

fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
