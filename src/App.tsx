import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header, NavKey } from './components/Header';
import { Home } from './components/Home';
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
  const { setIsCheckoutOpen } = useStore();

  const [currentView, setCurrentView] = useState<'home' | 'shop'>('home');
  const [shopPreset, setShopPreset] = useState({ family: 'All', type: 'All' });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    scrollTop();
  };

  const openShop = (family: string = 'All', type: string = 'All') => {
    setSelectedProduct(null);
    setShopPreset({ family, type });
    setCurrentView('shop');
    scrollTop();
  };

  const goHome = (sectionId?: string) => {
    setSelectedProduct(null);
    setCurrentView('home');
    if (!sectionId) {
      scrollTop();
      return;
    }
    // Wait for the home sections to mount when coming from another view
    setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleNavigate = (key: NavKey) => {
    if (key === 'home') goHome();
    else if (key === 'shop') openShop();
    else if (key === 'quiz') goHome('discovery-quiz');
    else if (key === 'contact') document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    else goHome(key);
  };

  const onShopPages = selectedProduct !== null || currentView === 'shop';

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans selection:bg-primary-container selection:text-on-primary-container">
      <Header
        active={onShopPages ? 'shop' : 'home'}
        onNavigate={handleNavigate}
        onOpenShop={openShop}
        onNavigateJournal={() => setIsJournalOpen(true)}
      />

      <main className="flex-1 flex flex-col">
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onSelectProduct={handleSelectProduct}
          />
        ) : currentView === 'shop' ? (
          <ShopCollection
            key={`${shopPreset.family}|${shopPreset.type}`}
            initialFamily={shopPreset.family}
            initialType={shopPreset.type}
            onSelectProduct={handleSelectProduct}
            onBackToHome={() => goHome()}
          />
        ) : (
          <div className="pt-[5.75rem]">
            <Home
              onSelectProduct={handleSelectProduct}
              onShopAll={() => openShop()}
              onSelectFamily={family => openShop(family)}
            />
          </div>
        )}
      </main>

      <div className="pb-16 lg:pb-0 bg-surface-lowest">
        <Footer onNavigate={handleNavigate} onNavigateJournal={() => setIsJournalOpen(true)} />
      </div>

      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
      <ScentFinderModal onSelectProduct={handleSelectProduct} />
      <ConsultationModal />
      <NotesExplorer onSelectProduct={handleSelectProduct} />
      <CheckoutModal />
      <AccountModal />
      {isJournalOpen && (
        <JournalModal
          onClose={() => setIsJournalOpen(false)}
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
