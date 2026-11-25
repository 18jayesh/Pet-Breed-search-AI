import React from 'react';
import { Sparkles, Shield, Heart } from 'lucide-react';

export default function Footer({ onScrollToUpload }) {
  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-900">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-500 to-primary-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white">
                PetVision <span className="text-brand-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Discover Your Pet's Breed with AI. Built with Google Gemini Multimodal Intelligence to
              deliver fast, accurate dog and cat breed insights and care guides.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5 text-brand-400" />
              <span>Zero-Storage Privacy Architecture</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleScroll('#home')}
                  className="hover:text-brand-400 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScroll('#how-it-works')}
                  className="hover:text-brand-400 transition"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScroll('#features')}
                  className="hover:text-brand-400 transition"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScroll('#about')}
                  className="hover:text-brand-400 transition"
                >
                  About PetVision AI
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onScrollToUpload}
                  className="text-brand-400 hover:text-brand-300 font-semibold transition"
                >
                  Identify My Pet
                </button>
              </li>
            </ul>
          </div>

          {/* AI & Legal Disclaimer */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              AI Terms & Veterinary Notice
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Breed predictions are algorithmic visual estimations powered by Google Gemini API.
              Analyses are educational in nature and do not constitute veterinary medical diagnosis,
              pedigree documentation, or formal lineage certification.
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Image data sent to Google Gemini is processed under Google AI Studio terms. No image data
              is stored in any persistent database by PetVision AI.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PetVision AI. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted for pet lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
