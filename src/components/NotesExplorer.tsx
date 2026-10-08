import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OLFACTORY_NOTES } from '../data/notes';
import { PRODUCTS } from '../data/products';
import { Product, OlfactoryNote } from '../types';
import { X, ArrowRight } from 'lucide-react';

interface NotesExplorerProps {
  onSelectProduct: (p: Product) => void;
}

export const NotesExplorer: React.FC<NotesExplorerProps> = ({ onSelectProduct }) => {
  const { isNotesExplorerOpen, setIsNotesExplorerOpen } = useStore();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Top' | 'Heart' | 'Base'>('All');
  const [selectedNote, setSelectedNote] = useState<OlfactoryNote>(OLFACTORY_NOTES[0]);

  if (!isNotesExplorerOpen) return null;

  const filteredNotes = activeCategory === 'All'
    ? OLFACTORY_NOTES
    : OLFACTORY_NOTES.filter(n => n.category === activeCategory);

  const productsWithNote = PRODUCTS.filter(p => selectedNote.containedIn.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0B0C]/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#140F11] border border-[#2A1621] shadow-2xl p-6 sm:p-10 text-[#F7F2EA] my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#2A1621]">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#F7F2EA] font-light">
            Notes Library
          </h2>

          <button
            onClick={() => setIsNotesExplorerOpen(false)}
            className="p-1 text-[#E9E0D2]/70 hover:text-[#F7F2EA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 my-6">
          {(['All', 'Top', 'Heart', 'Base'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C9A66B] text-[#0E0B0C]'
                  : 'bg-[#1D1418] text-[#E9E0D2]/70 hover:text-[#F7F2EA]'
              }`}
            >
              {cat === 'All' ? 'All Notes' : `${cat} Notes`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 max-h-[480px] overflow-y-auto space-y-2 pr-2">
            {filteredNotes.map(note => {
              const isSelected = selectedNote.id === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className={`p-3.5 border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C9A66B] bg-[#2A1621]/60'
                      : 'border-[#2A1621] bg-[#0E0B0C] hover:border-[#C9A66B]/30'
                  }`}
                >
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#C9A66B] block">
                      {note.category} Note
                    </span>
                    <h4 className="font-serif-luxury text-base text-[#F7F2EA]">
                      {note.name}
                    </h4>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'text-[#C9A66B] translate-x-1' : 'text-[#E9E0D2]/30'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-[#0E0B0C] border border-[#2A1621] p-6 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-[#181115] mb-5 border border-[#2A1621]">
                <img
                  src={selectedNote.image}
                  alt={selectedNote.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#0E0B0C]/80 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#C9A66B]">
                  {selectedNote.category} Note
                </div>
              </div>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F7F2EA] font-light">
                {selectedNote.name}
              </h3>

              <div className="mt-4 space-y-2 text-xs text-[#E9E0D2]/80 font-light">
                <p>
                  <strong className="text-[#C9A66B] font-medium">Smells like: </strong>
                  {selectedNote.scentProfile}
                </p>
                <p>
                  <strong className="text-[#C9A66B] font-medium">Origin: </strong>
                  {selectedNote.origin}
                </p>
                <p>
                  <strong className="text-[#C9A66B] font-medium">Mood: </strong>
                  {selectedNote.evokes}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#2A1621]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A66B] block mb-3 font-medium">
                Found in
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {productsWithNote.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setIsNotesExplorerOpen(false);
                      onSelectProduct(prod);
                    }}
                    className="p-3 bg-[#140F11] border border-[#2A1621] hover:border-[#C9A66B]/50 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#E9E0D2]/50 block">
                        {prod.volume} · {prod.concentration}
                      </span>
                      <h5 className="font-serif-luxury text-sm text-[#F7F2EA] group-hover:text-[#C9A66B] transition-colors">
                        {prod.name}
                      </h5>
                    </div>
                    <span className="text-xs text-[#C9A66B] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
