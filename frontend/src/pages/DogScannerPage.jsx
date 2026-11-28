import React, { useState } from 'react';
import { Dog, Sparkles, CheckCircle2, Heart, Award, X, Activity, ShieldCheck } from 'lucide-react';
import PetScanner from '../components/PetScanner';
import { DOG_BREEDS } from '../data/breedsData';

export default function DogScannerPage() {
  const [selectedBreedModal, setSelectedBreedModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBreeds = DOG_BREEDS.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.temperament.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-themeDark-900 bg-purple-radial">
      {/* Dog Scanner Dedicated Hero */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider mb-6">
            <Dog className="w-4 h-4 text-amber-400" />
            <span>Dedicated Dog Breed Identifier • AKC & FCI Recognition</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
            Dog Scanner:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200">
              Discover Any Dog Breed
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-purple-200/70 max-w-2xl mx-auto leading-relaxed">
            Upload a photo of your dog. Our vision model recognizes 350+ canine breeds, detects mixed mutt
            percentages, and reveals personality traits, exercise needs, and nutritional guidelines.
          </p>
        </div>
      </section>

      {/* Main Dedicated Dog Scanner Workstation */}
      <section className="py-12 sm:py-16 -mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <PetScanner
            petType="dog"
            samples={DOG_BREEDS.slice(0, 4)}
            title="Dog Breed Scanner Workstation"
            subtitle="Analyzes skull proportions, ear set posture, muzzle ratio, and coat textures."
          />
        </div>
      </section>

      {/* Dog Features Grid */}
      <section className="py-16 bg-themeDark-950/80 border-y border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2 block">
              CANINE VISION INTELLIGENCE
            </span>
            <h2 className="text-3xl font-black text-white">Comprehensive Dog Breed Analysis</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: '350+ AKC & FCI Breeds',
                desc: 'Comprehensive coverage of all working, sporting, toy, hound, terrier, herding, and non-sporting breeds.',
              },
              {
                icon: Sparkles,
                title: 'Crossbreed & Mutt Heritage',
                desc: 'Identifies contributing lineages in mixed shelter rescues (e.g. Labradoodle, German Shepherd mix, Goldendoodle).',
              },
              {
                icon: Activity,
                title: 'Exercise & Training Standards',
                desc: 'Accurately estimates daily activity requirements, trainability indices, and family compatibility.',
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="glass-purple-card rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
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

      {/* Dog Breeds Encyclopedia Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
              CANINE ENCYCLOPEDIA
            </span>
            <h2 className="text-3xl font-black text-white">Dog Breeds Directory</h2>
            <p className="text-xs text-purple-200/60 mt-1">
              Explore pedigree origins, sizes, exercise demands, and fun canine facts.
            </p>
          </div>

          {/* Search Filter */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search dog breed, size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-themeDark-950 border border-purple-800/50 text-white placeholder-purple-400/50 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Breeds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-themeDark-950/80 backdrop-blur-md text-[10px] font-bold text-amber-300">
                  {breed.size}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                  {breed.name}
                </h3>
                <p className="text-xs text-purple-200/60 truncate">{breed.origin}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {breed.temperament.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal for Dog Details */}
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
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">AKC / FCI Standard</span>
                <h3 className="text-2xl font-black text-white">{selectedBreedModal.name}</h3>
                <p className="text-xs text-purple-200/70">{selectedBreedModal.origin} • Lifespan: {selectedBreedModal.lifespan}</p>
              </div>
            </div>

            <p className="text-sm text-purple-100 leading-relaxed">{selectedBreedModal.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-themeDark-950 border border-purple-900/40">
                <span className="text-amber-400 block mb-0.5 font-bold">Size & Weight</span>
                <span className="text-white font-semibold">{selectedBreedModal.size} ({selectedBreedModal.weight})</span>
              </div>
              <div className="p-3 rounded-xl bg-themeDark-950 border border-purple-900/40">
                <span className="text-amber-400 block mb-0.5 font-bold">Exercise Drive</span>
                <span className="text-white font-semibold">{selectedBreedModal.exercise}</span>
              </div>
              <div className="p-3 rounded-xl bg-themeDark-950 border border-purple-900/40">
                <span className="text-amber-400 block mb-0.5 font-bold">Coat & Shedding</span>
                <span className="text-white font-semibold">{selectedBreedModal.coat}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
              <strong className="text-amber-300 block mb-1">Canine Fun Fact:</strong>
              {selectedBreedModal.funFact}
            </div>

            <button
              onClick={() => setSelectedBreedModal(null)}
              className="w-full py-3 rounded-full text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
