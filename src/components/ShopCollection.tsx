import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, ArrowLeft } from 'lucide-react';

interface ShopCollectionProps {
  onSelectProduct: (p: Product) => void;
  onBackToHome: () => void;
  initialFamily?: string;
  initialType?: string;
}

export const ShopCollection: React.FC<ShopCollectionProps> = ({
  onSelectProduct,
  onBackToHome,
  initialFamily = 'All',
  initialType = 'All'
}) => {
  const [selectedFamily, setSelectedFamily] = useState<string>(initialFamily);
  const [selectedConcentration, setSelectedConcentration] = useState<string>(initialType);
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const families = ['All', 'Woody', 'Floral', 'Fruity-Floral', 'Fresh & Aquatic', 'Amber & Oriental'];
  const types = [
    { value: 'All', label: 'All' },
    { value: 'Eau de Parfum', label: 'Eau de Parfum' },
    { value: 'Solid Perfume Wax', label: 'Solid Perfume' },
    { value: 'Home Fragrance', label: 'Candles' },
    { value: 'Hair Mist', label: 'Hair Mist' },
    { value: 'Gift Set', label: 'Gift Sets' }
  ];

  const filteredProducts = PRODUCTS.filter(p => {
    if (selectedFamily !== 'All' && p.family !== selectedFamily) return false;
    if (selectedConcentration !== 'All' && !p.concentration.includes(selectedConcentration)) return false;
    if (selectedGender !== 'All' && p.gender !== selectedGender && p.gender !== 'All') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchNotes = p.notes.top.some(n => n.toLowerCase().includes(q)) ||
        p.notes.heart.some(n => n.toLowerCase().includes(q)) ||
        p.notes.base.some(n => n.toLowerCase().includes(q));
      if (!matchName && !matchNotes) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="min-h-screen bg-[#18120e] text-[#eee0d8] pt-32 pb-28 lg:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#3b332e] gap-6">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#e5c497] hover:text-[#eee0d8] transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#eee0d8] font-light">
              Shop All
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#d1c5b7]/70 font-light max-w-xl">
              Perfumes, solid perfumes, candles, hair mist and gift sets.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#e5c497] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or note"
              className="w-full bg-[#251e1a] border border-[#3b332e] pl-10 pr-4 py-2.5 text-xs text-[#eee0d8] placeholder-[#d1c5b7]/40 outline-none focus:border-[#e5c497]"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="py-6 border-b border-[#3b332e] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
              <span className="text-[10px] uppercase tracking-wider text-[#e5c497] mr-2 hidden sm:inline">
                Scent Family:
              </span>
              {families.map(fam => (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`px-3 py-1.5 text-xs font-light transition-colors whitespace-nowrap cursor-pointer ${
                    selectedFamily === fam
                      ? 'bg-[#e5c497] text-[#18120e] font-medium'
                      : 'bg-[#251e1a] text-[#d1c5b7]/70 hover:text-[#eee0d8]'
                  }`}
                >
                  {fam}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#d1c5b7]/50">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#251e1a] border border-[#3b332e] text-xs text-[#eee0d8] px-3 py-1.5 outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#d1c5b7]/70 font-light">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#e5c497]">Type:</span>
              {types.map(t => (
                <button
                  key={t.value}
                  onClick={() => setSelectedConcentration(t.value)}
                  className={`hover:text-[#e5c497] transition-colors ${
                    selectedConcentration === t.value ? 'text-[#e5c497] font-medium underline underline-offset-4' : ''
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#e5c497]">For:</span>
              {['All', 'Feminine', 'Unisex'].map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`hover:text-[#e5c497] transition-colors ${
                    selectedGender === g ? 'text-[#e5c497] font-medium underline underline-offset-4' : ''
                  }`}
                >
                  {g === 'Feminine' ? 'Women' : g}
                </button>
              ))}
            </div>

            <span className="ml-auto text-[11px] text-[#d1c5b7]/50">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>
        </div>

        <div className="py-12">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-24 text-[#d1c5b7]/60">
              <p className="font-serif-luxury text-2xl text-[#eee0d8]">Nothing matches those filters.</p>
              <button
                onClick={() => {
                  setSelectedFamily('All');
                  setSelectedConcentration('All');
                  setSelectedGender('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2.5 border border-[#e5c497] text-[#e5c497] text-xs uppercase tracking-wider hover:bg-[#e5c497] hover:text-[#18120e]"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
