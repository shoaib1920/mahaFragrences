import React from 'react';
import { useStore } from '../context/StoreContext';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { BRAND, whatsappUrl, whatsappDisplay } from '../config/brand';
import { NavKey } from './Header';

interface FooterProps {
  onNavigate: (key: NavKey) => void;
  onNavigateJournal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onNavigateJournal }) => {
  const { setIsConsultationOpen, setIsNotesExplorerOpen, setIsAccountOpen } = useStore();

  const socials = [
    { href: BRAND.instagram, label: 'Instagram', Icon: Instagram },
    { href: BRAND.facebook, label: 'Facebook', Icon: Facebook },
    { href: BRAND.youtube, label: 'YouTube', Icon: Youtube }
  ].filter(s => s.href);

  const link = 'text-body-sm text-on-surface-variant hover:text-primary transition-colors text-left cursor-pointer';
  const heading = 'font-sans text-label-sm text-outline uppercase';

  return (
    <footer id="contact" className="bg-surface-lowest pt-20 pb-12">
      <div className="w-full max-w-7xl mx-auto px-5 md:px-10 lg:px-20 flex flex-col gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col gap-2">
            {BRAND.newsletterAction ? (
              <>
                <span className="text-label-sm text-primary uppercase">Private Previews</span>
                <h2 className="font-serif text-headline-md text-on-surface font-normal">The Atelier Gazette</h2>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  New releases, offers and salon invitations, sent to your inbox.
                </p>
                <form action={BRAND.newsletterAction} method="post" target="_blank" className="flex flex-col gap-1 mt-1 max-w-sm">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your email address"
                    aria-label="Email address"
                    className="bg-surface-low px-4 py-2 text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary rounded-[2px]"
                  />
                  <button type="submit" className="w-full py-2 bg-primary text-on-primary text-label-sm uppercase rounded-[2px] hover:bg-primary-fixed transition-colors cursor-pointer">
                    Subscribe
                  </button>
                </form>
              </>
            ) : (
              <>
                <span className="text-label-sm text-primary uppercase">The Art of Scent</span>
                <h2 className="font-serif text-headline-md text-on-surface font-normal">{BRAND.name}</h2>
                <p className="text-body-sm text-on-surface-variant leading-relaxed max-w-sm">
                  Fragrance as a memory, a mood and a personal signature.
                </p>
              </>
            )}
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-7">
            <div className="flex flex-col gap-1.5">
              <h3 className={heading}>Client Care</h3>
              <button type="button" onClick={() => setIsConsultationOpen(true)} className={link}>Book a Consultation</button>
              <button type="button" onClick={() => setIsAccountOpen(true)} className={link}>Account & Wishlist</button>
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className={link}>WhatsApp {whatsappDisplay}</a>
              )}
              {BRAND.email && <a href={`mailto:${BRAND.email}`} className={link}>{BRAND.email}</a>}
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className={heading}>Atelier</h3>
              <button type="button" onClick={() => onNavigate('about')} className={link}>Philosophy</button>
              <button type="button" onClick={() => onNavigate('shop')} className={link}>The Collection</button>
              <button type="button" onClick={onNavigateJournal} className={link}>Journal</button>
              <button type="button" onClick={() => setIsNotesExplorerOpen(true)} className={link}>Notes Library</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 bg-surface-low p-4 rounded-[2px]">
          <span className="text-label-sm text-primary uppercase">The Range</span>
          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            Four eau de parfums, with matching solid perfumes, a candle, a hair mist and gift sets.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-on-surface-variant pt-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {['Cash on Delivery', 'JazzCash', 'Easypaisa', 'Visa', 'Mastercard'].map(method => (
              <span key={method} className="text-label-sm tracking-[0.18em] text-outline uppercase">{method}</span>
            ))}
          </div>
          {socials.length > 0 && (
            <div className="flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="hover:text-primary transition-colors">
                  <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-[9px] font-semibold text-outline uppercase tracking-[0.22em]">
          © {new Date().getFullYear()} {BRAND.name} · All rights reserved
        </p>
      </div>
    </footer>
  );
};
