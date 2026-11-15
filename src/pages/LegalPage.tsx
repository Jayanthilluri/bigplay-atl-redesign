import { Header, Footer, ActionBar, PHONE_DISPLAY, PHONE_TEL, ADDRESS } from '../chrome'
import termsHtml from '../content/legal/terms.html?raw'
import accessibilityHtml from '../content/legal/accessibility.html?raw'

/* Legal documents carried over from the old WordPress site (bigplayatl.com/wpautoterms/…).
   Content lives in src/content/legal/*.html as plain, first-party markup (headings,
   paragraphs, lists, links only — sanitized when imported). */
const DOCS = {
  terms: { title: 'Terms and Conditions', html: termsHtml, note: 'Last updated: March 2, 2025' },
  accessibility: { title: 'Accessibility Statement', html: accessibilityHtml, note: 'Last updated: November 12, 2026' },
} as const

export default function LegalPage({ doc }: { doc: keyof typeof DOCS }) {
  const d = DOCS[doc]
  const html = doc === 'terms' ? d.html.replace(/<p>\s*Last updated:[^<]*<\/p>/, '') : d.html
  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />
      <main id="main" className="px-5 sm:px-8 pt-32 pb-20">
        <article className="max-w-3xl mx-auto">
          <p className="font-mono-label text-[12px] text-[#ff8e4d]">Legal</p>
          <h1 className="font-display text-5xl sm:text-7xl leading-[0.9] text-white mt-3">{d.title}</h1>
          <p className="mt-6 text-sm text-white/70">{d.note}</p>
          <div className="legal-prose mt-8" dangerouslySetInnerHTML={{ __html: html }} />
          <address className="not-italic mt-12 border border-white/10 p-5 space-y-1 text-white/80">
            <p className="text-white font-semibold">Questions? Contact Big Play Entertainment</p>
            <p>{ADDRESS}</p>
            <p>
              Email: <a href="mailto:info@bigplayatl.com" className="text-[#42b23c] u-link">info@bigplayatl.com</a> · Phone:{' '}
              <a href={PHONE_TEL} className="text-[#42b23c] u-link">{PHONE_DISPLAY}</a>
            </p>
          </address>
        </article>
      </main>
      <Footer />
      <ActionBar />
    </div>
  )
}
