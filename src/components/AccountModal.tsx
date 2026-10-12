import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, User, Download, Trash2, Check } from 'lucide-react';
import { ProductVisual } from './ProductVisual';

export const AccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    userProfile,
    updateUserProfile,
    scentProfile,
    wishlist,
    consultations,
    cancelConsultation,
    addToCart
  } = useStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'wardrobe' | 'consultations' | 'privacy'>('profile');
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [address, setAddress] = useState(userProfile.address);
  const [city, setCity] = useState(userProfile.city);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAccountOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email, phone, address, city });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportData = () => {
    const data = {
      profile: userProfile,
      scentProfile,
      wishlist,
      consultations,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maha-fragrances-data-${Date.now()}.json`;
    a.click();
  };

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-[#18120e]/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#251e1a] border border-[#3b332e] shadow-2xl p-6 sm:p-8 text-[#eee0d8] my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#3b332e]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#e5c497]" />
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light">
              My Account
            </h2>
          </div>
          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1 text-[#d1c5b7]/70 hover:text-[#eee0d8] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#3b332e] my-4 gap-2 text-xs overflow-x-auto">
          {[
            { id: 'profile', label: 'My Details' },
            { id: 'wardrobe', label: `Wishlist (${wishlistedProducts.length})` },
            { id: 'consultations', label: `Appointments (${consultations.length})` },
            { id: 'privacy', label: 'Privacy' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-3 border-b-2 uppercase tracking-wider text-[11px] whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'border-[#e5c497] text-[#e5c497] font-medium'
                  : 'border-transparent text-[#d1c5b7]/60 hover:text-[#eee0d8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Details */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#e5c497] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#18120e] border border-[#3b332e] p-2.5 text-xs text-[#eee0d8] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#e5c497] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#18120e] border border-[#3b332e] p-2.5 text-xs text-[#eee0d8] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#e5c497] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#18120e] border border-[#3b332e] p-2.5 text-xs text-[#eee0d8] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#e5c497] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#18120e] border border-[#3b332e] p-2.5 text-xs text-[#eee0d8] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#e5c497] mb-1">
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="w-full bg-[#18120e] border border-[#3b332e] p-2.5 text-xs text-[#eee0d8] outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#3b332e]">
              <span className="text-[11px] text-[#d1c5b7]/50">Saved on this device only</span>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#e5c497] hover:bg-[#ffddb0] text-[#18120e] text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Wishlist */}
        {activeTab === 'wardrobe' && (
          <div className="py-4 space-y-6 max-h-96 overflow-y-auto">
            {scentProfile && (
              <div className="p-4 bg-[#302824] border border-[#e5c497]/40">
                <div className="text-[10px] uppercase tracking-wider text-[#e5c497] mb-2 font-medium">
                  Your scent quiz matches
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {scentProfile.map(item => (
                    <div key={item.product.id} className="p-2 bg-[#18120e] border border-[#3b332e]">
                      <span className="font-serif-luxury text-sm block">{item.product.name}</span>
                      <span className="text-[10px] text-[#e5c497]">{item.matchPercentage}% match</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#e5c497] mb-3">
                Wishlist
              </h4>
              {wishlistedProducts.length === 0 ? (
                <p className="text-xs text-[#d1c5b7]/50">Nothing saved yet. Tap the heart on any product to add it here.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {wishlistedProducts.map(p => (
                    <div key={p.id} className="p-3 bg-[#18120e] border border-[#3b332e] flex gap-3 items-center">
                      <ProductVisual product={p} className="w-12 h-16 shrink-0 rounded" />
                      <div className="flex-1">
                        <h5 className="font-serif-luxury text-sm">{p.name}</h5>
                        <span className="text-xs font-serif-luxury text-[#e5c497]">Rs. {p.price.toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="mt-1 text-[10px] uppercase text-[#e5c497] hover:underline block"
                        >
                          + Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Appointments */}
        {activeTab === 'consultations' && (
          <div className="py-4 space-y-3 max-h-96 overflow-y-auto">
            {consultations.length === 0 ? (
              <p className="text-xs text-[#d1c5b7]/50">No appointments booked yet.</p>
            ) : (
              consultations.map(cons => (
                <div key={cons.id} className="p-4 bg-[#18120e] border border-[#3b332e] space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-[#e5c497] uppercase font-bold">{cons.id}</span>
                    <span className="text-[10px] uppercase text-emerald-400 bg-[#3b332e] px-2 py-0.5">
                      {cons.status}
                    </span>
                  </div>
                  <h4 className="font-serif-luxury text-base text-[#eee0d8]">{cons.location}</h4>
                  <p className="text-[#d1c5b7]/70">
                    {cons.date} at {cons.time} ({cons.timezone})
                  </p>
                  {cons.status === 'confirmed' && (
                    <button
                      onClick={() => cancelConsultation(cons.id)}
                      className="text-rose-400 text-[10px] uppercase hover:underline pt-2 block"
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Privacy */}
        {activeTab === 'privacy' && (
          <div className="py-4 space-y-4 text-xs text-[#d1c5b7]/80 font-light">
            <div className="p-4 bg-[#18120e] border border-[#3b332e] space-y-2">
              <h4 className="font-medium uppercase tracking-wider text-[11px] text-[#e5c497]">
                Your data
              </h4>
              <p className="leading-relaxed">
                Your details, wishlist, quiz results and appointments are saved in this browser
                so you don't have to re-enter them. You can download a copy or delete everything
                below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#3b332e]">
              <button
                onClick={handleExportData}
                className="px-4 py-2.5 border border-[#e5c497] text-[#e5c497] hover:bg-[#e5c497] hover:text-[#18120e] text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download My Data</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Delete your saved details, wishlist and appointments from this device?')) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="px-4 py-2.5 border border-rose-800 text-rose-400 hover:bg-rose-950 text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete My Data</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
