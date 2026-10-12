import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { JOURNAL_ARTICLES } from '../data/journal';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { X, Globe } from 'lucide-react';
import { ProductVisual } from './ProductVisual';

interface JournalModalProps {
  initialArticleId?: string | null;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  initialArticleId,
  onClose,
  onSelectProduct
}) => {
  const { language, setLanguage, addToCart } = useStore();
  const [activeArticleId, setActiveArticleId] = useState<string>(
    initialArticleId || JOURNAL_ARTICLES[0].id
  );

  const activeArticle = JOURNAL_ARTICLES.find(a => a.id === activeArticleId) || JOURNAL_ARTICLES[0];
  const relatedProducts = PRODUCTS.filter(p => activeArticle.relatedProductIds?.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-[#18120e]/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#251e1a] border border-[#3b332e] shadow-2xl p-6 sm:p-12 text-[#eee0d8] my-auto max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-6 border-b border-[#3b332e]">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#e5c497] font-light">
            Journal
          </span>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="text-xs text-[#e5c497] hover:text-[#eee0d8] transition-colors flex items-center gap-1.5 cursor-pointer font-light"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'اردو میں پڑھیں' : 'Read in English'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#d1c5b7]/70 hover:text-[#eee0d8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article picker */}
        <div className="py-4 border-b border-[#3b332e] flex gap-2 overflow-x-auto text-xs no-scrollbar">
          {JOURNAL_ARTICLES.map(art => (
            <button
              key={art.id}
              onClick={() => setActiveArticleId(art.id)}
              className={`px-3 py-1.5 whitespace-nowrap text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                activeArticle.id === art.id
                  ? 'bg-[#e5c497] text-[#18120e] font-semibold'
                  : 'bg-[#302824] text-[#d1c5b7]/70 hover:text-[#eee0d8]'
              }`}
            >
              {art.navLabel}
            </button>
          ))}
        </div>

        <div className="py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#e5c497] mb-2 font-light">
              <span>{activeArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeArticle.readTime}</span>
            </div>

            <h1 className={`font-serif-luxury text-3xl sm:text-5xl text-[#eee0d8] font-light leading-tight ${language === 'ur' ? 'font-urdu' : ''}`}>
              {language === 'ur' ? activeArticle.titleUrdu : activeArticle.title}
            </h1>

            {(activeArticle.pullQuote || activeArticle.pullQuoteUrdu) && (
              <div className="my-8 p-6 bg-[#302824] border-l-2 border-[#e5c497] text-[#eee0d8]">
                <p className={`text-xl sm:text-2xl leading-relaxed text-[#ffddb0] ${language === 'ur' ? 'font-urdu' : 'font-serif-luxury italic'}`}>
                  {language === 'ur' ? activeArticle.pullQuoteUrdu : activeArticle.pullQuote}
                </p>
              </div>
            )}

            <div className="space-y-6 text-sm sm:text-base text-[#d1c5b7]/85 font-light leading-relaxed">
              {(language === 'ur' ? activeArticle.contentUrdu : activeArticle.content).map((para, i) => (
                <p key={i} className={language === 'ur' ? 'font-urdu text-base sm:text-lg leading-loose' : ''}>
                  {para}
                </p>
              ))}
            </div>

            {relatedProducts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[#3b332e]">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#e5c497] mb-3 block font-medium">
                  Mentioned in this article
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedProducts.map(prod => (
                    <div
                      key={prod.id}
                      className="p-4 bg-[#18120e] border border-[#3b332e] flex gap-4 items-center justify-between"
                    >
                      <div className="flex gap-3 items-center">
                        <ProductVisual product={prod} className="w-14 h-18 shrink-0 rounded" />
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#e5c497]">
                            {prod.concentration}
                          </span>
                          <h4 className="font-serif-luxury text-base text-[#eee0d8]">{prod.name}</h4>
                          <span className="text-xs font-serif-luxury text-[#d1c5b7]">
                            Rs. {prod.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => addToCart(prod, 1)}
                          className="px-3 py-1.5 bg-[#e5c497] hover:bg-[#ffddb0] text-[#18120e] text-[10px] uppercase tracking-wider font-semibold cursor-pointer"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProduct(prod);
                          }}
                          className="text-[10px] uppercase tracking-wider text-[#e5c497] hover:underline text-center"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
