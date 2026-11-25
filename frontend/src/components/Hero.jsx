import React from 'react';
import { Sparkles, ArrowRight, Dog, Cat, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function Hero({ onSelectModeAndScroll, onScrollToHowItWorks }) {
  return (
    <section id="home" className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden bg-dot-pattern">
      {/* Dynamic ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] bg-gradient-to-tr from-amber-500/15 to-teal-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-gradient-to-tr from-fuchsia-500/15 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-brand-500/30 text-xs sm:text-sm text-brand-300 font-semibold mb-8 backdrop-blur-xl shadow-lg">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Next-Gen Vision AI for Canines & Felines</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-normal">No Registration</span>
          </div>

          {/* Master Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
            Discover Your Pet's Breed{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-brand-300 to-fuchsia-300">
              with Vision AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Upload a photo of your dog or cat. Our specialized AI vision models examine skull geometry,
            ear carriage, coat genetics, and temperament traits in seconds.
          </p>

          {/* Dual Action CTAs: Choose Dog or Cat Directly */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSelectModeAndScroll('dog')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
            >
              <Dog className="w-5 h-5 text-slate-950" />
              <span>Identify Dog Breed</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => onSelectModeAndScroll('cat')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-600 hover:from-fuchsia-400 hover:to-purple-500 shadow-xl shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
            >
              <Cat className="w-5 h-5 text-white" />
              <span>Identify Cat Breed</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-center">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="text-2xl font-black text-amber-400">350+</div>
              <div className="text-xs font-semibold text-slate-300">Dog Breeds</div>
              <div className="text-[11px] text-slate-500">Purebred & Mixes</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="text-2xl font-black text-fuchsia-400">70+</div>
              <div className="text-xs font-semibold text-slate-300">Cat Breeds</div>
              <div className="text-[11px] text-slate-500">Standard & Exotics</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
