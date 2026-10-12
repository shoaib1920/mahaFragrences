import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [added, setAdded] = useState(false);

  const isFavorited = wishlist.includes(product.id);
  const accords = [
    { stage: 'Top', note: product.notes.top[0] },
    { stage: 'Heart', note: product.notes.heart[0] },
    { stage: 'Base', note: product.notes.base[0] }
  ].filter(a => a.note);
  const noteLine = [product.notes.top[0], product.notes.heart[0], product.notes.base[0]].filter(Boolean).join(', ');

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="group bg-surface-container rounded-lg p-4 flex flex-col gap-4 shadow-md">
      <div className="relative w-full aspect-square rounded overflow-hidden bg-surface-low">
        <button type="button" onClick={() => onSelect(product)} className="block w-full h-full cursor-pointer" aria-label={`View ${product.name}`}>
          <ProductVisual product={product} className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        </button>
        <span className="absolute top-3 left-3 bg-secondary-container/90 px-1.5 py-0.5 rounded-[2px] text-secondary-fixed text-[9px] font-semibold tracking-widest uppercase pointer-events-none">
          {product.family}
        </span>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-surface-lowest/80 rounded-[2px] text-primary cursor-pointer"
          aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={isFavorited}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-headline-sm font-semibold text-on-surface uppercase">
            <button type="button" onClick={() => onSelect(product)} className="text-left uppercase cursor-pointer hover:text-primary transition-colors">
              {product.name}
            </button>
          </h3>
          <span className="font-serif text-headline-sm text-primary whitespace-nowrap">Rs. {product.price.toLocaleString()}</span>
        </div>
        <p className="text-body-sm text-on-surface-variant">
          {product.character} · {noteLine}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {accords.map((a, i) => (
            <span
              key={a.stage}
              className={`bg-surface-high px-2.5 py-1 rounded-[2px] text-[10px] font-semibold tracking-wider uppercase ${
                i === accords.length - 1 ? 'text-primary' : 'text-on-surface'
              }`}
            >
              {a.stage}: {a.note}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 mt-auto">
          <div className="flex bg-surface-low p-1 rounded-[2px]">
            <span className="px-3 py-2 rounded-[2px] text-primary bg-surface-high text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap">
              {product.volume}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className="flex-1 h-11 bg-primary text-on-primary rounded-[2px] text-label-sm uppercase tracking-[0.2em] active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer hover:bg-primary-fixed disabled:opacity-40 disabled:pointer-events-none"
          >
            {!product.inStock ? (
              'Sold Out'
            ) : added ? (
              'Added to Bag'
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                Add to Bag
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
