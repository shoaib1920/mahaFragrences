import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ScentQuizAnswers, ScentQuizResult, Product } from '../types';
import { calculateScentMatches } from '../utils/scentQuizEngine';
import { X, ArrowRight, ArrowLeft, ShoppingBag, Calendar } from 'lucide-react';

interface ScentFinderModalProps {
  onSelectProduct: (product: Product) => void;
}

export const ScentFinderModal: React.FC<ScentFinderModalProps> = ({ onSelectProduct }) => {
  const {
    isScentFinderOpen,
    setIsScentFinderOpen,
    addToCart,
    saveScentProfile,
    setIsConsultationOpen
  } = useStore();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<ScentQuizAnswers>({
    recipient: 'me',
    mood: 'confidence',
    scentWorld: 'woods',
    occasion: 'daily',
    climate: 'mild',
    intensity: 'noticeable'
  });

  const [results, setResults] = useState<ScentQuizResult[] | null>(null);

  if (!isScentFinderOpen) return null;

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      const calculated = calculateScentMatches(answers);
      setResults(calculated);
      saveScentProfile(calculated);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResults(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0B0C]/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#140F11] border border-[#2A1621] shadow-2xl p-6 sm:p-10 text-[#F7F2EA] my-auto">
        <div className="flex items-center justify-between pb-6 border-b border-[#2A1621]">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A66B] font-light">
            Scent Quiz
          </span>
          <button
            onClick={() => setIsScentFinderOpen(false)}
            className="p-1 text-[#E9E0D2]/70 hover:text-[#F7F2EA] transition-colors cursor-pointer"
            aria-label="Close quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!results && (
          <div className="my-6">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#E9E0D2]/50 mb-2">
              <span>Question {step} of 6</span>
            </div>
            <div className="h-[2px] bg-[#2A1621] overflow-hidden">
              <div
                className="h-full bg-[#C9A66B] transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>
        )}

        {!results ? (
          <div className="py-4">
            {step === 1 && (
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F7F2EA]">
                  1. Who is it for?
                </h3>
                <p className="text-xs text-[#E9E0D2]/70 font-light mt-1 mb-6">
                  This helps us narrow the range.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { key: 'me', label: 'For Me', desc: 'Something to wear myself' },
                    { key: 'gift', label: 'A Gift', desc: 'For someone else' },
                    { key: 'unisex', label: 'Unisex', desc: 'Something we can share' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setAnswers({ ...answers, recipient: opt.key as any })}
                      className={`p-5 text-left border transition-all cursor-pointer ${
                        answers.recipient === opt.key
                          ? 'border-[#C9A66B] bg-[#2A1621]/60'
                          : 'border-[#2A1621] bg-[#0E0B0C] hover:border-[#C9A66B]/40'
                      }`}
                    >
                      <span className="font-serif-luxury text-lg text-[#F7F2EA] block">{opt.label}</span>
                      <span className="text-[11px] text-[#E9E0D2]/60 font-light block mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F7F2EA]">
                  2. What mood are you after?
                </h3>
                <p className="text-xs text-[#E9E0D2]/70 font-light mt-1 mb-6">
                  Pick the one closest to how you want it to feel.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'confidence', label: 'Confident', desc: 'Polished and understated' },
                    { key: 'radiant', label: 'Bright & Warm', desc: 'Peach, freesia, soft florals' },
                    { key: 'romantic', label: 'Romantic', desc: 'Jasmine, black plum, black tea' },
                    { key: 'mysterious', label: 'Deep & Smoky', desc: 'Agarwood, violet, cedar' },
                    { key: 'fresh', label: 'Fresh', desc: 'Mint, citrus, sea air' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setAnswers({ ...answers, mood: opt.key as any })}
                      className={`p-4 text-left border transition-all cursor-pointer ${
                        answers.mood === opt.key
                          ? 'border-[#C9A66B] bg-[#2A1621]/60'
                          : 'border-[#2A1621] bg-[#0E0B0C] hover:border-[#C9A66B]/40'
                      }`}
                    >
                      <span className="font-serif-luxury text-lg text-[#F7F2EA] block">{opt.label}</span>
                      <span className="text-[11px] text-[#E9E0D2]/60 font-light block mt-0.5">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F7F2EA]">
                  3. Which kind of scent do you like most?
                </h3>
                <p className="text-xs text-[#E9E0D2]/70 font-light mt-1 mb-6">
                  Go with your first instinct.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'woods', label: 'Woods', desc: 'Cedarwood, agarwood, guaiacwood' },
                    { key: 'gardens', label: 'Florals', desc: 'Rose, jasmine, iris' },
                    { key: 'fruit', label: 'Fruits', desc: 'Peach, boysenberry, mandarin' },
                    { key: 'ocean', label: 'Citrus & Sea', desc: 'Citron, mint, fig' },
                    { key: 'amber', label: 'Amber & Vanilla', desc: 'Warm, soft and a little sweet' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setAnswers({ ...answers, scentWorld: opt.key as any })}
                      className={`p-4 text-left border transition-all cursor-pointer ${
                        answers.scentWorld === opt.key
                          ? 'border-[#C9A66B] bg-[#2A1621]/60'
                          : 'border-[#2A1621] bg-[#0E0B0C] hover:border-[#C9A66B]/40'
                      }`}
                    >
                      <span className="font-serif-luxury text-lg text-[#F7F2EA] block">{opt.label}</span>
                      <span className="text-[11px] text-[#E9E0D2]/60 font-light block mt-0.5">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F7F2EA]">
                  4. When will you wear it most?
                </h3>
                <p className="text-xs text-[#E9E0D2]/70 font-light mt-1 mb-6">
                  Some scents suit the day, others the evening.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'daily', label: 'Every Day', desc: 'An easy all-rounder' },
                    { key: 'office', label: 'Work', desc: 'Present but not loud' },
                    { key: 'evening', label: 'Evenings & Dinners', desc: 'Richer and warmer' },
                    { key: 'weddings', label: 'Weddings & Eid', desc: 'For dressing up' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setAnswers({ ...answers, occasion: opt.key as any })}
                      className={`p-4 text-left border transition-all cursor-pointer ${
                        answers.occasion === opt.key
                          ? 'border-[#C9A66B] bg-[#2A1621]/60'
                          : 'border-[#2A1621] bg-[#0E0B0C] hover:border-[#C9A66B]/40'
                      }`}
                    >
                      <span className="font-serif-luxury text-lg text-[#F7F2EA] block">{opt.label}</span>
                      <span className="text-[11px] text-[#E9E0D2]/60 font-light block mt-0.5">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F7F2EA]">
                  5. What is the weather like where you live?
                </h3>
                <p className="text-xs text-[#E9E0D2]/70 font-light mt-1 mb-6">
                  Heat and humidity change how a perfume wears.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { key: 'hot', label: 'Hot & Humid', desc: 'Karachi, summer in Punjab' },
                    { key: 'mild', label: 'Mild', desc: 'Spring, autumn, mostly indoors' },
                    { key: 'cool', label: 'Cool', desc: 'Winter, Islamabad and the north' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setAnswers({ ...answers, climate: opt.key as any })}
                      className={`p-5 text-left border transition-all cursor-pointer ${
                        answers.climate === opt.key
                          ? 'border-[#C9A66B] bg-[#2A1621]/60'
                          : 'border-[#2A1621] bg-[#0E0B0C] hover:border-[#C9A66B]/40'
                      }`}
                    >
                      <span className="font-serif-luxury text-lg text-[#F7F2EA] block">{opt.label}</span>
                      <span className="text-[11px] text-[#E9E0D2]/60 font-light block mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F7F2EA]">
                  6. How strong should it be?
                </h3>
                <p className="text-xs text-[#E9E0D2]/70 font-light mt-1 mb-6">
                  How noticeable do you want it to be to others?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { key: 'whisper', label: 'Soft', desc: 'Only people close to you notice' },
                    { key: 'noticeable', label: 'Moderate', desc: 'Noticed by people nearby' },
                    { key: 'statement', label: 'Strong', desc: 'Fills the room and lasts' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setAnswers({ ...answers, intensity: opt.key as any })}
                      className={`p-5 text-left border transition-all cursor-pointer ${
                        answers.intensity === opt.key
                          ? 'border-[#C9A66B] bg-[#2A1621]/60'
                          : 'border-[#2A1621] bg-[#0E0B0C] hover:border-[#C9A66B]/40'
                      }`}
                    >
                      <span className="font-serif-luxury text-lg text-[#F7F2EA] block">{opt.label}</span>
                      <span className="text-[11px] text-[#E9E0D2]/60 font-light block mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-[#2A1621] flex justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 border border-[#2A1621] text-xs uppercase tracking-wider text-[#E9E0D2]/80 hover:text-[#C9A66B] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                className="px-7 py-2.5 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-lg ml-auto"
              >
                <span>{step === 6 ? 'See My Matches' : 'Next'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <div className="text-center mb-8">
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F7F2EA] font-light">
                Your Matches
              </h3>
              <p className="text-xs text-[#E9E0D2]/70 font-light mt-1">
                Based on your answers. We've saved these to your account on this device.
              </p>
            </div>

            <div className="space-y-6">
              {results.map((res, index) => (
                <div
                  key={res.product.id}
                  className={`p-6 border transition-all ${
                    index === 0
                      ? 'border-[#C9A66B] bg-[#1B1217]'
                      : 'border-[#2A1621] bg-[#0E0B0C]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                      <img
                        src={res.product.images.main}
                        alt={res.product.name}
                        className="w-20 h-24 object-cover border border-[#2A1621] bg-[#0E0B0C]"
                      />
                      <div>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#C9A66B]">
                          <span className="font-bold">{res.matchPercentage}% Match</span>
                          {index === 0 && (
                            <span className="text-[9px] bg-[#C9A66B] text-[#0E0B0C] px-1.5 py-0.5 font-semibold">
                              Best Match
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif-luxury text-2xl text-[#F7F2EA] mt-0.5">
                          {res.product.name}
                        </h4>
                        <span className="text-xs text-[#E9E0D2]/80 block">
                          {res.product.subtitle}
                        </span>
                        <span className="font-serif-luxury text-lg text-[#F7F2EA] block mt-1">
                          Rs. {res.product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2">
                      <button
                        onClick={() => {
                          addToCart(res.product, 1);
                          setIsScentFinderOpen(false);
                        }}
                        className="flex-1 sm:flex-none px-5 py-2.5 bg-[#C9A66B] hover:bg-[#E6D3A8] text-[#0E0B0C] text-[10px] uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsScentFinderOpen(false);
                          onSelectProduct(res.product);
                        }}
                        className="flex-1 sm:flex-none px-5 py-2.5 border border-[#C9A66B]/50 hover:border-[#C9A66B] text-[#C9A66B] text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2A1621] text-xs text-[#E9E0D2]/80 font-light">
                    <strong className="text-[#C9A66B] font-medium">Why: </strong>
                    <span>{res.reason}</span>
                  </div>

                  {res.entryAlternative && (
                    <div className="mt-2 text-[11px] text-[#E9E0D2]/60 font-light flex items-center justify-between bg-[#140F11] p-2 border border-[#2A1621]">
                      <span>Try it first: {res.entryAlternative.name} (15g)</span>
                      <button
                        onClick={() => {
                          addToCart(res.entryAlternative!, 1);
                          setIsScentFinderOpen(false);
                        }}
                        className="text-[#C9A66B] hover:underline font-medium ml-2 cursor-pointer"
                      >
                        Add for Rs. {res.entryAlternative.price.toLocaleString()}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#2A1621] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleReset}
                className="text-xs uppercase tracking-wider text-[#E9E0D2]/60 hover:text-[#C9A66B] transition-colors cursor-pointer"
              >
                ← Retake Quiz
              </button>

              <button
                onClick={() => {
                  setIsScentFinderOpen(false);
                  setIsConsultationOpen(true);
                }}
                className="px-6 py-2.5 border border-[#C9A66B] text-[#C9A66B] hover:bg-[#C9A66B] hover:text-[#0E0B0C] text-xs uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
