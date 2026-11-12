/* Cloudflare Pages Function for /video/*: serves the hero videos with HTTP range
   support (206 Partial Content). Pages' static asset server answers range requests
   with the whole file (200), and Safari on iOS/macOS will not play video without
   proper 206 responses. Runs only for /video/* — every other path stays static. */
export async function onRequest({ request, env }) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } })
  }
  const asset = await env.ASSETS.fetch(new Request(request.url, { method: 'GET' }))
  if (!asset.ok) return asset

  const body = await asset.arrayBuffer()
  const size = body.byteLength
  const headers = new Headers(asset.headers)
  headers.set('Accept-Ranges', 'bytes')
  headers.set('Cache-Control', 'public, max-age=86400')

  const range = request.headers.get('Range')
  const m = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim())
  if (!m || (m[1] === '' && m[2] === '')) {
    headers.set('Content-Length', String(size))
    return new Response(request.method === 'HEAD' ? null : body, { status: 200, headers })
  }

  let start, end
  if (m[1] === '') {
    start = Math.max(0, size - Number(m[2]))
    end = size - 1
  } else {
    start = Number(m[1])
    end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1)
  }
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } })
  }
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`)
  headers.set('Content-Length', String(end - start + 1))
  return new Response(request.method === 'HEAD' ? null : body.slice(start, end + 1), { status: 206, headers })
}
