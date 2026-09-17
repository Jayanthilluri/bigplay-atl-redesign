import { useEffect, useRef, useState } from 'react'
import {
  Header, Footer, ActionBar, KineticLine, ArrowIcon, PhoneIcon,
  useReveal, useHeroParallax, BOOK_URL, PHONE_DISPLAY, PHONE_TEL, IMG,
} from '../chrome'

const STEPS = [
  { n: '01', name: 'Pick your party', desc: 'Choose a track below and check real-time availability online — it takes about two minutes.' },
  { n: '02', name: 'We plan everything', desc: 'Our dedicated events team handles the schedule, setup, food and fun from start to finish.' },
  { n: '03', name: 'You take the credit', desc: 'Show up, play hard, eat well. You bring the guests — we bring the unforgettable moments.' },
]

const TRACKS = [
  {
    img: IMG.kidsArcade,
    tag: 'Ages 4–12',
    name: 'Kids’ birthdays',
    desc: 'The easiest party you’ll ever plan. The kids disappear into games and glow golf while our team runs the show — you just bring the cake and the camera.',
    points: ['Play packages built for kids', 'Food & drinks from Woody’s kitchen', 'A host who runs the whole party', 'The birthday kid feels like a VIP'],
  },
  {
    img: IMG.hero,
    tag: 'Ages 13+',
    name: 'Teens & adults',
    desc: 'Birthdays, graduations, reunions — or just a Friday that deserves better. Bowling, laser tag battles and glow golf, with a full bar steps away.',
    points: ['Lanes, tags & game cards', '32oz margaritas & shareables', 'Flexible group sizes', 'Late-night weekend hours'],
  },
  {
    img: IMG.food,
    tag: 'Groups & teams',
    name: 'Corporate & groups',
    desc: 'Team outings people actually want to attend. 42,000 square feet, five attractions, and catering from Woody’s — team-building that isn’t trust falls.',
    points: ['Five attractions, one venue', 'Food & beverage packages', 'Planned start to finish by our events team', 'Easy booking for large groups'],
  },
]

const FAQS = [
  {
    q: 'How far in advance should we book?',
    a: 'Weekend slots fill up first, especially Saturday afternoons — booking two to four weeks out gives you the best choice of times. Check the online scheduler for real-time availability.',
  },
  {
    q: 'What’s included in a party package?',
    a: 'Packages bundle gameplay (bowling, arcade cards, laser tag or mini-golf depending on what you pick) with food and drinks from Woody’s, and our events team coordinates the whole thing. Exact inclusions depend on the package you choose — the scheduler shows full details before you commit.',
  },
  {
    q: 'Can we bring our own cake or decorations?',
    a: 'Most celebration touches can be accommodated — just note what you’re planning when you book, and our events team will confirm the details with you directly.',
  },
  {
    q: 'How many guests can we bring?',
    a: 'From small birthday crews to full-company takeovers — the venue is 42,000 square feet with five attractions, so groups of very different sizes work. Tell the events team your headcount and they’ll match you to the right setup.',
  },
  {
    q: 'What ages is this good for?',
    a: 'All of them. Younger kids love the arcade and glow golf, teens go hard on laser tag and mixed reality, and adults get bowling plus a full restaurant and bar. Mixed-age groups are genuinely our specialty.',
  },
  {
    q: 'Is a deposit required?',
    a: 'Booking details including any deposit are shown in the online scheduler before you confirm. Prefer to talk it through? Call our events team at (470) 359-5724.',
  },
]

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-white font-semibold text-base sm:text-lg">{q}</span>
        <span
          className={`shrink-0 w-8 h-8 border border-white/30 flex items-center justify-center text-[#ebff4b] transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-white/65 leading-relaxed text-sm sm:text-base max-w-2xl">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Parties() {
  useReveal()
  const heroImgRef = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImgRef)
  const [openFaq, setOpenFaq] = useState<number>(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Parties & Events — Big Play ATL | Redesign Concept'
  }, [])

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen">
      <Header />

      {/* ===== hero ===== */}
      <section className="relative min-h-[82svh] flex flex-col justify-end overflow-hidden">
        <div ref={heroImgRef} className="hero-parallax absolute inset-0 -top-[20%] h-[120%]">
          <img src={IMG.arcade} alt="Friends celebrating at Big Play ATL" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]/35" />

        <div className="relative z-10 px-5 sm:px-8 pb-16 pt-24 max-w-6xl">
          <p className="font-mono-label text-[11px] text-[#ff8e4d] mb-4">Parties & events · Dunwoody, GA</p>
          <h1 className="font-display leading-[0.9] text-[13vw] sm:text-7xl md:text-8xl text-white">
            <KineticLine text="Every" base={0.1} className="block" />
            <KineticLine text="celebration," base={0.25} className="block text-[#ebff4b]" />
            <KineticLine text="zero stress" base={0.4} className="block" />
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed">
            Birthdays, team outings and everything in between — planned start to finish by our
            events team, inside 42,000 square feet of games, lanes and really good food.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#ebff4b] text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-white transition-colors"
            >
              Check dates & book <ArrowIcon />
            </a>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-mono-label text-xs px-7 py-4 hover:border-[#ebff4b] hover:text-[#ebff4b] transition-colors"
            >
              <PhoneIcon className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ===== how it works ===== */}
      <section className="px-5 sm:px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <p className="reveal font-mono-label text-[11px] text-[#ff8e4d] mb-3">How it works</p>
        <h2 className="reveal font-display text-4xl sm:text-5xl text-white leading-[0.95] mb-10">
          Three steps to hero status
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {STEPS.map((s) => (
            <div key={s.n} className="reveal bg-[#050505] p-7">
              <div className="font-display text-5xl text-[#ebff4b]">{s.n}</div>
              <h3 className="mt-4 font-display text-2xl text-white">{s.name}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== tracks ===== */}
      <section className="px-5 sm:px-8 pb-16 md:pb-24 max-w-6xl mx-auto">
        <p className="reveal font-mono-label text-[11px] text-[#ff8e4d] mb-3">Pick your party</p>
        <h2 className="reveal font-display text-4xl sm:text-5xl text-white leading-[0.95] mb-10">
          Who are we celebrating?
        </h2>
        <div className="space-y-6">
          {TRACKS.map((t, i) => (
            <article
              key={t.name}
              className={`reveal grid md:grid-cols-2 border border-white/10 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden bg-[#0d0d0d]">
                <img src={t.img} alt={t.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#050505]/85 backdrop-blur font-mono-label text-[10px] text-[#ebff4b] px-3 py-1.5">
                  {t.tag}
                </span>
              </div>
              <div className="p-7 sm:p-10 flex flex-col justify-center">
                <h3 className="font-display text-3xl sm:text-4xl text-white">{t.name}</h3>
                <p className="mt-3 text-white/65 leading-relaxed text-sm sm:text-base">{t.desc}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-[#ebff4b]" aria-hidden>✦</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={BOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="u-link mt-6 inline-flex items-center gap-2 font-mono-label text-[11px] font-bold text-[#ebff4b] self-start"
                >
                  Check availability <ArrowIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-5 sm:px-8 py-16 md:py-24 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <p className="reveal font-mono-label text-[11px] text-[#ff8e4d] mb-3">Good to know</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl text-white leading-[0.95] mb-8">
            Questions parents actually ask
          </h2>
          <div className="reveal border-t border-white/10">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="bg-[#ebff4b] text-black px-5 sm:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-8 justify-between">
          <div>
            <h2 className="reveal font-display text-[11vw] sm:text-6xl leading-[0.9]">
              Ready to lock in <br className="hidden sm:block" /> your date?
            </h2>
            <p className="reveal mt-4 text-black/75 max-w-lg leading-relaxed">
              Saturday slots go first. Check availability online in two minutes — or call and
              we’ll build the party with you.
            </p>
          </div>
          <div className="reveal flex flex-col gap-3 shrink-0">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-black text-[#ebff4b] font-mono-label text-xs font-bold px-8 py-4 hover:bg-[#1a1a1a] transition-colors"
            >
              Book your event <ArrowIcon />
            </a>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 border-2 border-black text-black font-mono-label text-xs font-bold px-8 py-4 hover:bg-black hover:text-[#ebff4b] transition-colors"
            >
              <PhoneIcon className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ActionBar />
    </div>
  )
}
