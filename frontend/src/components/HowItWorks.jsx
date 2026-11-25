import React from 'react';
import { UploadCloud, Cpu, Sparkles, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: UploadCloud,
    title: "Upload Your Pet's Photo",
    description:
      'Choose a clear snapshot of your dog or cat from your camera roll or desktop. Drag & drop or browse in seconds.',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AI Analyzes the Image',
    description:
      'Google Gemini vision intelligence analyzes facial geometry, ear set, coat texture, body proportions, and color patterns.',
  },
  {
    step: '03',
    icon: Sparkles,
    title: "Discover Your Pet's Breed",
    description:
      'Instantly view identified breed, match confidence, personality traits, grooming guidelines, and care recommendations.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-950/60 border-y border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2 block">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How PetVision AI Works
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            No registration, no waitlists, and no complex forms. Get scientific breed insights in just a few clicks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-md hover:border-slate-700 transition duration-300 group"
              >
                {/* Step Number Watermark */}
                <span className="text-5xl font-black text-slate-800/60 absolute top-4 right-6 group-hover:text-brand-500/20 transition-colors">
                  {step.step}
                </span>

                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
