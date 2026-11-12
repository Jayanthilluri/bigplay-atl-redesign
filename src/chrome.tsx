import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { PHOTO_SIZES } from './photos'

/* Internal router link for /parties (avoids full reload to a sub-route in static preview) */
const INTERNAL_ROUTES = ['/parties', '/events', '/attractions', '/specials', '/eat', '/visit', '/players-club']

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

/* Set to false on launch day to drop the "redesign concept" footer label. */
export const STAGING = true

export const BOOK_URL = 'https://bigplayusa.intercardinc.com/OnlineScheduler/home/NjU2OQ%3D%3D/l/1011'
export const VIP_URL = '/players-club'
/* Online lane reservations (Meriq) */
export const BOWLING_URL = 'https://reservations.meriq.com/bigplayentertainment/'
/* Group/corporate event inquiry form (Toast) */
export const EVENT_INQUIRY_URL =
  'https://www.toasttab.com/invoice/lead?rx=d768e2ae-dc93-4e01-812c-29a139decb4f&ot=8e2401b6-684c-4e77-aee1-59c5bad8b070&form=1'
/* Player's Club sign-up form (LeadConnector / GoHighLevel — same form as the old site) */
export const PLAYERS_CLUB_FORM_ID = 'aOyL3jjOgJE4dMDtOkDo'
export const SPECIALS_URL = 'https://bigplayatl.com/specials/'
export const PHONE_DISPLAY = '(470) 359-5724'
export const PHONE_TEL = 'tel:+14703595724'
export const MAPS_URL = 'https://maps.app.goo.gl/WyT2gj3aWcTminr89'
export const ADDRESS = '2480 Mt Vernon Rd, Dunwoody, GA 30338'

/* Responsive props for local photos: WebP, 800w/1600w srcset, intrinsic size (no layout shift).
   External URLs pass through unchanged. */
export function photo(src: string, sizes = '100vw') {
  const m = src.match(/^\/photos\/(.+)\.(?:jpg|webp)$/)
  if (!m) return { src }
  const [width, height] = PHOTO_SIZES[m[1]] ?? [undefined, undefined]
  return {
    src: `/photos/${m[1]}.webp`,
    srcSet: `/photos/${m[1]}-800.webp 800w, /photos/${m[1]}.webp 1600w`,
    sizes,
    width,
    height,
  }
}

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
  { label: 'Birthday parties', href: '/parties' },
  { label: 'Group events', href: '/events' },
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

/* The venue's clock, not the visitor's: everything is computed in Atlanta time. */
export const VENUE_TZ = 'America/New_York'
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function venueNow(date = new Date()): { day: number; hour: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: VENUE_TZ,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  return { day: WEEKDAYS.indexOf(get('weekday')), hour: Number(get('hour')) + Number(get('minute')) / 60 }
}

export function formatHour(h: number) {
  const suffix = h >= 12 && h < 24 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12} ${suffix}`
}

export function getOpenStatus(now: { day: number; hour: number }): { open: boolean; text: string } {
  const today = HOURS[now.day]
  if (today.open !== null && today.close !== null && now.hour >= today.open && now.hour < today.close) {
    return { open: true, text: `Open now · until ${formatHour(today.close)}` }
  }
  for (let i = 0; i < 7; i++) {
    const d = HOURS[(now.day + i) % 7]
    if (d.open !== null && (i > 0 || now.hour < d.open)) {
      const when = i === 0 ? 'today' : i === 1 ? 'tomorrow' : d.day
      return { open: false, text: `Closed now · opens ${when} at ${formatHour(d.open)}` }
    }
  }
  return { open: false, text: 'Closed today' }
}

/* `today` is null during prerender/first paint so server HTML and hydration match. */
export function useOpenStatus() {
  const [status, setStatus] = useState<{ open: boolean; text: string; today: number | null }>({
    open: false,
    text: '',
    today: null,
  })
  useEffect(() => {
    const update = () => {
      const now = venueNow()
      setStatus({ ...getOpenStatus(now), today: now.day })
    }
    update()
    const t = setInterval(update, 60_000)
    return () => clearInterval(t)
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

/* Hero video: poster image first (prerendered, fast), then the muted, looping
   professional facility video — 480p on phones, 720p elsewhere. Skipped entirely
   for visitors who ask for reduced motion. Includes a pause control (WCAG 2.2.2). */
export function HeroVideo({ alt }: { alt: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Lighter 480p file for small screens and data-saver mode; 720p otherwise.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const small = window.matchMedia('(max-width: 767px)').matches || conn?.saveData === true
    v.src = small ? '/video/hero-sm.mp4' : '/video/hero.mp4'
    v.play().catch(() => {})
  }, [])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <>
      <img src="/video/hero-poster.webp" alt={alt} fetchPriority="high" width={1280} height={720} className="absolute inset-0 w-full h-full object-cover" />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onLoadedData={() => setEnabled(true)}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'}`}
      />
      {enabled && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause background video' : 'Play background video'}
          className="absolute z-20 right-4 top-20 md:top-auto md:bottom-6 w-11 h-11 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          {playing ? (
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden><rect x="3" y="2" width="3.5" height="12" /><rect x="9.5" y="2" width="3.5" height="12" /></svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden><path d="M4 2l10 6-10 6z" /></svg>
          )}
        </button>
      )}
    </>
  )
}

/* ---------- small pieces ---------- */

export function KineticLine({ text, base = 0, className = '' }: { text: string; base?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span className="kinetic-word" key={i}>
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

export function BowlingIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="10" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="11.2" r="1.1" fill="currentColor" stroke="none" />
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

const POPUP_KEY = 'bp-popup-dismissed-at'
const POPUP_SNOOZE_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

function popupSnoozed() {
  try {
    const at = Number(localStorage.getItem(POPUP_KEY))
    return Number.isFinite(at) && at > 0 && Date.now() - at < POPUP_SNOOZE_MS
  } catch {
    return false
  }
}

/* Shows once the visitor is engaged (scrolled 40% of the page, or 25s on site),
   never on first paint, and stays away for 30 days after it's closed. */
export function PlayersClubPopup({ delay = 25_000 }: { delay?: number }) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (popupSnoozed()) return
    let shown = false
    const show = () => {
      if (shown) return
      shown = true
      setVisible(true)
      cleanup()
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max > 0.4) show()
    }
    const t = setTimeout(show, delay)
    window.addEventListener('scroll', onScroll, { passive: true })
    const cleanup = () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
    }
    return cleanup
  }, [delay])

  const dismiss = () => {
    try {
      localStorage.setItem(POPUP_KEY, String(Date.now()))
    } catch {
      /* storage blocked — popup simply may show again next visit */
    }
    setClosing(true)
    setTimeout(() => setVisible(false), 350)
  }

  useEffect(() => {
    if (!visible) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && dismiss()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible])

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
        className={`relative w-full sm:max-w-md bg-[#0d0d0d] border-t-2 sm:border-2 border-[#42b23c] p-6 sm:p-9 pb-safe transition-transform duration-350 ${closing ? 'translate-y-8 sm:translate-y-4' : 'translate-y-0'}`}
        style={{ transitionDuration: '350ms' }}
      >
        <button
          ref={closeRef}
          onClick={dismiss}
          aria-label="Close popup"
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center text-white/70 hover:text-[#42b23c] text-2xl leading-none"
        >
          ×
        </button>

        <p className="font-mono-label text-[10px] text-[#ff8e4d]">Free to join · No spam, just perks</p>
        <h2 className="font-display text-3xl sm:text-5xl leading-[0.9] text-white mt-3 pr-10">
          Join the <span className="text-[#42b23c]">Player’s Club</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-white/70 text-sm leading-relaxed">
          VIP access, members-only deals, exclusive event invites, and first dibs on our
          hottest specials — straight to your inbox.
        </p>
        <ul className="hidden sm:block mt-4 space-y-2 text-sm text-white/85">
          {['Insider discounts & daily-special alerts', 'First access to events & new attractions', 'Birthday perks for your crew'].map((p) => (
            <li key={p} className="flex gap-2">
              <span className="text-[#42b23c]" aria-hidden>✦</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <Link
          to={VIP_URL}
          onClick={dismiss}
          className="mt-5 sm:mt-6 flex items-center justify-center gap-2 whitespace-nowrap bg-[#42b23c] text-black font-mono-label text-[11px] sm:text-xs font-bold px-4 sm:px-6 py-4 hover:bg-white transition-colors"
        >
          Join the Player’s Club — free <ArrowIcon />
        </Link>
        <button
          onClick={dismiss}
          className="mt-2 w-full min-h-[44px] text-center font-mono-label text-[11px] text-white/70 hover:text-white py-2"
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-[#42b23c] focus:text-black focus:px-4 focus:py-3 font-mono-label text-xs"
      >
        Skip to content
      </a>
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 bg-gradient-to-b from-black/80 to-transparent">
        <Link to="/" className="flex items-center min-h-[44px]" aria-label="Big Play ATL home">
          <img src={IMG.logo} alt="Big Play Entertainment" className="h-7 sm:h-9 w-auto max-w-[150px] sm:max-w-none" width={186} height={36} />
        </Link>
        <nav className="hidden lg:flex items-center gap-5 2xl:gap-8 font-mono-label text-[10px] 2xl:text-[11px] text-white/90 whitespace-nowrap">
          {NAV.map((n) => (
            <NavAnchor key={n.href} href={n.href} className="u-link">
              {n.label}
            </NavAnchor>
          ))}
          <a href={PHONE_TEL} className="u-link hidden 2xl:inline">
            {PHONE_DISPLAY}
          </a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={BOWLING_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden xl:inline-flex items-center whitespace-nowrap min-h-[44px] border border-white/50 text-white font-mono-label text-[11px] font-bold px-4 hover:border-[#42b23c] hover:text-[#42b23c] transition-colors"
          >
            Reserve a lane
          </a>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center whitespace-nowrap min-h-[44px] bg-[#42b23c] text-black font-mono-label text-[11px] font-bold px-4 hover:bg-white transition-colors"
          >
            Book a party
          </a>
          <button
            className="lg:hidden p-2.5 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
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
        <div className="lg:hidden bg-[#050505] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {NAV.map((n) => (
            <NavAnchor key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="font-display text-3xl text-white">
              {n.label}
            </NavAnchor>
          ))}
          <NavAnchor href={VIP_URL} onClick={() => setMenuOpen(false)} className="font-display text-3xl text-white">
            Player’s Club
          </NavAnchor>
          <a
            href={BOWLING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[#42b23c] text-[#42b23c] font-mono-label text-xs font-bold px-5 py-3.5"
          >
            Reserve a bowling lane <ArrowIcon />
          </a>
          <a href={PHONE_TEL} className="font-mono-label text-xs text-[#42b23c] pt-1">
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
      <div className="grid grid-cols-4">
        <a href={PHONE_TEL} className="flex flex-col items-center gap-1 py-3 text-white/80 active:text-[#42b23c]">
          <PhoneIcon />
          <span className="font-mono-label text-[9px]">Call</span>
        </a>
        <a href={BOWLING_URL} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 bg-[#42b23c] text-black border-r border-black/20">
          <BowlingIcon />
          <span className="font-mono-label text-[9px] font-bold">Bowl</span>
        </a>
        <a href={BOOK_URL} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 bg-[#42b23c] text-black">
          <TicketIcon />
          <span className="font-mono-label text-[9px] font-bold">Party</span>
        </a>
        <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 py-3 text-white/80 active:text-[#42b23c]">
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
          <p className="font-display text-[13vw] md:text-8xl leading-[0.9] text-white group-hover:text-[#42b23c] transition-colors">
            Let’s play <span className="text-[#ff8e4d] group-hover:text-white transition-colors">→</span>
          </p>
        </a>
        <address className="mt-10 not-italic grid sm:grid-cols-3 gap-4 text-sm text-white/75">
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="u-link self-start">
            {ADDRESS}
          </a>
          <a href={PHONE_TEL} className="u-link self-start">
            {PHONE_DISPLAY}
          </a>
          <Link to="/visit" className="u-link self-start">
            Hours & directions
          </Link>
        </address>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={BOWLING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#42b23c] text-black font-mono-label text-[11px] font-bold px-5 py-3 hover:bg-white transition-colors"
          >
            Reserve a lane <ArrowIcon className="w-3.5 h-3.5" />
          </a>
          <Link
            to={VIP_URL}
            className="inline-flex items-center gap-2 border border-white/40 text-white font-mono-label text-[11px] font-bold px-5 py-3 hover:border-[#42b23c] hover:text-[#42b23c] transition-colors"
          >
            Join the Player’s Club
          </Link>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-6 font-mono-label text-[11px] text-white/60">
          <div className="flex items-center gap-3">
            <img src={IMG.logo} alt="" className="h-7 w-auto" width={145} height={28} />
            <span>© {new Date().getFullYear()} Big Play Entertainment{STAGING ? ' — redesign concept' : ''}</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1">
            {NAV.map((n) => (
              <NavAnchor key={n.href} href={n.href} className="u-link text-white/70 py-2">
                {n.label}
              </NavAnchor>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
