import React, { useState } from 'react';
import { Sparkles, Menu, X, Dog, Cat, ShieldCheck } from 'lucide-react';

export default function Navbar({ activePetType, onSelectModeAndScroll, onScrollToUpload }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-slate-950/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-brand-400 to-fuchsia-400 p-0.5 flex items-center justify-center shadow-lg group-hover:shadow-brand-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-300 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                PetVision <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-brand-300 to-fuchsia-300">AI</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Dog & Cat Breed Vision
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mode Quick Switchers & Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Quick Dog Button */}
            <button
              type="button"
              onClick={() => onSelectModeAndScroll('dog')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activePetType === 'dog'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Dog className="w-4 h-4 text-amber-400" />
              <span>Dog Lab</span>
            </button>

            {/* Quick Cat Button */}
            <button
              type="button"
              onClick={() => onSelectModeAndScroll('cat')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activePetType === 'cat'
                  ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-fuchsia-300 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Cat className="w-4 h-4 text-fuchsia-400" />
              <span>Cat Studio</span>
            </button>

            {/* Primary CTA */}
            <button
              onClick={onScrollToUpload}
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-brand-300 to-fuchsia-300 hover:opacity-90 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 ml-1"
            >
              Upload Pet Photo
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-slate-950/95 border-b border-slate-800 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectModeAndScroll('dog');
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold"
            >
              <Dog className="w-4 h-4 text-amber-400" />
              <span>Dog Lab</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectModeAndScroll('cat');
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-bold"
            >
              <Cat className="w-4 h-4 text-fuchsia-400" />
              <span>Cat Studio</span>
            </button>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900 hover:text-brand-400"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToUpload();
              }}
              className="w-full py-3 text-center text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-brand-300 to-fuchsia-300 rounded-xl shadow-lg"
            >
              Upload Pet Photo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
