export type ScentFamily = 
  | 'Woody' 
  | 'Floral' 
  | 'Fruity-Floral' 
  | 'Fresh & Aquatic' 
  | 'Amber & Oriental';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface MoodMeters {
  longevity: number; // 1-5
  projection: number; // 1-5
  freshness: number; // 1-5
  warmth: number; // 1-5
  sweetness: number; // 1-5
}

export interface BestFor {
  weather: string;
  occasion: string;
  timeOfDay: string;
}

export interface AccentTheme {
  primary: string; // e.g. '#4B2E5E'
  secondary: string; // e.g. '#B9783C'
  glowColor: string; // rgba
  bgGradient: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  volume: string;
  concentration: string; // 'Eau de Parfum', 'Solid Perfume Wax', 'Home Fragrance', etc.
  price: number; // in PKR
  originalPrice?: number;
  inStock: boolean;
  stockCount?: number;
  featured?: boolean;
  isDivineTrio?: boolean;
  isUnisex?: boolean;
  gender: 'Feminine' | 'Unisex' | 'All';
  family: ScentFamily;
  character: string;
  rating: number;
  reviewCount: number;
  notes: FragranceNotes;
  moodMeters: MoodMeters;
  bestFor: BestFor;
  accentTheme: AccentTheme;
  image?: string;
  description: string;
  originStory: string;
  storySlug?: string;
  pairingProductIds: string[];
  pairingDiscount?: string;
  ingredientsSnippet: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume?: string;
}

export interface ConsultationBooking {
  id: string;
  type: 'boutique' | 'video' | 'whatsapp';
  service: 'bridal' | 'signature' | 'gifting';
  location: string;
  date: string;
  time: string;
  timezone: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  titleUrdu: string;
  excerpt: string;
  excerptUrdu: string;
  category: string;
  navLabel: string;
  readTime: string;
  content: string[];
  contentUrdu: string[];
  pullQuote?: string;
  pullQuoteUrdu?: string;
  relatedProductIds: string[];
}

export interface OlfactoryNote {
  id: string;
  name: string;
  category: 'Top' | 'Heart' | 'Base';
  scentProfile: string;
  origin: string;
  evokes: string;
  containedIn: string[]; // product IDs
}

export interface ScentQuizAnswers {
  recipient?: 'me' | 'gift' | 'unisex';
  mood?: 'confidence' | 'radiant' | 'romantic' | 'mysterious' | 'fresh';
  scentWorld?: 'woods' | 'gardens' | 'fruit' | 'ocean' | 'amber';
  occasion?: 'daily' | 'office' | 'evening' | 'weddings';
  climate?: 'hot' | 'mild' | 'cool';
  intensity?: 'whisper' | 'noticeable' | 'statement';
}

export interface ScentQuizResult {
  product: Product;
  score: number;
  matchPercentage: number;
  reason: string;
  entryAlternative?: Product;
}
