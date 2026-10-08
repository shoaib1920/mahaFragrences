import React from 'react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

interface JournalPreviewSectionProps {
  onOpenArticle: (articleId: string) => void;
  onViewAllJournal: () => void;
}

export const JournalPreviewSection: React.FC<JournalPreviewSectionProps> = ({
  onOpenArticle,
  onViewAllJournal
}) => {
  const { language } = useStore();
  const featuredArticles = JOURNAL_ARTICLES.slice(0, 3);

  return (
    <section className="py-24 sm:py-32 bg-[#0E0B0C] border-t border-[#2A1621] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="block text-[10px] uppercase tracking-[0.35em] text-[#C9A66B] mb-2 font-light">
              Journal
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F7F2EA] font-light">
              Guides & Scent Notes
            </h2>
            <p className="mt-2 text-sm text-[#E9E0D2]/75 font-light max-w-xl">
              How each perfume is put together, and how to get the most out of it.
            </p>
          </div>

          <button
            onClick={onViewAllJournal}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A66B] hover:text-[#E6D3A8] transition-colors cursor-pointer self-start md:self-auto font-medium"
          >
            <span>All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onOpenArticle(article.id)}
              className="group cursor-pointer flex flex-col bg-[#140F11]/60 border border-[#2A1621] hover:border-[#C9A66B]/40 transition-all p-5"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1D161A] mb-5">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C9A66B] font-light mb-2">
                <span>{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F7F2EA] group-hover:text-[#C9A66B] transition-colors font-light leading-snug">
                {language === 'ur' ? article.titleUrdu : article.title}
              </h3>

              <p className="mt-2 text-xs text-[#E9E0D2]/70 font-light line-clamp-2 leading-relaxed">
                {language === 'ur' ? article.excerptUrdu : article.excerpt}
              </p>

              <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-[#C9A66B] font-medium">
                <span>Read</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
