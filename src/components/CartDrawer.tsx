import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, Gift, ArrowRight, Truck, ShoppingBag } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-[#0E0B0C]/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#140F11] border-l border-[#2A1621] text-[#F7F2EA] flex flex-col h-full shadow-2xl">
        <div className="p-6 border-b border-[#2A1621] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#C9A66B]" />
            <h3 className="font-serif-luxury text-2xl font-light">Your Cart</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-[#E9E0D2]/70 hover:text-[#F7F2EA] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress */}
        <div className="px-6 py-3 bg-[#1A1217] border-b border-[#2A1621] text-xs">
          <div className="flex items-center justify-between mb-1.5 font-light">
            <span className="flex items-center gap-1.5 text-[#C9A66B]">
              <Truck className="w-3.5 h-3.5" />
              {hasFreeShipping ? (
                <strong className="font-medium text-[#C9A66B]">You've got free shipping</strong>
              ) : (
                <span>Add Rs. {freeShippingRemaining.toLocaleString()} more for free shipping</span>
              )}
            </span>
          </div>
          <div className="h-1 bg-[#0E0B0C] overflow-hidden">
            <div
              className="h-full bg-[#C9A66B] transition-all duration-300"
              style={{
                width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%`
              }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center text-[#E9E0D2]/50">
              <ShoppingBag className="w-8 h-8 text-[#C9A66B]/50 mb-3" />
              <p className="font-serif-luxury text-xl text-[#F7F2EA]">Your cart is empty</p>
              <p className="text-xs text-[#E9E0D2]/60 mt-1 max-w-xs">
                Not sure where to start? The Divine Trio discovery set has all three perfumes in 15ml.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-2.5 border border-[#C9A66B] text-[#C9A66B] text-xs uppercase tracking-wider hover:bg-[#C9A66B] hover:text-[#0E0B0C] transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                className="p-3 bg-[#0E0B0C] border border-[#2A1621] flex gap-3.5 items-center"
              >
                <img
                  src={item.product.images.main}
                  alt={item.product.name}
                  className="w-16 h-20 object-cover bg-[#161214] border border-[#2A1621]"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#C9A66B] block">
                        {item.product.family} · {item.selectedVolume || item.product.volume}
                      </span>
                      <h4 className="font-serif-luxury text-base text-[#F7F2EA]">
                        {item.product.name}
                      </h4>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#E9E0D2]/40 hover:text-rose-400 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#2A1621] bg-[#140F11]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 text-xs text-[#E9E0D2]/60 hover:text-[#C9A66B]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs text-[#E9E0D2]/60 hover:text-[#C9A66B]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-serif-luxury text-base text-[#F7F2EA]">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-[#2A1621] bg-[#1A1217] space-y-4">
            <label className="flex items-center gap-2.5 text-xs text-[#E9E0D2]/80 cursor-pointer">
              <input
                type="checkbox"
                checked={giftWrapping}
                onChange={(e) => setGiftWrapping(e.target.checked)}
                className="accent-[#C9A66B]"
              />
              <Gift className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>Add gift wrapping (+Rs. 350)</span>
            </label>

            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="flex-1 bg-[#0E0B0C] border border-[#2A1621] px-3 py-1.5 text-xs text-[#F7F2EA] outline-none uppercase"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#2A1621] hover:bg-[#C9A66B] hover:text-[#0E0B0C] text-[10px] uppercase tracking-wider text-[#C9A66B] transition-colors"
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

            <div className="space-y-1 text-xs text-[#E9E0D2]/70 pt-2 border-t border-[#2A1621]">
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
                <span className="text-[#C9A66B]">
                  {hasFreeShipping ? 'Free' : 'Rs. 250'}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif-luxury text-[#F7F2EA] pt-2 border-t border-[#2A1621]">
                <span>Total</span>
                <span>Rs. {(finalTotal + (hasFreeShipping ? 0 : 250)).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[10px] text-[#E9E0D2]/50">
              Cash on Delivery · JazzCash · Easypaisa · Visa / Mastercard
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
