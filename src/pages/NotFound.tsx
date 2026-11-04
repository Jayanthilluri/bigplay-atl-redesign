import { Link } from 'react-router'
import { Header, Footer, ActionBar, ArrowIcon, NAV, PHONE_DISPLAY, PHONE_TEL } from '../chrome'

export default function NotFound() {
  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen">
      <Header />
      <main id="main" className="px-5 sm:px-8 pt-32 pb-20 max-w-6xl mx-auto">
        <p className="font-mono-label text-[11px] text-[#ff8e4d]">Error 404</p>
        <h1 className="font-display text-6xl sm:text-8xl leading-[0.9] text-white mt-3">
          Gutter ball. <span className="text-[#ebff4b]">This page doesn’t exist.</span>
        </h1>
        <p className="mt-6 max-w-xl text-white/70 leading-relaxed">
          The page may have moved when we rebuilt the site. Try one of these, or call us at{' '}
          <a href={PHONE_TEL} className="underline">{PHONE_DISPLAY}</a>.
        </p>
        <ul className="mt-8 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10 max-w-2xl">
          {[{ label: 'Home', href: '/' }, ...NAV].map((n) => (
            <li key={n.href} className="bg-[#050505]">
              <Link to={n.href} className="flex items-center justify-between px-5 py-4 font-mono-label text-xs text-white hover:text-[#ebff4b]">
                {n.label} <ArrowIcon />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
      <ActionBar />
    </div>
  )
}
