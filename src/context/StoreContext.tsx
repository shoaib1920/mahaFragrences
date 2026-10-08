import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ConsultationBooking, ScentQuizResult } from '../types';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface StoreContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  hasFreeShipping: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;

  userProfile: UserProfile;
  updateUserProfile: (data: Partial<UserProfile>) => void;

  scentProfile: ScentQuizResult[] | null;
  saveScentProfile: (results: ScentQuizResult[]) => void;

  consultations: ConsultationBooking[];
  addConsultation: (booking: ConsultationBooking) => void;
  cancelConsultation: (id: string) => void;

  // Modals
  isScentFinderOpen: boolean;
  setIsScentFinderOpen: (open: boolean) => void;
  isConsultationOpen: boolean;
  setIsConsultationOpen: (open: boolean) => void;
  isNotesExplorerOpen: boolean;
  setIsNotesExplorerOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_LIMIT = 3000;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maha_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('maha_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const empty: UserProfile = { name: '', email: '', phone: '', address: '', city: 'Karachi' };
    try {
      const saved = localStorage.getItem('maha_user_profile');
      return saved ? JSON.parse(saved) : empty;
    } catch {
      return empty;
    }
  });

  const [scentProfile, setScentProfile] = useState<ScentQuizResult[] | null>(() => {
    try {
      const saved = localStorage.getItem('maha_scent_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [consultations, setConsultations] = useState<ConsultationBooking[]>(() => {
    try {
      const saved = localStorage.getItem('maha_consultations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isScentFinderOpen, setIsScentFinderOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isNotesExplorerOpen, setIsNotesExplorerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('maha_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('maha_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('maha_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    if (scentProfile) {
      localStorage.setItem('maha_scent_profile', JSON.stringify(scentProfile));
    }
  }, [scentProfile]);

  useEffect(() => {
    localStorage.setItem('maha_consultations', JSON.stringify(consultations));
  }, [consultations]);

  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVolume: variant || product.volume }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_LIMIT - cartTotal);
  const hasFreeShipping = cartTotal >= FREE_SHIPPING_LIMIT;

  const updateUserProfile = (data: Partial<StoreContextType['userProfile']>) => {
    setUserProfile(prev => ({ ...prev, ...data }));
  };

  const saveScentProfile = (results: ScentQuizResult[]) => {
    setScentProfile(results);
  };

  const addConsultation = (booking: ConsultationBooking) => {
    setConsultations(prev => [booking, ...prev]);
  };

  const cancelConsultation = (id: string) => {
    setConsultations(prev =>
      prev.map(c => c.id === id ? { ...c, status: 'cancelled' } : c)
    );
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        freeShippingThreshold: FREE_SHIPPING_LIMIT,
        freeShippingRemaining,
        hasFreeShipping,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        language,
        setLanguage,
        userProfile,
        updateUserProfile,
        scentProfile,
        saveScentProfile,
        consultations,
        addConsultation,
        cancelConsultation,
        isScentFinderOpen,
        setIsScentFinderOpen,
        isConsultationOpen,
        setIsConsultationOpen,
        isNotesExplorerOpen,
        setIsNotesExplorerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
