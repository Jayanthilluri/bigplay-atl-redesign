import { useEffect, useRef } from 'react'
import {
  Header, Footer, ActionBar, KineticLine, ArrowIcon, PhoneIcon, PinIcon, TicketIcon, PlayersClubPopup,
  useReveal, useHeroParallax, useOpenStatus, BOOK_URL, PHONE_DISPLAY, PHONE_TEL, MAPS_URL, ADDRESS, HOURS,
} from '../chrome'

const CONTACTS = [
  {
    icon: 'pin',
    title: 'Find us',
    lines: ['2480 Mt Vernon Rd', 'Dunwoody, GA 30338'],
    cta: 'Get directions',
    href: MAPS_URL,
  },
  {
    icon: 'phone',
    title: 'Call us',
    lines: ['Questions, party planning,', 'group rates — real humans answer'],
    cta: PHONE_DISPLAY,
    href: PHONE_TEL,
  },
  {
    icon: 'ticket',
    title: 'Book ahead',
    lines: ['Lock in parties & events', 'online in about two minutes'],
    cta: 'Book online',
    href: BOOK_URL,
  },
]

const GOOD_TO_KNOW = [
  'Free on-site parking — the lot is right at the door',
  'Socks required for some play areas — bring a pair or grab some at the counter',
  'Outside cakes welcome with any booked birthday package',
  'The whole building is climate controlled — perfect for Georgia summers',
]

export default function Visit() {
  const heroImg = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImg)
  useReveal()
  const status = useOpenStatus()
  const today = new Date().getDay()

  useEffect(() => {
    document.title = 'Visit Us — Big Play ATL Redesign Concept'
  }, [])

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />

      {/* Hero */}
      <section className="relative h-[60svh] min-h-[420px] overflow-hidden flex items-end">
        <div ref={heroImg} className="absolute inset-0 -top-[20%] h-[140%]">
          <img src="/photos/venue-exterior.jpg" alt="Big Play Entertainment building exterior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-[#050505]/40" />
        </div>
        <div className="relative px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-mono-label text-[10px] sm:text-xs text-[#ff8e4d] flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-[#ebff4b] pulse-dot' : 'bg-[#ff8e4d]'}`} />
            {status.text || 'Dunwoody, GA'}
          </p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] mt-4 text-white">
            <KineticLine text="Come" />{' '}
            <span className="text-[#ebff4b]"><KineticLine text="play" base={0.1} /></span>
          </h1>
        </div>
      </section>

      {/* Contact cards */}
      <section className="px-5 sm:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {CONTACTS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              className="reveal group bg-[#050505] p-6 sm:p-8 hover:bg-[#0d0d0d] transition-colors"
            >
              <span className="text-[#ebff4b]">
                {c.icon === 'pin' && <PinIcon className="w-6 h-6" />}
                {c.icon === 'phone' && <PhoneIcon className="w-6 h-6" />}
                {c.icon === 'ticket' && <TicketIcon className="w-6 h-6" />}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-white mt-4">{c.title}</h2>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                {c.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </p>
              <span className="u-link mt-4 inline-flex items-center gap-2 font-mono-label text-[11px] text-[#ebff4b]">
                {c.cta} <ArrowIcon className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Hours */}
      <section className="px-5 sm:px-8 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="reveal">
            <p className="font-mono-label text-[10px] text-[#ff8e4d]">Hours</p>
            <h2 className="font-display text-4xl sm:text-5xl leading-[0.9] text-white mt-2">
              When the fun <span className="text-[#ebff4b]">happens</span>
            </h2>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Holiday hours can shift — if you’re planning around a school break or holiday,
              a quick call saves the trip.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 border border-white/10 px-4 py-3">
              <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-[#ebff4b] pulse-dot' : 'bg-[#ff8e4d]'}`} />
              <span className="font-mono-label text-[11px] text-white/80">{status.text}</span>
            </div>
          </div>
          <ul className="reveal divide-y divide-white/10 border-y border-white/10">
            {HOURS.map((h, i) => (
              <li
                key={h.day}
                className={`flex items-center justify-between py-3.5 px-2 ${i === today ? 'text-[#ebff4b]' : 'text-white/75'}`}
              >
                <span className="font-mono-label text-[11px] flex items-center gap-2">
                  {h.day}
                  {i === today && <span className="text-[9px] text-black bg-[#ebff4b] px-1.5 py-0.5 font-bold">TODAY</span>}
                </span>
                <span className={`font-mono-label text-[11px] ${h.label === 'Closed' ? 'text-white/30' : ''}`}>
                  {h.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Good to know */}
      <section className="px-5 sm:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto bg-[#0d0d0d] border border-white/10 p-6 sm:p-10">
          <h2 className="reveal font-display text-3xl sm:text-4xl text-white">Good to know</h2>
          <ul className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-3 text-sm text-white/75">
            {GOOD_TO_KNOW.map((g) => (
              <li key={g} className="reveal flex gap-2">
                <span className="text-[#ebff4b]" aria-hidden>✦</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
          <div className="reveal mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#ebff4b] text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-white transition-colors"
            >
              Directions to {ADDRESS.split(',')[0]} <ArrowIcon />
            </a>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-mono-label text-xs font-bold px-7 py-4 hover:border-[#ebff4b] hover:text-[#ebff4b] transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ActionBar />
      <PlayersClubPopup />
    </div>
  )
}
