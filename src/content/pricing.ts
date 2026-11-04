/* Walk-in pricing — from the in-venue price brochure. Edit here; the Attractions,
   Specials and Home pages all read from this file. */

export type BowlingRate = { day: string; before5: string; after5: string }

/* Per lane, per hour. Monday is omitted because the venue is closed Mondays
   (see HOURS in src/chrome.tsx) — the brochure lists $20 / $35. */
export const BOWLING_RATES: BowlingRate[] = [
  { day: 'Sunday', before5: '$30', after5: '$30' },
  { day: 'Tuesday', before5: '$2', after5: '$2' },
  { day: 'Wednesday', before5: '$20', after5: '$35' },
  { day: 'Thursday', before5: '$20', after5: '$35' },
  { day: 'Friday', before5: '$20', after5: '$45' },
  { day: 'Saturday', before5: '$45', after5: '$45' },
]

export const SHOE_RENTAL = '$5 per person'

export const ATTRACTION_PRICES = {
  bowling: { price: 'From $20', unit: 'per lane / hour', notes: ['Shoe rental $5 per person', '$2 lanes all day Tuesday'] },
  laserTag: { price: '$9', unit: 'per player', notes: ['10-minute game', 'Players must be 44" or taller'] },
  miniGolf: { price: '$8', unit: 'per player · 9 holes', notes: ['Ages 5 & under: $3'] },
  arcade: { price: 'Game cards', unit: 'any amount', notes: ['Spend $20, get $2 free play', 'Spend $50, get $10 free play', 'Spend $100, get $30 free play'] },
  mixedReality: { price: 'Ask us', unit: 'at the front desk', notes: [] as string[] },
}

export const ARCADE_BONUSES = [
  { spend: '$20', bonus: '$2' },
  { spend: '$50', bonus: '$10' },
  { spend: '$100', bonus: '$30' },
]

/* "Play With Your Food" — available all day, every day */
export const PLAY_WITH_FOOD = {
  items: ['Big Play Smashburger', 'Philly cheesesteak', 'Chicken tenders', 'Fajita quesadilla', 'Southwestern chicken salad'],
  combos: [
    { card: '$10 game card', price: '$19.99' },
    { card: '$20 game card', price: '$27.99' },
  ],
}

/* Weekly specials ("Happy Days!") keyed to getDay(): 0 = Sunday */
export type DailySpecial = { day: string; name: string; items: string[]; fine?: string; closed?: boolean }

export const WEEKLY_SPECIALS: DailySpecial[] = [
  { day: 'Sunday', name: 'Kids eat free', items: ['Kids 12 & under eat free with the purchase of an adult entrée'], fine: 'Some restrictions may apply.' },
  { day: 'Monday', name: 'Closed', items: ['Closed for private events'], closed: true },
  { day: 'Tuesday', name: '$2 Tuesday', items: ['$2 bowling (one hour)', '$2 domestic beers'] },
  { day: 'Wednesday', name: '½-price Wednesday', items: ['Half-price cocktails', 'Half-price arcade games'], fine: 'Excludes ultra-premium cocktails.' },
  { day: 'Thursday', name: '$5 Thursday', items: ['$5 wings', '$5 house wines', '$5 craft & imported beers'] },
  { day: 'Friday', name: 'Family night — $60', items: ['1 hour of bowling', '4 shoe rentals', 'One 2-topping pizza', '4 soft drinks'] },
  { day: 'Saturday', name: 'Open play all day', items: ['Open 11 AM – 11 PM', 'No daily special — the all-day deals below still apply'] },
]
