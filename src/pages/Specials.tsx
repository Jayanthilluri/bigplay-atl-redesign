import { useRef } from 'react'
import {
  Header, Footer, ActionBar, KineticLine, ArrowIcon, NavAnchor, PlayersClubPopup, photo,
  useReveal, useHeroParallax, useOpenStatus, VIP_URL,
} from '../chrome'
import { WEEKLY_SPECIALS } from '../content/pricing'
import GameCardChart from '../components/GameCardChart'

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
    name: 'Party packages',
    desc: 'Birthday packages wrap play, food, and a dedicated host into one easy price.',
    cta: 'See party options',
    href: '/parties',
  },
]

export default function Specials() {
  const heroImg = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImg)
  useReveal()
  const { today } = useOpenStatus()

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />
      <main id="main">

      {/* Hero */}
      <section className="relative h-[70svh] min-h-[480px] overflow-hidden flex items-end">
        <div ref={heroImg} className="absolute inset-0 -top-[20%] h-[140%]">
          <img {...photo('/photos/specials-hero.webp')} fetchPriority="high" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/30" />
        </div>
        <div className="relative px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-mono-label text-[10px] sm:text-xs text-[#ff8e4d]">Deals & weekly specials</p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] mt-4 text-white">
            <KineticLine text="Big Play." />{' '}
            <span className="text-[#42b23c]"><KineticLine text="Big Value." base={0.15} /></span>
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            Kids eat free on Sundays, $2 Tuesdays, half-price Wednesdays, $5 Thursdays and a
            $60 Friday family night.
          </p>
        </div>
      </section>

      {/* Happy Days specials — vertical list with a photo of what's on special */}
      <section className="px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="reveal flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white">
              Happy Days <span className="text-[#42b23c]">Specials</span>
            </h2>
            <p className="hidden md:block font-mono-label text-[10px] text-white/60 max-w-[220px] text-right">
              Specials can change on holidays — call ahead if you’re planning around one
            </p>
          </div>

          <ol className="mt-10 space-y-4">
            {WEEKLY_SPECIALS.map((d) => {
              const isToday = today === d.dayIndex
              return (
                <li
                  key={d.day}
                  className={`reveal grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] overflow-hidden border ${isToday ? 'border-[#42b23c] border-2' : 'border-white/10'} bg-[#0d0d0d]`}
                >
                  <img
                    {...photo(d.img, '(min-width: 640px) 40vw, 100vw')}
                    alt={d.alt}
                    loading="lazy"
                    className="w-full h-48 sm:h-full object-cover"
                  />
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <p className="font-mono-label text-[11px] text-[#ff8e4d] flex items-center gap-2">
                      {d.day}
                      {isToday && <span className="bg-[#42b23c] text-black px-1.5 py-0.5 text-[9px] font-bold">TODAY</span>}
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl text-white mt-2">{d.name}</h3>
                    <ul className="mt-3 space-y-1 text-sm sm:text-base text-white/80">
                      {d.items.map((it) => (
                        <li key={it} className="flex gap-2">
                          <span className="text-[#42b23c]" aria-hidden>✦</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    {d.fine && <p className="mt-2 text-xs text-white/60">{d.fine}</p>}
                  </div>
                </li>
              )
            })}
          </ol>
          <p className="mt-4 text-xs text-white/60">Closed Mondays.</p>
        </div>
      </section>

      {/* Game card pricing */}
      <section id="game-cards" className="scroll-mt-20 px-5 sm:px-8 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="reveal">
            <p className="font-mono-label text-[10px] text-[#ff8e4d]">Arcade</p>
            <h2 className="font-display text-4xl sm:text-5xl leading-[0.9] text-white mt-2">
              Game card <span className="text-[#42b23c]">bonuses</span>
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-md">
              Load more, play more. Bonus play goes right on your card — and on Wednesdays
              arcade games are half price.
            </p>
          </div>
          <GameCardChart className="reveal" />
        </div>
      </section>

      {/* Standing offers */}
      <section className="px-5 sm:px-8 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal font-display text-4xl sm:text-5xl leading-[0.9] text-white">
            Always <span className="text-[#42b23c]">on</span>
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {STANDING.map((s) => (
              <div key={s.name} className="reveal bg-[#050505] p-6 sm:p-8 flex flex-col">
                <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">{s.name}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed flex-1">{s.desc}</p>
                <NavAnchor href={s.href} className="u-link mt-6 inline-flex items-center gap-2 font-mono-label text-[11px] text-[#42b23c]">
                  {s.cta} <ArrowIcon className="w-3.5 h-3.5" />
                </NavAnchor>
              </div>
            ))}
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
