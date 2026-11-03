import { useEffect, useRef } from 'react'
import {
  Header, Footer, ActionBar, KineticLine, ArrowIcon, NavAnchor, PlayersClubPopup,
  useReveal, useHeroParallax, useOpenStatus, BOOK_URL, PHONE_DISPLAY, PHONE_TEL, IMG,
} from '../chrome'

/* Placeholder copy — final text to be provided by the client */

const ATTRACTIONS = [
  {
    img: '/photos/bowl-glow-girl.jpg',
    tag: '16 lanes',
    name: 'Bowling',
    desc: 'Sleek lanes, big screens, and music that keeps the energy up. Whether it’s a family grudge match or a league night with coworkers, this is the heart of Big Play.',
    points: ['Open bowling all week', 'Glow bowling after dark', 'Leagues & group rates'],
  },
  {
    img: '/photos/laser-tag.jpg',
    tag: 'Multi-level arena',
    name: 'Laser tag',
    desc: 'Suit up and step into the arena. Blacklights, fog, and heart-pounding rounds that turn friends into rivals — and rivals into legends.',
    points: ['Team & free-for-all modes', 'Great for groups & parties', 'Scoreboards for bragging rights'],
  },
  {
    img: '/photos/arcade-cards.jpg',
    tag: 'Arcade & prizes',
    name: 'The arcade',
    desc: 'Wall-to-wall games from retro classics to the newest releases. Rack up points, hit the prize counter, and leave with something to show for it.',
    points: ['Dozens of games for every age', 'Reloadable play cards', 'Prize counter for winners'],
  },
  {
    img: '/photos/glow-golf.jpg',
    tag: 'Glow course',
    name: 'Glow mini-golf',
    desc: 'Nine holes under the blacklights. A course that glows as hard as you play — easy enough for kids, competitive enough to start arguments.',
    points: ['All-ages friendly', 'Perfect date-night move', 'Included in party packages'],
  },
  {
    img: IMG.vr,
    tag: 'Immersive tech',
    name: 'Mixed reality',
    desc: 'The most futuristic thing in the building. Strap in, grab the controllers, and step into worlds that don’t fit in Dunwoody.',
    points: ['Latest immersive experiences', 'Solo & multiplayer', 'Staff-guided first sessions'],
  },
  {
    img: '/photos/woodys-dining.jpg',
    tag: 'Woody’s',
    name: 'Restaurant & bar',
    desc: 'Fuel for the fun. Woody’s kitchen serves the kind of food you actually look forward to — and a full bar for the grown-ups keeping score.',
    points: ['Full kitchen & bar', 'Family-friendly dining', 'See the Eat & drink page'],
    href: '/eat',
  },
]

export default function Attractions() {
  const heroImg = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImg)
  useReveal()
  const status = useOpenStatus()

  useEffect(() => {
    document.title = 'Attractions — Big Play ATL Redesign Concept'
  }, [])

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />

      {/* Hero */}
      <section className="relative h-[70svh] min-h-[480px] overflow-hidden flex items-end">
        <div ref={heroImg} className="absolute inset-0 -top-[20%] h-[140%]">
          <img src="/photos/bowl-hero-attr.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/30" />
        </div>
        <div className="relative px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-mono-label text-[10px] sm:text-xs text-[#ff8e4d] flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-[#ebff4b] pulse-dot' : 'bg-[#ff8e4d]'}`} />
            {status.text || '42,000 sq ft of play'}
          </p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] mt-4 text-white">
            <KineticLine text="Pick your" />{' '}
            <span className="text-[#ebff4b]"><KineticLine text="adventure" base={0.15} /></span>
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            Six ways to play under one roof — from classic lanes to mixed reality.
            Come for one, stay for all of them.
          </p>
        </div>
      </section>

      {/* Attraction rows */}
      <section className="px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
          {ATTRACTIONS.map((a, i) => (
            <article
              key={a.name}
              className={`reveal grid md:grid-cols-2 gap-8 md:gap-14 items-center ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="relative overflow-hidden group">
                <img
                  src={a.img}
                  alt={a.name}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#050505]/85 backdrop-blur px-3 py-1.5 font-mono-label text-[10px] text-[#ebff4b]">
                  {a.tag}
                </span>
              </div>
              <div>
                <p className="font-mono-label text-[10px] text-[#ff8e4d]">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white mt-2">
                  {a.name}
                </h2>
                <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed max-w-md">{a.desc}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/85">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-[#ebff4b]" aria-hidden>✦</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {'href' in a && a.href ? (
                  <NavAnchor href={a.href} className="u-link mt-6 inline-flex items-center gap-2 font-mono-label text-[11px] text-[#ebff4b]">
                    See what’s cooking <ArrowIcon className="w-3.5 h-3.5" />
                  </NavAnchor>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-[#ebff4b] text-black px-5 sm:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="reveal">
            <p className="font-mono-label text-[10px] text-black/60">Can’t pick just one?</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.9] mt-2">
              Play everything.
            </h2>
            <p className="mt-4 max-w-md text-black/70 text-sm sm:text-base">
              Build a day around it — or let us plan it for you. Parties and group packages
              bundle the best of the building.
            </p>
          </div>
          <div className="reveal flex flex-col sm:flex-row gap-3">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-black text-[#ebff4b] font-mono-label text-xs font-bold px-7 py-4 hover:bg-[#0d0d0d] transition-colors"
            >
              Book a party <ArrowIcon />
            </a>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 border-2 border-black text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-black hover:text-[#ebff4b] transition-colors"
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
