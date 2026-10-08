import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface FragranceWardrobeSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const FragranceWardrobeSection: React.FC<FragranceWardrobeSectionProps> = ({ onSelectProduct }) => {
  // Everything that isn't a full-size perfume
  const wardrobeItems = PRODUCTS.filter(p => !p.concentration.includes('Eau de Parfum') || p.id === 'divine-trio-discovery');

  return (
    <section className="py-24 sm:py-32 bg-[#0E0B0C] border-t border-[#2A1621] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-[10px] uppercase tracking-[0.35em] text-[#C9A66B] mb-2 font-light">
            Beyond the Bottle
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F7F2EA] font-light">
            Solid Perfumes, Candles & Gift Sets
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#E9E0D2]/75 font-light">
            The same scents in other forms: an alcohol-free solid perfume for your bag,
            a candle for the house, a mist for your hair, and sets ready to gift.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {wardrobeItems.slice(0, 8).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
