import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Plus, Check, ArrowRight } from 'lucide-react';

interface DuskBleuSpotlightProps {
  onSelectProduct: (product: Product) => void;
}

export const DuskBleuSpotlight: React.FC<DuskBleuSpotlightProps> = ({ onSelectProduct }) => {
  const { addToCart } = useStore();
  const [isAdded, setIsAdded] = useState(false);

  const duskBleu = PRODUCTS.find(p => p.id === 'dusk-bleu-edp')!;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(duskBleu, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <section id="dusk-bleu" className="relative py-28 sm:py-36 bg-[#0B1422] text-[#F7F2EA] overflow-hidden border-y border-[#1E304B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            onClick={() => onSelectProduct(duskBleu)}
            className="lg:col-span-6 relative group cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0A121E] border border-[#1E304B] shadow-2xl">
              <img
                src={duskBleu.images.main}
                alt="Dusk BLEU eau de parfum"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <span className="block text-[10px] uppercase tracking-[0.35em] text-[#8FB3C7] mb-3 font-light">
              Unisex · Eau de Parfum · 50ml
            </span>

            <h2 className="font-serif-luxury text-4xl sm:text-6xl text-[#F7F2EA] font-light leading-tight">
              Dusk BLEU
            </h2>

            <p className="font-serif-luxury italic text-xl sm:text-2xl text-[#8FB3C7] mt-1 font-normal">
              Fresh, for the heat.
            </p>

            <p className="mt-6 text-sm sm:text-base text-[#E9E0D2]/80 font-light leading-relaxed">
              Most fresh perfumes disappear within an hour in our summers. Dusk BLEU opens with
              citron and mint, then settles into fig, dates and ambrette, so there is still
              something left on your skin by evening. Made for men and women.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 p-5 bg-[#0D192A]/80 border border-[#1E304B]">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#8FB3C7] mb-1 font-medium">
                  Top
                </span>
                <p className="text-xs text-[#F7F2EA] font-light leading-snug">
                  {duskBleu.notes.top.join(', ')}
                </p>
              </div>

              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#8FB3C7] mb-1 font-medium">
                  Heart
                </span>
                <p className="text-xs text-[#F7F2EA] font-light leading-snug">
                  {duskBleu.notes.heart.join(', ')}
                </p>
              </div>

              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#8FB3C7] mb-1 font-medium">
                  Base
                </span>
                <p className="text-xs text-[#F7F2EA] font-light leading-snug">
                  {duskBleu.notes.base.join(', ')}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-luxury text-3xl text-[#F7F2EA]">
                    Rs. {duskBleu.price.toLocaleString()}
                  </span>
                  {duskBleu.originalPrice && (
                    <span className="text-xs text-[#E9E0D2]/40 line-through">
                      Rs. {duskBleu.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#8FB3C7] tracking-wider uppercase">
                  Free Shipping
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className="px-6 py-3.5 bg-[#8FB3C7] hover:bg-[#A9CCE0] text-[#0B1422] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer flex items-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onSelectProduct(duskBleu)}
                  className="px-5 py-3.5 border border-[#8FB3C7]/40 hover:border-[#8FB3C7] text-[#8FB3C7] text-xs uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
