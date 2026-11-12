/* Per-route SEO metadata + structured data.
   Used by the client (title updates on navigation) and by scripts/prerender.mjs
   (static <head> tags written into each page's HTML at build time). */

import { PARTY_FAQS } from './content/partyFaqs'

export const SITE_URL = 'https://bigplayatl.com'
export const SITE_NAME = 'Big Play ATL'
export const OG_IMAGE = '/og-image.jpg' // 1200×630 JPG — works on Facebook, LinkedIn, iMessage, Slack

export type PageMeta = { path: string; title: string; description: string }

export const PAGES: PageMeta[] = [
  {
    path: '/',
    title: 'Big Play ATL | Bowling, Arcade & Laser Tag in Dunwoody, GA',
    description:
      '16 lanes of boutique bowling, 75 arcade games, 80s mini golf, laser tag, Valo Arena and Woody’s Restaurant & Bar in Dunwoody, GA. Minutes from Perimeter.',
  },
  {
    path: '/attractions',
    title: 'Bowling, Laser Tag, Arcade & Mini Golf Prices | Big Play ATL',
    description:
      'Bowling from $20 per lane/hour ($2 Tuesdays), laser tag $9, 80s mini golf $8, arcade game card bonuses and Valo Arena — all under one roof in Dunwoody.',
  },
  {
    path: '/parties',
    title: 'Kids Birthday Parties in Dunwoody, GA | Big Play ATL',
    description:
      'Hosted birthday parties with bowling, laser tag, arcade and glow golf. Packages from $350 include a host, pizza, drinks and 90 minutes of play.',
  },
  {
    path: '/events',
    title: 'Corporate Events & Team Building in Dunwoody | Big Play ATL',
    description:
      'Team building, holiday parties and group events near Perimeter Center: bowling, laser tag, Woody’s catering and a full bar. Request a quote online.',
  },
  {
    path: '/specials',
    title: '$2 Tuesday Bowling & Weekly Specials | Big Play ATL Dunwoody',
    description:
      '$2 bowling and $2 domestic beers on Tuesdays, half-price cocktails and arcade on Wednesdays, $5 Thursdays, $60 Friday family night and kids eat free on Sundays.',
  },
  {
    path: '/eat',
    title: 'Woody’s Restaurant & Bar Menu | Big Play ATL Dunwoody',
    description:
      'Woody’s full menu with prices: smashburgers, wings, flatbreads, 16" pizza, salmon and steak, plus cocktails, 18 oz margaritas, beer and wine.',
  },
  {
    path: '/visit',
    title: 'Hours & Directions | Big Play ATL, Dunwoody, GA',
    description:
      'Big Play ATL hours, address and directions: 2480 Mt Vernon Rd, Dunwoody, GA 30338. Free on-site parking, minutes from I-285 and GA-400. Call (470) 359-5724.',
  },
]

PAGES.push({
  path: '/players-club',
  title: 'Join the Player’s Club — VIP Deals | Big Play ATL',
  description:
    'Free to join: members-only deals, daily-special alerts, birthday perks and first access to events at Big Play ATL in Dunwoody, GA.',
})

PAGES.push({
  path: '/privacy-policy',
  title: 'Privacy Policy | Big Play ATL',
  description:
    'How Big Play Entertainment collects, uses and protects the information you share through our website, booking and inquiry forms, and Player’s Club.',
})

PAGES.push(
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | Big Play ATL',
    description: 'Terms of use for the Big Play ATL website, bigplayatl.com, operated by Big Play Entertainment in Dunwoody, GA.',
  },
  {
    path: '/accessibility',
    title: 'Accessibility Statement | Big Play ATL',
    description: 'Big Play Entertainment’s commitment to an accessible website and venue, how to get help, and how to share accessibility feedback.',
  },
)

export const NOT_FOUND: PageMeta = {
  path: '/404',
  title: 'Page not found | Big Play ATL',
  description: 'This page doesn’t exist. Find bowling, laser tag, parties and more at Big Play ATL in Dunwoody, GA.',
}

export function metaFor(path: string): PageMeta {
  const clean = path.replace(/\/+$/, '') || '/'
  return PAGES.find((p) => p.path === clean) ?? NOT_FOUND
}

/* schema.org LocalBusiness data — keep in sync with HOURS in chrome.tsx */
export const BUSINESS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'EntertainmentBusiness',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  telephone: '+1-470-359-5724',
  priceRange: '$$',
  hasMenu: `${SITE_URL}/eat`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2480 Mt Vernon Rd',
    addressLocality: 'Dunwoody',
    addressRegion: 'GA',
    postalCode: '30338',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'], opens: '15:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '15:00', closes: '23:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '11:00', closes: '23:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '11:00', closes: '22:00' },
  ],
  amenityFeature: ['Bowling', 'Laser tag', 'Arcade', '80s mini golf', 'Valo Arena mixed reality', 'Restaurant & bar'].map((name) => ({
    '@type': 'LocationFeatureSpecification',
    name,
    value: true,
  })),
}

export function jsonLdFor(path: string): object[] {
  const out: object[] = [BUSINESS_JSONLD]
  if (path === '/parties') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: PARTY_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  return out
}
