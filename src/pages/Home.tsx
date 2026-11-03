import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { PlayersClubPopup } from '../chrome'

/* ---------- content ---------- */

const BOOK_URL = 'https://bigplayusa.intercardinc.com/OnlineScheduler/home/NjU2OQ%3D%3D/l/1011'
const VIP_URL = 'https://bigplayatl.com/vip/'
const PHONE_DISPLAY = '(470) 359-5724'
const PHONE_TEL = 'tel:+14703595724'
const MAPS_URL = 'https://maps.app.goo.gl/WyT2gj3aWcTminr89'
const ADDRESS = '2480 Mt Vernon Rd, Dunwoody, GA 30338'

const CDN = 'https://pub-2b78141871694e5facc5a50443bed6f5.r2.dev'
const IMG = {
  logo: `${CDN}/2026/07/BP-logo-scaled.png`,
  hero: `${CDN}/2025/03/silhouettes-of-four-young-people-standing-by-bowli-2023-11-27-04-54-38-utc-scaled.jpg.webp`,
  bowling: `${CDN}/2025/03/atlanta-bowling-and-arcade-12.png.webp`,
  arcade: `${CDN}/2025/04/joyful-friends-playing-in-a-lively-arcade-environment.jpg.webp`,
  kidsArcade: `${CDN}/2025/04/young-boy-and-his-friends-playing-a-motorcycle-race-arcade-game.jpg.webp`,
  golf: `${CDN}/2025/04/mini-golf-yellow-ball-with-a-bat-at-sunset-2025-03-07-17-20-34-utc-scaled.jpg.webp`,
  vr: `${CDN}/2025/03/a-team-of-young-friends-using-virtual-reality-vr-e-2025-02-18-18-33-25-utc-scaled.jpg.webp`,
  vrSolo: `${CDN}/2025/03/man-vr-gaming-innovation-and-controller-for-metav-2023-11-27-04-58-38-utc-scaled.jpg.webp`,
  food: `${CDN}/2025/03/two-cheerful-adolescent-girls-eating-pizza-and-wat-2025-03-14-17-06-24-utc-1-scaled.jpg.webp`,
}

const HOURS: { day: string; open: number | null; close: number | null; label: string }[] = [
  { day: 'Sunday', open: 11, close: 22, label: '11 AM – 10 PM' },
  { day: 'Monday', open: null, close: null, label: 'Closed' },
  { day: 'Tuesday', open: 15, close: 22, label: '3 – 10 PM' },
  { day: 'Wednesday', open: 15, close: 22, label: '3 – 10 PM' },
  { day: 'Thursday', open: 15, close: 22, label: '3 – 10 PM' },
  { day: 'Friday', open: 15, close: 23, label: '3 – 11 PM' },
  { day: 'Saturday', open: 11, close: 23, label: '11 AM – 11 PM' },
]

const ATTRACTIONS = [
  { img: '/photos/bowl-action-man.jpg', tag: '16 lanes', name: 'Bowling', desc: 'Modern lanes, lounge seating, and lane-side food and drinks from Woody’s.' },
  { img: '/photos/race-kids.jpg', tag: 'All ages', name: 'Arcade', desc: 'Racing, shooters, classics and prize games — reloadable play cards, no tokens.' },
  { img: '/photos/golf-cube.jpg', tag: 'Glow in the dark', name: 'Glow mini-golf', desc: 'Our nostalgic 80s glow course. Nine holes of neon, music and bragging rights.' },
  { img: IMG.vr, tag: 'ValoArena', name: 'Mixed reality', desc: 'Heart-pumping adventures and mind-bending puzzles in immersive virtual worlds.' },
  { img: '/photos/laser-tag.jpg', tag: 'Multi-level arena', name: 'Laser tag', desc: 'Suit up for team battles in our glow arena. Every mission is a new story.' },
  { img: '/photos/woodys-dining.jpg', tag: 'Full kitchen & bar', name: 'Woody’s', desc: 'Chef-crafted burgers, loaded nachos and 32oz margaritas with every game on the screens.' },
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
    points: ['Lanes, tags & game cards', '32oz margaritas & shareables', 'Flexible group sizes'],
  },
  {
    name: 'Corporate & groups',
    desc: 'Team outings people actually want to attend. 42,000 square feet, five attractions and catering from Woody’s kitchen.',
    points: ['Team-building that isn’t trust falls', 'Food & beverage packages', 'Planned start to finish by our events team'],
    internal: true,
  },
]

const NAV = [
  { label: 'Attractions', href: '/attractions' },
  { label: 'Parties', href: '/parties' },
  { label: 'Group events', href: '/events' },
  { label: 'Specials', href: '/specials' },
  { label: 'Eat & drink', href: '/eat' },
  { label: 'Visit us', href: '/visit' },
]

/* ---------- hooks ---------- */

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const io = new IntersectionObserver(
      (entries) => {
        const batch = entries.filter((e) => e.isIntersecting)
        batch.forEach((entry, i) => {
          const el = entry.target as HTMLElement
          el.style.transitionDelay = `${0.1 + i * 0.15}s`
          el.classList.add('is-visible')
          io.unobserve(el)
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useOpenStatus() {
  const [status, setStatus] = useState<{ open: boolean; text: string }>({ open: false, text: '' })
  useEffect(() => {
    const now = new Date()
    const today = HOURS[now.getDay()]
    const h = now.getHours() + now.getMinutes() / 60
    if (today.open !== null && today.close !== null && h >= today.open && h < today.close) {
      const closeH = today.close > 12 ? today.close - 12 : today.close
      setStatus({ open: true, text: `Open now · until ${closeH} PM` })
    } else {
      // find next opening
      for (let i = 0; i < 7; i++) {
        const idx = (now.getDay() + i) % 7
        const d = HOURS[idx]
        if (d.open !== null && (i > 0 || h < (d.open as number))) {
          const openH = d.open > 12 ? d.open - 12 : d.open
          const when = i === 0 ? 'today' : d.day
          setStatus({ open: false, text: `Opens ${when} at ${openH} PM` })
          return
        }
      }
      setStatus({ open: false, text: 'Closed today' })
    }
  }, [])
  return status
}

function useHeroParallax(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          const y = Math.min(window.scrollY, window.innerHeight)
          ref.current.style.transform = `translate3d(0, ${y * 0.2}px, 0)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}

/* ---------- small pieces ---------- */

function KineticLine({ text, base = 0, className = '' }: { text: string; base?: number; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span className="kinetic-word" key={i} aria-hidden>
          <span style={{ animationDelay: `${base + i * 0.05}s` }}>{w}&nbsp;</span>
        </span>
      ))}
    </span>
  )
}

function ArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M1 8h13M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function TicketIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5v2M13 11v2M13 17v2" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- page ---------- */

export default function Home() {
  useReveal()
  const status = useOpenStatus()
  const heroImgRef = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImgRef)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen">
      {/* ===== header ===== */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 bg-gradient-to-b from-black/80 to-transparent">
          <a href="#top" className="flex items-center">
            <img src={IMG.logo} alt="Big Play Entertainment" className="h-9 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 font-mono-label text-[11px] text-white/90">
            {NAV.map((n) => (
              n.href.startsWith('/') ? (
                <Link key={n.href} to={n.href} className="u-link">
                  {n.label}
                </Link>
              ) : (
                <a key={n.href} href={n.href} className="u-link">
                  {n.label}
                </a>
              )
            ))}
            <a href={PHONE_TEL} className="u-link">
              {PHONE_DISPLAY}
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-[#ebff4b] text-black font-mono-label text-[11px] font-bold px-4 py-2.5 hover:bg-white transition-colors"
            >
              Book a party
            </a>
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#050505] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
            {NAV.map((n) => (
              n.href.startsWith('/') ? (
                <Link
                  key={n.href}
                  to={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-3xl text-white"
                >
                  {n.label}
                </Link>
              ) : (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-3xl text-white"
                >
                  {n.label}
                </a>
              )
            ))}
            <a href={PHONE_TEL} className="font-mono-label text-xs text-[#ebff4b] pt-2">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        )}
      </header>

      {/* ===== hero ===== */}
      <section id="top" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <div ref={heroImgRef} className="hero-parallax absolute inset-0 -top-[20%] h-[120%]">
          <img
            src="/photos/bowl-lanes-wide.jpg"
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
            ['7', 'days a week*'],
          ].map(([n, l]) => (
            <div key={l} className="reveal bg-[#050505] p-6">
              <div className="font-display text-4xl sm:text-5xl text-[#ebff4b]">{n}</div>
              <div className="mt-2 font-mono-label text-[10px] text-white/60">{l}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono-label text-[10px] text-white/35">*Closed Mondays for private events & deep cleans</p>
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
            <p className="font-mono-label text-[10px] text-white/40">Swipe →</p>
            <Link to="/attractions" className="u-link font-mono-label text-[10px] text-[#ebff4b]">View all →</Link>
          </div>
        </div>

        <div className="snap-gallery flex gap-4 overflow-x-auto px-5 sm:px-8 pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {ATTRACTIONS.map((a, i) => (
            <article key={a.name} className="reveal group shrink-0 w-[78vw] sm:w-[340px] md:w-auto">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d]">
                <img
                  src={a.img}
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
              Food, drink and play deals every day we’re open — and Player’s Club members get
              first dibs on the best ones.
            </p>
          </div>
          <div className="reveal flex flex-col sm:flex-row md:flex-col gap-3">
            <Link
              to="/specials"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-mono-label text-xs px-7 py-4 hover:border-[#ebff4b] hover:text-[#ebff4b] transition-colors"
            >
              See this week’s deals
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
              const isToday = new Date().getDay() === i
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

      {/* ===== footer ===== */}
      <footer className="border-t border-white/10 px-5 sm:px-8 pt-14 pb-32 md:pb-10 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <a href={BOOK_URL} target="_blank" rel="noreferrer" className="block group">
            <p className="font-display text-[13vw] md:text-8xl leading-[0.9] text-white group-hover:text-[#ebff4b] transition-colors">
              Let’s play <span className="text-[#ff8e4d] group-hover:text-white transition-colors">→</span>
            </p>
          </a>
          <div className="mt-10 flex flex-col md:flex-row justify-between gap-6 font-mono-label text-[10px] text-white/40">
            <div className="flex items-center gap-3">
              <img src={IMG.logo} alt="" className="h-7 w-auto" />
              <span>© {new Date().getFullYear()} Big Play Entertainment — redesign concept</span>
            </div>
            <div className="flex gap-6">
              {NAV.map((n) => (
                n.href.startsWith('/') ? (
                  <Link key={n.href} to={n.href} className="u-link text-white/60">
                    {n.label}
                  </Link>
                ) : (
                  <a key={n.href} href={n.href} className="u-link text-white/60">
                    {n.label}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ===== mobile action bar ===== */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#050505]/95 backdrop-blur border-t border-white/10 pb-safe">
        <div className="grid grid-cols-3">
          <a href={PHONE_TEL} className="flex flex-col items-center gap-1 py-3 text-white/80 active:text-[#ebff4b]">
            <PhoneIcon />
            <span className="font-mono-label text-[9px]">Call</span>
          </a>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 py-3 bg-[#ebff4b] text-black"
          >
            <TicketIcon />
            <span className="font-mono-label text-[9px] font-bold">Book</span>
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 py-3 text-white/80 active:text-[#ebff4b]"
          >
            <PinIcon />
            <span className="font-mono-label text-[9px]">Directions</span>
          </a>
        </div>
      </nav>

      <PlayersClubPopup />
    </div>
  )
}
