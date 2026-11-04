import { useRef } from 'react'
import { Link } from 'react-router'
import {
  Header, photo, Footer, ActionBar, KineticLine, ArrowIcon, PhoneIcon, PinIcon, PlayersClubPopup,
  useReveal, useOpenStatus, useHeroParallax, BOOK_URL, VIP_URL, PHONE_DISPLAY, PHONE_TEL, MAPS_URL, ADDRESS, HOURS, IMG,
} from '../chrome'

/* ---------- content ---------- */

const ATTRACTIONS = [
  { img: '/photos/bowl-action-man.jpg', tag: '16 lanes', name: 'Bowling', desc: 'Modern lanes, lounge seating, and lane-side food and drinks from Woody’s.' },
  { img: '/photos/race-kids.jpg', tag: 'All ages', name: 'Arcade', desc: 'Racing, shooters, classics and prize games — reloadable play cards, no tokens.' },
  { img: '/photos/golf-cube.jpg', tag: 'Glow in the dark', name: 'Glow mini-golf', desc: 'Our nostalgic 80s glow course. Nine holes of neon, music and bragging rights.' },
  { img: IMG.vr, tag: 'ValoArena', name: 'Mixed reality', desc: 'Heart-pumping adventures and mind-bending puzzles in immersive virtual worlds.' },
  { img: '/photos/laser-tag.jpg', tag: 'Multi-level arena', name: 'Laser tag', desc: 'Suit up for team battles in our glow arena. Every mission is a new story.' },
  { img: '/photos/woodys-dining.jpg', tag: 'Full kitchen & bar', name: 'Woody’s', desc: 'Smashburgers, wings, flatbreads and 18 oz margaritas — with every game on the screens.' },
]

const PARTY_TRACKS = [
  {
    name: 'Kids’ birthdays',
    desc: 'The easiest party you’ll ever plan. Game play, food, and a dedicated events team that handles every detail — you just bring the cake and the kids.',
    points: ['Play packages built for kids', 'Food & drinks from Woody’s', 'A host who runs the whole party'],
  },
  {
    name: 'Teens & adults',
    desc: 'Birthdays, graduations, reunions or just a Friday that deserves better. Bowling, laser tag battles and glow golf — with a full bar steps away.',
    points: ['Lanes, tags & game cards', '18 oz margaritas & shareables', 'Flexible group sizes'],
  },
  {
    name: 'Corporate & groups',
    desc: 'Team outings people actually want to attend. 42,000 square feet, five attractions and catering from Woody’s kitchen.',
    points: ['Team-building that isn’t trust falls', 'Food & beverage packages', 'Planned start to finish by our events team'],
    internal: true,
  },
]

/* ---------- page ---------- */

export default function Home() {
  useReveal()
  const status = useOpenStatus()
  const heroImgRef = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImgRef)

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen">
      <Header />
      <main id="main">
      {/* ===== hero ===== */}
      <section id="top" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <div ref={heroImgRef} className="hero-parallax absolute inset-0 -top-[20%] h-[120%]">
          <img
            {...photo('/photos/bowl-lanes-wide.jpg')} fetchPriority="high"
            alt="Friends bowling under neon lights at Big Play ATL"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/30" />

        <div className="relative z-10 px-5 sm:px-8 pb-28 md:pb-16 pt-24 max-w-6xl">
          <div className="flex items-center gap-2 mb-5">
            <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-[#ebff4b] pulse-dot' : 'bg-[#ff8e4d]'}`} />
            <span className="font-mono-label text-[11px] text-white/90">{status.text}</span>
            <span className="font-mono-label text-[11px] text-white/50">· Dunwoody, GA</span>
          </div>

          <h1 className="font-display leading-[0.9] text-[19vw] sm:text-7xl md:text-8xl lg:text-9xl text-white">
            <KineticLine text="Eat." base={0.1} className="block" />
            <KineticLine text="Play." base={0.25} className="block text-[#ebff4b]" />
            <KineticLine text="Win." base={0.4} className="block" />
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed">
            42,000 square feet of bowling, laser tag, arcade games, glow mini-golf and mixed
            reality — plus Woody’s full restaurant and bar. One roof. Zero boredom.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#ebff4b] text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-white transition-colors"
            >
              Book a party or event <ArrowIcon />
            </a>
            <a
              href="#attractions"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-mono-label text-xs px-7 py-4 hover:border-[#ebff4b] hover:text-[#ebff4b] transition-colors"
            >
              Explore the fun
            </a>
          </div>
        </div>
      </section>

      {/* ===== marquee ===== */}
      <div className="border-y border-white/10 py-3 overflow-hidden bg-[#0d0d0d]" aria-hidden>
        <div className="marquee-track font-display text-xl sm:text-2xl text-white/70">
          {[0, 1].map((r) => (
            <span key={r} className="flex shrink-0">
              {['Bowling', 'Laser tag', 'Arcade', 'Glow mini-golf', 'Mixed reality', 'Woody’s kitchen & bar'].map(
                (w) => (
                  <span key={w} className="flex items-center">
                    <span className="px-5">{w}</span>
                    <span className="text-[#ebff4b]">✦</span>
                  </span>
                )
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ===== intro / stats ===== */}
      <section className="px-5 sm:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <p className="reveal font-mono-label text-[11px] text-[#ff8e4d] mb-4">Now open in Dunwoody</p>
        <h2 className="reveal font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-white max-w-3xl">
          Atlanta’s ultimate entertainment playground
        </h2>
        <p className="reveal mt-5 max-w-2xl text-white/70 leading-relaxed">
          Big Play ATL packs five very different ways to play into one massive space. Come for
          dinner and stay for a game — or make a whole night of it. No reservations needed for
          open play; parties and groups book online in two minutes.
        </p>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {[
            ['42,000', 'square feet of fun'],
            ['16', 'modern bowling lanes'],
            ['5', 'attractions, one roof'],
            ['6', 'days a week'],
          ].map(([n, l]) => (
            <div key={l} className="reveal bg-[#050505] p-6">
              <div className="font-display text-4xl sm:text-5xl text-[#ebff4b]">{n}</div>
              <div className="mt-2 font-mono-label text-[10px] text-white/60">{l}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono-label text-[10px] text-white/60">Closed Mondays for private events & deep cleans</p>
      </section>

      {/* ===== attractions ===== */}
      <section id="attractions" className="py-16 md:py-24 border-t border-white/10">
        <div className="px-5 sm:px-8 max-w-6xl mx-auto flex items-end justify-between mb-8">
          <div>
            <p className="reveal font-mono-label text-[11px] text-[#ff8e4d] mb-3">01 — Attractions</p>
            <h2 className="reveal font-display text-4xl sm:text-5xl text-white leading-[0.95]">
              Pick your game
            </h2>
          </div>
          <div className="reveal hidden md:flex items-center gap-6">
            <p className="font-mono-label text-[10px] text-white/60">Swipe →</p>
            <Link to="/attractions" className="u-link font-mono-label text-[10px] text-[#ebff4b]">View all →</Link>
          </div>
        </div>

        <div tabIndex={0} role="region" aria-label="Attractions, scroll sideways" className="snap-gallery flex gap-4 overflow-x-auto px-5 sm:px-8 pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {ATTRACTIONS.map((a, i) => (
            <article key={a.name} className="reveal group shrink-0 w-[78vw] sm:w-[340px] md:w-auto">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d]">
                <img
                  {...photo(a.img, '(min-width: 768px) 33vw, 80vw')}
                  alt={a.name}
                  loading={i > 1 ? 'lazy' : undefined}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#050505]/85 backdrop-blur font-mono-label text-[10px] text-[#ebff4b] px-3 py-1.5">
                  {a.tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-white">{a.name}</h3>
              <p className="mt-1.5 text-sm text-white/60 leading-relaxed">{a.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== parties — acid block ===== */}
      <section id="parties" className="bg-[#ebff4b] text-black py-16 md:py-24">
        <div className="px-5 sm:px-8 max-w-6xl mx-auto">
          <p className="reveal font-mono-label text-[11px] mb-3 text-black/60">02 — Parties & events</p>
          <h2 className="reveal font-display text-[13vw] sm:text-6xl md:text-7xl leading-[0.9]">
            Every celebration, <br className="hidden sm:block" />
            zero stress
          </h2>
          <p className="reveal mt-5 max-w-2xl leading-relaxed text-black/80">
            You bring the guests — we bring the unforgettable moments. Our dedicated events team
            handles planning, setup, food and fun from start to finish.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-px bg-black border-2 border-black">
            {PARTY_TRACKS.map((t) => (
              <div key={t.name} className="reveal bg-[#ebff4b] p-6 sm:p-8 flex flex-col">
                <h3 className="font-display text-3xl">{t.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-black/75">{t.desc}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden>✦</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {'internal' in t && t.internal ? (
                  <Link
                    to="/events"
                    className="acid-link u-link mt-6 inline-flex items-center gap-2 font-mono-label text-[11px] font-bold self-start"
                  >
                    Explore group events <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <a
                    href={BOOK_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="acid-link u-link mt-6 inline-flex items-center gap-2 font-mono-label text-[11px] font-bold self-start"
                  >
                    Check availability <ArrowIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="reveal mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-black text-[#ebff4b] font-mono-label text-xs font-bold px-8 py-4 hover:bg-[#1a1a1a] transition-colors"
            >
              Book your event <ArrowIcon />
            </a>
            <Link
              to="/parties"
              className="acid-link u-link inline-flex items-center gap-2 font-mono-label text-[11px] font-bold text-black"
            >
              Explore party options & FAQs <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
            <span className="font-mono-label text-[11px] text-black/60">
              or talk to a human: <a href={PHONE_TEL} className="underline">{PHONE_DISPLAY}</a>
            </span>
          </div>
        </div>
      </section>

      {/* ===== specials strip ===== */}
      <section id="specials" className="py-16 md:py-20 px-5 sm:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end gap-8 justify-between">
          <div className="max-w-xl">
            <p className="reveal font-mono-label text-[11px] text-[#ff8e4d] mb-3">03 — Daily specials</p>
            <h2 className="reveal font-display text-4xl sm:text-5xl text-white leading-[0.95]">
              Big fun. Bigger savings. All week long.
            </h2>
            <p className="reveal mt-4 text-white/70 leading-relaxed">
              $2 bowling and $2 domestic beers on Tuesdays, half-price cocktails and arcade on
              Wednesdays, $5 Thursdays, a $60 Friday family night — and kids eat free on Sundays.
            </p>
          </div>
          <div className="reveal flex flex-col sm:flex-row md:flex-col gap-3">
            <Link
              to="/specials"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-mono-label text-xs px-7 py-4 hover:border-[#ebff4b] hover:text-[#ebff4b] transition-colors"
            >
              See all specials
            </Link>
            <a
              href={VIP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[#ebff4b] font-mono-label text-xs px-7 py-4 border border-[#ebff4b]/40 hover:bg-[#ebff4b] hover:text-black transition-colors"
            >
              Join the Player’s Club — free
            </a>
          </div>
        </div>
      </section>

      {/* ===== visit ===== */}
      <section id="visit" className="py-16 md:py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <p className="reveal font-mono-label text-[11px] text-[#ff8e4d] mb-3">04 — Visit us</p>
            <h2 className="reveal font-display text-4xl sm:text-5xl text-white leading-[0.95]">
              Find the fun
            </h2>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="reveal u-link mt-5 inline-flex items-center gap-2 text-lg text-white"
            >
              <PinIcon /> {ADDRESS}
            </a>
            <p className="reveal mt-2 text-white/60 text-sm">
              Free parking on site. Minutes from I-285 & GA-400.
            </p>
            <a
              href={PHONE_TEL}
              className="reveal u-link mt-4 inline-flex items-center gap-2 text-lg text-white"
            >
              <PhoneIcon /> {PHONE_DISPLAY}
            </a>
            <div className="reveal mt-5">
              <Link to="/visit" className="u-link font-mono-label text-[11px] text-[#ebff4b]">
                Hours, directions & contact →
              </Link>
            </div>
          </div>
          <div className="reveal border border-white/10">
            {HOURS.map((d, i) => {
              const isToday = status.today === i
              return (
                <div
                  key={d.day}
                  className={`flex justify-between px-5 py-3.5 text-sm border-b border-white/10 last:border-0 ${
                    isToday ? 'bg-[#ebff4b] text-black font-semibold' : 'text-white/75'
                  }`}
                >
                  <span className="font-mono-label text-[11px]">{d.day}{isToday ? ' · today' : ''}</span>
                  <span>{d.label}</span>
                </div>
              )
            })}
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
