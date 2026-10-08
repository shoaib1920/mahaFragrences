import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DivineTrioSection } from './components/DivineTrioSection';
import { DuskBleuSpotlight } from './components/DuskBleuSpotlight';
import { BrandStorySection } from './components/BrandStorySection';
import { FragranceWardrobeSection } from './components/FragranceWardrobeSection';
import { ConsultationTeaserSection } from './components/ConsultationTeaserSection';
import { JournalPreviewSection } from './components/JournalPreviewSection';
import { Footer } from './components/Footer';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ShopCollection } from './components/ShopCollection';
import { ScentFinderModal } from './components/ScentFinderModal';
import { ConsultationModal } from './components/ConsultationModal';
import { NotesExplorer } from './components/NotesExplorer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { JournalModal } from './components/JournalModal';
import { Product } from './types';

function MainApp() {
  const {
    setIsCheckoutOpen,
    setIsScentFinderOpen
  } = useStore();

  const [currentView, setCurrentView] = useState<'home' | 'shop'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedJournalArticleId, setSelectedJournalArticleId] = useState<string | null>(null);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
  };

  const handleOpenJournalArticle = (articleId: string) => {
    setSelectedJournalArticleId(articleId);
    setIsJournalModalOpen(true);
  };

  const handleViewAllJournal = () => {
    setSelectedJournalArticleId(null);
    setIsJournalModalOpen(true);
  };

  const handleNavigateHome = () => {
    setSelectedProduct(null);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateShop = () => {
    setSelectedProduct(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateDivineTrio = () => {
    setSelectedProduct(null);
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('divine-trio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateDuskBleu = () => {
    setSelectedProduct(null);
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('dusk-bleu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0E0B0C] text-[#F7F2EA] flex flex-col font-sans selection:bg-[#C9A66B]/30 selection:text-[#F7F2EA]">
      <Header
        onNavigateHome={handleNavigateHome}
        onNavigateShop={handleNavigateShop}
        onNavigateDivineTrio={handleNavigateDivineTrio}
        onNavigateDuskBleu={handleNavigateDuskBleu}
        onNavigateJournal={handleViewAllJournal}
      />

      <main className="flex-1">
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={handleBackFromProduct}
            onSelectProduct={handleSelectProduct}
          />
        ) : currentView === 'shop' ? (
          <ShopCollection
            onSelectProduct={handleSelectProduct}
            onBackToHome={handleNavigateHome}
          />
        ) : (
          <>
            <Hero onExploreCollection={handleNavigateShop} />

            <DivineTrioSection onSelectProduct={handleSelectProduct} />

            {/* Scent finder teaser */}
            <div className="bg-[#1C1217] border-y border-[#2A1621] py-14 px-4 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F7F2EA] font-light">
                  Not sure where to begin?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#E9E0D2]/75 font-light leading-relaxed">
                  Answer six quick questions about mood, weather and how strong you like your
                  perfume, and we'll suggest where to start.
                </p>
                <button
                  onClick={() => setIsScentFinderOpen(true)}
                  className="mt-6 px-8 py-3 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shadow-xl inline-flex items-center gap-2"
                >
                  <span>Take the Scent Quiz</span>
                </button>
              </div>
            </div>

            <DuskBleuSpotlight onSelectProduct={handleSelectProduct} />

            <BrandStorySection onOpenJournal={handleViewAllJournal} />

            {/* Solid perfumes, candles, hair mist and gift sets */}
            <FragranceWardrobeSection onSelectProduct={handleSelectProduct} />

            <ConsultationTeaserSection />

            <JournalPreviewSection
              onOpenArticle={handleOpenJournalArticle}
              onViewAllJournal={handleViewAllJournal}
            />
          </>
        )}
      </main>

      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateShop={handleNavigateShop}
        onNavigateJournal={handleViewAllJournal}
      />

      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
      <ScentFinderModal onSelectProduct={handleSelectProduct} />
      <ConsultationModal />
      <NotesExplorer onSelectProduct={handleSelectProduct} />
      <CheckoutModal />
      <AccountModal />
      {isJournalModalOpen && (
        <JournalModal
          initialArticleId={selectedJournalArticleId}
          onClose={() => setIsJournalModalOpen(false)}
          onSelectProduct={handleSelectProduct}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
