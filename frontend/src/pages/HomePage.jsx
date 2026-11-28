import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Cat,
  Dog,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Zap,
  Activity,
  Heart,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { CAT_BREEDS, DOG_BREEDS } from '../data/breedsData';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* HERO SECTION: Exact aesthetic from the user's uploaded image (deep midnight purple + purple glow + right glass stats panel) */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 bg-themeDark-900 bg-purple-radial overflow-hidden">
        {/* Soft radial purple orbs */}
        <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-brand-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Subtitle & Dual CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Tag Pill matching screenshot */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-600/20 border border-brand-500/40 text-brand-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>#1 AI Dog & Cat Breed Identification</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
                Identify Dog & Cat Breeds{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-brand-400 to-indigo-300">
                  with AI Precision
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-purple-200/70 leading-relaxed max-w-xl">
                Upload a photo of your pet and let Google Gemini multimodal vision identify the breed,
                mixed heritage percentages, temperament traits, and complete health & care guidelines in seconds.
              </p>

              {/* Action Buttons matching screenshot style */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => navigate('/cat-scanner')}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-extrabold text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-purple-600/40 hover:shadow-purple-600/60 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Cat className="w-5 h-5" />
                  <span>Launch Cat Scanner</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => navigate('/dog-scanner')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-extrabold text-white bg-themeDark-800 hover:bg-themeDark-750 border border-purple-700/50 hover:border-brand-500/70 transition-all duration-200"
                >
                  <Dog className="w-5 h-5 text-amber-400" />
                  <span>Launch Dog Scanner</span>
                </button>
              </div>

              {/* Micro Trust Proof */}
              <div className="flex items-center gap-6 pt-4 text-xs text-purple-300/70">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Purebred & Mix Detection
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> RAM-Only Processing
                </span>
              </div>
            </div>

            {/* Right Column: Glass Analytics Card matching screenshot */}
            <div className="lg:col-span-5 relative">
              <div className="glass-purple-card rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                {/* Header inside card */}
                <div className="flex items-center justify-between pb-4 border-b border-purple-800/40 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                      Live AI Recognition Accuracy
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    +98.6% Benchmark
                  </span>
                </div>

                {/* Big Stat display */}
                <div className="space-y-1 mb-6">
                  <div className="text-xs font-semibold text-purple-300/80">Recognized Pedigree Standards</div>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">420+ Breeds</div>
                  <div className="text-xs text-purple-300/60 flex items-center gap-1.5 pt-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>350+ Dogs (AKC/FCI) • 70+ Cats (FIFe/TICA)</span>
                  </div>
                </div>

                {/* Sleek SVG Wave Line matching screenshot */}
                <div className="relative h-28 w-full my-4">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 Q40,65 80,70 T160,45 T240,25 T300,10 L300,100 L0,100 Z"
                      fill="url(#purpleGradient)"
                    />
                    <path
                      d="M0,80 Q40,65 80,70 T160,45 T240,25 T300,10"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="300" cy="10" r="5" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
                  </svg>
                </div>

                {/* Bottom Card Stat */}
                <div className="pt-4 border-t border-purple-800/40 flex items-center justify-between text-xs text-purple-200">
                  <span className="font-bold">Zero User Accounts</span>
                  <span className="text-brand-300 font-mono">100% Free & Open Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Clean White Transition Section matching the bottom of screenshot */}
      <section className="py-16 sm:py-20 bg-white text-slate-900 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600 block mb-2">
            AI BREED IDENTIFICATION TRUSTED BY PET PARENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Specialized Scanners For Every Furry Companion
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Choose the dedicated scanner designed specifically for your animal's unique morphology.
          </p>

          {/* Dual Dedicated Cards: Cat Scanner & Dog Scanner */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Card 1: Cat Scanner */}
            <div className="rounded-3xl p-8 bg-gradient-to-br from-purple-50 to-white border border-purple-200/80 shadow-xl hover:shadow-2xl transition duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                  <Cat className="w-8 h-8" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-purple-100 text-purple-700 mb-3">
                  Inspired by CatScanner.org
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Cat Breed Scanner</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Identifies 70+ feline breeds, mixed-breed percentage ancestries, ear tuft genetics,
                  coat patterns, and FIFe pedigree standards.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span>Purebreds, Domestic Shorthair & Mixed Felines</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span>Hypoallergenic ratings & grooming schedules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span>Vocalization & indoor enrichment guides</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/cat-scanner"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full text-sm font-extrabold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-purple-600/25 transition"
              >
                <span>Go to Cat Breed Scanner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Dog Scanner */}
            <div className="rounded-3xl p-8 bg-gradient-to-br from-amber-50 to-white border border-amber-200/80 shadow-xl hover:shadow-2xl transition duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <Dog className="w-8 h-8" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-100 text-amber-800 mb-3">
                  AKC & FCI Standards
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Dog Breed Scanner</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Recognizes 350+ canine breeds and mixed mutt heritage. Evaluates craniofacial muzzle ratios,
                  ear posture, adult size, and daily exercise drives.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Crossbreed and mutt percentage estimation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Energy level, exercise needs & trainability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Puppy growth notice & nutritional regimen</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/dog-scanner"
                className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/25 transition"
              >
                <span>Go to Dog Breed Scanner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: How It Works */}
      <section id="how-it-works" className="py-20 bg-themeDark-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2 block">
              3-STEP RECOGNITION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">How PetVision AI Works</h2>
            <p className="mt-3 text-purple-200/60 text-sm sm:text-base">
              Identify any dog or cat breed from your device's photo roll in under 3 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Snap or Select Photo',
                desc: 'Upload a clear photograph of your cat or dog. Close-up shots with clear facial view work best.',
              },
              {
                step: '02',
                title: 'Gemini AI Vision Analysis',
                desc: 'Our neural models evaluate anatomical landmarks, muzzle shape, coat markings, and skull geometry.',
              },
              {
                step: '03',
                title: 'Instant Breed Profile',
                desc: 'Receive predicted breed, match certainty score, mixed heritage affinities, temperament, and care tips.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-purple-card rounded-2xl p-8 relative hover:border-brand-500/50 transition duration-300"
              >
                <span className="text-5xl font-black text-purple-900/40 absolute top-4 right-6">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-6 font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-purple-200/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Popular Breeds Directory Sneak Peek */}
      <section className="py-20 bg-themeDark-900 border-t border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400 block mb-1">
                ENCYCLOPEDIA LIBRARY
              </span>
              <h2 className="text-3xl font-black text-white">Popular Cataloged Breeds</h2>
            </div>
            <Link
              to="/breeds"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-themeDark-800 text-purple-200 hover:text-white border border-purple-800/60 hover:border-brand-500 transition"
            >
              <span>Explore All Breeds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CAT_BREEDS.slice(0, 2).concat(DOG_BREEDS.slice(0, 2)).map((breed, idx) => (
              <div
                key={idx}
                className="glass-purple-card rounded-2xl p-3 flex flex-col justify-between hover:scale-[1.02] transition"
              >
                <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 bg-themeDark-950">
                  <img src={breed.image} alt={breed.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white truncate">{breed.name}</h4>
                  <p className="text-[11px] text-purple-300/60 line-clamp-1">{breed.origin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
