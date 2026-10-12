import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, Gift, ArrowRight, Truck, ShoppingBag } from 'lucide-react';
import { ProductVisual } from './ProductVisual';

const PROMO_CODES: Record<string, number> = {
  DIVINE10: 10,
  MAHAVIP: 15
};

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    freeShippingThreshold,
    freeShippingRemaining,
    hasFreeShipping,
    isCartOpen,
    setIsCartOpen
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [giftWrapping, setGiftWrapping] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    const percent = PROMO_CODES[code];
    if (percent) {
      setDiscountPercent(percent);
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setDiscountPercent(0);
      setPromoApplied(false);
      setPromoError(true);
    }
  };

  const giftWrapFee = giftWrapping ? 350 : 0;
  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = cartTotal - discountAmount + giftWrapFee;

  return (
    <div className="fixed inset-0 z-50 bg-[#18120e]/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#251e1a] border-l border-[#3b332e] text-[#eee0d8] flex flex-col h-full shadow-2xl">
        <div className="p-6 border-b border-[#3b332e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#e5c497]" />
            <h3 className="font-serif-luxury text-2xl font-light">Your Cart</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-[#d1c5b7]/70 hover:text-[#eee0d8] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress */}
        <div className="px-6 py-3 bg-[#302824] border-b border-[#3b332e] text-xs">
          <div className="flex items-center justify-between mb-1.5 font-light">
            <span className="flex items-center gap-1.5 text-[#e5c497]">
              <Truck className="w-3.5 h-3.5" />
              {hasFreeShipping ? (
                <strong className="font-medium text-[#e5c497]">You've got free shipping</strong>
              ) : (
                <span>Add Rs. {freeShippingRemaining.toLocaleString()} more for free shipping</span>
              )}
            </span>
          </div>
          <div className="h-1 bg-[#18120e] overflow-hidden">
            <div
              className="h-full bg-[#e5c497] transition-all duration-300"
              style={{
                width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%`
              }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center text-[#d1c5b7]/50">
              <ShoppingBag className="w-8 h-8 text-[#e5c497]/50 mb-3" />
              <p className="font-serif-luxury text-xl text-[#eee0d8]">Your cart is empty</p>
              <p className="text-xs text-[#d1c5b7]/60 mt-1 max-w-xs">
                Not sure where to start? The Divine Trio discovery set has all three perfumes in 15ml.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-2.5 border border-[#e5c497] text-[#e5c497] text-xs uppercase tracking-wider hover:bg-[#e5c497] hover:text-[#18120e] transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                className="p-3 bg-[#18120e] border border-[#3b332e] flex gap-3.5 items-center"
              >
                <ProductVisual product={item.product} className="w-16 h-20 shrink-0 rounded" />

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#e5c497] block">
                        {item.product.family} · {item.selectedVolume || item.product.volume}
                      </span>
                      <h4 className="font-serif-luxury text-base text-[#eee0d8]">
                        {item.product.name}
                      </h4>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#d1c5b7]/40 hover:text-rose-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#3b332e] bg-[#251e1a]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 text-xs text-[#d1c5b7]/60 hover:text-[#e5c497]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs text-[#d1c5b7]/60 hover:text-[#e5c497]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-serif-luxury text-base text-[#eee0d8]">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-[#3b332e] bg-[#302824] space-y-4">
            <label className="flex items-center gap-2.5 text-xs text-[#d1c5b7]/80 cursor-pointer">
              <input
                type="checkbox"
                checked={giftWrapping}
                onChange={(e) => setGiftWrapping(e.target.checked)}
                className="accent-[#e5c497]"
              />
              <Gift className="w-3.5 h-3.5 text-[#e5c497]" />
              <span>Add gift wrapping (+Rs. 350)</span>
            </label>

            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="flex-1 bg-[#18120e] border border-[#3b332e] px-3 py-1.5 text-xs text-[#eee0d8] outline-none uppercase"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#3b332e] hover:bg-[#e5c497] hover:text-[#18120e] text-[10px] uppercase tracking-wider text-[#e5c497] transition-colors"
              >
                Apply
              </button>
            </form>
            {promoApplied && (
              <p className="text-[10px] text-emerald-400">
                Code applied: {discountPercent}% off.
              </p>
            )}
            {promoError && (
              <p className="text-[10px] text-rose-400">That code isn't valid.</p>
            )}

            <div className="space-y-1 text-xs text-[#d1c5b7]/70 pt-2 border-t border-[#3b332e]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {cartTotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              {giftWrapping && (
                <div className="flex justify-between">
                  <span>Gift wrapping</span>
                  <span>+Rs. 350</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-[#e5c497]">
                  {hasFreeShipping ? 'Free' : 'Rs. 250'}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif-luxury text-[#eee0d8] pt-2 border-t border-[#3b332e]">
                <span>Total</span>
                <span>Rs. {(finalTotal + (hasFreeShipping ? 0 : 250)).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#e5c497] hover:bg-[#ffddb0] text-[#18120e] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[10px] text-[#d1c5b7]/50">
              Cash on Delivery · JazzCash · Easypaisa · Visa / Mastercard
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
