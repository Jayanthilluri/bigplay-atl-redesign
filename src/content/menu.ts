/* Woody's Restaurant & Bar menu — transcribed from Woodys_Menu.pdf.
   The printable PDF lives at public/woodys-menu.pdf; update both together. */

export type Tag = 'V' | 'GF' | 'FAV'
export type MenuItem = { name: string; price?: string; desc?: string; tags?: Tag[] }
export type MenuSection = { id: string; title: string; note?: string; items: MenuItem[]; extras?: string[] }

export const FOOD: MenuSection[] = [
  {
    id: 'starters',
    title: 'Starters',
    items: [
      { name: 'Pulled pork cheese fries', price: '13', desc: 'Pulled pork, BBQ sauce, queso, chives' },
      { name: 'Hummus & feta', price: '13', desc: 'Chickpea hummus with feta crumbles, heirloom carrots, assorted veggies, EVOO, grilled pita', tags: ['V'] },
      { name: 'Wings', price: '14', desc: 'Buffalo, lemon pepper, BBQ, teriyaki or Thai chili' },
      { name: 'Blackened chicken nachos', price: '15', desc: 'Tortilla chips stacked with queso, pico de gallo, black beans, guacamole, sour cream, jalapeños' },
      { name: 'Dip duo', price: '10', desc: 'Queso & salsa served with tortilla chips', tags: ['V'] },
      { name: 'Tuna poke', price: '10', desc: 'Served in wonton cups' },
      { name: 'Spinach & artichoke dip', price: '12', desc: 'Served with tortilla chips', tags: ['V'] },
      { name: 'Fajita quesadilla', price: '12', desc: 'Diced chicken breast, bell pepper, onion, cheddar, Monterey Jack, served with salsa and sour cream' },
      { name: 'Chicken tenders', price: '12', desc: 'Grilled or crispy, served with BBQ or honey mustard' },
    ],
  },
  {
    id: 'salads',
    title: 'Salads',
    items: [
      { name: 'Grilled chicken Caesar', price: '14', desc: 'Romaine, shaved Parmesan, garlic croutons, Caesar dressing' },
      { name: 'Southwestern chicken', price: '15', desc: 'Romaine, black beans, avocado, grilled corn, pico de gallo, cheese, served in a tortilla bowl', tags: ['FAV'] },
      { name: 'Strawberry goat cheese', price: '15', desc: 'Spring mix, cherry tomato, cucumber, candied pecans, citrus vinaigrette', tags: ['V'] },
      { name: 'Watermelon feta', price: '14', desc: 'Watermelon, feta, mint, basil, cucumber, red onion, citrus vinaigrette', tags: ['V'] },
    ],
    extras: [
      'Substitute salmon +6 or shrimp +3 on any chicken salad',
      'Add-ons: grilled chicken 6 · Atlantic salmon 12 · jumbo shrimp 9',
      'Dressings: homemade ranch, bleu cheese, citrus vinaigrette, Caesar',
    ],
  },
  {
    id: 'smashburgers',
    title: 'Woody’s smashburgers',
    note: 'Two smashed patties, served with fries or a side salad',
    items: [
      { name: 'Big Play classic smash', price: '14', desc: 'Plain and simple with American cheese' },
      { name: 'Big Play smashburger', price: '15', desc: 'American cheese, diced onion, lettuce, pickles, Big Play sauce', tags: ['FAV'] },
      { name: 'Spicy jalapeño', price: '16', desc: 'Chipotle mayo, pepper jack, crispy fried jalapeños' },
      { name: 'Mushroom Swiss', price: '16', desc: 'Sautéed mushrooms, Swiss cheese, caramelized onions' },
      { name: 'Smokehouse BBQ', price: '16', desc: 'American cheese, bacon, onion ring, BBQ sauce' },
    ],
  },
  {
    id: 'handhelds',
    title: 'Handhelds',
    note: 'Served with fries or a side salad',
    items: [
      { name: 'Pulled pork sandwich', price: '13', desc: 'Slow-roasted pork, peach slaw' },
      { name: 'Chicken pesto sandwich', price: '17', desc: 'Prosciutto, melted American cheese, sun-dried tomatoes, arugula, shaved Parmesan, balsamic glaze', tags: ['FAV'] },
      { name: 'Philly cheesesteak', price: '14', desc: 'Shaved ribeye, onion, bell pepper, American cheese' },
      { name: 'Veggie burger', price: '15', desc: 'Veggie patty, lettuce, tomato, onion, pickle', tags: ['V'] },
      { name: 'Chicken Caesar wrap', price: '13', desc: 'Spinach tortilla wrap' },
      { name: 'Turkey burger', price: '13', desc: 'Turkey patty, American cheese, lettuce, tomato, pickles' },
    ],
  },
  {
    id: 'flatbreads',
    title: 'Flatbreads & pizza',
    items: [
      { name: 'Chicken pesto flatbread', price: '13', desc: 'Chargrilled chicken, basil pesto, sun-dried tomato, mozzarella, arugula', tags: ['FAV'] },
      { name: 'Prosciutto flatbread', price: '14', desc: 'Prosciutto, arugula, Parmesan, garlic herb olive oil, balsamic reduction' },
      { name: 'Seasonal veggie flatbread', price: '15', desc: 'Roasted seasonal veggies, arugula, fresh basil, feta, Parmesan', tags: ['V'] },
      { name: '16" cheese pizza', price: '18' },
      { name: '16" pepperoni pizza', price: '20' },
      { name: '16" meat lovers pizza', price: '20' },
      { name: '16" supreme pizza', price: '23' },
    ],
    extras: ['Gluten-free 14" cauliflower crust +2'],
  },
  {
    id: 'specialties',
    title: 'House specialties',
    items: [
      { name: 'Atlantic salmon', price: '21', desc: 'Chargrilled Atlantic salmon, mashed potatoes, seasonal veggie' },
      { name: 'Blackened shrimp', price: '19', desc: 'Jumbo shrimp, peach slaw, Thai chili Brussels sprouts', tags: ['FAV'] },
      { name: 'NY strip', price: '30', desc: '12 oz NY strip, mashed potatoes, seasonal veggie. Add four jumbo shrimp +9' },
      { name: 'Shrimp & catfish', price: '20', desc: 'Crispy Southern-fried shrimp, catfish, hushpuppies, sidewinder fries' },
      { name: 'Pork chop', price: '16', desc: 'Chargrilled bone-in, mashed potatoes, peach slaw' },
      { name: 'Jerk chicken fettuccine Alfredo', price: '20', desc: 'Spicy jerk-seasoned chicken with fettuccine in cream sauce. Substitute shrimp +3' },
    ],
  },
  {
    id: 'kids',
    title: 'Kids',
    note: '12 & under · choice of fries or fruit',
    items: [
      { name: 'Single smashburger', price: '8' },
      { name: 'Grilled cheese', price: '8' },
      { name: 'Chicken tenders', price: '8' },
      { name: 'Cheese quesadilla', price: '8' },
    ],
  },
  {
    id: 'sides',
    title: 'Sides & dessert',
    items: [
      { name: 'French fries', price: '5', tags: ['V'] },
      { name: 'Parmesan truffle fries', price: '8', tags: ['V'] },
      { name: 'Seasonal veggies', price: '6', tags: ['V'] },
      { name: 'Thai chili Brussels sprouts', price: '6', tags: ['V'] },
      { name: 'Mashed potatoes', price: '6', tags: ['V'] },
      { name: 'Peach slaw', price: '6', tags: ['V'] },
      { name: 'Fruit cup', price: '6', tags: ['V'] },
      { name: 'Caesar salad', price: '6', tags: ['V'] },
      { name: 'NY-style cheesecake', price: '8', desc: 'With strawberry topping' },
      { name: 'Triple chocolate fudge cake', price: '8' },
    ],
  },
]

export const DRINKS: MenuSection[] = [
  {
    id: 'cocktails',
    title: 'Signature cocktails',
    note: '13 each',
    items: [
      { name: 'Watermelon mojito', desc: 'Bacardi, watermelon & lime juice, soda' },
      { name: 'Watermelon spritz', desc: 'St-Germain, watermelon purée, prosecco, mint' },
      { name: 'Perfect spritz', desc: 'Aperol, passion fruit purée, prosecco, St-Germain' },
      { name: 'BP old fashioned', desc: 'Bulleit bourbon, simple syrup, Angostura bitters, orange peel' },
      { name: 'Dunwoody 75', desc: 'Bombay gin, lemon juice, prosecco, splash of Aperol' },
      { name: 'Strawberry lemonade', desc: 'Chopin vodka, muddled strawberries, lemonade, fresh lemon juice' },
    ],
  },
  {
    id: 'fishbowls',
    title: '18 oz fish bowls',
    note: '16 each',
    items: [
      { name: 'Bourbon smash', desc: 'Four Roses, blackberry liqueur, muddled blackberry & raspberry, lemon juice' },
      { name: 'Watermelon Jolly Rancher', desc: 'Smirnoff vodka, watermelon Pucker, sweet & sour, lemon-lime soda' },
      { name: 'Wild berry', desc: 'Ketel One vodka, blackberry liqueur, muddled blackberries & raspberries, agave, lemon juice' },
    ],
  },
  {
    id: 'margaritas',
    title: '18 oz margaritas',
    note: '16 each',
    items: [{ name: 'Classic' }, { name: 'Spicy' }, { name: 'Peach' }, { name: 'Mango' }, { name: 'Strawberry' }, { name: 'Skinny' }],
  },
  {
    id: 'mocktails',
    title: 'Mocktails',
    note: '6 each',
    items: [
      { name: 'Passion punch', desc: 'Passion fruit purée, pineapple, sour mix, grapefruit, ginger ale, orange, mint' },
      { name: 'Berry citrus fizz', desc: 'Mixed berry purée, fresh lemon, simple syrup, sparkling water' },
      { name: 'Mint refresher', desc: 'Muddled mint, cucumber, fresh lime, simple syrup, sparkling water' },
    ],
  },
  {
    id: 'beer',
    title: 'Beer',
    items: [
      { name: 'Draft', price: '7', desc: 'Blue Moon, Gate City Copperhead, Guinness, Modelo, Stella Artois, Tropicalia' },
      { name: 'Cans', desc: 'Bibo Pilsner 6 · Guinness 7 · Hazy Like a Fox IPA 7 · High Noon 7 · Long Drink 7 · Slap Flight IPA 7 · Sour Monkey 7 · White Claw 6' },
      { name: 'Bottles', desc: 'Angry Orchard cider 7 · Coors Light 5 · Dos Equis 5 · Heineken 6 · Michelob Ultra 5 · Miller Lite 5 · Sam Adams 6 · Sierra Nevada Pale Ale 6 · SweetWater 420 6 · Yuengling 5 · Heineken 0.0 (non-alcoholic) 6' },
    ],
  },
  {
    id: 'wine',
    title: 'Wine',
    note: 'Glass / bottle',
    items: [
      { name: 'Bonanza by Caymus, Cabernet Sauvignon', price: '10 / 40' },
      { name: 'Sterling, Cabernet Sauvignon', price: '9 / 36' },
      { name: 'Quilt, Cabernet Sauvignon', price: '20 / 80' },
      { name: 'Benton Lane, Pinot Noir', price: '16 / 64' },
      { name: 'Meiomi, Pinot Noir', price: '12 / 48' },
      { name: 'Sterling, Pinot Noir', price: '9 / 36' },
      { name: 'Banfi, Chianti Classico', price: '10 / 40' },
      { name: 'Flowers, Chardonnay', price: '70 bottle' },
      { name: 'Chateau Ste. Michelle, Chardonnay', price: '14 / 56' },
      { name: 'Sterling, Chardonnay', price: '9 / 36' },
      { name: 'Les Glories, Sancerre', price: '20 / 80' },
      { name: 'Lucien Albrecht, Riesling', price: '12 / 48' },
      { name: 'Sterling, Sauvignon Blanc', price: '9 / 30' },
      { name: 'Kendall-Jackson, Sauvignon Blanc (low calorie, low alcohol)', price: '15 / 60' },
      { name: 'Barone Fini, Pinot Grigio', price: '10 / 48' },
      { name: 'Sterling, Pinot Grigio', price: '12 / 48' },
      { name: 'Whispering Angel, Rosé', price: '15 / 60' },
      { name: 'La Marca, Prosecco', price: '15 / 60' },
    ],
  },
  {
    id: 'soft',
    title: 'Soft drinks',
    items: [
      { name: 'Iced tea', price: '3' },
      { name: 'Fountain drinks', price: '3', desc: 'Pepsi, Diet Pepsi, Dr Pepper, Mountain Dew, Starry, Mug root beer, fruit punch, lemonade' },
    ],
  },
]

export const MENU_FINE_PRINT = [
  '8% sales tax. A 3% credit card surcharge applies to all purchases. 18% gratuity is added for groups of six or more.',
  'Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness, especially if you have certain medical conditions. Please tell your server about any allergies — items may contain milk, eggs, fish, shellfish, tree nuts, wheat, soybeans or sesame.',
]
