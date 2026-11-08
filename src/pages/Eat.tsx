import { useRef } from 'react'
import { FOOD, DRINKS, MENU_FINE_PRINT, type MenuSection, type Tag } from '../content/menu'
import {
  Header, photo, Footer, ActionBar, KineticLine, ArrowIcon, NavAnchor, PlayersClubPopup,
  useReveal, useHeroParallax, PHONE_DISPLAY, PHONE_TEL,
} from '../chrome'

/* Real photos from Woody’s kitchen & event catering */
const FOOD_GALLERY = [
  { src: '/photos/eat-margaritas.webp', alt: 'Friends with margaritas and beer at Woody’s' },
  { src: '/photos/eat-pizza.webp', alt: '16-inch pepperoni pizzas fresh from Woody’s kitchen' },
  { src: '/photos/eat-cocktails.webp', alt: 'Two watermelon signature cocktails' },
  { src: '/photos/eat-bar.webp', alt: 'A Woody’s bartender pouring a drink' },
  { src: '/photos/eat-dining.webp', alt: 'Woody’s dining room' },
  { src: '/photos/eat-beer-wine.webp', alt: 'A beer and a glass of wine at Woody’s' },
  { src: '/photos/food-sliders.jpg', alt: 'Pulled pork slider station with dipping sauces' },
  { src: '/photos/food-salmon.jpg', alt: 'Chargrilled salmon fresh from the kitchen' },
  { src: '/photos/food-fruit-platter.jpg', alt: 'Fresh fruit platter for a catered event' },
  { src: '/photos/food-hummus.jpg', alt: 'Hummus and veggie platter' },
  { src: '/photos/food-cupcakes.jpg', alt: 'Assorted cupcakes for a party' },
  { src: '/photos/food-cookies.jpg', alt: 'Chocolate chip and s’mores cookies' },
  { src: '/photos/food-mimosas.jpg', alt: 'Mimosas lined up for an event' },
  { src: '/photos/food-cocktails.jpg', alt: 'Signature cocktails on the bar at Woody’s' },
]

const TAG_LABEL: Record<Tag, string> = { V: 'Vegetarian', GF: 'Gluten-free option', FAV: 'House favorite' }

/* Colors from the printed Woody's menu. #42b23c is the menu green; text on white uses a
   deeper shade (#2b7a27) so it stays readable (WCAG AA). */
const MENU_GREEN = '#42b23c'

function TagBadges({ tags }: { tags?: Tag[] }) {
  if (!tags?.length) return null
  return (
    <>
      {tags.map((t) => (
        <span
          key={t}
          title={TAG_LABEL[t]}
          className={`ml-1.5 align-middle inline-flex items-center justify-center text-[10px] font-bold ${t === 'FAV' ? 'text-[#2b7a27]' : 'w-5 h-5 rounded-full border border-[#2b7a27] text-[#2b7a27]'}`}
        >
          {t === 'FAV' ? '♥' : t}
          <span className="sr-only"> ({TAG_LABEL[t]})</span>
        </span>
      ))}
    </>
  )
}

function MenuBlock({ section }: { section: MenuSection }) {
  return (
    <section id={section.id} className="scroll-mt-24 bg-white p-6 sm:p-8">
      <div className="flex items-baseline justify-between gap-4 border-b-2 pb-2" style={{ borderColor: MENU_GREEN }}>
        <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-[#2b7a27]">{section.title}</h3>
        {section.note && <p className="text-[11px] font-semibold uppercase tracking-wide text-[#231f20]/80 text-right">{section.note}</p>}
      </div>
      <ul className="mt-4 space-y-3.5">
        {section.items.map((it) => (
          <li key={it.name}>
            <div className="flex items-baseline gap-3">
              <span className="text-[#231f20] font-bold uppercase text-sm tracking-wide">
                {it.name}
                <TagBadges tags={it.tags} />
              </span>
              {it.price && (
                <>
                  <span className="flex-1 border-b border-dotted border-[#231f20]/25 translate-y-[-4px]" aria-hidden />
                  <span className="font-bold text-sm text-[#231f20] whitespace-nowrap">{it.price}</span>
                </>
              )}
            </div>
            {it.desc && <p className="mt-0.5 text-sm text-[#231f20]/75 leading-snug">{it.desc}</p>}
          </li>
        ))}
      </ul>
      {section.extras && (
        <ul className="mt-5 rounded-xl px-4 py-3 space-y-1 text-xs text-[#231f20]/85 italic" style={{ background: '#d7edc9' }}>
          {section.extras.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function Eat() {
  const heroImg = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImg)
  useReveal()


  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />
      <main id="main">

      {/* Hero */}
      <section className="relative h-[82svh] min-h-[520px] overflow-hidden flex items-end">
        <div ref={heroImg} className="absolute inset-0 -top-[20%] h-[140%]">
          <img {...photo('/photos/eat-hero.webp')} fetchPriority="high" alt="The entrance to Woody’s Restaurant & Bar inside Big Play" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/30" />
        </div>
        <div className="relative px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-mono-label text-[10px] sm:text-xs text-[#ff8e4d]">Woody’s Restaurant &amp; Bar</p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] mt-4 text-white">
            <KineticLine text="Fuel for" />{' '}
            <span className="text-[#42b23c]"><KineticLine text="the fun" base={0.15} /></span>
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            A real kitchen, not a snack bar. Woody’s keeps players fed and grown-ups happy —
            no need to leave the building when hunger hits.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 bg-[#42b23c] text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-white transition-colors"
            >
              See the menu <ArrowIcon />
            </a>
            <a
              href="/woodys-menu.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-mono-label text-xs px-7 py-4 hover:border-[#42b23c] hover:text-[#42b23c] transition-colors"
            >
              Download menu (PDF)
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
                  {w} <span className="text-[#42b23c]">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Menu */}
      <section id="menu" className="scroll-mt-16 px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white">
              On the <span className="text-[#42b23c]">menu</span>
            </h2>
            <a href="/woodys-menu.pdf" target="_blank" rel="noreferrer" className="u-link font-mono-label text-[11px] text-[#42b23c]">
              Download the printable menu (PDF)
            </a>
          </div>

          <nav aria-label="Menu sections" className="mt-8 flex flex-wrap gap-2">
            {[...FOOD, ...DRINKS].map((m) => (
              <a key={m.id} href={`#${m.id}`} className="font-mono-label text-[10px] border border-white/20 text-white/80 px-3 py-2.5 hover:border-[#42b23c] hover:text-[#42b23c]">
                {m.title}
              </a>
            ))}
          </nav>

          <div className="mt-10 bg-white rounded-sm overflow-hidden">
            <div className="bg-[#2b7a27] text-center py-6 px-4">
              <p className="font-display text-5xl sm:text-6xl text-[#fff200] tracking-wide leading-none">Woody’s</p>
              <p className="mt-1 text-white text-lg sm:text-xl font-bold tracking-[0.2em] uppercase">Restaurant &amp; Bar</p>
            </div>
            <div className="grid md:grid-cols-2 gap-px" style={{ background: '#d7edc9' }}>
              {FOOD.map((m) => (
                <MenuBlock key={m.id} section={m} />
              ))}
            </div>
            <div className="bg-[#2b7a27] text-center py-4 px-4">
              <p className="font-display text-4xl sm:text-5xl text-[#fff200] tracking-wide leading-none">Cocktails &amp; drinks</p>
            </div>
            <div className="grid md:grid-cols-2 gap-px" style={{ background: '#d7edc9' }}>
              {DRINKS.map((m) => (
                <MenuBlock key={m.id} section={m} />
              ))}
            </div>
            <div className="px-6 sm:px-8 py-5 space-y-2 text-xs text-[#231f20]/85 leading-relaxed" style={{ background: '#d7edc9' }}>
              {MENU_FINE_PRINT.map((t) => (
                <p key={t}>{t}</p>
              ))}
              <p>
                <span className="inline-flex w-5 h-5 rounded-full border border-[#2b7a27] text-[#2b7a27] text-[10px] font-bold items-center justify-center align-middle">V</span> Vegetarian ·{' '}
                <span className="text-[#2b7a27] font-bold">♥</span> House favorite · GF Gluten-free option
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-white/70">
            Kitchen hours can differ from attraction hours. Planning around a meal? Call{' '}
            <a href={PHONE_TEL} className="text-[#42b23c] u-link">{PHONE_DISPLAY}</a>.
          </p>
        </div>
      </section>

      {/* Food gallery */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="px-5 sm:px-8 max-w-6xl mx-auto flex items-end justify-between gap-6">
          <div>
            <p className="reveal font-mono-label text-[10px] text-[#ff8e4d]">Real plates, real events</p>
            <h2 className="reveal font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white mt-2">
              Fresh from the <span className="text-[#42b23c]">kitchen</span>
            </h2>
          </div>
          <p className="reveal hidden sm:block font-mono-label text-[10px] text-white/60">Swipe →</p>
        </div>
        <div tabIndex={0} role="region" aria-label="Food photo gallery, scroll sideways" className="reveal mt-10 flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 pb-4">
          {FOOD_GALLERY.map((g) => (
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

      {/* CTA band */}
      <section className="bg-[#42b23c] text-black px-5 sm:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="reveal">
            <p className="font-mono-label text-[10px] text-black/85">Parties &amp; events</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.9] mt-2">
              We cater the party too.
            </h2>
            <p className="mt-4 max-w-md text-black/85 text-sm sm:text-base">
              Every party package can include food straight from Woody’s kitchen — one less
              thing for you to carry.
            </p>
          </div>
          <div className="reveal flex flex-col sm:flex-row md:flex-col gap-3">
            <NavAnchor
              href="/parties"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-black text-[#42b23c] font-mono-label text-xs font-bold px-7 py-4 hover:bg-[#0d0d0d] transition-colors"
            >
              See party packages <ArrowIcon />
            </NavAnchor>
            <NavAnchor
              href="/events"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-black text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-black hover:text-[#42b23c] transition-colors"
            >
              Plan a group event <ArrowIcon />
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
