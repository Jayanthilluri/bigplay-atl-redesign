import { useRef, useState } from 'react'
import { PARTY_FAQS } from '../content/partyFaqs'
import {
  Header, photo, Footer, ActionBar, KineticLine, ArrowIcon, PlayersClubPopup,
  useReveal, useHeroParallax, useOpenStatus, BOOK_URL, PHONE_DISPLAY, PHONE_TEL,
} from '../chrome'
import PhotoSlider from '../components/PhotoSlider'

/* Real photos from Big Play ATL parties */
const GALLERY = [
  { src: '/photos/parties-room.webp', alt: 'Big Play party room set for a birthday, with “Party Time” balloons' },
  { src: '/photos/party-banner-wide.jpg', alt: 'Birthday party table under the Happy Birthday banner' },
  { src: '/photos/party-table-setup.jpg', alt: 'Party table set with hats, cups and plates' },
  { src: '/photos/party-kids-table.jpg', alt: 'Kids eating pizza at a birthday party' },
  { src: '/photos/party-birthday-pin.jpg', alt: 'Take-home birthday bowling pin' },
  { src: '/photos/party-host-kids.jpg', alt: 'Party host with birthday guests' },
  { src: '/photos/party-room-balloons.jpg', alt: 'Party area decorated with balloons' },
  { src: '/photos/party-banner-table.jpg', alt: 'Full party table with guests and banner' },
  { src: '/photos/party-table-host.jpg', alt: 'Host serving a birthday table' },
  { src: '/photos/party-cup-close.jpg', alt: 'Happy Birthday cup detail' },
]

/* Real content from birthday.bigplayatl.com — packages, prices, terms, reviews */

const STEPS = [
  { n: '01', name: 'Pick your package', desc: 'Four packages below — every one includes a dedicated party host, food, drinks and 90 minutes of play.' },
  { n: '02', name: 'Book your date online', desc: 'Check real-time availability and lock in your slot in about two minutes. Weekend and weekday slots available.' },
  { n: '03', name: 'Show up & celebrate', desc: 'Our team runs the whole party — setup, food, games, cleanup. You just bring the cake and the camera.' },
]

const INCLUDED = [
  'Dedicated party host',
  '2 pizzas',
  'Ice cream',
  'Soft drinks',
  'Paper supplies',
  '1,000 redemption points for the birthday child',
  'Up to 12 birthday guests',
  '90 minutes of hosted play',
]

const PACKAGES = [
  {
    medal: '🎳',
    name: 'Bowling Party',
    price: 350,
    tag: null,
    features: [
      'Hosted party on the lanes (90 min)',
      '1 hour of bowling on two lanes',
      '$20 play card + shoe rental per guest',
    ],
    addl: 15,
  },
  {
    medal: '🕹️',
    name: 'Arcade Package',
    price: 400,
    tag: null,
    features: [
      '$30 game card for each birthday guest',
      'Full access to the arcade floor',
      'Prize counter redemption time',
    ],
    addl: 30,
  },
  {
    medal: '🥈',
    name: 'Silver Package',
    price: 425,
    tag: null,
    features: [
      'Choice of TWO attractions',
      'Laser tag · arcade · mini golf',
      '$20 game card for each guest',
    ],
    addl: 35,
  },
  {
    medal: '🥇',
    name: 'Gold Package',
    price: 500,
    tag: 'Most popular',
    features: [
      'Choice of THREE attractions',
      'Laser tag · arcade · mini golf',
      '$25 game card for each guest',
    ],
    addl: 40,
  },
]

const COMPARE = [
  { label: 'Base price', values: ['$350', '$400', '$425', '$500'] },
  { label: 'Attractions included', values: ['1 hr bowling · 2 lanes', 'Arcade', 'Choice of TWO', 'Choice of THREE'] },
  { label: 'Game card per guest', values: ['$20', '$30', '$20', '$25'] },
  { label: 'Additional guest', values: ['$15', '$30', '$35', '$40'] },
  { label: 'Special inclusion', values: ['Shoe rental included', 'Biggest game card', 'Two-attraction mix', 'The full experience'] },
]

const UPGRADES = [
  { name: 'Add an hour of bowling', desc: 'For up to 12 people, shoe rental included — bolt onto any package.', price: '+$80' },
  { name: 'Add attractions', desc: 'Laser tag, mini golf and more can join any package, per guest.', price: '+$7 / guest' },
  { name: 'Extra food & drinks', desc: 'More from Woody’s kitchen — just ask our sales associate when booking.', price: 'Ask us' },
]


function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="reveal border-b border-white/10">
      <button
        className="w-full flex items-center justify-between gap-6 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-white/90 text-sm sm:text-base font-medium">{q}</span>
        <span className={`shrink-0 text-[#42b23c] text-xl transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-10 text-sm text-white/60 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Parties() {
  const heroImg = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImg)
  useReveal()
  const status = useOpenStatus()


  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />
      <main id="main">

      {/* ===== hero ===== */}
      <section className="relative h-[82svh] min-h-[540px] overflow-hidden flex items-end">
        <div ref={heroImg} className="absolute inset-0 -top-[20%] h-[140%]">
          <img {...photo('/photos/party-kids-pizza.jpg')} fetchPriority="high" alt="Kids celebrating a birthday party at Big Play ATL" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/45 to-[#050505]/30" />
        </div>
        <div className="relative px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-mono-label text-[10px] sm:text-xs text-[#ff8e4d] flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${status.open ? 'bg-[#42b23c] pulse-dot' : 'bg-[#ff8e4d]'}`} />
            Birthday parties · kids & teens · hosted start to finish
          </p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] mt-4 text-white">
            <KineticLine text="We do the work…" />{' '}
            <span className="text-[#42b23c]"><KineticLine text="You have the fun!" base={0.2} /></span>
          </h1>
          <p className="mt-5 max-w-xl text-white/70 text-sm sm:text-base leading-relaxed">
            Unforgettable fun for kids of all ages — arcade games, laser tag, private party
            rooms, and dedicated hosts who make your child’s birthday epic.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#42b23c] text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-white transition-colors"
            >
              Check dates & book <ArrowIcon />
            </a>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-mono-label text-xs px-7 py-4 hover:border-[#42b23c] hover:text-[#42b23c] transition-colors"
            >
              Talk to a party planner
            </a>
          </div>
        </div>
      </section>

      {/* ===== trust strip ===== */}
      <div className="border-y border-white/10 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto grid grid-cols-3 divide-x divide-white/10">
          {[
            ['$350', 'Packages from'],
            ['90 min', 'Hosted play'],
            ['12', 'Guests included'],
          ].map(([v, l]) => (
            <div key={l} className="reveal py-6 sm:py-8 text-center px-2">
              <p className="font-display text-3xl sm:text-5xl text-[#42b23c]">{v}</p>
              <p className="font-mono-label text-[9px] sm:text-[10px] text-white/50 mt-2">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== how it works ===== */}
      <section className="px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="reveal font-mono-label text-[10px] text-[#ff8e4d]">How it works</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white mt-2">
            Three steps to <span className="text-[#42b23c]">party hero</span>
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {STEPS.map((s) => (
              <div key={s.n} className="reveal bg-[#050505] p-6 sm:p-8">
                <p className="font-mono-label text-[10px] text-[#ff8e4d]">{s.n}</p>
                <h3 className="font-display text-2xl sm:text-3xl text-white mt-2">{s.name}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== every party includes ===== */}
      <section className="bg-[#42b23c] text-black px-5 sm:px-8 py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9]">
              Every party includes
            </h2>
            <p className="font-mono-label text-[10px] text-black/85 max-w-[240px] md:text-right">
              No hidden extras — this is the baseline for every single package
            </p>
          </div>
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
            {INCLUDED.map((inc) => (
              <li key={inc} className="reveal flex gap-2.5 text-sm sm:text-base font-medium">
                <span aria-hidden>✦</span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== gallery ===== */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="px-5 sm:px-8 max-w-6xl mx-auto flex items-end justify-between gap-6">
          <div>
            <p className="reveal font-mono-label text-[10px] text-[#ff8e4d]">Real parties, real photos</p>
            <h2 className="reveal font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white mt-2">
              Inside a <span className="text-[#42b23c]">Big Play party</span>
            </h2>
          </div>
        </div>
        <div className="reveal mt-10">
          <PhotoSlider slides={GALLERY} label="Party photo gallery" />
        </div>
      </section>

      {/* ===== packages ===== */}
      <section className="px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="reveal font-mono-label text-[10px] text-[#ff8e4d]">Party packages</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl md:text-6xl leading-[0.9] text-white mt-2">
            Pick your <span className="text-[#42b23c]">package</span>
          </h2>
          <p className="reveal mt-4 max-w-xl text-white/60 text-sm sm:text-base leading-relaxed">
            All packages include a dedicated party host and 90 minutes of play.
            Prices include gratuity — taxes not included.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PACKAGES.map((p) => (
              <article
                key={p.name}
                className={`reveal relative flex flex-col border p-6 sm:p-7 ${
                  p.tag
                    ? 'bg-[#42b23c] text-black border-[#42b23c]'
                    : 'bg-[#0d0d0d] border-white/10 hover:border-white/25 transition-colors'
                }`}
              >
                {p.tag && (
                  <span className="absolute -top-3 left-6 bg-black text-[#42b23c] font-mono-label text-[9px] font-bold px-3 py-1.5">
                    {p.tag}
                  </span>
                )}
                <p className="text-2xl" aria-hidden>{p.medal}</p>
                <h3 className={`font-display text-2xl sm:text-3xl mt-2 leading-tight ${p.tag ? 'text-black' : 'text-white'}`}>
                  {p.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className={`font-display text-5xl ${p.tag ? 'text-black' : 'text-[#42b23c]'}`}>
                    ${p.price}
                  </span>
                  <span className={`font-mono-label text-[10px] ${p.tag ? 'text-black/85' : 'text-white/60'}`}>
                    / party
                  </span>
                </p>
                <ul className={`mt-5 space-y-2.5 text-sm flex-1 ${p.tag ? 'text-black/80' : 'text-white/70'}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span aria-hidden>✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-4 font-mono-label text-[10px] ${p.tag ? 'text-black/85' : 'text-white/60'}`}>
                  +${p.addl} per additional guest
                </p>
                <a
                  href={BOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-5 inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono-label text-[11px] font-bold px-4 py-3.5 transition-colors ${
                    p.tag
                      ? 'bg-black text-[#42b23c] hover:bg-[#0d0d0d]'
                      : 'bg-[#42b23c] text-black hover:bg-white'
                  }`}
                >
                  Book {p.name.split(' ')[0]} — ${p.price} <ArrowIcon className="w-3.5 h-3.5" />
                </a>
              </article>
            ))}
          </div>

          {/* compare table */}
          <div className="reveal mt-14">
            <h3 className="font-display text-2xl sm:text-3xl text-white">Compare side-by-side</h3>
            <div tabIndex={0} role="region" aria-label="Package comparison table, scroll sideways" className="mt-5 overflow-x-auto border border-white/10">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="bg-[#0d0d0d] font-mono-label text-[10px] text-white/50">
                    <th className="text-left px-4 py-3.5 font-normal">Feature</th>
                    <th className="text-left px-4 py-3.5 font-normal">🎳 Bowling</th>
                    <th className="text-left px-4 py-3.5 font-normal">🕹️ Arcade</th>
                    <th className="text-left px-4 py-3.5 font-normal">🥈 Silver</th>
                    <th className="text-left px-4 py-3.5 font-normal text-[#42b23c]">🥇 Gold</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {COMPARE.map((row) => (
                    <tr key={row.label}>
                      <td className="px-4 py-3.5 text-white/50 font-mono-label text-[10px]">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className={`px-4 py-3.5 ${i === 3 ? 'text-[#42b23c]' : 'text-white/80'}`}>{v}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-4 py-3.5 text-white/50 font-mono-label text-[10px]">Food, drinks & host</td>
                    <td colSpan={4} className="px-4 py-3.5 text-white/80">Included in every package ✦</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* upgrades */}
          <div className="mt-14 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {UPGRADES.map((u) => (
              <div key={u.name} className="reveal bg-[#050505] p-6 sm:p-7">
                <p className="font-display text-3xl text-[#42b23c]">{u.price}</p>
                <h4 className="font-display text-xl text-white mt-2">{u.name}</h4>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>

          <p className="reveal mt-8 text-[11px] text-white/60 leading-relaxed max-w-3xl font-mono-label">
            All parties are 1 hour 30 minutes. No outside food or drink other than cake.
            We do not provide birthday cakes. Prices include gratuity but not taxes.
            Attractions may be substituted for a $10 game card.
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-5 sm:px-8 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <p className="reveal font-mono-label text-[10px] text-[#ff8e4d]">Questions</p>
          <h2 className="reveal font-display text-4xl sm:text-5xl leading-[0.9] text-white mt-2">
            Parents ask, <span className="text-[#42b23c]">we answer</span>
          </h2>
          <div className="mt-8 border-t border-white/10">
            {PARTY_FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
          <p className="reveal mt-6 text-sm text-white/50">
            Something else on your mind? Call{' '}
            <a href={PHONE_TEL} className="text-[#42b23c] u-link">{PHONE_DISPLAY}</a> — a real
            human from our events team will pick up.
          </p>
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="bg-[#42b23c] text-black px-5 sm:px-8 py-16 md:py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="reveal">
            <p className="font-mono-label text-[10px] text-black/85">Dates fill fast on weekends</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[0.9] mt-2">
              Ready to lock in your date?
            </h2>
            <p className="mt-4 max-w-md text-black/85 text-sm sm:text-base">
              Real-time availability, two-minute booking, and a party host who takes it from there.
            </p>
          </div>
          <div className="reveal flex flex-col sm:flex-row gap-3">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-black text-[#42b23c] font-mono-label text-xs font-bold px-7 py-4 hover:bg-[#0d0d0d] transition-colors"
            >
              Check dates & book <ArrowIcon />
            </a>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 border-black text-black font-mono-label text-xs font-bold px-7 py-4 hover:bg-black hover:text-[#42b23c] transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
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
