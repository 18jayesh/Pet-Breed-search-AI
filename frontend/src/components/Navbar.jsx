import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, Dog, Cat, BookOpen, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo with purple icon matching MonkeyLinks aesthetic */}
          <Link
            to="/"
            className="flex items-center space-x-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-purple-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-slate-900 font-sans">
                PetVision<span className="text-brand-600">.ai</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold -mt-0.5">
                AI Dog & Cat Scanner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/cat-scanner"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'
                }`
              }
            >
              <Cat className="w-4 h-4 text-purple-600" />
              <span>Cat Scanner</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-700 font-bold">New</span>
            </NavLink>

            <NavLink
              to="/dog-scanner"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'
                }`
              }
            >
              <Dog className="w-4 h-4 text-amber-500" />
              <span>Dog Scanner</span>
            </NavLink>

            <NavLink
              to="/breeds"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'
                }`
              }
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Breed Database</span>
            </NavLink>
          </nav>

          {/* Right Action: Purple Pill Button matching the reference screenshot */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => navigate('/cat-scanner')}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-full shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Scan Cat Breed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/dog-scanner')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-full transition-all duration-200"
            >
              <span>Dog Scanner</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-white border-b border-purple-100 shadow-xl space-y-2">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-purple-50 hover:text-brand-600"
          >
            Home
          </NavLink>
          <NavLink
            to="/cat-scanner"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-bold text-purple-700 bg-purple-50"
          >
            <Cat className="w-5 h-5 text-purple-600" />
            <span>Cat Scanner (catscanner.org style)</span>
          </NavLink>
          <NavLink
            to="/dog-scanner"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-purple-50 hover:text-brand-600"
          >
            <Dog className="w-5 h-5 text-amber-500" />
            <span>Dog Scanner</span>
          </NavLink>
          <NavLink
            to="/breeds"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-bold text-slate-800 hover:bg-purple-50 hover:text-brand-600"
          >
            <BookOpen className="w-5 h-5 text-slate-400" />
            <span>Breed Encyclopedia</span>
          </NavLink>

          <div className="pt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/cat-scanner');
              }}
              className="w-full py-3 text-center text-xs font-black text-white bg-brand-600 rounded-full shadow-md"
            >
              Scan Cat Breed
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/dog-scanner');
              }}
              className="w-full py-3 text-center text-xs font-black text-slate-800 bg-purple-100 rounded-full"
            >
              Scan Dog Breed
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
