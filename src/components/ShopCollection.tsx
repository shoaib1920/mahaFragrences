import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, ArrowLeft } from 'lucide-react';

interface ShopCollectionProps {
  onSelectProduct: (p: Product) => void;
  onBackToHome: () => void;
}

export const ShopCollection: React.FC<ShopCollectionProps> = ({
  onSelectProduct,
  onBackToHome
}) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [selectedConcentration, setSelectedConcentration] = useState<string>('All');
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
    <div className="min-h-screen bg-[#0E0B0C] text-[#F7F2EA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#2A1621] gap-6">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#C9A66B] hover:text-[#F7F2EA] transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#F7F2EA] font-light">
              Shop All
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#E9E0D2]/70 font-light max-w-xl">
              Perfumes, solid perfumes, candles, hair mist and gift sets.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#C9A66B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or note"
              className="w-full bg-[#140F11] border border-[#2A1621] pl-10 pr-4 py-2.5 text-xs text-[#F7F2EA] placeholder-[#E9E0D2]/40 outline-none focus:border-[#C9A66B]"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="py-6 border-b border-[#2A1621] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
              <span className="text-[10px] uppercase tracking-wider text-[#C9A66B] mr-2 hidden sm:inline">
                Scent Family:
              </span>
              {families.map(fam => (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`px-3 py-1.5 text-xs font-light transition-colors whitespace-nowrap cursor-pointer ${
                    selectedFamily === fam
                      ? 'bg-[#C9A66B] text-[#0E0B0C] font-medium'
                      : 'bg-[#181115] text-[#E9E0D2]/70 hover:text-[#F7F2EA]'
                  }`}
                >
                  {fam}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#E9E0D2]/50">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#140F11] border border-[#2A1621] text-xs text-[#F7F2EA] px-3 py-1.5 outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#E9E0D2]/70 font-light">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#C9A66B]">Type:</span>
              {types.map(t => (
                <button
                  key={t.value}
                  onClick={() => setSelectedConcentration(t.value)}
                  className={`hover:text-[#C9A66B] transition-colors ${
                    selectedConcentration === t.value ? 'text-[#C9A66B] font-medium underline underline-offset-4' : ''
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#C9A66B]">For:</span>
              {['All', 'Feminine', 'Unisex'].map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`hover:text-[#C9A66B] transition-colors ${
                    selectedGender === g ? 'text-[#C9A66B] font-medium underline underline-offset-4' : ''
                  }`}
                >
                  {g === 'Feminine' ? 'Women' : g}
                </button>
              ))}
            </div>

            <span className="ml-auto text-[11px] text-[#E9E0D2]/50">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>
        </div>

        <div className="py-12">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-24 text-[#E9E0D2]/60">
              <p className="font-serif-luxury text-2xl text-[#F7F2EA]">Nothing matches those filters.</p>
              <button
                onClick={() => {
                  setSelectedFamily('All');
                  setSelectedConcentration('All');
                  setSelectedGender('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2.5 border border-[#C9A66B] text-[#C9A66B] text-xs uppercase tracking-wider hover:bg-[#C9A66B] hover:text-[#0E0B0C]"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
