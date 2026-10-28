import { useEffect, useRef } from 'react'
import {
  Header, Footer, ActionBar, KineticLine, ArrowIcon, NavAnchor, PlayersClubPopup,
  useReveal, useHeroParallax, VIP_URL, PHONE_DISPLAY, PHONE_TEL, IMG,
} from '../chrome'

/* Placeholder copy — final specials & pricing to be provided by the client */

const WEEKLY = [
  { day: 'Monday', deal: 'Rest day', desc: 'We’re closed — recharging the fun for the week ahead.', off: true },
  { day: 'Tuesday', deal: 'Weekday play deal', desc: 'Midweek is the cheat code: same games, smaller crowds, special pricing.', off: false },
  { day: 'Wednesday', deal: 'Family night', desc: 'Bring the whole crew — bundles built for families playing together.', off: false },
  { day: 'Thursday', deal: 'Weekday play deal', desc: 'The weekend starts early. Deals on lanes and play cards after school.', off: false },
  { day: 'Friday', deal: 'Glow night', desc: 'Lights down, music up. The building flips into glow mode after dark.', off: false },
  { day: 'Saturday', deal: 'Weekend prime', desc: 'The full Big Play experience — every attraction, all day long.', off: false },
  { day: 'Sunday', deal: 'Sunday funday', desc: 'Wind the weekend down with family bundles and easygoing play.', off: false },
]

const STANDING = [
  {
    name: 'Player’s Club exclusives',
    desc: 'Members get the deals nobody else sees — insider discounts, early access, and birthday perks.',
    cta: 'Join free',
    href: VIP_URL,
  },
  {
    name: 'Group & team rates',
    desc: 'Corporate outings, team celebrations, school groups — the more players, the better the rate.',
    cta: 'Plan a group event',
    href: '/events',
  },
  {
    name: 'Party bundles',
    desc: 'Birthday packages wrap play, food, and a dedicated host into one easy price.',
    cta: 'See party options',
    href: '/parties',
  },
]

export default function Specials() {
  const heroImg = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImg)
  useReveal()

  useEffect(() => {
    document.title = 'Specials & Deals — Big Play ATL Redesign Concept'
  }, [])

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />

      {/* Hero */}
      <section className="relative h-[70svh] min-h-[480px] overflow-hidden flex items-end">
        <div ref={heroImg} className="absolute inset-0 -top-[20%] h-[140%]">
          <img src={IMG.kidsArcade} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/30" />
        </div>
        <div className="relative px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-mono-label text-[10px] sm:text-xs text-[#ff8e4d]">Deals & weekly specials</p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] mt-4 text-white">
            <KineticLine text="Play more," />{' '}
            <span className="text-[#ebff4b]"><KineticLine text="pay less" base={0.15} /></span>
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            There’s almost always a deal running. Here’s the weekly rhythm — and the
            standing offers worth knowing about.
          </p>
        </div>
      </section>

      {/* Weekly rhythm */}
      <section className="px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white">
              The week at <span className="text-[#ebff4b]">Big Play</span>
            </h2>
            <p className="hidden md:block font-mono-label text-[10px] text-white/40 max-w-[220px] text-right">
              Specials rotate — call ahead or check at the door for this week’s lineup
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {WEEKLY.map((d) => (
              <div key={d.day} className={`reveal p-6 sm:p-8 ${d.off ? 'bg-[#0d0d0d]' : 'bg-[#050505]'}`}>
                <p className="font-mono-label text-[10px] text-[#ff8e4d]">{d.day}</p>
                <h3 className={`font-display text-2xl sm:text-3xl mt-2 ${d.off ? 'text-white/30' : 'text-white'}`}>
                  {d.deal}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${d.off ? 'text-white/25' : 'text-white/60'}`}>
                  {d.desc}
                </p>
              </div>
            ))}
            <div className="reveal bg-[#ebff4b] text-black p-6 sm:p-8 flex flex-col justify-between gap-6">
              <p className="font-display text-2xl sm:text-3xl leading-tight">This week’s exact deals live here</p>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-2 font-mono-label text-[11px] font-bold"
              >
                Call {PHONE_DISPLAY} <ArrowIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Standing offers */}
      <section className="px-5 sm:px-8 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-display text-4xl sm:text-5xl leading-[0.9] text-white">
            Always <span className="text-[#ebff4b]">on</span>
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {STANDING.map((s) => (
              <div key={s.name} className="reveal bg-[#050505] p-6 sm:p-8 flex flex-col">
                <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">{s.name}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed flex-1">{s.desc}</p>
                <NavAnchor href={s.href} className="u-link mt-6 inline-flex items-center gap-2 font-mono-label text-[11px] text-[#ebff4b]">
                  {s.cta} <ArrowIcon className="w-3.5 h-3.5" />
                </NavAnchor>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ActionBar />
      <PlayersClubPopup />
    </div>
  )
}
