import { useRef } from 'react'
import {
  Header, photo, Footer, ActionBar, KineticLine, ArrowIcon, NavAnchor, PlayersClubPopup,
  useReveal, useHeroParallax, useOpenStatus, PHONE_DISPLAY, PHONE_TEL,
} from '../chrome'

/* Real photos from corporate events & group buyouts at Big Play ATL */
const CORP_GALLERY = [
  { src: '/photos/corp-pin-op.jpg', alt: 'Corporate team at the Big Play bowling pin photo op' },
  { src: '/photos/corp-team-lineup.jpg', alt: 'Corporate team lineup at a Big Play group event' },
  { src: '/photos/corp-table-80s.jpg', alt: 'Company team dinner at the long event table' },
  { src: '/photos/corp-buffet-line.jpg', alt: 'Guests serving themselves at a catered buffet line' },
  { src: '/photos/food-sliders.jpg', alt: 'Pulled pork slider catering station' },
  { src: '/photos/food-fruit-platter.jpg', alt: 'Fresh fruit platter for a catered event' },
  { src: '/photos/food-cocktails.jpg', alt: 'Signature cocktails lined up on the bar' },
]

const HOSTS = [
  {
    name: 'Corporate outings & team building',
    desc: 'Bowling tournaments, laser tag battles and arcade leaderboards — competition your team actually wants. Meeting space available for the all-hands before the fun.',
  },
  {
    name: 'Holiday parties & celebrations',
    desc: 'End-of-year bashes and milestone celebrations with catering from Woody’s kitchen, a full bar, and the whole venue glowing.',
  },
  {
    name: 'School, team & group events',
    desc: 'Field trips, team celebrations, club and church outings — easy packages for big groups, with hosts who keep it all moving.',
  },
  {
    name: 'Full venue buyouts',
    desc: 'Take over all 42,000 square feet. Private lanes, private bar, your people only — planned start to finish with our events team.',
  },
]

const EVENT_STEPS = [
  { n: '01', name: 'Tell us about your group', desc: 'Date, headcount and the vibe you’re after — a quick call is all it takes to get started.' },
  { n: '02', name: 'We build the package', desc: 'Attractions, food and drinks from Woody’s, and the right spaces — bundled into one proposal.' },
  { n: '03', name: 'You show up', desc: 'Your event host runs the day — setup, food, games, cleanup. You take the credit.' },
]

export default function Events() {
  const heroImg = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImg)
  useReveal()
  const status = useOpenStatus()


  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />
      <main id="main">

      {/* ===== hero ===== */}
      <section className="relative h-[82svh] min-h-[540px] overflow-hidden flex items-end">
        <div ref={heroImg} className="absolute inset-0 -top-[20%] h-[140%]">
          <img {...photo('/photos/corp-banquet.jpg')} fetchPriority="high" alt="Corporate banquet event at Big Play ATL" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]/30" />
        </div>
        <div className="relative px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-mono-label text-[10px] sm:text-xs text-[#ff8e4d] flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-[#ebff4b] pulse-dot' : 'bg-[#ff8e4d]'}`} />
            Corporate events · team building · full buyouts
          </p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] mt-4 text-white">
            <KineticLine text="Where Dunwoody’s" />{' '}
            <span className="text-[#ebff4b]"><KineticLine text="best gather" base={0.2} /></span>
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            The premier destination for corporate events, team building and private parties.
            42,000 square feet, five attractions, a full restaurant and bar — and an events
            team that plans it all with you.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#ebff4b] text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-white transition-colors"
            >
              Plan an event: {PHONE_DISPLAY} <ArrowIcon />
            </a>
            <NavAnchor
              href="/attractions"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-white/30 text-white font-mono-label text-xs px-7 py-4 hover:border-[#ebff4b] hover:text-[#ebff4b] transition-colors"
            >
              Explore the attractions
            </NavAnchor>
          </div>
        </div>
      </section>

      {/* ===== trust strip ===== */}
      <div className="border-y border-white/10 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto grid grid-cols-3 divide-x divide-white/10">
          {[
            ['42,000', 'Square feet of venue'],
            ['5', 'Attractions under one roof'],
            ['100%', 'Planned by our events team'],
          ].map(([v, l]) => (
            <div key={l} className="px-4 py-6 sm:py-8 text-center">
              <p className="font-display text-3xl sm:text-5xl text-[#ebff4b]">{v}</p>
              <p className="font-mono-label text-[9px] sm:text-[10px] text-white/50 mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== what we host ===== */}
      <section id="host" className="px-5 sm:px-8 py-16 md:py-24 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="reveal font-mono-label text-[10px] text-[#ff8e4d]">What we host</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white mt-2">
            One venue, <span className="text-[#ebff4b]">every kind of gathering</span>
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {HOSTS.map((h) => (
              <div key={h.name} className="reveal bg-[#050505] p-6 sm:p-8">
                <h3 className="font-display text-2xl sm:text-3xl text-white">{h.name}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== how it works ===== */}
      <section className="px-5 sm:px-8 py-16 md:py-24 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="reveal font-mono-label text-[10px] text-[#ff8e4d]">How it works</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white mt-2">
            You bring the people, <span className="text-[#ebff4b]">we do the rest</span>
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {EVENT_STEPS.map((s) => (
              <div key={s.n} className="reveal bg-[#050505] p-6 sm:p-8">
                <p className="font-mono-label text-[10px] text-[#ff8e4d]">{s.n}</p>
                <h3 className="font-display text-2xl sm:text-3xl text-white mt-2">{s.name}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== included — acid band ===== */}
      <section className="bg-[#ebff4b] text-black px-5 sm:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="reveal">
            <p className="font-mono-label text-[10px] text-black/60">Every event includes</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.9] mt-2">
              One call plans it all.
            </h2>
          </div>
          <ul className="reveal space-y-2 text-sm sm:text-base font-medium">
            {['Dedicated event host', 'Catering from Woody’s kitchen', 'Full bar & signature cocktails', 'Flexible group sizes & spaces'].map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden>✦</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== gallery ===== */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="px-5 sm:px-8 max-w-6xl mx-auto flex items-end justify-between gap-6">
          <div>
            <p className="reveal font-mono-label text-[10px] text-[#ff8e4d]">Real events, real photos</p>
            <h2 className="reveal font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white mt-2">
              Recent <span className="text-[#ebff4b]">group events</span>
            </h2>
          </div>
          <p className="reveal hidden sm:block font-mono-label text-[10px] text-white/60">Swipe →</p>
        </div>
        <div tabIndex={0} role="region" aria-label="Group event photo gallery, scroll sideways" className="reveal mt-10 flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 pb-4">
          {CORP_GALLERY.map((g) => (
            <img
              key={g.src}
              {...photo(g.src, '600px')}
              alt={g.alt}
              loading="lazy"
              className="h-64 sm:h-80 md:h-96 w-auto shrink-0 snap-center border border-white/10 object-cover"
            />
          ))}
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="bg-[#ebff4b] text-black px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="reveal">
            <p className="font-mono-label text-[10px] text-black/60">Dates fill fast — especially Q4</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.9] mt-2">
              Let’s plan your event.
            </h2>
            <p className="mt-4 max-w-md text-black/70 text-sm sm:text-base">
              Tell us the date and the headcount — our events team takes it from there.
            </p>
          </div>
          <div className="reveal flex flex-col sm:flex-row md:flex-col gap-3">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-black text-[#ebff4b] font-mono-label text-xs font-bold px-7 py-4 hover:bg-[#1a1a1a] transition-colors"
            >
              {PHONE_DISPLAY} <ArrowIcon />
            </a>
            <NavAnchor
              href="/eat"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-black text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-black hover:text-[#ebff4b] transition-colors"
            >
              See the catering
            </NavAnchor>
          </div>
        </div>
      </section>

      </main>

      <Footer />
      <ActionBar />
      <PlayersClubPopup />
    </div>
  )
}
