import React from 'react';
import { useStore } from '../context/StoreContext';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { BRAND, whatsappUrl, whatsappDisplay } from '../config/brand';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateJournal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateJournal
}) => {
  const {
    setIsScentFinderOpen,
    setIsConsultationOpen,
    setIsNotesExplorerOpen,
    setIsAccountOpen
  } = useStore();

  const socials = [
    { href: BRAND.instagram, label: 'Instagram', Icon: Instagram },
    { href: BRAND.facebook, label: 'Facebook', Icon: Facebook },
    { href: BRAND.youtube, label: 'YouTube', Icon: Youtube }
  ].filter(s => s.href);

  return (
    <footer className="bg-[#090708] text-[#F7F2EA] border-t border-[#2A1621] relative pb-16 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <div onClick={onNavigateHome} className="cursor-pointer">
              <span className="font-serif-luxury text-2xl tracking-[0.2em] uppercase text-[#F7F2EA]">
                {BRAND.shortName}
              </span>
              <span className="block text-[9px] tracking-[0.35em] uppercase text-[#C9A66B] mt-0.5">
                Fragrances
              </span>
            </div>
            <p className="mt-4 text-xs text-[#E9E0D2]/70 font-light leading-relaxed max-w-sm">
              Eau de parfum, solid perfume, candles and gift sets. Free shipping across Pakistan
              on orders above Rs. 3,000.
            </p>

            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-4 text-[#F7F2EA]/70">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#C9A66B] transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}

            {whatsappUrl && (
              <div className="mt-4 text-xs text-[#E9E0D2]/60 font-light">
                <span>WhatsApp: </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#C9A66B] hover:underline"
                >
                  {whatsappDisplay}
                </a>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] mb-4 font-normal">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E9E0D2]/80 font-light">
              <li>
                <button onClick={onNavigateShop} className="hover:text-[#C9A66B] transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={onNavigateShop} className="hover:text-[#C9A66B] transition-colors">
                  Mystic Fall
                </button>
              </li>
              <li>
                <button onClick={onNavigateShop} className="hover:text-[#C9A66B] transition-colors">
                  Heavenly Divine
                </button>
              </li>
              <li>
                <button onClick={onNavigateShop} className="hover:text-[#C9A66B] transition-colors">
                  Forever Crush
                </button>
              </li>
              <li>
                <button onClick={onNavigateShop} className="hover:text-[#C9A66B] transition-colors">
                  Dusk BLEU
                </button>
              </li>
              <li>
                <button onClick={onNavigateShop} className="hover:text-[#C9A66B] transition-colors">
                  Solid Perfumes
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] mb-4 font-normal">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E9E0D2]/80 font-light">
              <li>
                <button onClick={() => setIsScentFinderOpen(true)} className="hover:text-[#C9A66B] transition-colors">
                  Scent Quiz
                </button>
              </li>
              <li>
                <button onClick={() => setIsNotesExplorerOpen(true)} className="hover:text-[#C9A66B] transition-colors">
                  Notes Library
                </button>
              </li>
              <li>
                <button onClick={() => setIsConsultationOpen(true)} className="hover:text-[#C9A66B] transition-colors">
                  Book a Consultation
                </button>
              </li>
              <li>
                <button onClick={onNavigateJournal} className="hover:text-[#C9A66B] transition-colors">
                  Journal
                </button>
              </li>
              <li>
                <button onClick={() => setIsAccountOpen(true)} className="hover:text-[#C9A66B] transition-colors">
                  Account & Wishlist
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] mb-4 font-normal">
              Help
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E9E0D2]/80 font-light">
              <li>
                <span className="text-[#E9E0D2]/60">Free shipping above Rs. 3,000</span>
              </li>
              <li>
                <span className="text-[#E9E0D2]/60">Cash on Delivery across Pakistan</span>
              </li>
              <li>
                <span className="text-[#E9E0D2]/60">JazzCash · Easypaisa · Cards</span>
              </li>
              {BRAND.email && (
                <li>
                  <a href={`mailto:${BRAND.email}`} className="hover:text-[#C9A66B] transition-colors">
                    {BRAND.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#2A1621] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E9E0D2]/50 font-light gap-4">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <span>Pakistan</span>
        </div>
      </div>
    </footer>
  );
};
