import { useEffect } from 'react'

/* Third-party form embedded in an iframe (Toast event inquiry, LeadConnector
   Player's Club sign-up). `script` loads the provider's helper once — for
   LeadConnector it auto-resizes the iframe to fit the form. */
export default function EmbedFrame({
  src,
  title,
  id,
  className = '',
  script,
  attrs = {},
}: {
  src: string
  title: string
  id?: string
  className?: string
  script?: string
  attrs?: Record<string, string>
}) {
  useEffect(() => {
    if (!script || document.querySelector(`script[src="${script}"]`)) return
    const el = document.createElement('script')
    el.src = script
    el.async = true
    document.body.appendChild(el)
  }, [script])

  return (
    <iframe
      src={src}
      title={title}
      id={id}
      loading="lazy"
      className={`block w-full border-0 bg-white ${className}`}
      {...attrs}
    />
  )
}
