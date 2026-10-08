import React from 'react';
import { useStore } from '../context/StoreContext';
import { Calendar, Video, MessageCircle, MapPin } from 'lucide-react';
import { BRAND } from '../config/brand';

export const ConsultationTeaserSection: React.FC = () => {
  const { setIsConsultationOpen } = useStore();

  return (
    <section className="py-24 sm:py-32 bg-[#140D11] border-y border-[#2A1621] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="block text-[10px] uppercase tracking-[0.35em] text-[#C9A66B] mb-3 font-light">
              Free Consultation
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F7F2EA] font-light leading-tight">
              Not sure which one? <br />
              <span className="italic text-[#C9A66B]">Talk to us.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#E9E0D2]/80 font-light leading-relaxed">
              Buying perfume online is hard when you can't smell it first. Tell us what you
              usually wear, or who you are buying for, and we'll help you choose.
            </p>

            <div className={`mt-8 grid grid-cols-1 gap-4 ${BRAND.studios.length > 0 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {BRAND.studios.length > 0 && (
                <div className="p-4 bg-[#0E0B0C]/80 border border-[#2A1621]">
                  <MapPin className="w-4 h-4 text-[#C9A66B] mb-2" />
                  <h4 className="font-serif-luxury text-base text-[#F7F2EA]">In Person</h4>
                  <p className="text-[11px] text-[#E9E0D2]/60 font-light mt-1">
                    Visit our studio and try the full range
                  </p>
                </div>
              )}

              <div className="p-4 bg-[#0E0B0C]/80 border border-[#2A1621]">
                <Video className="w-4 h-4 text-[#C9A66B] mb-2" />
                <h4 className="font-serif-luxury text-base text-[#F7F2EA]">Video Call</h4>
                <p className="text-[11px] text-[#E9E0D2]/60 font-light mt-1">
                  From anywhere, at a time that suits you
                </p>
              </div>

              <div className="p-4 bg-[#0E0B0C]/80 border border-[#2A1621]">
                <MessageCircle className="w-4 h-4 text-[#C9A66B] mb-2" />
                <h4 className="font-serif-luxury text-base text-[#F7F2EA]">WhatsApp Call</h4>
                <p className="text-[11px] text-[#E9E0D2]/60 font-light mt-1">
                  A quick voice call on your own number
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="px-8 py-3.5 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-[#181116] border border-[#C9A66B]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
