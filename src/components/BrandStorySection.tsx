import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '../config/brand';
import { PRODUCTS } from '../data/products';

interface BrandStorySectionProps {
  onOpenJournal: () => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onOpenJournal }) => {
  const image = PRODUCTS.find(p => p.id === 'divine-trio-discovery')?.images.main;

  return (
    <section className="py-24 sm:py-32 bg-[#0E0B0C] border-t border-[#2A1621]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-[#181115] border border-[#2A1621]">
              <img
                src={image}
                alt={`${BRAND.name} perfumes`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A66B] font-light">
              About {BRAND.name}
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F7F2EA] font-light leading-tight mt-3">
              Perfume that is easy to wear, every day.
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#E9E0D2]/80 font-light leading-relaxed">
              <p>
                We keep the range small on purpose: three eau de parfums that sit comfortably
                together, one fresh unisex scent for the heat, and a few ways to carry them with
                you, from a solid perfume tin to a hair mist.
              </p>
              <p>
                Every scent is listed with its full notes, how strong it wears and the weather it
                suits, so you know what you are getting before it arrives.
              </p>
            </div>

            <button
              onClick={onOpenJournal}
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A66B] hover:text-[#E6D3A8] transition-colors cursor-pointer group"
            >
              <span>Read the journal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
