import { Header, Footer, ActionBar, PHONE_DISPLAY, PHONE_TEL, ADDRESS } from '../chrome'

/* Privacy Policy — carried over from bigplayatl.com/privacy-policy (effective
   Aug 7, 2026). Additions for the new site: Toast (event & catering inquiries),
   Intercard (party booking) and the browser-storage note in section 5.
   Have the business confirm any change to this text before launch. */

const PRIVACY_EMAIL = 'info@bigplayatl.com'

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl sm:text-3xl text-white">
        {n}. {title}
      </h2>
      <div className="mt-3 space-y-3 text-white/80 leading-relaxed">{children}</div>
    </section>
  )
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-[#42b23c]" aria-hidden>✦</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Privacy() {
  return (
    <div className="bg-[#050505] text-[#ededed] min-h-screen font-body">
      <Header />
      <main id="main" className="px-5 sm:px-8 pt-32 pb-20">
        <article className="max-w-3xl mx-auto">
          <p className="font-mono-label text-[11px] text-[#ff8e4d]">Legal</p>
          <h1 className="font-display text-5xl sm:text-7xl leading-[0.9] text-white mt-3">Privacy Policy</h1>
          <p className="mt-6 text-sm text-white/70">
            Effective date: August 7, 2026 · Last updated: November 12, 2026
          </p>
          <p className="mt-6 text-white/80 leading-relaxed">
            Big Play Entertainment (“we,” “our,” or “us”) respects your privacy and is committed
            to protecting the personal information you share with us. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit
            our website bigplayatl.com, interact with our online advertisements, or fill out lead
            generation forms (including through Meta, LinkedIn, GoHighLevel, and Toast).
          </p>

          <Section n={1} title="Information we collect">
            <p>
              We collect personal information that you voluntarily provide to us when inquiring
              about group bookings, corporate events, catering, VIP room buyouts, birthday
              parties, arcade, or bowling packages, or when you join the Player’s Club. This
              information may include:
            </p>
            <List
              items={[
                <><strong className="text-white">Contact data:</strong> full name, email address, phone number, and job title.</>,
                <><strong className="text-white">Event details:</strong> estimated guest count, target event dates and times, budget, and specific interest in venue amenities (e.g., The Green Room, catering, bowling).</>,
                <><strong className="text-white">Automated data:</strong> device IP address, browser type, operating system, and website usage data collected via cookies, Meta Pixels, and analytics tags.</>,
              ]}
            />
          </Section>

          <Section n={2} title="How we use your information">
            <p>We use the information collected for legitimate business purposes, including to:</p>
            <List
              items={[
                'Respond to corporate quote requests, catering, and event planning inquiries.',
                'Process reservations and event contracts through our booking platforms.',
                'Send automated booking confirmations, SMS alerts, and transactional communications.',
                'Send marketing communications, seasonal promotions, and Player’s Club offers (where you have explicitly opted in).',
                'Optimize our online advertising campaigns and measure website performance.',
              ]}
            />
          </Section>

          <Section n={3} title="Data sharing and third-party services">
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may
              share data with trusted service providers who assist us in operating our business
              and serving you, including:
            </p>
            <List
              items={[
                <><strong className="text-white">Customer relationship management (CRM):</strong> GoHighLevel (for inquiry processing, Player’s Club sign-ups, and customer automation).</>,
                <><strong className="text-white">Event and catering inquiries:</strong> Toast (inquiry forms on our Group Events page).</>,
                <><strong className="text-white">Booking engines:</strong> Meriq (bowling lane reservations), Intercard (party and event booking), and other official reservation platforms.</>,
                <><strong className="text-white">Advertising platforms:</strong> LinkedIn Campaign Manager and Meta Ads Manager (for lead form capture and campaign optimization).</>,
              ]}
            />
            <p>
              Forms and booking pages provided by these services are subject to their own privacy
              policies as well as ours. All third-party service providers are obligated to
              maintain the confidentiality and security of your personal data.
            </p>
          </Section>

          <Section n={4} title="SMS & email communications">
            <p>
              By providing your phone number and selecting opt-in boxes on our forms, you consent
              to receive transactional and promotional text messages from Big Play Entertainment.
              Message and data rates may apply. You may opt out of SMS communications at any time
              by replying STOP, or unsubscribe from marketing emails by clicking the
              “Unsubscribe” link in any email.
            </p>
          </Section>

          <Section n={5} title="Cookies and tracking technologies">
            <p>
              We use cookies, web beacons, and similar tracking tools (such as Google Analytics
              and Meta Pixels) to analyze website traffic and deliver targeted advertising. You
              can manage your cookie preferences through your web browser settings.
            </p>
            <p>
              Our website also stores a small preference in your browser’s local storage so the
              Player’s Club pop-up is not shown again for 30 days after you close it. This
              preference contains no personal information.
            </p>
          </Section>

          <Section n={6} title="Data security">
            <p>
              We implement appropriate technical and organizational security measures to protect
              your personal information against unauthorized access, alteration, disclosure, or
              destruction.
            </p>
          </Section>

          <Section n={7} title="Contact us">
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy or your
              personal data, please contact us:
            </p>
            <address className="not-italic border border-white/10 p-5 space-y-1">
              <p className="text-white font-semibold">Big Play Entertainment</p>
              <p>{ADDRESS}</p>
              <p>
                Email: <a href={`mailto:${PRIVACY_EMAIL}`} className="text-[#42b23c] u-link">{PRIVACY_EMAIL}</a>
              </p>
              <p>
                Phone: <a href={PHONE_TEL} className="text-[#42b23c] u-link">{PHONE_DISPLAY}</a>
              </p>
            </address>
          </Section>
        </article>
      </main>
      <Footer />
      <ActionBar />
    </div>
  )
}
