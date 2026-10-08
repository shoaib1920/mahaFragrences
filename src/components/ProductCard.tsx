import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [addedJustNow, setAddedJustNow] = useState(false);

  const isFavorited = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedJustNow(true);
    setTimeout(() => setAddedJustNow(false), 1800);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-[#0E0B0C] cursor-pointer transition-all duration-300 relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#161214] border border-[#2A1621] group-hover:border-[#C9A66B]/40 transition-colors">
        <img
          src={isHovered && product.images.secondary ? product.images.secondary : product.images.main}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-[#0E0B0C]/60 backdrop-blur-md text-[#F7F2EA] hover:text-[#C9A66B] transition-colors z-10 cursor-pointer"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFavorited ? 'fill-[#C9A66B] text-[#C9A66B] scale-110' : 'text-[#F7F2EA]'
            }`}
          />
        </button>

        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 px-4 bg-[#0E0B0C]/90 hover:bg-[#C9A66B] hover:text-[#0E0B0C] text-[#F7F2EA] border border-[#C9A66B]/50 backdrop-blur-md text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer font-medium"
          >
            {addedJustNow ? (
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

      <div className="pt-4 pb-2 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#C9A66B] font-light">
          <span>{product.family}</span>
          <span aria-hidden="true" className="text-[#C9A66B]/40">·</span>
          <span>{product.volume}</span>
          <span aria-hidden="true" className="text-[#C9A66B]/40">·</span>
          <span>{product.concentration}</span>
        </div>

        <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F7F2EA] group-hover:text-[#C9A66B] transition-colors mt-1 font-light">
          {product.name}
        </h3>

        <p className="text-xs text-[#E9E0D2]/70 line-clamp-1 mt-0.5 font-light">
          {product.subtitle}
        </p>

        <div className="mt-2 text-[11px] text-[#F7F2EA]/60 font-light flex items-center gap-1.5 flex-wrap">
          <span className="text-[#C9A66B]/80 font-normal">Notes:</span>
          {product.notes.top.slice(0, 2).map((n, i) => (
            <React.Fragment key={n}>
              <span>{n}</span>
              {i < 1 && <span aria-hidden="true" className="text-[#F7F2EA]/30">/</span>}
            </React.Fragment>
          ))}
          {product.notes.heart[0] && (
            <>
              <span aria-hidden="true" className="text-[#F7F2EA]/30">/</span>
              <span>{product.notes.heart[0]}</span>
            </>
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-[#2A1621] flex items-center justify-between text-xs">
          <div className="flex items-baseline gap-2">
            <span className="font-serif-luxury text-lg text-[#F7F2EA]">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-[#E9E0D2]/40 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <span className="text-[10px] uppercase tracking-wider text-[#C9A66B] group-hover:translate-x-1 transition-transform">
            View
          </span>
        </div>
      </div>
    </div>
  );
};
