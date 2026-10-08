import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'mystic-fall-edp',
    name: 'Mystic Fall',
    slug: 'mystic-fall',
    subtitle: 'Woody, smoky and long-lasting',
    volume: '100ml',
    concentration: 'Eau de Parfum',
    price: 3199,
    originalPrice: 3800,
    inStock: true,
    stockCount: 14,
    featured: true,
    isDivineTrio: true,
    isUnisex: true,
    gender: 'Unisex',
    family: 'Woody',
    character: 'Deep and smoky',
    rating: 4.9,
    reviewCount: 184,
    notes: {
      top: ['Cedarwood', 'Agarwood'],
      heart: ['Violet', 'Marine Leaf'],
      base: ['Amberwood', 'Guaiacwood']
    },
    moodMeters: {
      longevity: 5,
      projection: 5,
      freshness: 3,
      warmth: 5,
      sweetness: 2
    },
    bestFor: {
      weather: 'Cool evenings, autumn & winter breeze',
      occasion: 'Evenings out, formal dinners, weddings',
      timeOfDay: 'Dusk to Midnight'
    },
    accentTheme: {
      primary: '#4B2E5E',
      secondary: '#B9783C',
      glowColor: 'rgba(75, 46, 94, 0.45)',
      bgGradient: 'from-[#1A1021] via-[#0E0B0C] to-[#201319]',
      name: 'Smoked Violet & Amber'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85',
      ingredient: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=85',
      lifestyle: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85'
    },
    description: 'The deepest scent in the range. It opens on cedarwood and agarwood, softens into violet and a cool marine leaf note, and dries down to amberwood and smoky guaiacwood. Rich enough for winter evenings, and it stays on well into the night.',
    originStory: 'Inspired by the hour just after sunset, when the air cools down.',
    storySlug: 'mystic-fall-notes',
    pairingProductIds: ['mystic-fall-wax', 'mystic-fall-candle'],
    pairingDiscount: 'Pair with the Mystic Fall solid perfume',
    ingredientsSnippet: 'Alcohol Denat., Parfum (Fragrance), Aqua, Alpha-Isomethyl Ionone, Linalool, Coumarin, Limonene, Geraniol.'
  },
  {
    id: 'heavenly-divine-edp',
    name: 'Heavenly Divine',
    slug: 'heavenly-divine',
    subtitle: 'Fruity-floral, bright and warm',
    volume: '100ml',
    concentration: 'Eau de Parfum',
    price: 3199,
    originalPrice: 3800,
    inStock: true,
    stockCount: 8,
    featured: true,
    isDivineTrio: true,
    isUnisex: false,
    gender: 'Feminine',
    family: 'Fruity-Floral',
    character: 'Bright and polished',
    rating: 5.0,
    reviewCount: 226,
    notes: {
      top: ['Freesia', 'Absinthe', 'Peach'],
      heart: ['Rose', 'Iris'],
      base: ['Sandalwood', 'Musk', 'Amber', 'Vanilla']
    },
    moodMeters: {
      longevity: 4,
      projection: 4,
      freshness: 4,
      warmth: 4,
      sweetness: 4
    },
    bestFor: {
      weather: 'Year-round, best in spring and on sunny days',
      occasion: 'Work, lunches, daytime events',
      timeOfDay: 'Morning to Sunset'
    },
    accentTheme: {
      primary: '#F0C9B8',
      secondary: '#B76E79',
      glowColor: 'rgba(183, 110, 121, 0.4)',
      bgGradient: 'from-[#231518] via-[#0E0B0C] to-[#251A1C]',
      name: 'Blush Peach & Rose'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85',
      ingredient: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85',
      lifestyle: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&q=85'
    },
    description: 'Peach and freesia up top, with a touch of absinthe that keeps it from turning too sweet. Rose and iris come through in the heart, over a base of sandalwood, musk, amber and vanilla. An easy daytime perfume that works all year.',
    originStory: 'Made to be the one you reach for on most mornings.',
    storySlug: 'heavenly-divine-notes',
    pairingProductIds: ['heavenly-divine-wax', 'divine-trio-discovery'],
    pairingDiscount: 'Add the matching solid perfume for touch-ups',
    ingredientsSnippet: 'Alcohol Denat., Fragrance, Aqua, Hydroxycitronellal, Benzyl Salicylate, Citronellol, Benzyl Benzoate, Eugenol.'
  },
  {
    id: 'forever-crush-edp',
    name: 'Forever Crush',
    slug: 'forever-crush',
    subtitle: 'Soft, light and romantic',
    volume: '100ml',
    concentration: 'Eau de Parfum',
    price: 3199,
    originalPrice: 3800,
    inStock: true,
    stockCount: 19,
    featured: true,
    isDivineTrio: true,
    isUnisex: false,
    gender: 'Feminine',
    family: 'Floral',
    character: 'Soft and romantic',
    rating: 4.8,
    reviewCount: 167,
    notes: {
      top: ['Boysenberry', 'Italian Mandarin', 'Himalayan Red Grass'],
      heart: ['Jasmine Sambac', 'Black Plum', 'Iris', 'Indian Black Tea'],
      base: ['Sandalwood', 'Cedarwood', 'Amber']
    },
    moodMeters: {
      longevity: 4,
      projection: 4,
      freshness: 4,
      warmth: 3,
      sweetness: 4
    },
    bestFor: {
      weather: 'Pleasant spring days, breezy summer evenings',
      occasion: 'Date nights, brunches, weddings',
      timeOfDay: 'Afternoon into Golden Hour'
    },
    accentTheme: {
      primary: '#E8B4C0',
      secondary: '#6B2D4F',
      glowColor: 'rgba(107, 45, 79, 0.45)',
      bgGradient: 'from-[#1E1118] via-[#0E0B0C] to-[#2B1421]',
      name: 'Soft Pink & Plum'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1000&q=85',
      ingredient: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=1000&q=85',
      lifestyle: 'https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=1000&q=85'
    },
    description: 'Our softest floral. Mandarin and boysenberry open it, with a green lift from Himalayan red grass. The heart is jasmine sambac (motia), black plum and iris with a little black tea, and it dries down to sandalwood, cedarwood and amber.',
    originStory: 'A romantic floral that gets noticed without being loud.',
    storySlug: 'forever-crush-notes',
    pairingProductIds: ['forever-crush-candle', 'forever-crush-wax', 'forever-crush-hair-mist'],
    pairingDiscount: 'Pairs with the Forever Crush candle, solid perfume and hair mist',
    ingredientsSnippet: 'Alcohol Denat., Parfum, Aqua, Linalool, Limonene, Benzyl Alcohol, Hexyl Cinnamal, Citral.'
  },
  {
    id: 'dusk-bleu-edp',
    name: 'Dusk BLEU',
    slug: 'dusk-bleu',
    subtitle: 'Fresh citrus and fig, made for the heat',
    volume: '50ml',
    concentration: 'Eau de Parfum',
    price: 3890,
    originalPrice: 4500,
    inStock: true,
    stockCount: 11,
    featured: true,
    isDivineTrio: false,
    isUnisex: true,
    gender: 'Unisex',
    family: 'Fresh & Aquatic',
    character: 'Fresh and clean',
    rating: 4.9,
    reviewCount: 198,
    notes: {
      top: ['Citron', 'Orange', 'Mint', 'Lemon', 'Black Currant', 'Coriander'],
      heart: ['Apricot', 'Basil', 'Carrot Seeds', 'May Rose'],
      base: ['Fig', 'Dates', 'Ambrette']
    },
    moodMeters: {
      longevity: 5,
      projection: 4,
      freshness: 5,
      warmth: 3,
      sweetness: 2
    },
    bestFor: {
      weather: 'Warm, coastal & humid Pakistani weather',
      occasion: 'Everyday wear, work, summer travel',
      timeOfDay: 'All Day & Twilight'
    },
    accentTheme: {
      primary: '#14233F',
      secondary: '#8FB3C7',
      glowColor: 'rgba(20, 35, 63, 0.55)',
      bgGradient: 'from-[#0A1320] via-[#0E0B0C] to-[#121E31]',
      name: 'Twilight Navy & Sea Mist'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=1000&q=85',
      ingredient: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85',
      lifestyle: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85'
    },
    description: 'A fresh scent made for hot, humid weather. Citron, mint and coriander open it, basil and May rose sit in the heart, and it settles into fig, dates and ambrette, which give it more staying power than most fresh perfumes. Works equally well on men and women.',
    originStory: 'Inspired by the Karachi coastline at sunset, when the sea breeze finally comes in.',
    storySlug: 'dusk-bleu-notes',
    pairingProductIds: ['dusk-bleu-wax'],
    pairingDiscount: 'Pair with the Dusk BLEU solid perfume',
    ingredientsSnippet: 'Alcohol Denat., Parfum, Aqua, Limonene, Linalool, Citronellol, Citral, Farnesol, Coumarin.'
  },
  {
    id: 'mystic-fall-wax',
    name: 'Mystic Fall Perfume Wax',
    slug: 'mystic-fall-perfume-wax',
    subtitle: 'Alcohol-free solid perfume',
    volume: '15g',
    concentration: 'Solid Perfume Wax',
    price: 999,
    originalPrice: 1200,
    inStock: true,
    stockCount: 25,
    featured: false,
    isDivineTrio: false,
    isUnisex: true,
    gender: 'Unisex',
    family: 'Woody',
    character: 'Close to the skin',
    rating: 4.8,
    reviewCount: 92,
    notes: {
      top: ['Cedarwood', 'Agarwood'],
      heart: ['Violet', 'Marine Leaf'],
      base: ['Amberwood', 'Guaiacwood']
    },
    moodMeters: {
      longevity: 5,
      projection: 3,
      freshness: 3,
      warmth: 5,
      sweetness: 2
    },
    bestFor: {
      weather: 'Travel, on-the-go touchups in any weather',
      occasion: 'Top-ups through the day, layering under the perfume',
      timeOfDay: 'Anytime'
    },
    accentTheme: {
      primary: '#4B2E5E',
      secondary: '#B9783C',
      glowColor: 'rgba(75, 46, 94, 0.45)',
      bgGradient: 'from-[#1A1021] via-[#0E0B0C] to-[#201319]',
      name: 'Smoked Violet & Amber'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
      ingredient: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85'
    },
    description: 'Mystic Fall as an alcohol-free solid perfume, made with beeswax and shea butter. Dab it on your wrists and neck. It comes in a slim sliding tin that fits in a pocket or clutch and will not leak in your bag.',
    originStory: 'Made for travelling, when a glass bottle is one more thing to worry about.',
    pairingProductIds: ['mystic-fall-edp'],
    ingredientsSnippet: 'Cera Alba (Beeswax), Butyrospermum Parkii (Shea Butter), Caprylic/Capric Triglyceride, Fragrance.'
  },
  {
    id: 'heavenly-divine-wax',
    name: 'Heavenly Divine Perfume Wax',
    slug: 'heavenly-divine-perfume-wax',
    subtitle: 'Alcohol-free solid perfume',
    volume: '15g',
    concentration: 'Solid Perfume Wax',
    price: 999,
    originalPrice: 1200,
    inStock: true,
    stockCount: 18,
    featured: false,
    isDivineTrio: false,
    isUnisex: false,
    gender: 'Feminine',
    family: 'Fruity-Floral',
    character: 'Soft and warm',
    rating: 4.9,
    reviewCount: 76,
    notes: {
      top: ['Freesia', 'Peach'],
      heart: ['Rose', 'Iris'],
      base: ['Sandalwood', 'Vanilla']
    },
    moodMeters: {
      longevity: 4,
      projection: 3,
      freshness: 4,
      warmth: 4,
      sweetness: 4
    },
    bestFor: {
      weather: 'Warm weather, sensitive skin',
      occasion: 'Work days, layering under the perfume',
      timeOfDay: 'All Day'
    },
    accentTheme: {
      primary: '#F0C9B8',
      secondary: '#B76E79',
      glowColor: 'rgba(183, 110, 121, 0.4)',
      bgGradient: 'from-[#231518] via-[#0E0B0C] to-[#251A1C]',
      name: 'Blush Peach & Rose'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=85',
      ingredient: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85'
    },
    description: 'Heavenly Divine as an alcohol-free solid perfume. Dab it on your wrists, collarbones or the ends of your hair for a softer, closer version of the perfume.',
    originStory: 'A nod to the way attar has always been worn here: dabbed on, not sprayed.',
    pairingProductIds: ['heavenly-divine-edp'],
    ingredientsSnippet: 'Cera Alba, Simmondsia Chinensis Seed Oil, Parfum, Tocopherol (Vitamin E).'
  },
  {
    id: 'forever-crush-candle',
    name: 'Forever Crush Scented Candle',
    slug: 'forever-crush-scented-candle',
    subtitle: 'Coconut-soy candle with a wooden wick',
    volume: '120ml',
    concentration: 'Home Fragrance',
    price: 3999,
    originalPrice: 4600,
    inStock: true,
    stockCount: 12,
    featured: false,
    isDivineTrio: false,
    isUnisex: false,
    gender: 'All',
    family: 'Floral',
    character: 'Warm and floral',
    rating: 5.0,
    reviewCount: 64,
    notes: {
      top: ['Boysenberry', 'Italian Mandarin'],
      heart: ['Jasmine Sambac', 'Black Plum'],
      base: ['Cedarwood', 'Warm Amber']
    },
    moodMeters: {
      longevity: 5,
      projection: 5,
      freshness: 3,
      warmth: 5,
      sweetness: 4
    },
    bestFor: {
      weather: 'Cozy evenings, self-care nights',
      occasion: 'Evenings at home, having people over',
      timeOfDay: 'Evening to Night'
    },
    accentTheme: {
      primary: '#E8B4C0',
      secondary: '#6B2D4F',
      glowColor: 'rgba(107, 45, 79, 0.45)',
      bgGradient: 'from-[#1E1118] via-[#0E0B0C] to-[#2B1421]',
      name: 'Soft Pink & Plum'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85',
      ingredient: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=1000&q=85'
    },
    description: 'The Forever Crush scent for your home. A coconut-soy candle in an amber glass jar with a wooden wick that crackles softly as it burns. Black plum and jasmine sambac, with around 40 hours of burn time.',
    originStory: 'Made so a favourite perfume can scent the room as well.',
    pairingProductIds: ['forever-crush-edp'],
    ingredientsSnippet: '100% Natural Coconut-Soy Wax, Fragrance Oils, Natural Wood Wick.'
  },
  {
    id: 'forever-crush-hair-mist',
    name: 'Forever Crush Silk Hair Mist',
    slug: 'forever-crush-hair-mist',
    subtitle: 'Scented hair mist with argan oil',
    volume: '50ml',
    concentration: 'Hair Mist',
    price: 2499,
    originalPrice: 2900,
    inStock: true,
    stockCount: 15,
    featured: false,
    isDivineTrio: false,
    isUnisex: false,
    gender: 'Feminine',
    family: 'Floral',
    character: 'Light and floral',
    rating: 4.9,
    reviewCount: 53,
    notes: {
      top: ['Italian Mandarin', 'Boysenberry'],
      heart: ['Jasmine Sambac', 'Iris'],
      base: ['White Musk', 'Amber']
    },
    moodMeters: {
      longevity: 4,
      projection: 4,
      freshness: 5,
      warmth: 3,
      sweetness: 3
    },
    bestFor: {
      weather: 'All seasons, perfect before stepping outdoors',
      occasion: 'Weddings, brunches, romantic dates',
      timeOfDay: 'Morning & Evening'
    },
    accentTheme: {
      primary: '#E8B4C0',
      secondary: '#6B2D4F',
      glowColor: 'rgba(107, 45, 79, 0.45)',
      bgGradient: 'from-[#1E1118] via-[#0E0B0C] to-[#2B1421]',
      name: 'Soft Pink & Plum'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85',
      ingredient: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=1000&q=85'
    },
    description: 'A lighter take on Forever Crush, made for hair. The low-alcohol formula has argan oil and pro-vitamin B5, so it scents your hair without drying it out. Spray through the lengths and ends.',
    originStory: 'Inspired by the old habit of scenting hair, in a form that is kinder to it than perfume.',
    pairingProductIds: ['forever-crush-edp'],
    ingredientsSnippet: 'Aqua, Peg-40 Hydrogenated Castor Oil, Fragrance, Argania Spinosa Kernel Oil, Panthenol.'
  },
  {
    id: 'water-boost-gift-box',
    name: 'Water Boost Hydrating Essentials Box',
    slug: 'water-boost-hydrating-gift-box',
    subtitle: 'Face mist, body elixir and silk headband, boxed to gift',
    volume: 'Gift Set',
    concentration: 'Gift Set',
    price: 5499,
    originalPrice: 6500,
    inStock: true,
    stockCount: 9,
    featured: false,
    isDivineTrio: false,
    isUnisex: false,
    gender: 'All',
    family: 'Fresh & Aquatic',
    character: 'Clean and fresh',
    rating: 5.0,
    reviewCount: 41,
    notes: {
      top: ['Cucumber Water', 'White Lotus'],
      heart: ['Rose Water', 'Aloe'],
      base: ['Clean Musks', 'Light Cedar']
    },
    moodMeters: {
      longevity: 4,
      projection: 3,
      freshness: 5,
      warmth: 2,
      sweetness: 2
    },
    bestFor: {
      weather: 'Post-shower, warm weather hydration',
      occasion: 'Gifting, bridal gifts, a treat for yourself',
      timeOfDay: 'Morning'
    },
    accentTheme: {
      primary: '#8FB3C7',
      secondary: '#C9A66B',
      glowColor: 'rgba(143, 179, 199, 0.45)',
      bgGradient: 'from-[#101E25] via-[#0E0B0C] to-[#15232A]',
      name: 'Aqua Mist & Champagne'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85',
      ingredient: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&q=85'
    },
    description: 'A gift box with the Water Boost Hydrating Facial Mist, the Hyaluronic Infusion Body Elixir and a silk headband. It arrives ribboned, with a gift card for your message.',
    originStory: 'Perfume lasts longer on hydrated skin, so this set is where the routine starts.',
    pairingProductIds: ['heavenly-divine-edp', 'dusk-bleu-edp'],
    ingredientsSnippet: 'Pure Alpine Glacier Water, Hyaluronic Acid, Niacinamide, Damask Rose Hydrosol.'
  },
  {
    id: 'divine-trio-discovery',
    name: 'The Divine Trio Discovery Set',
    slug: 'divine-trio-discovery-set',
    subtitle: 'All three perfumes in 15ml travel sprays',
    volume: '3 x 15ml',
    concentration: 'Eau de Parfum Gift Set',
    price: 4850,
    originalPrice: 5500,
    inStock: true,
    stockCount: 22,
    featured: true,
    isDivineTrio: true,
    isUnisex: true,
    gender: 'All',
    family: 'Amber & Oriental',
    character: 'Try all three',
    rating: 5.0,
    reviewCount: 310,
    notes: {
      top: ['Freesia', 'Cedarwood', 'Italian Mandarin'],
      heart: ['Rose', 'Violet', 'Jasmine Sambac'],
      base: ['Amberwood', 'Sandalwood', 'Vanilla']
    },
    moodMeters: {
      longevity: 5,
      projection: 5,
      freshness: 4,
      warmth: 5,
      sweetness: 4
    },
    bestFor: {
      weather: 'All seasons and moods',
      occasion: 'Gifting, or finding your favourite before buying a full bottle',
      timeOfDay: 'Morning, Noon & Midnight'
    },
    accentTheme: {
      primary: '#C9A66B',
      secondary: '#2A1621',
      glowColor: 'rgba(201, 166, 107, 0.45)',
      bgGradient: 'from-[#2A1621] via-[#0E0B0C] to-[#1C1217]',
      name: 'Champagne & Aubergine'
    },
    images: {
      main: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85',
      secondary: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85',
      ingredient: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85'
    },
    description: 'Mystic Fall, Heavenly Divine and Forever Crush in three refillable 15ml travel sprays. The easiest way to try all three before committing to a full bottle, and a good gift if you are not sure which one they would like.',
    originStory: 'Made for trying the range, and for travelling with it.',
    pairingProductIds: ['mystic-fall-edp', 'heavenly-divine-edp', 'forever-crush-edp'],
    ingredientsSnippet: 'Contains 3 x 15ml Eau de Parfum travel sprays.'
  }
];

export const CITIES_DELIVERY = [
  { city: 'Karachi', estimate: 'Next Day Delivery', codAvailable: true, fee: 'Free above Rs. 3,000' },
  { city: 'Lahore', estimate: '1–2 Working Days', codAvailable: true, fee: 'Free above Rs. 3,000' },
  { city: 'Islamabad / Rawalpindi', estimate: '1–2 Working Days', codAvailable: true, fee: 'Free above Rs. 3,000' },
  { city: 'Faisalabad', estimate: '2–3 Working Days', codAvailable: true, fee: 'Free above Rs. 3,000' },
  { city: 'Multan', estimate: '2–3 Working Days', codAvailable: true, fee: 'Free above Rs. 3,000' },
  { city: 'Peshawar', estimate: '2–3 Working Days', codAvailable: true, fee: 'Free above Rs. 3,000' },
  { city: 'Quetta', estimate: '3–4 Working Days', codAvailable: true, fee: 'Free above Rs. 3,000' },
  { city: 'Other Cities (Pakistan-wide)', estimate: '2–4 Working Days', codAvailable: true, fee: 'Free above Rs. 3,000' },
  { city: 'International (UAE / UK / USA / Canada)', estimate: '5–8 Working Days', codAvailable: false, fee: 'Calculated at checkout' }
];
