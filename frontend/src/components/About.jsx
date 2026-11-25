import React from 'react';
import { ShieldCheck, Database, Lock, EyeOff, Sparkles, HeartHandshake } from 'lucide-react';

export default function About() {
  const privacyPillars = [
    {
      icon: EyeOff,
      title: 'No User Accounts or Passwords',
      description: 'Zero registration, login forms, email harvesting, or session cookies required.',
    },
    {
      icon: Database,
      title: 'Zero Permanent Image Storage',
      description: 'Photos are handled purely in volatile RAM buffer memory during analysis and instantly discarded.',
    },
    {
      icon: Lock,
      title: 'Stripped EXIF & Metadata',
      description: 'Embedded GPS coordinates and camera timestamps are stripped by Sharp prior to AI submission.',
    },
    {
      icon: HeartHandshake,
      title: 'Promoting Animal Welfare',
      description: 'Empowering rescue adoptees and shelter volunteers with tailored care understanding.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-950/80 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-400 block">
              About PetVision AI
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bridging Cutting-Edge Vision AI with Responsible Pet Care
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Every year, millions of pet parents adopt rescue pets with mysterious heritage, or wonder
              about the subtle traits that make their dog or cat unique.
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              PetVision AI was built to demystify breed composition instantly using Google Gemini's
              multimodal visual architecture. Whether you have a purebred companion or a charming mixed-breed
              rescue, our mission is to provide actionable knowledge that enriches your bond and fosters
              happier, healthier animal lives.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>Strict In-Memory Processing Policy</span>
              </div>
            </div>
          </div>

          {/* Right Column: Privacy & Architecture Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {privacyPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2 hover:border-slate-700 transition"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
