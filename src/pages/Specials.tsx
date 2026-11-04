import { useRef } from 'react'
import {
  Header, Footer, ActionBar, KineticLine, ArrowIcon, NavAnchor, PlayersClubPopup, photo,
  useReveal, useHeroParallax, useOpenStatus, VIP_URL,
} from '../chrome'
import { WEEKLY_SPECIALS, PLAY_WITH_FOOD, ARCADE_BONUSES } from '../content/pricing'

const STANDING = [
  {
    name: 'Arcade bonus play',
    desc: ARCADE_BONUSES.map((b) => `Spend ${b.spend}, get ${b.bonus} free`).join(' · ') + '. Game cards are sold and reloaded at the red kiosks.',
    cta: 'See all prices',
    href: '/attractions',
  },
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
  const { today } = useOpenStatus()

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />
      <main id="main">

      {/* Hero */}
      <section className="relative h-[70svh] min-h-[480px] overflow-hidden flex items-end">
        <div ref={heroImg} className="absolute inset-0 -top-[20%] h-[140%]">
          <img {...photo('/photos/arcade-cards.jpg')} fetchPriority="high" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/30" />
        </div>
        <div className="relative px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-mono-label text-[10px] sm:text-xs text-[#ff8e4d]">Deals & weekly specials</p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] mt-4 text-white">
            <KineticLine text="Play more," />{' '}
            <span className="text-[#ebff4b]"><KineticLine text="pay less" base={0.15} /></span>
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            $2 Tuesdays, half-price Wednesdays, $5 Thursdays, Friday family night and kids eat
            free on Sundays — plus deals that run every day we’re open.
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
            <p className="hidden md:block font-mono-label text-[10px] text-white/60 max-w-[220px] text-right">
              Specials can change on holidays — call ahead if you’re planning around one
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {WEEKLY_SPECIALS.map((d, i) => {
              const isToday = today === i
              return (
                <div
                  key={d.day}
                  className={`reveal p-6 sm:p-8 ${isToday ? 'bg-[#ebff4b] text-black' : d.closed ? 'bg-[#0d0d0d]' : 'bg-[#050505]'}`}
                >
                  <p className={`font-mono-label text-[10px] ${isToday ? 'text-black/70' : 'text-[#ff8e4d]'}`}>
                    {d.day}{isToday ? ' · today' : ''}
                  </p>
                  <h3 className={`font-display text-2xl sm:text-3xl mt-2 ${isToday ? '' : d.closed ? 'text-white/60' : 'text-white'}`}>
                    {d.name}
                  </h3>
                  <ul className={`mt-3 space-y-1 text-sm leading-relaxed ${isToday ? 'text-black/80' : 'text-white/70'}`}>
                    {d.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  {d.fine && <p className={`mt-2 text-xs ${isToday ? 'text-black/70' : 'text-white/60'}`}>{d.fine}</p>}
                </div>
              )
            })}
            <div className="reveal bg-[#0d0d0d] p-6 sm:p-8 flex flex-col gap-3 lg:col-span-2">
              <p className="font-mono-label text-[10px] text-[#ff8e4d]">All day, every day</p>
              <h3 className="font-display text-2xl sm:text-3xl text-white">Play with your food</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {PLAY_WITH_FOOD.combos.map((c) => `${c.card} + meal for ${c.price}`).join(' or ')}. Choose from{' '}
                {PLAY_WITH_FOOD.items.join(', ')}.
              </p>
              <NavAnchor href="/eat" className="u-link self-start inline-flex items-center gap-2 font-mono-label text-[11px] text-[#ebff4b]">
                See the full menu <ArrowIcon className="w-3.5 h-3.5" />
              </NavAnchor>
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
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
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

      </main>

      <Footer />
      <ActionBar />
      <PlayersClubPopup />
    </div>
  )
}
