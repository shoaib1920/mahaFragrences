import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { X, User, Download, Trash2, Check } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-[#0E0B0C]/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#140F11] border border-[#2A1621] shadow-2xl p-6 sm:p-8 text-[#F7F2EA] my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#2A1621]">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#C9A66B]" />
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light">
              My Account
            </h2>
          </div>
          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1 text-[#E9E0D2]/70 hover:text-[#F7F2EA] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#2A1621] my-4 gap-2 text-xs overflow-x-auto">
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
                  ? 'border-[#C9A66B] text-[#C9A66B] font-medium'
                  : 'border-transparent text-[#E9E0D2]/60 hover:text-[#F7F2EA]'
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
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#C9A66B] mb-1">
                Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="w-full bg-[#0E0B0C] border border-[#2A1621] p-2.5 text-xs text-[#F7F2EA] outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#2A1621]">
              <span className="text-[11px] text-[#E9E0D2]/50">Saved on this device only</span>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center gap-1.5"
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
              <div className="p-4 bg-[#1B1217] border border-[#C9A66B]/40">
                <div className="text-[10px] uppercase tracking-wider text-[#C9A66B] mb-2 font-medium">
                  Your scent quiz matches
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {scentProfile.map(item => (
                    <div key={item.product.id} className="p-2 bg-[#0E0B0C] border border-[#2A1621]">
                      <span className="font-serif-luxury text-sm block">{item.product.name}</span>
                      <span className="text-[10px] text-[#C9A66B]">{item.matchPercentage}% match</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#C9A66B] mb-3">
                Wishlist
              </h4>
              {wishlistedProducts.length === 0 ? (
                <p className="text-xs text-[#E9E0D2]/50">Nothing saved yet. Tap the heart on any product to add it here.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {wishlistedProducts.map(p => (
                    <div key={p.id} className="p-3 bg-[#0E0B0C] border border-[#2A1621] flex gap-3 items-center">
                      <img src={p.images.main} alt={p.name} className="w-12 h-16 object-cover bg-[#140F11]" />
                      <div className="flex-1">
                        <h5 className="font-serif-luxury text-sm">{p.name}</h5>
                        <span className="text-xs font-serif-luxury text-[#C9A66B]">Rs. {p.price.toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="mt-1 text-[10px] uppercase text-[#C9A66B] hover:underline block"
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
              <p className="text-xs text-[#E9E0D2]/50">No appointments booked yet.</p>
            ) : (
              consultations.map(cons => (
                <div key={cons.id} className="p-4 bg-[#0E0B0C] border border-[#2A1621] space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-[#C9A66B] uppercase font-bold">{cons.id}</span>
                    <span className="text-[10px] uppercase text-emerald-400 bg-[#2A1621] px-2 py-0.5">
                      {cons.status}
                    </span>
                  </div>
                  <h4 className="font-serif-luxury text-base text-[#F7F2EA]">{cons.location}</h4>
                  <p className="text-[#E9E0D2]/70">
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
          <div className="py-4 space-y-4 text-xs text-[#E9E0D2]/80 font-light">
            <div className="p-4 bg-[#0E0B0C] border border-[#2A1621] space-y-2">
              <h4 className="font-medium uppercase tracking-wider text-[11px] text-[#C9A66B]">
                Your data
              </h4>
              <p className="leading-relaxed">
                Your details, wishlist, quiz results and appointments are saved in this browser
                so you don't have to re-enter them. You can download a copy or delete everything
                below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#2A1621]">
              <button
                onClick={handleExportData}
                className="px-4 py-2.5 border border-[#C9A66B] text-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#0E0B0C] text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
