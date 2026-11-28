import React, { useState } from 'react';
import { Cat, Sparkles, CheckCircle2, Info, Heart, Shield, Award, HelpCircle, X } from 'lucide-react';
import PetScanner from '../components/PetScanner';
import { CAT_BREEDS } from '../data/breedsData';

export default function CatScannerPage() {
  const [selectedBreedModal, setSelectedBreedModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBreeds = CAT_BREEDS.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.temperament.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-themeDark-900 bg-purple-radial">
      {/* Cat Scanner Dedicated Hero */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/20 border border-brand-500/40 text-brand-300 text-xs font-black uppercase tracking-wider mb-6">
            <Cat className="w-4 h-4 text-brand-400" />
            <span>Dedicated Cat Breed Identifier • Inspired by CatScanner.org</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
            Cat Scanner:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-brand-400 to-indigo-300">
              Identify Any Cat Breed
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-purple-200/70 max-w-2xl mx-auto leading-relaxed">
            Upload a photo of your feline friend. Cat Scanner recognizes 70+ domestic and pedigree cat breeds,
            calculates mixed heritage percentages, and delivers tailored care advice in seconds.
          </p>
        </div>
      </section>

      {/* Main Dedicated Cat Scanner Workstation */}
      <section className="py-12 sm:py-16 -mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <PetScanner
            petType="cat"
            samples={CAT_BREEDS.slice(0, 4)}
            title="Cat Breed Scanner Workstation"
            subtitle="Analyzes ear furnishings, facial contours, eye color genetics, and coat patterns."
          />
        </div>
      </section>

      {/* CatScanner.org Feature Grid */}
      <section className="py-16 bg-themeDark-950/80 border-y border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2 block">
              CAT SCANNER FEATURES
            </span>
            <h2 className="text-3xl font-black text-white">Why Cat Parents Love Our Scanner</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: 'Official FIFe & TICA Coverage',
                desc: 'Recognizes all officially recognized cat breeds including Maine Coon, Siamese, Bengal, Ragdoll, Sphynx, and rare exotics.',
              },
              {
                icon: Sparkles,
                title: 'Mixed Breed & Mutt Recognition',
                desc: 'Identifies domestic shorthairs/longhairs and breaks down likely ancestor crossbreed percentages.',
              },
              {
                icon: Heart,
                title: 'Hypoallergenic & Coat Profiling',
                desc: 'Understand dander shedding levels, coat maintenance requirements, and Fel d 1 protein considerations.',
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="glass-purple-card rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{f.title}</h3>
                  <p className="text-xs text-purple-200/70 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cat Breeds Encyclopedia Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 block mb-1">
              CAT BREED LIBRARY
            </span>
            <h2 className="text-3xl font-black text-white">Cat Breeds Encyclopedia</h2>
            <p className="text-xs text-purple-200/60 mt-1">
              Browse detailed standards, origins, lifespans, and temperaments.
            </p>
          </div>

          {/* Search Filter */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search cat breed, origin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-themeDark-950 border border-purple-800/50 text-white placeholder-purple-400/50 text-xs focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Breeds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredBreeds.map((breed) => (
            <div
              key={breed.id}
              onClick={() => setSelectedBreedModal(breed)}
              className="glass-purple-card rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-themeDark-950">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-themeDark-950/80 backdrop-blur-md text-[10px] font-bold text-brand-300">
                  {breed.size}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition">
                  {breed.name}
                </h3>
                <p className="text-xs text-purple-200/60 truncate">{breed.origin}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {breed.temperament.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-900/40 text-purple-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Breed Details */}
      {selectedBreedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-purple-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative space-y-6">
            <button
              onClick={() => setSelectedBreedModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-themeDark-900 text-purple-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-36 h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-themeDark-950">
                <img src={selectedBreedModal.image} alt={selectedBreedModal.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">FIFe Catalog Standard</span>
                <h3 className="text-2xl font-black text-white">{selectedBreedModal.name}</h3>
                <p className="text-xs text-purple-200/70">{selectedBreedModal.origin} • Lifespan: {selectedBreedModal.lifespan}</p>
              </div>
            </div>

            <p className="text-sm text-purple-100 leading-relaxed">{selectedBreedModal.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-themeDark-950 border border-purple-900/40">
                <span className="text-purple-400 block mb-0.5 font-bold">Size & Weight</span>
                <span className="text-white font-semibold">{selectedBreedModal.size} ({selectedBreedModal.weight})</span>
              </div>
              <div className="p-3 rounded-xl bg-themeDark-950 border border-purple-900/40">
                <span className="text-purple-400 block mb-0.5 font-bold">Coat & Shedding</span>
                <span className="text-white font-semibold">{selectedBreedModal.coat}</span>
              </div>
              <div className="p-3 rounded-xl bg-themeDark-950 border border-purple-900/40">
                <span className="text-purple-400 block mb-0.5 font-bold">Energy Drive</span>
                <span className="text-white font-semibold">{selectedBreedModal.energy}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-600/10 border border-brand-500/30 text-xs text-purple-200">
              <strong className="text-brand-300 block mb-1">Feline Fun Fact:</strong>
              {selectedBreedModal.funFact}
            </div>

            <button
              onClick={() => setSelectedBreedModal(null)}
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
