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
    <div className="fixed inset-0 z-50 bg-[#18120e]/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#251e1a] border border-[#3b332e] shadow-2xl p-6 sm:p-10 text-[#eee0d8] my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#3b332e]">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#eee0d8] font-light">
            Notes Library
          </h2>

          <button
            onClick={() => setIsNotesExplorerOpen(false)}
            className="p-1 text-[#d1c5b7]/70 hover:text-[#eee0d8] transition-colors cursor-pointer"
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
                  ? 'bg-[#e5c497] text-[#18120e]'
                  : 'bg-[#302824] text-[#d1c5b7]/70 hover:text-[#eee0d8]'
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
                      ? 'border-[#e5c497] bg-[#3b332e]/60'
                      : 'border-[#3b332e] bg-[#18120e] hover:border-[#e5c497]/30'
                  }`}
                >
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#e5c497] block">
                      {note.category} Note
                    </span>
                    <h4 className="font-serif-luxury text-base text-[#eee0d8]">
                      {note.name}
                    </h4>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'text-[#e5c497] translate-x-1' : 'text-[#d1c5b7]/30'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-[#18120e] border border-[#3b332e] p-6 flex flex-col justify-between">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#e5c497] mb-2">
                {selectedNote.category} Note
              </span>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#eee0d8] font-light">
                {selectedNote.name}
              </h3>

              <div className="mt-4 space-y-2 text-xs text-[#d1c5b7]/80 font-light">
                <p>
                  <strong className="text-[#e5c497] font-medium">Smells like: </strong>
                  {selectedNote.scentProfile}
                </p>
                <p>
                  <strong className="text-[#e5c497] font-medium">Origin: </strong>
                  {selectedNote.origin}
                </p>
                <p>
                  <strong className="text-[#e5c497] font-medium">Mood: </strong>
                  {selectedNote.evokes}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#3b332e]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#e5c497] block mb-3 font-medium">
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
                    className="p-3 bg-[#251e1a] border border-[#3b332e] hover:border-[#e5c497]/50 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#d1c5b7]/50 block">
                        {prod.volume} · {prod.concentration}
                      </span>
                      <h5 className="font-serif-luxury text-sm text-[#eee0d8] group-hover:text-[#e5c497] transition-colors">
                        {prod.name}
                      </h5>
                    </div>
                    <span className="text-xs text-[#e5c497] group-hover:translate-x-1 transition-transform">
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
