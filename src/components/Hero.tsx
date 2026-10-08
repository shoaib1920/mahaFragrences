import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Banknote, Truck, MapPin } from 'lucide-react';
import { BRAND } from '../config/brand';

const MARQUEE_NOTES = [
  'Cedarwood',
  'Agarwood',
  'Violet',
  'Rose',
  'Peach',
  'Jasmine Sambac',
  'Citron',
  'Fig',
  'Ambrette',
  'Sandalwood',
  'Amber',
  'Vanilla'
];

interface HeroProps {
  onExploreCollection: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection }) => {
  const { setIsScentFinderOpen, language } = useStore();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0E0B0C]">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="w-full h-full object-cover object-center opacity-35 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B0C] via-[#0E0B0C]/60 to-[#0E0B0C]/40" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-12 flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#C9A66B] font-light"
        >
          {BRAND.name}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#F7F2EA] leading-[1.08] tracking-tight max-w-4xl"
        >
          {language === 'ur' ? (
            <span className="font-urdu block text-3xl sm:text-5xl md:text-6xl text-[#E6D3A8]">
              خوشبو جو دیر تک ساتھ رہے۔
            </span>
          ) : (
            <>
              Scents that <br />
              <span className="italic font-normal text-[#C9A66B]">stay</span> with you.
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-[#E9E0D2]/80 font-light max-w-2xl leading-relaxed tracking-wide"
        >
          {language === 'ur' ? (
            <span className="font-urdu text-sm sm:text-base">
              پرفیوم، سالڈ پرفیوم، کینڈلز اور گفٹ سیٹس۔ پورے پاکستان میں کیش آن ڈیلیوری کے ساتھ۔
            </span>
          ) : (
            <>
              Eau de parfum, solid perfume, candles and gift sets, made for our weather and
              delivered across Pakistan.
            </>
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            onClick={onExploreCollection}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A66B] text-[#0E0B0C] font-sans text-xs tracking-[0.22em] uppercase font-semibold hover:bg-[#E6D3A8] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Shop Perfumes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setIsScentFinderOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 border border-[#F7F2EA]/30 text-[#F7F2EA] font-sans text-xs tracking-[0.22em] uppercase font-light hover:border-[#C9A66B] hover:text-[#C9A66B] transition-all duration-300 cursor-pointer"
          >
            Find Your Scent
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14 pt-8 border-t border-[#F7F2EA]/10 grid grid-cols-3 gap-6 sm:gap-12 text-[11px] text-[#E9E0D2]/70 font-light max-w-2xl"
        >
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Truck className="w-4 h-4 text-[#C9A66B]/80" />
            <span>Free Shipping Over Rs. 3,000</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Banknote className="w-4 h-4 text-[#C9A66B]/80" />
            <span>Cash on Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <MapPin className="w-4 h-4 text-[#C9A66B]/80" />
            <span>Delivery Across Pakistan</span>
          </div>
        </motion.div>
      </div>

      {/* Notes marquee */}
      <div className="relative z-20 bg-[#2A1621]/80 border-y border-[#C9A66B]/15 py-3 overflow-hidden">
        <div className="flex w-max whitespace-nowrap animate-[marquee_40s_linear_infinite] text-[10px] tracking-[0.3em] uppercase text-[#C9A66B]/90 font-light">
          {[...MARQUEE_NOTES, ...MARQUEE_NOTES].map((note, i) => (
            <span key={i} className="px-4" aria-hidden={i >= MARQUEE_NOTES.length}>
              {note} <span className="pl-8">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
