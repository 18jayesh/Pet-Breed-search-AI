import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart, Cat, Dog, BookOpen, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-themeDark-950 text-slate-400 border-t border-purple-900/30 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-purple-900/20">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-themeDark-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-400" />
                </div>
              </div>
              <span className="font-black text-xl text-white">
                PetVision<span className="text-brand-500">.ai</span>
              </span>
            </Link>
            <p className="text-xs text-purple-200/70 leading-relaxed max-w-sm">
              Next-generation canine & feline breed identification platform powered by Google Gemini
              Multimodal Vision. Detailed breed profiles, ancestry breakdown, care tips, and purebred standards.
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-300/80 pt-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% In-Memory RAM Processing • No Permanent Storage</span>
            </div>
          </div>

          {/* Dedicated Scanners Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">Scanners & Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/cat-scanner" className="flex items-center gap-1.5 hover:text-white transition text-purple-200/80">
                  <Cat className="w-3.5 h-3.5 text-purple-400" />
                  <span>Cat Breed Scanner</span>
                </Link>
              </li>
              <li>
                <Link to="/dog-scanner" className="flex items-center gap-1.5 hover:text-white transition text-purple-200/80">
                  <Dog className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dog Breed Scanner</span>
                </Link>
              </li>
              <li>
                <Link to="/breeds" className="flex items-center gap-1.5 hover:text-white transition text-purple-200/80">
                  <BookOpen className="w-3.5 h-3.5 text-brand-400" />
                  <span>Breed Database & Library</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://catscanner.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition text-purple-300/60"
                >
                  <span>CatScanner.org Reference</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* AI & Legal Disclaimer */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Veterinary Notice & AI Terms
            </h4>
            <p className="text-[11px] text-purple-200/60 leading-relaxed">
              PetVision AI visual breed predictions are algorithmic estimates using morphological features.
              They are designed for educational purposes and do not replace official pedigree registration or veterinary DNA testing.
            </p>
            <p className="text-[11px] text-purple-200/50 leading-relaxed">
              Uploaded images are processed directly in temporary buffer memory and are not stored in any permanent database.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/50">
          <p>© {new Date().getFullYear()} PetVision AI. Inspired by modern SaaS design & feline intelligence.</p>
          <p className="flex items-center gap-1.5">
            Designed for loving pet parents worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
