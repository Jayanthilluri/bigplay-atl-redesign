import { useEffect, useState } from 'react'
import { Link } from 'react-router'

/* Internal router link for /parties (avoids full reload to a sub-route in static preview) */
const INTERNAL_ROUTES = ['/parties', '/attractions', '/specials', '/eat', '/visit']

export function NavAnchor({ href, className, children, onClick }: { href: string; className?: string; children: React.ReactNode; onClick?: () => void }) {
  if (INTERNAL_ROUTES.includes(href)) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  )
}

/* Shared constants, hooks and chrome (header/footer/action bar) for Big Play ATL redesign */

export const BOOK_URL = 'https://bigplayusa.intercardinc.com/OnlineScheduler/home/NjU2OQ%3D%3D/l/1011'
export const VIP_URL = 'https://bigplayatl.com/vip/'
export const SPECIALS_URL = 'https://bigplayatl.com/specials/'
export const PHONE_DISPLAY = '(470) 359-5724'
export const PHONE_TEL = 'tel:+14703595724'
export const MAPS_URL = 'https://maps.app.goo.gl/WyT2gj3aWcTminr89'
export const ADDRESS = '2480 Mt Vernon Rd, Dunwoody, GA 30338'

export const CDN = 'https://pub-2b78141871694e5facc5a50443bed6f5.r2.dev'
export const IMG = {
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

export const HOURS: { day: string; open: number | null; close: number | null; label: string }[] = [
  { day: 'Sunday', open: 11, close: 22, label: '11 AM – 10 PM' },
  { day: 'Monday', open: null, close: null, label: 'Closed' },
  { day: 'Tuesday', open: 15, close: 22, label: '3 – 10 PM' },
  { day: 'Wednesday', open: 15, close: 22, label: '3 – 10 PM' },
  { day: 'Thursday', open: 15, close: 22, label: '3 – 10 PM' },
  { day: 'Friday', open: 15, close: 23, label: '3 – 11 PM' },
  { day: 'Saturday', open: 11, close: 23, label: '11 AM – 11 PM' },
]

export const NAV = [
  { label: 'Attractions', href: '/attractions' },
  { label: 'Parties & events', href: '/parties' },
  { label: 'Specials', href: '/specials' },
  { label: 'Eat & drink', href: '/eat' },
  { label: 'Visit us', href: '/visit' },
]

/* ---------- hooks ---------- */

export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'))
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

export function useOpenStatus() {
  const [status, setStatus] = useState<{ open: boolean; text: string }>({ open: false, text: '' })
  useEffect(() => {
    const now = new Date()
    const today = HOURS[now.getDay()]
    const h = now.getHours() + now.getMinutes() / 60
    if (today.open !== null && today.close !== null && h >= today.open && h < today.close) {
      const closeH = (today.close as number) > 12 ? (today.close as number) - 12 : today.close
      setStatus({ open: true, text: `Open now · until ${closeH} PM` })
    } else {
      for (let i = 0; i < 7; i++) {
        const idx = (now.getDay() + i) % 7
        const d = HOURS[idx]
        if (d.open !== null && (i > 0 || h < (d.open as number))) {
          const openH = (d.open as number) > 12 ? (d.open as number) - 12 : d.open
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

export function useHeroParallax(ref: React.RefObject<HTMLElement | null>) {
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

export function KineticLine({ text, base = 0, className = '' }: { text: string; base?: number; className?: string }) {
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

export function ArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M1 8h13M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PhoneIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function TicketIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5v2M13 11v2M13 17v2" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- Player's Club popup ---------- */

export function PlayersClubPopup({ delay = 2500 }: { delay?: number }) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('bp-popup-dismissed')) return
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const dismiss = () => {
    sessionStorage.setItem('bp-popup-dismissed', '1')
    setClosing(true)
    setTimeout(() => setVisible(false), 350)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center transition-opacity duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      role="dialog"
      aria-modal="true"
      aria-label="Join the Player's Club"
    >
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-default"
        onClick={dismiss}
        aria-label="Close"
        tabIndex={-1}
      />
      {/* panel */}
      <div
        className={`relative w-full sm:max-w-md bg-[#0d0d0d] border-t-2 sm:border-2 border-[#ebff4b] p-7 sm:p-9 pb-safe transition-transform duration-350 ${closing ? 'translate-y-8 sm:translate-y-4' : 'translate-y-0'}`}
        style={{ transitionDuration: '350ms' }}
      >
        <button
          onClick={dismiss}
          aria-label="Close popup"
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center text-white/70 hover:text-[#ebff4b] text-2xl leading-none"
        >
          ×
        </button>

        <p className="font-mono-label text-[10px] text-[#ff8e4d]">Free to join · No spam, just perks</p>
        <h2 className="font-display text-4xl sm:text-5xl leading-[0.9] text-white mt-3">
          Join the <span className="text-[#ebff4b]">Player’s Club</span>
        </h2>
        <p className="mt-4 text-white/70 text-sm leading-relaxed">
          VIP access, members-only deals, exclusive event invites, and first dibs on our
          hottest specials — straight to your inbox.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-white/85">
          {['Insider discounts & daily-special alerts', 'First access to events & new attractions', 'Birthday perks for your crew'].map((p) => (
            <li key={p} className="flex gap-2">
              <span className="text-[#ebff4b]" aria-hidden>✦</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <a
          href={VIP_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex items-center justify-center gap-2 whitespace-nowrap bg-[#ebff4b] text-black font-mono-label text-[10px] sm:text-xs font-bold px-4 sm:px-6 py-4 hover:bg-white transition-colors"
        >
          Join the Player’s Club — free <ArrowIcon />
        </a>
        <button
          onClick={dismiss}
          className="mt-3 w-full text-center font-mono-label text-[10px] text-white/40 hover:text-white/70 py-2"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}

/* ---------- chrome ---------- */

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 bg-gradient-to-b from-black/80 to-transparent">
        <a href="/" className="flex items-center">
          <img src={IMG.logo} alt="Big Play Entertainment" className="h-9 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 font-mono-label text-[11px] text-white/90">
          {NAV.map((n) => (
            <NavAnchor key={n.href} href={n.href} className="u-link">
              {n.label}
            </NavAnchor>
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
      {menuOpen && (
        <div className="md:hidden bg-[#050505] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {NAV.map((n) => (
            <NavAnchor key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="font-display text-3xl text-white">
              {n.label}
            </NavAnchor>
          ))}
          <a href={PHONE_TEL} className="font-mono-label text-xs text-[#ebff4b] pt-2">
            Call {PHONE_DISPLAY}
          </a>
        </div>
      )}
    </header>
  )
}

export function ActionBar() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#050505]/95 backdrop-blur border-t border-white/10 pb-safe">
      <div className="grid grid-cols-3">
        <a href={PHONE_TEL} className="flex flex-col items-center gap-1 py-3 text-white/80 active:text-[#ebff4b]">
          <PhoneIcon />
          <span className="font-mono-label text-[9px]">Call</span>
        </a>
        <a href={BOOK_URL} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 bg-[#ebff4b] text-black">
          <TicketIcon />
          <span className="font-mono-label text-[9px] font-bold">Book</span>
        </a>
        <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 text-white/80 active:text-[#ebff4b]">
          <PinIcon />
          <span className="font-mono-label text-[9px]">Directions</span>
        </a>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
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
              <NavAnchor key={n.href} href={n.href} className="u-link text-white/60">
                {n.label}
              </NavAnchor>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
