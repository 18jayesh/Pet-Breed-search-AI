import React, { useState } from 'react';
import { Cat, Dog, BookOpen, Search, X } from 'lucide-react';
import { CAT_BREEDS, DOG_BREEDS } from '../data/breedsData';

export default function BreedsPage() {
  const [filter, setFilter] = useState('all'); // 'all' | 'cats' | 'dogs'
  const [search, setSearch] = useState('');
  const [selectedBreed, setSelectedBreed] = useState(null);

  const allBreeds = [
    ...CAT_BREEDS.map((b) => ({ ...b, type: 'cat' })),
    ...DOG_BREEDS.map((b) => ({ ...b, type: 'dog' })),
  ];

  const displayedBreeds = allBreeds.filter((b) => {
    const matchesType = filter === 'all' || (filter === 'cats' && b.type === 'cat') || (filter === 'dogs' && b.type === 'dog');
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.origin.toLowerCase().includes(search.toLowerCase()) ||
      b.temperament.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-themeDark-900 bg-purple-radial py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-600/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-500/40">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Breed Directory & Encyclopedia</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Dog & Cat Breed Library
          </h1>
          <p className="mt-3 text-sm sm:text-base text-purple-200/70">
            Explore comprehensive morphological standards, origins, lifespans, grooming needs, and behavioral profiles.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-2 rounded-2xl glass-purple-card">
          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                filter === 'all' ? 'bg-brand-600 text-white shadow-md' : 'text-purple-300 hover:text-white'
              }`}
            >
              All Breeds ({allBreeds.length})
            </button>
            <button
              onClick={() => setFilter('cats')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                filter === 'cats' ? 'bg-brand-600 text-white shadow-md' : 'text-purple-300 hover:text-white'
              }`}
            >
              <Cat className="w-3.5 h-3.5 text-purple-400" />
              <span>Cats ({CAT_BREEDS.length})</span>
            </button>
            <button
              onClick={() => setFilter('dogs')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                filter === 'dogs' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-purple-300 hover:text-white'
              }`}
            >
              <Dog className="w-3.5 h-3.5 text-amber-400" />
              <span>Dogs ({DOG_BREEDS.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by breed name, origin, trait..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-themeDark-950 border border-purple-800/60 text-xs text-white placeholder-purple-400/50 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Breeds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedBreeds.map((breed) => (
            <div
              key={`${breed.type}-${breed.id}`}
              onClick={() => setSelectedBreed(breed)}
              className="glass-purple-card rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-themeDark-950">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span
                  className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase shadow backdrop-blur-md ${
                    breed.type === 'cat'
                      ? 'bg-purple-950/80 text-purple-300'
                      : 'bg-amber-950/80 text-amber-300'
                  }`}
                >
                  {breed.type === 'cat' ? 'Cat' : 'Dog'} • {breed.size}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition">
                  {breed.name}
                </h3>
                <p className="text-xs text-purple-200/60 truncate">{breed.origin}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {breed.temperament.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-900/40 text-purple-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail */}
      {selectedBreed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-purple-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative space-y-6">
            <button
              onClick={() => setSelectedBreed(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-themeDark-900 text-purple-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-36 h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-themeDark-950">
                <img src={selectedBreed.image} alt={selectedBreed.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  {selectedBreed.type === 'cat' ? 'Feline Pedigree Standard' : 'Canine Pedigree Standard'}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedBreed.name}</h3>
                <p className="text-xs text-purple-200/70">{selectedBreed.origin} • Lifespan: {selectedBreed.lifespan}</p>
              </div>
            </div>

            <p className="text-sm text-purple-100 leading-relaxed">{selectedBreed.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-themeDark-950 border border-purple-900/40">
                <span className="text-purple-400 block mb-0.5 font-bold">Size & Weight</span>
                <span className="text-white font-semibold">{selectedBreed.size} ({selectedBreed.weight})</span>
              </div>
              <div className="p-3 rounded-xl bg-themeDark-950 border border-purple-900/40">
                <span className="text-purple-400 block mb-0.5 font-bold">Coat & Shedding</span>
                <span className="text-white font-semibold">{selectedBreed.coat}</span>
              </div>
              <div className="p-3 rounded-xl bg-themeDark-950 border border-purple-900/40">
                <span className="text-purple-400 block mb-0.5 font-bold">Energy</span>
                <span className="text-white font-semibold">{selectedBreed.energy}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-600/10 border border-brand-500/30 text-xs text-purple-200">
              <strong className="text-brand-300 block mb-1">Breed Fun Fact:</strong>
              {selectedBreed.funFact}
            </div>

            <button
              onClick={() => setSelectedBreed(null)}
              className="w-full py-3 rounded-full text-xs font-black text-white bg-brand-600 hover:bg-brand-700 transition"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
