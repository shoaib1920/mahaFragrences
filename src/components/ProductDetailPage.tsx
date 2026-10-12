import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CITIES_DELIVERY } from '../data/products';
import { Heart, Plus, Minus, Calendar, ArrowLeft, Share2, Check, MapPin } from 'lucide-react';
import { ProductVisual } from './ProductVisual';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (p: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onSelectProduct
}) => {
  const { addToCart, wishlist, toggleWishlist, setIsConsultationOpen, setIsCheckoutOpen } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [activeNoteInfo, setActiveNoteInfo] = useState<string | null>(null);
  const [addedNotice, setAddedNotice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isFavorited = wishlist.includes(product.id);
  const deliveryInfo = CITIES_DELIVERY.find(c => c.city === selectedCity) || CITIES_DELIVERY[0];

  const pairingProducts = PRODUCTS.filter(p => product.pairingProductIds?.includes(p.id));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="min-h-screen text-[#eee0d8] transition-colors duration-1000 pt-32 pb-28 lg:pb-10 relative"
      style={{
        background: `radial-gradient(circle at 50% 20%, ${product.accentTheme.primary}25 0%, #18120e 70%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-8 border-b border-[#3b332e]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#e5c497] hover:text-[#eee0d8] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={handleShare}
              className="text-[#d1c5b7]/70 hover:text-[#e5c497] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="text-[#d1c5b7]/70 hover:text-[#e5c497] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Heart
                className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#e5c497] text-[#e5c497]' : ''}`}
              />
              <span>{isFavorited ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-10">
          {/* Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <ProductVisual product={product} className="aspect-[4/5] w-full rounded-lg border border-[#3b332e]" />
          </div>

          {/* Details */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#e5c497] font-light">
              <span>{product.family}</span>
              <span aria-hidden="true">·</span>
              <span>{product.volume}</span>
              <span aria-hidden="true">·</span>
              <span>{product.concentration}</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#eee0d8] font-light mt-1">
              {product.name}
            </h1>

            <p className="font-serif-luxury italic text-xl text-[#e5c497] mt-1">
              {product.character}
            </p>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="font-serif-luxury text-3xl sm:text-4xl text-[#eee0d8]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#d1c5b7]/40 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-[11px] text-[#e5c497] uppercase tracking-wider font-light">
                {product.price >= 3000 ? 'Free Shipping' : 'Free Shipping Above Rs. 3,000'}
              </span>
            </div>

            <p className="mt-6 text-sm text-[#d1c5b7]/80 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Delivery estimate */}
            <div className="mt-8 p-4 bg-[#251e1a] border border-[#3b332e] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#e5c497] uppercase tracking-wider text-[10px]">
                  <MapPin className="w-3.5 h-3.5" />
                  Deliver to
                </span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-[#18120e] border border-[#3b332e] text-xs text-[#eee0d8] px-2 py-1 outline-none cursor-pointer"
                >
                  {CITIES_DELIVERY.map(c => (
                    <option key={c.city} value={c.city} className="bg-[#18120e] text-[#eee0d8]">
                      {c.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between text-xs text-[#d1c5b7]/80 pt-1">
                <span>Arrives in: <strong className="text-[#eee0d8] font-medium">{deliveryInfo.estimate}</strong></span>
                <span className="text-[#e5c497]">
                  {deliveryInfo.codAvailable ? 'Cash on Delivery available' : 'Prepaid only'}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#3b332e] bg-[#251e1a]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-[#d1c5b7]/70 hover:text-[#e5c497] transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-[#d1c5b7]/70 hover:text-[#e5c497] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-[#e5c497] hover:bg-[#ffddb0] text-[#18120e] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart · Rs. {(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 border border-[#eee0d8]/40 hover:border-[#e5c497] text-[#eee0d8] hover:text-[#e5c497] text-xs uppercase tracking-[0.2em] transition-all cursor-pointer font-medium"
              >
                Buy Now
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-[#3b332e] flex items-center justify-between text-xs">
              <span className="text-[#d1c5b7]/70 font-light">Not sure it's the one for you?</span>
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="text-[#e5c497] hover:underline font-medium flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Consultation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-24 pt-16 border-t border-[#3b332e]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#eee0d8] font-light">
              Notes
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c5b7]/70 font-light mt-2">
              A perfume changes as it settles on your skin. Here is what you'll smell, and when.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#251e1a] border border-[#3b332e] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#e5c497] font-medium block mb-1">
                  First 15 minutes
                </span>
                <h3 className="font-serif-luxury text-xl text-[#eee0d8] mb-3">
                  Top Notes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.notes.top.map(note => (
                    <button
                      key={note}
                      onClick={() => setActiveNoteInfo(`${note} is a top note: you'll notice it straight after spraying, and it fades first.`)}
                      className="px-2.5 py-1 bg-[#3b332e]/80 hover:bg-[#e5c497] hover:text-[#18120e] text-xs text-[#d1c5b7] transition-colors cursor-pointer"
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-[#d1c5b7]/50 font-light mt-6">
                What you smell first. Light and quick to fade.
              </p>
            </div>

            <div className="p-6 bg-[#251e1a] border border-[#e5c497]/30 flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#e5c497] font-medium block mb-1">
                  30 minutes to 2 hours
                </span>
                <h3 className="font-serif-luxury text-xl text-[#eee0d8] mb-3">
                  Heart Notes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.notes.heart.map(note => (
                    <button
                      key={note}
                      onClick={() => setActiveNoteInfo(`${note} is a heart note: it comes through once the top notes settle.`)}
                      className="px-2.5 py-1 bg-[#3b332e]/80 hover:bg-[#e5c497] hover:text-[#18120e] text-xs text-[#d1c5b7] transition-colors cursor-pointer"
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-[#d1c5b7]/50 font-light mt-6">
                The main character of the perfume once it settles.
              </p>
            </div>

            <div className="p-6 bg-[#251e1a] border border-[#3b332e] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#e5c497] font-medium block mb-1">
                  2 hours onwards
                </span>
                <h3 className="font-serif-luxury text-xl text-[#eee0d8] mb-3">
                  Base Notes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.notes.base.map(note => (
                    <button
                      key={note}
                      onClick={() => setActiveNoteInfo(`${note} is a base note: it's what stays on your skin and clothes the longest.`)}
                      className="px-2.5 py-1 bg-[#3b332e]/80 hover:bg-[#e5c497] hover:text-[#18120e] text-xs text-[#d1c5b7] transition-colors cursor-pointer"
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-[#d1c5b7]/50 font-light mt-6">
                What lingers on skin and clothes at the end of the day.
              </p>
            </div>
          </div>

          {activeNoteInfo && (
            <div className="max-w-2xl mx-auto mt-6 p-4 bg-[#3b332e]/60 border border-[#e5c497]/40 text-center text-xs text-[#e5c497]">
              {activeNoteInfo}
            </div>
          )}
        </div>

        {/* Wear profile */}
        <div className="mt-20 p-8 bg-[#251e1a] border border-[#3b332e]">
          <h3 className="font-serif-luxury text-2xl text-[#eee0d8] mb-6 font-light">
            How It Wears
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-xs">
            <div>
              <div className="flex justify-between mb-1.5 text-[11px] uppercase tracking-wider text-[#d1c5b7]/70">
                <span>Longevity</span>
                <span className="text-[#e5c497]">{product.moodMeters.longevity}/5</span>
              </div>
              <div className="h-1.5 bg-[#18120e] overflow-hidden">
                <div
                  className="h-full bg-[#e5c497]"
                  style={{ width: `${(product.moodMeters.longevity / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-[11px] uppercase tracking-wider text-[#d1c5b7]/70">
                <span>Projection</span>
                <span className="text-[#e5c497]">{product.moodMeters.projection}/5</span>
              </div>
              <div className="h-1.5 bg-[#18120e] overflow-hidden">
                <div
                  className="h-full bg-[#e5c497]"
                  style={{ width: `${(product.moodMeters.projection / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-[11px] uppercase tracking-wider text-[#d1c5b7]/70">
                <span>Freshness</span>
                <span className="text-[#e5c497]">{product.moodMeters.freshness}/5</span>
              </div>
              <div className="h-1.5 bg-[#18120e] overflow-hidden">
                <div
                  className="h-full bg-[#e5c497]"
                  style={{ width: `${(product.moodMeters.freshness / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-[11px] uppercase tracking-wider text-[#d1c5b7]/70">
                <span>Warmth</span>
                <span className="text-[#e5c497]">{product.moodMeters.warmth}/5</span>
              </div>
              <div className="h-1.5 bg-[#18120e] overflow-hidden">
                <div
                  className="h-full bg-[#e5c497]"
                  style={{ width: `${(product.moodMeters.warmth / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 text-[11px] uppercase tracking-wider text-[#d1c5b7]/70">
                <span>Sweetness</span>
                <span className="text-[#e5c497]">{product.moodMeters.sweetness}/5</span>
              </div>
              <div className="h-1.5 bg-[#18120e] overflow-hidden">
                <div
                  className="h-full bg-[#e5c497]"
                  style={{ width: `${(product.moodMeters.sweetness / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#3b332e] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#d1c5b7]/80">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#e5c497] block">Weather</span>
              <p className="mt-0.5 font-light">{product.bestFor.weather}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#e5c497] block">Occasion</span>
              <p className="mt-0.5 font-light">{product.bestFor.occasion}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#e5c497] block">Time of Day</span>
              <p className="mt-0.5 font-light">{product.bestFor.timeOfDay}</p>
            </div>
          </div>
        </div>

        {/* Pairs well with */}
        {pairingProducts.length > 0 && (
          <div className="mt-20">
            <h3 className="font-serif-luxury text-3xl text-[#eee0d8] font-light">
              Pairs Well With
            </h3>
            <p className="text-xs text-[#d1c5b7]/70 font-light mt-1 mb-8">
              The same scent in other forms, for layering or gifting.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pairingProducts.map(pair => (
                <div
                  key={pair.id}
                  onClick={() => onSelectProduct(pair)}
                  className="p-5 bg-[#251e1a] border border-[#3b332e] hover:border-[#e5c497]/50 transition-all cursor-pointer flex gap-4 items-center group"
                >
                  <ProductVisual product={pair} className="w-16 h-20 shrink-0 rounded" />
                  <div className="flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#e5c497] block">
                      {pair.concentration}
                    </span>
                    <h4 className="font-serif-luxury text-lg text-[#eee0d8] group-hover:text-[#e5c497] transition-colors">
                      {pair.name}
                    </h4>
                    <span className="text-xs font-serif-luxury text-[#d1c5b7] block mt-1">
                      Rs. {pair.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
