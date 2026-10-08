import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Home, Compass, Calendar, User, Menu, X, Globe } from 'lucide-react';
import { BRAND, whatsappUrl, whatsappDisplay } from '../config/brand';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateDivineTrio: () => void;
  onNavigateDuskBleu: () => void;
  onNavigateJournal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateDivineTrio,
  onNavigateDuskBleu,
  onNavigateJournal
}) => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    language,
    setLanguage,
    setIsScentFinderOpen,
    setIsConsultationOpen,
    setIsNotesExplorerOpen,
    setIsAccountOpen
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#2A1621] text-[#F7F2EA] text-[10px] tracking-[0.25em] uppercase py-2 px-4 text-center border-b border-[#C9A66B]/15 relative z-40 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline text-[#C9A66B] font-light">
            Cash on Delivery Nationwide
          </span>
          <span className="mx-auto sm:mx-0 font-medium text-[#F7F2EA]/90">
            Free Shipping on Orders Above Rs. 3,000
          </span>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="text-[#C9A66B] hover:text-[#F7F2EA] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'en' ? 'اردو' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0E0B0C]/90 backdrop-blur-md py-3.5 border-b border-[#C9A66B]/20 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#F7F2EA] hover:text-[#C9A66B] transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Left Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] uppercase tracking-[0.22em] text-[#F7F2EA]/80 font-light">
            <button
              onClick={onNavigateShop}
              className="hover:text-[#C9A66B] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all"
            >
              Perfumes
            </button>
            <button
              onClick={onNavigateDivineTrio}
              className="hover:text-[#C9A66B] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all"
            >
              The Divine Trio
            </button>
            <button
              onClick={onNavigateDuskBleu}
              className="hover:text-[#C9A66B] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all text-[#8FB3C7]/90"
            >
              Dusk BLEU
            </button>
            <button
              onClick={() => setIsScentFinderOpen(true)}
              className="hover:text-[#C9A66B] transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A66B] hover:after:w-full after:transition-all"
            >
              Scent Quiz
            </button>
          </nav>

          {/* Logo */}
          <div
            onClick={onNavigateHome}
            className="cursor-pointer text-center select-none group flex flex-col items-center"
          >
            <span className="font-serif-luxury text-xl sm:text-2xl md:text-3xl tracking-[0.22em] uppercase text-[#F7F2EA] group-hover:text-[#C9A66B] transition-colors font-light">
              {BRAND.shortName}
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.45em] uppercase text-[#C9A66B] font-light -mt-0.5">
              Fragrances
            </span>
          </div>

          {/* Right navigation */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsNotesExplorerOpen(true)}
              className="hidden lg:inline-block text-[11px] uppercase tracking-[0.2em] text-[#F7F2EA]/70 hover:text-[#C9A66B] transition-colors cursor-pointer"
            >
              Notes
            </button>

            <button
              onClick={onNavigateJournal}
              className="hidden lg:inline-block text-[11px] uppercase tracking-[0.2em] text-[#F7F2EA]/70 hover:text-[#C9A66B] transition-colors cursor-pointer"
            >
              Journal
            </button>

            <button
              onClick={() => setIsConsultationOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#C9A66B]/50 text-[10px] uppercase tracking-[0.2em] text-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#0E0B0C] transition-all cursor-pointer rounded-xs"
            >
              <Calendar className="w-3 h-3" />
              <span>Book a Consultation</span>
            </button>

            <button
              onClick={() => setIsAccountOpen(true)}
              className="p-1.5 text-[#F7F2EA]/80 hover:text-[#C9A66B] transition-colors cursor-pointer"
              title="Account"
            >
              <User className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAccountOpen(true)}
              className="relative p-1.5 text-[#F7F2EA]/80 hover:text-[#C9A66B] transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#6B2D4F] text-[#F7F2EA] text-[9px] rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-[#F7F2EA] hover:text-[#C9A66B] transition-colors cursor-pointer flex items-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A66B] text-[#0E0B0C] text-[10px] font-semibold rounded-full flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0E0B0C] text-[#F7F2EA] flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[#C9A66B]/20 pb-4">
            <div>
              <p className="font-serif-luxury text-xl tracking-[0.2em] uppercase text-[#C9A66B]">
                {BRAND.name}
              </p>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#F7F2EA] hover:text-[#C9A66B]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-8 text-lg font-serif-luxury tracking-[0.1em]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
              }}
              className="text-left py-2 hover:text-[#C9A66B] border-b border-[#F7F2EA]/5"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateShop();
              }}
              className="text-left py-2 hover:text-[#C9A66B] border-b border-[#F7F2EA]/5"
            >
              Shop All
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateDivineTrio();
              }}
              className="text-left py-2 hover:text-[#C9A66B] border-b border-[#F7F2EA]/5"
            >
              The Divine Trio
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateDuskBleu();
              }}
              className="text-left py-2 hover:text-[#8FB3C7] border-b border-[#F7F2EA]/5"
            >
              Dusk BLEU
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsScentFinderOpen(true);
              }}
              className="text-left py-2 hover:text-[#C9A66B] border-b border-[#F7F2EA]/5"
            >
              Scent Quiz
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsNotesExplorerOpen(true);
              }}
              className="text-left py-2 hover:text-[#C9A66B] border-b border-[#F7F2EA]/5"
            >
              Notes Library
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateJournal();
              }}
              className="text-left py-2 hover:text-[#C9A66B] border-b border-[#F7F2EA]/5"
            >
              Journal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsConsultationOpen(true);
              }}
              className="text-left py-2 text-[#C9A66B] border-b border-[#F7F2EA]/5"
            >
              Book a Consultation
            </button>
          </div>

          <div className="mt-auto pt-6 border-t border-[#C9A66B]/20 flex flex-col gap-4 text-xs text-[#F7F2EA]/70">
            <div className="flex items-center justify-between">
              <span>Language:</span>
              <button
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                className="text-[#C9A66B] font-medium"
              >
                {language === 'en' ? 'اردو میں دیکھیں' : 'Switch to English'}
              </button>
            </div>
            {whatsappUrl && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  WhatsApp
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-sans text-[#F7F2EA] hover:text-[#C9A66B]"
                >
                  {whatsappDisplay}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0E0B0C]/95 backdrop-blur-md border-t border-[#C9A66B]/20 py-2 px-6 flex items-center justify-around text-[10px] uppercase tracking-wider">
        <button
          onClick={onNavigateHome}
          className="flex flex-col items-center gap-1 text-[#F7F2EA]/70 hover:text-[#C9A66B]"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setIsScentFinderOpen(true)}
          className="flex flex-col items-center gap-1 text-[#F7F2EA]/70 hover:text-[#C9A66B]"
        >
          <Compass className="w-4 h-4" />
          <span>Quiz</span>
        </button>
        <button
          onClick={() => setIsConsultationOpen(true)}
          className="flex flex-col items-center gap-1 text-[#F7F2EA]/70 hover:text-[#C9A66B]"
        >
          <Calendar className="w-4 h-4" />
          <span>Book</span>
        </button>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-[#F7F2EA]/70 hover:text-[#C9A66B]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#C9A66B] text-[#0E0B0C] text-[8px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setIsAccountOpen(true)}
          className="flex flex-col items-center gap-1 text-[#F7F2EA]/70 hover:text-[#C9A66B]"
        >
          <User className="w-4 h-4" />
          <span>Account</span>
        </button>
      </div>
    </>
  );
};
