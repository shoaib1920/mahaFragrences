import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CITIES_DELIVERY } from '../data/products';
import { X, Check, CreditCard, Banknote, Smartphone } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    hasFreeShipping,
    clearCart,
    userProfile
  } = useStore();

  const [fullName, setFullName] = useState(userProfile.name || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [phone, setPhone] = useState(userProfile.phone || '');
  const [address, setAddress] = useState(userProfile.address || '');
  const [city, setCity] = useState(userProfile.city || 'Karachi');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'card'>('cod');
  const [giftNote, setGiftNote] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  if (!isCheckoutOpen) return null;

  const deliveryFee = hasFreeShipping ? 0 : 250;
  const finalPayable = cartTotal + deliveryFee;
  const deliveryEstimate = CITIES_DELIVERY.find(c => c.city === city)?.estimate ?? '2–4 Working Days';

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `MF-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderTotal(finalPayable);
    setIsOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0B0C]/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#140F11] border border-[#2A1621] shadow-2xl p-6 sm:p-10 text-[#F7F2EA] my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#2A1621]">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#F7F2EA] font-light">
            Checkout
          </h2>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 text-[#E9E0D2]/70 hover:text-[#F7F2EA] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isOrderPlaced ? (
          <form onSubmit={handlePlaceOrder} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C9A66B] mb-3 font-medium">
                  1. Delivery Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      required
                      className="w-full bg-[#0E0B0C] border border-[#2A1621] p-3 text-xs text-[#F7F2EA] outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      required
                      className="w-full bg-[#0E0B0C] border border-[#2A1621] p-3 text-xs text-[#F7F2EA] outline-none focus:border-[#C9A66B]"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Mobile number"
                      required
                      className="w-full bg-[#0E0B0C] border border-[#2A1621] p-3 text-xs text-[#F7F2EA] outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House / flat, street, area"
                      required
                      className="w-full bg-[#0E0B0C] border border-[#2A1621] p-3 text-xs text-[#F7F2EA] outline-none focus:border-[#C9A66B]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#0E0B0C] border border-[#2A1621] p-3 text-xs text-[#F7F2EA] outline-none focus:border-[#C9A66B]"
                    >
                      {CITIES_DELIVERY.map(c => (
                        <option key={c.city} value={c.city}>
                          {c.city}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      defaultValue="Pakistan"
                      disabled
                      className="w-full bg-[#0E0B0C]/50 border border-[#2A1621] p-3 text-xs text-[#E9E0D2]/50 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C9A66B] mb-3 font-medium">
                  2. Payment Method
                </h3>
                <div className="space-y-2.5">
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-between p-3.5 border transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#C9A66B] bg-[#2A1621]/60'
                        : 'border-[#2A1621] bg-[#0E0B0C]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Banknote className="w-4 h-4 text-[#C9A66B]" />
                      <div>
                        <span className="text-xs font-medium block">Cash on Delivery</span>
                        <span className="text-[10px] text-[#E9E0D2]/60 block">Pay the rider when your order arrives</span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`flex items-center justify-between p-3.5 border transition-all cursor-pointer ${
                      paymentMethod === 'jazzcash'
                        ? 'border-[#C9A66B] bg-[#2A1621]/60'
                        : 'border-[#2A1621] bg-[#0E0B0C]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-[#C9A66B]" />
                      <div>
                        <span className="text-xs font-medium block">JazzCash</span>
                        <span className="text-[10px] text-[#E9E0D2]/60 block">Pay from your JazzCash account</span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`flex items-center justify-between p-3.5 border transition-all cursor-pointer ${
                      paymentMethod === 'easypaisa'
                        ? 'border-[#C9A66B] bg-[#2A1621]/60'
                        : 'border-[#2A1621] bg-[#0E0B0C]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-[#C9A66B]" />
                      <div>
                        <span className="text-xs font-medium block">Easypaisa</span>
                        <span className="text-[10px] text-[#E9E0D2]/60 block">Pay from your Easypaisa account</span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-3.5 border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#C9A66B] bg-[#2A1621]/60'
                        : 'border-[#2A1621] bg-[#0E0B0C]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-[#C9A66B]" />
                      <div>
                        <span className="text-xs font-medium block">Credit / Debit Card</span>
                        <span className="text-[10px] text-[#E9E0D2]/60 block">Visa, Mastercard, PayPak</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C9A66B] mb-2 font-medium">
                  3. Gift Note (Optional)
                </h3>
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Sending this as a gift? Add a message for the card."
                  rows={2}
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-3 text-xs text-[#F7F2EA] outline-none focus:border-[#C9A66B] resize-none"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#0E0B0C] border border-[#2A1621] p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#C9A66B] mb-4 font-medium">
                  Order Summary
                </h3>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#C9A66B] font-medium">{item.quantity}×</span>
                        <span className="text-[#F7F2EA]">{item.product.name}</span>
                        <span className="text-[10px] text-[#E9E0D2]/50">({item.product.volume})</span>
                      </div>
                      <span className="font-serif-luxury text-sm">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#2A1621] space-y-2 text-xs text-[#E9E0D2]/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#C9A66B]">
                      {hasFreeShipping ? 'Free' : `Rs. ${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivering to</span>
                    <span>{city}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif-luxury text-[#F7F2EA] pt-3 border-t border-[#2A1621]">
                    <span>Total</span>
                    <span>Rs. {finalPayable.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Place Order · Rs. {finalPayable.toLocaleString()}</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#2A1621] border border-[#C9A66B] flex items-center justify-center text-[#C9A66B]">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F7F2EA] font-light">
                Thank you{fullName ? `, ${fullName}` : ''}
              </h3>
              <p className="text-xs text-[#E9E0D2]/70 font-light mt-2 max-w-md mx-auto">
                Your order number is <strong className="text-[#C9A66B]">{orderId}</strong>.
                We'll get it packed and on its way to {city}.
              </p>
            </div>

            <div className="p-4 bg-[#0E0B0C] border border-[#2A1621] max-w-sm mx-auto text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#E9E0D2]/50">Payment:</span>
                <span className="uppercase text-[#C9A66B] font-medium">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E9E0D2]/50">Total:</span>
                <span className="text-[#F7F2EA] font-medium">Rs. {orderTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E9E0D2]/50">Estimated delivery:</span>
                <span className="text-[#F7F2EA]">{deliveryEstimate}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOrderPlaced(false);
                setIsCheckoutOpen(false);
              }}
              className="px-8 py-3 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
