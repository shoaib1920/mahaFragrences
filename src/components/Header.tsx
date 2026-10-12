import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Menu, X, Search, ShoppingBag, User, ArrowRight, Flower2, LayoutGrid, Compass, Heart } from 'lucide-react';
import { ScentFamily } from '../types';

export type NavKey = 'home' | 'shop' | 'about' | 'collections' | 'quiz' | 'contact';

interface HeaderProps {
  active: 'home' | 'shop';
  onNavigate: (key: NavKey) => void;
  onOpenShop: (family?: ScentFamily | 'All', type?: string) => void;
  onNavigateJournal: () => void;
}

const ANNOUNCEMENT = 'Free delivery on orders above Rs. 3,000 · Cash on delivery across Pakistan';

const COLLECTIONS = [
  { label: 'Eau de Parfum', type: 'Eau de Parfum' },
  { label: 'Solid Perfumes', type: 'Solid Perfume Wax' },
  { label: 'Gift Sets', type: 'Gift Set' }
];

const FAMILIES: { label: string; family: ScentFamily }[] = [
  { label: 'Floral', family: 'Floral' },
  { label: 'Woody', family: 'Woody' },
  { label: 'Fruity', family: 'Fruity-Floral' },
  { label: 'Fresh', family: 'Fresh & Aquatic' }
];

export const Header: React.FC<HeaderProps> = ({ active, onNavigate, onOpenShop, onNavigateJournal }) => {
  const { cartCount, setIsCartOpen, setIsAccountOpen, setIsConsultationOpen } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const closeThen = (fn: () => void) => () => {
    setDrawerOpen(false);
    fn();
  };

  const iconButton = 'w-11 h-11 flex items-center justify-center transition-colors cursor-pointer';
  const desktopLink = 'hidden lg:inline-flex items-center text-label-sm text-on-surface-variant hover:text-primary transition-colors tracking-[0.18em] uppercase px-2 cursor-pointer';

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-surface-lowest/85 backdrop-blur-xl shadow-[0_12px_32px_-8px_rgba(10,6,4,0.65)]">
        <div className="bg-surface-low overflow-hidden h-7 flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center w-max">
            {[0, 1, 2, 3].map(i => (
              <span key={i} aria-hidden={i > 0} className="text-label-sm text-primary uppercase px-6">
                {ANNOUNCEMENT}
              </span>
            ))}
          </div>
        </div>

        <div className="h-16 px-5 md:px-10 lg:px-20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 flex-1">
            <button type="button" onClick={() => setDrawerOpen(true)} className={`${iconButton} text-primary hover:text-primary-fixed -ml-2.5`} aria-label="Open menu">
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => onNavigate('quiz')} className="hidden min-[380px]:inline-flex items-center text-label-sm text-on-surface-variant hover:text-primary transition-colors tracking-[0.18em] uppercase px-1 cursor-pointer">
              Finder
            </button>
            <button type="button" onClick={() => onNavigate('shop')} className={desktopLink}>Collections</button>
            <button type="button" onClick={() => onNavigate('collections')} className={desktopLink}>Families</button>
            <button type="button" onClick={() => onNavigate('about')} className={desktopLink}>Philosophy</button>
          </div>

          <button type="button" onClick={() => onNavigate('home')} className="flex items-center gap-1.5 cursor-pointer" aria-label="Maha Fragrances, home">
            <span className="font-serif text-headline-sm tracking-[0.25em] uppercase text-primary">MAHA</span>
            <span className="hidden sm:inline text-label-sm text-outline font-light">FRAGRANCES</span>
          </button>

          <div className="flex items-center gap-1 flex-1 justify-end">
            <button type="button" onClick={() => onNavigate('shop')} className={`${iconButton} text-on-surface-variant hover:text-primary`} aria-label="Search the catalogue">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => setIsCartOpen(true)} className={`${iconButton} text-primary hover:text-primary-fixed relative`} aria-label={`Shopping bag, ${cartCount} items`}>
              <ShoppingBag className="w-[22px] h-[22px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-2 right-1.5 min-w-4 h-4 px-1 rounded-full bg-primary text-on-primary text-[9px] flex items-center justify-center leading-none font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsAccountOpen(true)}
              className="w-8 h-8 ml-1 -mr-1 rounded-xl bg-surface-high text-primary flex items-center justify-center shadow-[0_0_1px_1px_rgba(200,169,126,0.25)] cursor-pointer hover:text-primary-fixed transition-colors"
              aria-label="Account and wishlist"
            >
              <User className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 flex transition-transform duration-500 ease-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!drawerOpen}
      >
        <div className="w-5/6 max-w-sm h-full bg-surface-lowest/95 backdrop-blur-2xl flex flex-col justify-between shadow-[0_24px_64px_-12px_rgba(0,0,0,0.9)] overflow-y-auto">
          <div className="p-7 flex flex-col gap-7">
            <div className="flex items-center justify-between pb-2">
              <div className="flex flex-col">
                <span className="font-serif text-headline-sm tracking-[0.2em] text-primary uppercase">MAHA</span>
                <span className="text-label-sm text-outline tracking-[0.18em] uppercase">The Art of Scent</span>
              </div>
              <button type="button" onClick={() => setDrawerOpen(false)} className={`${iconButton} text-on-surface-variant hover:text-primary -mr-2.5`} aria-label="Close menu">
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-label-sm text-outline uppercase">Collections</span>
              <nav aria-label="Collections" className="flex flex-col gap-1">
                {COLLECTIONS.map(c => (
                  <button
                    key={c.type}
                    type="button"
                    onClick={closeThen(() => onOpenShop('All', c.type))}
                    className="py-2 text-left font-serif text-headline-sm font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer"
                  >
                    {c.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-label-sm text-outline uppercase">Fragrance Families</span>
              <div className="grid grid-cols-2 gap-1">
                {FAMILIES.map(f => (
                  <button
                    key={f.family}
                    type="button"
                    onClick={closeThen(() => onOpenShop(f.family))}
                    className="px-4 py-2 bg-surface-high rounded-[2px] text-center text-label-sm text-on-surface hover:text-primary transition-colors uppercase cursor-pointer"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-1">
              <button type="button" onClick={closeThen(() => onNavigate('quiz'))} className="flex items-center justify-between py-2 text-label-lg text-primary uppercase cursor-pointer">
                <span>Interactive Scent Quiz</span>
                <ArrowRight className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>
              <button type="button" onClick={closeThen(() => onNavigate('about'))} className="py-2 text-left text-label-lg text-on-surface-variant hover:text-on-surface uppercase transition-colors cursor-pointer">
                Atelier Philosophy
              </button>
              <button type="button" onClick={closeThen(onNavigateJournal)} className="py-2 text-left text-label-lg text-on-surface-variant hover:text-on-surface uppercase transition-colors cursor-pointer">
                Journal
              </button>
              <button type="button" onClick={closeThen(() => setIsConsultationOpen(true))} className="py-2 text-left text-label-lg text-on-surface-variant hover:text-on-surface uppercase transition-colors cursor-pointer">
                Boutique Services
              </button>
            </div>
          </div>

          <div className="p-7 bg-surface-lowest flex flex-col gap-1">
            <span className="text-label-sm text-outline uppercase">Concierge</span>
            <span className="text-body-sm text-on-surface-variant">Private consultations by video or WhatsApp call.</span>
          </div>
        </div>
        <div className="flex-1 h-full bg-surface-lowest/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
      </div>

      {/* Bottom tab bar */}
      <nav aria-label="Primary" className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-lowest/90 backdrop-blur-xl shadow-[0_-8px_32px_rgba(0,0,0,0.5)] pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex justify-around items-center h-16 px-2">
          {[
            { label: 'Atelier', Icon: Flower2, onClick: () => onNavigate('home'), current: active === 'home' },
            { label: 'Collections', Icon: LayoutGrid, onClick: () => onNavigate('shop'), current: active === 'shop' },
            { label: 'Quiz', Icon: Compass, onClick: () => onNavigate('quiz'), current: false },
            { label: 'Vault', Icon: Heart, onClick: () => setIsAccountOpen(true), current: false },
            { label: 'Bag', Icon: ShoppingBag, onClick: () => setIsCartOpen(true), current: false }
          ].map(({ label, Icon, onClick, current }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              aria-current={current ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-colors cursor-pointer ${
                current ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <Icon className="w-[22px] h-[22px]" strokeWidth={1.5} />
              <span className="text-[9px] font-semibold tracking-widest uppercase">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};
