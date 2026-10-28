import { useEffect, useRef } from 'react'
import {
  Header, Footer, ActionBar, KineticLine, ArrowIcon, NavAnchor, PlayersClubPopup,
  useReveal, useHeroParallax, PHONE_DISPLAY, PHONE_TEL,
} from '../chrome'

/* Real photos from Woody’s kitchen & event catering */
const FOOD_GALLERY = [
  { src: '/photos/food-sliders.jpg', alt: 'Pulled pork slider station with dipping sauces' },
  { src: '/photos/food-salmon.jpg', alt: 'Chargrilled salmon fresh from the kitchen' },
  { src: '/photos/food-fruit-platter.jpg', alt: 'Fresh fruit platter for a catered event' },
  { src: '/photos/food-hummus.jpg', alt: 'Hummus and veggie platter' },
  { src: '/photos/food-cupcakes.jpg', alt: 'Assorted cupcakes for a party' },
  { src: '/photos/food-cookies.jpg', alt: 'Chocolate chip and s’mores cookies' },
  { src: '/photos/food-mimosas.jpg', alt: 'Mimosas lined up for an event' },
  { src: '/photos/food-cocktails.jpg', alt: 'Signature cocktails on the bar at Woody’s' },
]

/* Placeholder menu — final items & prices to be provided by the client */

const MENU = [
  {
    cat: 'Shareables',
    note: 'Built for the lane, the table, or the lobby',
    items: ['Loaded nachos', 'Bone-in & boneless wings', 'Pretzel bites with cheese', 'Crispy chicken tenders'],
  },
  {
    cat: 'Pizza',
    note: 'Hand-tossed, hot out of the oven',
    items: ['Classic cheese', 'Pepperoni', 'Veggie supreme', 'Build your own'],
  },
  {
    cat: 'Burgers & mains',
    note: 'The serious hunger section',
    items: ['The Big Play burger', 'Grilled chicken sandwich', 'Cheeseburger sliders', 'Kids’ meals'],
  },
  {
    cat: 'Drinks & bar',
    note: 'Full bar for the grown-ups',
    items: ['Craft & domestic beer', 'Signature cocktails', 'Wine & seltzers', 'Sodas, lemonades & shakes'],
  },
]

export default function Eat() {
  const heroImg = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImg)
  useReveal()

  useEffect(() => {
    document.title = 'Woody’s Restaurant & Bar — Big Play ATL Redesign Concept'
  }, [])

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />

      {/* Hero */}
      <section className="relative h-[82svh] min-h-[520px] overflow-hidden flex items-end">
        <div ref={heroImg} className="absolute inset-0 -top-[20%] h-[140%]">
          <img src="/photos/food-fruit-platter.jpg" alt="Fresh catering spread from Woody’s kitchen" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/30" />
        </div>
        <div className="relative px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-mono-label text-[10px] sm:text-xs text-[#ff8e4d]">Woody’s Restaurant &amp; Bar</p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] mt-4 text-white">
            <KineticLine text="Fuel for" />{' '}
            <span className="text-[#ebff4b]"><KineticLine text="the fun" base={0.15} /></span>
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            A real kitchen, not a snack bar. Woody’s keeps players fed and grown-ups happy —
            no need to leave the building when hunger hits.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 bg-[#ebff4b] text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-white transition-colors"
            >
              Ask about today’s specials <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-white/10 overflow-hidden py-3 bg-[#0d0d0d]">
        <div className="marquee-track font-mono-label text-[10px] sm:text-xs text-white/50">
          {[0, 1].map((n) => (
            <span key={n} className="flex shrink-0">
              {['Full kitchen', 'Full bar', 'Family friendly', 'Party catering', 'Lane-side service'].map((w) => (
                <span key={w + n} className="mx-6 whitespace-nowrap">
                  {w} <span className="text-[#ebff4b]">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Menu preview */}
      <section className="px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white">
              On the <span className="text-[#ebff4b]">menu</span>
            </h2>
            <p className="font-mono-label text-[10px] text-white/40 max-w-[260px] md:text-right">
              Sample lineup — full menu with prices is on its way
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {MENU.map((m) => (
              <div key={m.cat} className="reveal bg-[#050505] p-6 sm:p-8">
                <h3 className="font-display text-2xl sm:text-3xl text-white">{m.cat}</h3>
                <p className="font-mono-label text-[10px] text-[#ff8e4d] mt-1">{m.note}</p>
                <ul className="mt-5 space-y-2.5 text-sm text-white/75">
                  {m.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="text-[#ebff4b]" aria-hidden>✦</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="reveal mt-8 text-sm text-white/50 max-w-2xl leading-relaxed">
            Kitchen hours can differ from attraction hours — especially on slower weeknights.
            Planning around a meal? Call <a href={PHONE_TEL} className="text-[#ebff4b] u-link">{PHONE_DISPLAY}</a> and
            we’ll confirm what’s cooking.
          </p>
        </div>
      </section>

      {/* Food gallery */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="px-5 sm:px-8 max-w-6xl mx-auto flex items-end justify-between gap-6">
          <div>
            <p className="reveal font-mono-label text-[10px] text-[#ff8e4d]">Real plates, real events</p>
            <h2 className="reveal font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white mt-2">
              Fresh from the <span className="text-[#ebff4b]">kitchen</span>
            </h2>
          </div>
          <p className="reveal hidden sm:block font-mono-label text-[10px] text-white/40">Swipe →</p>
        </div>
        <div className="reveal mt-10 flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 pb-4">
          {FOOD_GALLERY.map((g) => (
            <img
              key={g.src}
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-64 sm:h-80 md:h-96 w-auto shrink-0 snap-center border border-white/10 object-cover"
            />
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-[#ebff4b] text-black px-5 sm:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="reveal">
            <p className="font-mono-label text-[10px] text-black/60">Parties &amp; events</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.9] mt-2">
              We cater the party too.
            </h2>
            <p className="mt-4 max-w-md text-black/70 text-sm sm:text-base">
              Every party package can include food straight from Woody’s kitchen — one less
              thing for you to carry.
            </p>
          </div>
          <div className="reveal flex flex-col sm:flex-row md:flex-col gap-3">
            <NavAnchor
              href="/parties"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-black text-[#ebff4b] font-mono-label text-xs font-bold px-7 py-4 hover:bg-[#0d0d0d] transition-colors"
            >
              See party packages <ArrowIcon />
            </NavAnchor>
            <NavAnchor
              href="/events"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-black text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-black hover:text-[#ebff4b] transition-colors"
            >
              Plan a group event <ArrowIcon />
            </NavAnchor>
          </div>
        </div>
      </section>

      <Footer />
      <ActionBar />
      <PlayersClubPopup />
    </div>
  )
}
