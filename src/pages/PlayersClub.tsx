import { useRef } from 'react'
import {
  Header, Footer, ActionBar, KineticLine, photo,
  useReveal, useHeroParallax, PLAYERS_CLUB_FORM_ID,
} from '../chrome'
import EmbedFrame from '../components/EmbedFrame'

const PERKS = [
  'Insider discounts & daily-special alerts',
  'First access to events & new attractions',
  'Birthday perks for your crew',
  'Members-only deals you won’t see anywhere else',
]

export default function PlayersClub() {
  const heroImg = useRef<HTMLDivElement>(null)
  useHeroParallax(heroImg)
  useReveal()

  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />
      <main id="main">

      {/* Hero */}
      <section className="relative h-[60svh] min-h-[440px] overflow-hidden flex items-end">
        <div ref={heroImg} className="absolute inset-0 -top-[20%] h-[140%]">
          <img {...photo('/photos/home-arcade.webp')} fetchPriority="high" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-[#050505]/30" />
        </div>
        <div className="relative px-5 sm:px-8 pb-12 max-w-6xl mx-auto w-full">
          <p className="font-mono-label text-[10px] sm:text-xs text-[#ff8e4d]">Free to join · No spam, just perks</p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.9] mt-4 text-white">
            <KineticLine text="Join the" />{' '}
            <span className="text-[#42b23c]"><KineticLine text="Player’s Club" base={0.15} /></span>
          </h1>
        </div>
      </section>

      {/* Perks + form */}
      <section className="px-5 sm:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
          <div className="reveal lg:sticky lg:top-24">
            <h2 className="font-display text-4xl sm:text-5xl leading-[0.9] text-white">
              VIP perks, <span className="text-[#42b23c]">straight to your inbox</span>
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed max-w-md">
              Sign up once and we’ll send you members-only deals, exclusive event invites and
              first dibs on our hottest specials.
            </p>
            <ul className="mt-6 space-y-3 text-white/85">
              {PERKS.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-[#42b23c]" aria-hidden>✦</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal bg-white rounded-sm overflow-hidden">
            <EmbedFrame
              src={`https://api.leadconnectorhq.com/widget/form/${PLAYERS_CLUB_FORM_ID}`}
              title="Join The V.I.P Club!"
              id={`inline-${PLAYERS_CLUB_FORM_ID}`}
              script="https://link.msgsndr.com/js/form_embed.js"
              className="min-h-[810px]"
              attrs={{
                'data-layout': "{'id':'INLINE'}",
                'data-trigger-type': 'alwaysShow',
                'data-trigger-value': '',
                'data-activation-type': 'alwaysActivated',
                'data-activation-value': '',
                'data-deactivation-type': 'neverDeactivate',
                'data-deactivation-value': '',
                'data-form-name': 'Join The V.I.P Club!',
                'data-height': '602',
                'data-layout-iframe-id': `inline-${PLAYERS_CLUB_FORM_ID}`,
                'data-form-id': PLAYERS_CLUB_FORM_ID,
              }}
            />
          </div>
        </div>
      </section>

      </main>
      <Footer />
      <ActionBar />
    </div>
  )
}
