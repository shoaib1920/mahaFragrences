import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Plus, Check } from 'lucide-react';

interface DivineTrioSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const DivineTrioSection: React.FC<DivineTrioSectionProps> = ({ onSelectProduct }) => {
  const { addToCart } = useStore();
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const trioProducts = PRODUCTS.filter(p => p.isDivineTrio && p.concentration === 'Eau de Parfum');
  const discovery = PRODUCTS.find(p => p.id === 'divine-trio-discovery');

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="divine-trio" className="py-24 sm:py-32 bg-[#0E0B0C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="block text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mb-3 font-light">
            Eau de Parfum · 100ml
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#F7F2EA] font-light">
            The Divine Trio
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#E9E0D2]/75 font-light leading-relaxed">
            Our three signature perfumes: one woody, one fruity-floral, one soft floral.
            Each comes as a 100ml eau de parfum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {trioProducts.map((product) => {
            const isHovered = activeHover === product.id;
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setActiveHover(product.id)}
                onMouseLeave={() => setActiveHover(null)}
                onClick={() => onSelectProduct(product)}
                className="group relative flex flex-col bg-[#140F11]/60 border border-[#2A1621] hover:border-[#C9A66B]/50 transition-all duration-500 cursor-pointer p-6 sm:p-7"
              >
                <div
                  className="w-full h-[2px] mb-6 transition-all duration-500"
                  style={{
                    backgroundColor: isHovered ? product.accentTheme.secondary : 'rgba(201, 166, 107, 0.2)'
                  }}
                />

                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] mb-2 font-light">
                  <span>{product.family}</span>
                  <span>100ml EDP</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F7F2EA] group-hover:text-[#C9A66B] transition-colors font-light">
                  {product.name}
                </h3>

                <p className="text-xs text-[#E9E0D2]/70 mt-1 font-light">
                  {product.subtitle}
                </p>

                <div className="relative aspect-[4/5] my-6 overflow-hidden bg-[#1D161A]/50 border border-[#2A1621]/40">
                  <img
                    src={product.images.main}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-2 py-3 border-t border-[#2A1621] text-xs">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#C9A66B]/90 font-light">
                      Top
                    </span>
                    <span className="text-[#E9E0D2]/90 text-right font-light">
                      {product.notes.top.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#C9A66B]/90 font-light">
                      Heart
                    </span>
                    <span className="text-[#E9E0D2]/90 text-right font-light">
                      {product.notes.heart.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#C9A66B]/90 font-light">
                      Base
                    </span>
                    <span className="text-[#E9E0D2]/90 text-right font-light">
                      {product.notes.base.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-[#2A1621] flex items-center justify-between">
                  <div>
                    <span className="font-serif-luxury text-2xl text-[#F7F2EA]">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <span className="block text-[10px] text-[#C9A66B]/70 uppercase tracking-widest">
                      Free Shipping
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAdd(e, product)}
                    className="px-4 py-2.5 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-[10px] uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discovery set */}
        <div className="mt-14 p-6 sm:p-8 bg-[#181116] border border-[#C9A66B]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B]">
                Can't decide?
              </span>
              <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#F7F2EA] mt-0.5">
                The Divine Trio Discovery Set
              </h4>
              <p className="text-xs text-[#E9E0D2]/75 font-light mt-1">
                All three perfumes in 15ml travel sprays, so you can try them before choosing a full bottle.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <span className="font-serif-luxury text-2xl text-[#F7F2EA]">
              Rs. {discovery?.price.toLocaleString()}
            </span>
            <button
              onClick={() => {
                if (discovery) onSelectProduct(discovery);
              }}
              className="px-6 py-2.5 bg-transparent border border-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#0E0B0C] text-[#C9A66B] text-[11px] uppercase tracking-[0.2em] transition-all cursor-pointer font-medium whitespace-nowrap"
            >
              View Set
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
