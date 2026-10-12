import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Quote,
  Flower2,
  Sprout,
  Trees,
  TreePine,
  Cherry,
  Leaf,
  Waves,
  Droplet,
  Moon,
  Sun,
  Flame,
  Wind,
  Truck,
  Banknote,
  Gift,
  Headphones,
  KeyRound,
  ShoppingBag
} from 'lucide-react';
import { Product, ScentFamily, ScentQuizAnswers } from '../types';
import { PRODUCTS } from '../data/products';
import { BRAND } from '../config/brand';
import { useStore } from '../context/StoreContext';
import { calculateScentMatches } from '../utils/scentQuizEngine';
import { ProductCard } from './ProductCard';
import { ProductVisual } from './ProductVisual';

const WRAP = 'w-full max-w-7xl mx-auto px-5 md:px-10 lg:px-20';
const PERFUMES = PRODUCTS.filter(p => p.concentration === 'Eau de Parfum');

/* ---------- 1. Hero ---------- */

const Hero: React.FC = () => (
  <section className="relative pt-4 pb-20 overflow-hidden">
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />
    <div className="absolute top-1/3 -right-16 w-60 h-60 bg-secondary-container/20 rounded-full blur-[80px] pointer-events-none" />

    <div className={`${WRAP} relative grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 lg:items-center`}>
      <div className="lg:col-span-5 flex flex-col gap-7 lg:py-12">
        <div className="flex items-center gap-1.5 self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-label-sm text-primary uppercase">More than just a scent</span>
        </div>

        <div className="flex flex-col gap-1 z-10">
          <h1 className="font-serif text-[32px] leading-[1.15] lg:text-display-hero text-on-surface font-normal tracking-tight">
            MAHA <span className="italic text-primary">Your Signature</span>, in Every Note.
          </h1>
          <p className="text-body-md text-on-surface-variant max-w-sm mt-1 font-light">
            Discover fragrances that capture your mood, express your individuality, and leave an
            unforgettable impression.
          </p>
        </div>

        {/* Shown after the image on small screens, beside it on large ones */}
        <div className="hidden lg:flex flex-col gap-2 max-w-sm">
          <HeroActions />
        </div>
        <div className="hidden lg:block max-w-sm">
          <HeroFacts />
        </div>
      </div>

      <div className="lg:col-span-7 relative w-full rounded-lg overflow-hidden bg-surface-low shadow-[0_20px_40px_-15px_rgba(10,6,4,0.9)] aspect-[4/5] lg:aspect-[5/4] flex items-end">
        <img
          src="/images/maha-amber.jpg"
          alt="Maha amber perfume bottle on slate stone with dried botanicals"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-surface-lowest/30 to-transparent" />
        <div className="relative z-10 w-full p-4 m-2 flex flex-wrap items-center justify-between gap-1 bg-surface-lowest/80 backdrop-blur-md rounded-[2px]">
          <div className="flex items-center gap-1.5">
            <BadgeCheck className="w-[18px] h-[18px] text-primary" strokeWidth={1.5} />
            <span className="text-label-sm text-on-surface tracking-[0.16em] uppercase">Eau de Parfum</span>
          </div>
          <span className="text-label-sm text-primary tracking-[0.18em] uppercase">{PERFUMES.length} Signature Scents</span>
        </div>
      </div>

      <div className="lg:hidden flex flex-col gap-2 z-10">
        <HeroActions />
      </div>
      <div className="lg:hidden">
        <HeroFacts />
      </div>
    </div>
  </section>
);

const HeroActions: React.FC = () => (
  <>
    <a
      href="#signature-collection"
      className="w-full h-[52px] bg-primary text-on-primary rounded-[2px] flex items-center justify-center text-label-lg tracking-[0.22em] uppercase shadow-lg shadow-primary/10 hover:bg-primary-fixed active:scale-[0.99] transition"
    >
      Explore the Collection
    </a>
    <a
      href="#discovery-quiz"
      className="w-full h-[52px] bg-surface-high text-primary rounded-[2px] flex items-center justify-center text-label-lg tracking-[0.22em] uppercase hover:bg-surface-highest active:scale-[0.99] transition"
    >
      Discover Your Scent
    </a>
  </>
);

const HeroFacts: React.FC = () => (
  <div className="grid grid-cols-3 gap-1 pt-1 text-center">
    {[
      { label: 'Range', value: `${PERFUMES.length} Perfumes` },
      { label: 'Delivery', value: 'Free over Rs. 3,000' },
      { label: 'Payment', value: 'Cash on Delivery' }
    ].map(fact => (
      <div key={fact.label} className="flex flex-col items-center gap-1 bg-surface-low/70 py-2 px-1 rounded-[2px]">
        <span className="text-[10px] font-semibold text-primary tracking-widest uppercase">{fact.label}</span>
        <span className="text-[11px] leading-tight text-on-surface-variant">{fact.value}</span>
      </div>
    ))}
  </div>
);

/* ---------- 2. Philosophy ---------- */

const Philosophy: React.FC = () => (
  <section id="about" className="relative py-20 bg-parchment text-umber overflow-hidden scroll-mt-24">
    <div className={`${WRAP} grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 lg:items-center`}>
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-6 h-px bg-inverse-primary" />
          <span className="text-label-sm text-inverse-primary tracking-[0.24em] uppercase">L’Atelier de Maha</span>
        </div>
        <h2 className="font-serif text-headline-lg lg:text-headline-xl font-normal tracking-tight text-espresso leading-[1.15]">
          A Fragrance That Feels Like You.
        </h2>
      </div>

      <div className="lg:col-span-7 lg:row-span-2 relative w-full rounded-lg overflow-hidden aspect-[4/3] my-1 shadow-xl bg-[#e5dcd3]">
        <img src="/images/maha-oud.jpg" alt="Maha perfume bottle in natural sunlight" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute bottom-3 left-3 bg-surface/85 backdrop-blur-md px-2 py-1 rounded-[2px] text-primary text-[10px] font-semibold tracking-[0.18em] uppercase">
          The Signature Collection
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-4">
        <p className="text-body-md text-umber leading-relaxed">
          Scent is the sense closest to memory. One breath can bring back a room, a season, a
          person. Each Maha fragrance is composed to sit close, like a second skin, and to change
          gently on you through the hours.
        </p>
        <div className="bg-[#F0E5D8] p-4 rounded-[2px] flex items-start gap-2 mt-1">
          <Quote className="w-7 h-7 shrink-0 text-inverse-primary fill-current" strokeWidth={0} />
          <p className="font-serif text-[16px] italic text-[#2D2119] leading-snug">
            "We do not create masks to conceal. We formulate essences that reveal your private truth."
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 3. Signature collection ---------- */

interface CollectionProps {
  onSelectProduct: (product: Product) => void;
  onShopAll: () => void;
}

const Collection: React.FC<CollectionProps> = ({ onSelectProduct, onShopAll }) => (
  <section id="signature-collection" className="py-20 scroll-mt-24">
    <div className={`${WRAP} flex flex-col gap-7`}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-label-sm text-primary uppercase">Collection Permanente</span>
          <span className="text-label-sm text-outline tracking-wider uppercase">{PERFUMES.length} Formulations</span>
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <h2 className="font-serif text-headline-lg lg:text-headline-xl text-on-surface font-normal">Signature Scents</h2>
          <button type="button" onClick={onShopAll} className="text-label-sm text-primary tracking-[0.16em] uppercase flex items-center gap-1 cursor-pointer hover:text-primary-fixed transition-colors">
            Explore All <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
        <p className="font-serif text-body-sm text-on-surface-variant italic">
          Four eau de parfums, from deep woods to bright citrus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {PERFUMES.map(product => (
          <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
        ))}
      </div>
    </div>
  </section>
);

/* ---------- 4. Olfactory families ---------- */

const FAMILIES: {
  family: ScentFamily;
  label: string;
  line: string;
  Icon: React.ElementType;
  Emblem: React.ElementType;
}[] = [
  { family: 'Floral', label: 'Floral', line: 'Velvety petals and night-blooming jasmine', Icon: Flower2, Emblem: Sprout },
  { family: 'Woody', label: 'Woody', line: 'Cedarwood, agarwood and smoky guaiac', Icon: Trees, Emblem: TreePine },
  { family: 'Fruity-Floral', label: 'Fruity', line: 'Sun-ripened peach, freesia and rose', Icon: Cherry, Emblem: Leaf },
  { family: 'Fresh & Aquatic', label: 'Fresh', line: 'Citron, crushed mint and coastal fig', Icon: Waves, Emblem: Droplet }
];

const Families: React.FC<{ onSelectFamily: (family: ScentFamily) => void }> = ({ onSelectFamily }) => (
  <section id="collections" className="py-20 bg-parchment-soft text-espresso scroll-mt-24">
    <div className={`${WRAP} flex flex-col gap-7`}>
      <div className="flex flex-col gap-1">
        <span className="text-label-sm text-secondary-container uppercase">Olfactive Taxonomy</span>
        <h2 className="font-serif text-headline-lg lg:text-headline-xl font-normal text-espresso">Explore by Olfactory Family</h2>
        <p className="text-body-sm text-[#52443c]">Navigate four archetypes distilled to evoke distinct moods and memories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {FAMILIES.map(({ family, label, line, Icon, Emblem }) => {
          const count = PRODUCTS.filter(p => p.family === family).length;
          return (
            <button
              key={family}
              type="button"
              onClick={() => onSelectFamily(family)}
              className="bg-parchment-card p-4 rounded-lg flex items-center justify-between gap-4 text-left shadow-sm active:scale-[0.99] hover:bg-[#e6d5c7] transition cursor-pointer"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-secondary-container" strokeWidth={1.5} />
                  <span className="font-serif text-headline-sm font-semibold text-espresso uppercase">{label}</span>
                </div>
                <p className="text-body-sm text-[#52443c] max-w-xs">{line}</p>
                <span className="text-[10px] text-secondary-container font-semibold tracking-widest uppercase mt-1">
                  Explore {count} {count === 1 ? 'Scent' : 'Scents'} →
                </span>
              </div>
              <div className="w-16 h-16 rounded-xl bg-parchment-deep flex items-center justify-center shrink-0">
                <Emblem className="w-7 h-7 text-secondary-container" strokeWidth={1.5} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </section>
);

/* ---------- 5. Discovery quiz ---------- */

type Atmosphere = 'twilight' | 'garden' | 'lounge' | 'coastal';

const ATMOSPHERES: { key: Atmosphere; label: string; Icon: React.ElementType; answers: ScentQuizAnswers }[] = [
  { key: 'twilight', label: 'Quiet Twilight', Icon: Moon, answers: { mood: 'mysterious', scentWorld: 'woods', climate: 'cool', occasion: 'evening' } },
  { key: 'garden', label: 'Sunlit Garden', Icon: Sun, answers: { mood: 'radiant', scentWorld: 'fruit', climate: 'mild', occasion: 'daily' } },
  { key: 'lounge', label: 'Midnight Lounge', Icon: Flame, answers: { mood: 'romantic', scentWorld: 'gardens', climate: 'mild', occasion: 'evening' } },
  { key: 'coastal', label: 'Coastal Breeze', Icon: Wind, answers: { mood: 'fresh', scentWorld: 'ocean', climate: 'hot', occasion: 'daily' } }
];

const INTENSITIES: { key: 'whisper' | 'statement'; label: string; line: string }[] = [
  { key: 'whisper', label: 'Intimate Skin Scent', line: 'Whispers close to pulse points' },
  { key: 'statement', label: 'Bold Room-Filling Sillage', line: 'A trail that is noticed and remembered' }
];

const DiscoveryQuiz: React.FC<{ onSelectProduct: (product: Product) => void }> = ({ onSelectProduct }) => {
  const { addToCart, setIsScentFinderOpen } = useStore();
  const [atmosphere, setAtmosphere] = useState<Atmosphere>('lounge');
  const [intensity, setIntensity] = useState<'whisper' | 'statement'>('statement');
  const [added, setAdded] = useState(false);

  const match = useMemo(() => {
    const chosen = ATMOSPHERES.find(a => a.key === atmosphere)!;
    return calculateScentMatches({ recipient: 'me', ...chosen.answers, intensity })[0];
  }, [atmosphere, intensity]);

  const handleAdd = () => {
    addToCart(match.product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <section id="discovery-quiz" className="py-20 scroll-mt-24">
      <div className={`${WRAP} flex flex-col gap-7`}>
        <div className="flex flex-col gap-1 text-center items-center">
          <span className="text-label-sm text-primary tracking-[0.24em] uppercase">Bespoke Scent Finder</span>
          <h2 className="font-serif text-headline-lg lg:text-headline-xl text-on-surface font-normal">Find the Fragrance That Feels Like You</h2>
          <p className="text-body-sm text-on-surface-variant max-w-xs">
            Answer two sensory cues to find your personal olfactory alignment.
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto bg-surface-container rounded-lg p-7 flex flex-col gap-7 shadow-xl">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em]">Step 1 of 2</span>
              <span className="text-[11px] text-outline">Atmospheric Persona</span>
            </div>
            <h3 className="font-serif text-[18px] text-on-surface font-normal">What atmosphere calls to you?</h3>
            <div className="grid grid-cols-2 gap-1 pt-1" role="radiogroup" aria-label="Atmosphere">
              {ATMOSPHERES.map(({ key, label, Icon }) => {
                const selected = atmosphere === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAtmosphere(key)}
                    className={`text-left p-2 rounded-[2px] transition-colors flex flex-col gap-1 cursor-pointer ${
                      selected ? 'bg-primary-container text-on-primary-container' : 'bg-surface-high hover:bg-surface-highest text-on-surface'
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] ${selected ? '' : 'text-primary'}`} strokeWidth={1.5} />
                    <span className={`text-[11px] uppercase tracking-wider ${selected ? 'font-semibold' : 'font-semibold'}`}>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.2em]">Step 2 of 2</span>
              <span className="text-[11px] text-outline">Projection & Aura</span>
            </div>
            <h3 className="font-serif text-[18px] text-on-surface font-normal">Preferred intensity & sillage?</h3>
            <div className="flex flex-col gap-1 pt-1" role="radiogroup" aria-label="Intensity">
              {INTENSITIES.map(({ key, label, line }) => {
                const selected = intensity === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setIntensity(key)}
                    className={`text-left px-4 py-2 rounded-[2px] transition-colors flex items-center justify-between cursor-pointer ${
                      selected ? 'bg-primary-container text-on-primary-container' : 'bg-surface-high hover:bg-surface-highest text-on-surface'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-label-sm uppercase tracking-wider">{label}</span>
                      <span className={`text-[11px] ${selected ? 'opacity-80' : 'text-outline'}`}>{line}</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${selected ? 'bg-on-primary-container' : 'bg-outline'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-surface-lowest p-4 rounded flex flex-col gap-2" aria-live="polite">
            <div className="flex items-center justify-between gap-2">
              <span className="text-label-sm text-primary tracking-[0.2em] uppercase">Your Formulation Match</span>
              <span className="bg-surface-high text-primary px-2 py-0.5 rounded-[2px] text-[10px] font-semibold whitespace-nowrap">
                {match.matchPercentage}% COMPATIBILITY
              </span>
            </div>
            <button type="button" onClick={() => onSelectProduct(match.product)} className="flex items-center gap-4 text-left cursor-pointer group">
              <ProductVisual product={match.product} className="w-16 h-16 rounded-[2px] shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-[16px] font-semibold text-on-surface truncate uppercase group-hover:text-primary transition-colors">
                  {match.product.name}
                </span>
                <span className="text-[12px] text-on-surface-variant line-clamp-1">
                  {[match.product.notes.top[0], match.product.notes.heart[0]].filter(Boolean).join(' & ')}
                </span>
                <span className="text-[10px] font-semibold text-primary uppercase tracking-widest mt-0.5">
                  {match.product.concentration} · {match.product.volume}
                </span>
              </div>
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="w-full h-11 bg-primary text-on-primary rounded-[2px] text-label-sm uppercase tracking-[0.2em] hover:bg-primary-fixed active:scale-95 transition flex items-center justify-center gap-1.5 mt-1 cursor-pointer"
            >
              {added ? (
                'Added to Bag'
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  Add to Bag (Rs. {match.product.price.toLocaleString()})
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsScentFinderOpen(true)}
              className="self-center text-label-sm text-on-surface-variant hover:text-primary uppercase tracking-[0.18em] pt-2 cursor-pointer transition-colors"
            >
              Take the full six-question quiz →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- 6. Assurance ---------- */

const ASSURANCES = [
  { Icon: Truck, title: 'Free Nationwide Delivery', text: 'Delivery is free across Pakistan on every order above Rs. 3,000.' },
  { Icon: Banknote, title: 'Cash on Delivery', text: 'Pay when your order arrives, or use JazzCash, Easypaisa or a card.' },
  { Icon: Gift, title: 'Gift Wrapping', text: 'Add gift wrapping to any order from your bag, with a note for the card.' },
  { Icon: Headphones, title: 'Private Scent Advisory', text: 'Book a private consultation by video or WhatsApp call to help you choose.' }
];

const Assurance: React.FC = () => (
  <section className="py-12 bg-surface-low">
    <div className={`${WRAP} flex flex-col gap-7`}>
      <div className="text-center flex flex-col gap-1">
        <span className="text-label-sm text-primary uppercase">The Maha Assurance</span>
        <h2 className="font-serif text-headline-md text-on-surface font-normal">Haute Parfumerie Standards</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ASSURANCES.map(({ Icon, title, text }) => (
          <div key={title} className="flex items-start gap-2 bg-surface-container p-4 rounded">
            <div className="w-10 h-10 rounded-xl bg-surface-high flex items-center justify-center shrink-0 text-primary">
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-sans text-label-lg text-on-surface uppercase tracking-wider">{title}</h3>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- 7. Private salon ---------- */

const Salon: React.FC = () => {
  const { setIsConsultationOpen } = useStore();
  const hasNewsletter = Boolean(BRAND.newsletterAction);

  return (
    <section className="py-12">
      <div className={WRAP}>
        <div className="bg-surface-container rounded-lg p-7 flex flex-col gap-4 shadow-xl text-center items-center">
          <div className="w-12 h-12 rounded-xl bg-surface-high flex items-center justify-center text-primary">
            <KeyRound className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-1 max-w-sm">
            <span className="text-label-sm text-primary tracking-[0.24em] uppercase">Private Salon Access</span>
            <h2 className="font-serif text-headline-md text-on-surface font-normal">Enter the Inner Sanctum</h2>
            <p className="text-body-sm text-on-surface-variant leading-relaxed">
              {hasNewsletter
                ? 'Receive early previews of new releases and invitations to private salon gatherings.'
                : 'Sit down with us, by video or on a call, and find the fragrance that suits you.'}
            </p>
          </div>

          {hasNewsletter ? (
            <form action={BRAND.newsletterAction} method="post" target="_blank" className="w-full flex flex-col gap-1 max-w-xs mt-1">
              <input
                type="email"
                name="email"
                required
                placeholder="Your private email"
                aria-label="Email address"
                className="w-full h-11 px-4 bg-surface-low text-on-surface rounded-[2px] text-body-sm placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button type="submit" className="w-full h-11 bg-primary text-on-primary rounded-[2px] text-label-sm uppercase hover:bg-primary-fixed active:scale-95 transition cursor-pointer">
                Join Salon
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="w-full max-w-xs h-11 mt-1 bg-primary text-on-primary rounded-[2px] text-label-sm uppercase hover:bg-primary-fixed active:scale-95 transition cursor-pointer"
            >
              Book a Consultation
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

/* ---------- Page ---------- */

interface HomeProps {
  onSelectProduct: (product: Product) => void;
  onShopAll: () => void;
  onSelectFamily: (family: ScentFamily) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectProduct, onShopAll, onSelectFamily }) => (
  <div className="flex flex-col w-full">
    <Hero />
    <Philosophy />
    <Collection onSelectProduct={onSelectProduct} onShopAll={onShopAll} />
    <Families onSelectFamily={onSelectFamily} />
    <DiscoveryQuiz onSelectProduct={onSelectProduct} />
    <Assurance />
    <Salon />
  </div>
);
