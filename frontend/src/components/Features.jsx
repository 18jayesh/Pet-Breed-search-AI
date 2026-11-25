import React from 'react';
import {
  Sparkles,
  Eye,
  BookOpen,
  Heart,
  Scissors,
  Gauge,
  CheckCircle2,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI Breed Recognition',
    description:
      'State-of-the-art vision models evaluate anatomical landmarks, coat patterns, muzzle structure, and ear morphology.',
  },
  {
    icon: Eye,
    title: 'Dog & Cat Identification',
    description:
      'Seamlessly identifies both canine and feline family members, separating dogs and cats automatically.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Breed Profiles',
    description:
      'Access verified information on geographic origins, average lifespans, standard dimensions, and adult weights.',
  },
  {
    icon: Heart,
    title: 'Personality & Temperament Insights',
    description:
      'Understand unique behavioral inclinations, sociability, energy drives, and family compatibility factors.',
  },
  {
    icon: Scissors,
    title: 'Care & Grooming Recommendations',
    description:
      'Learn specific shedding management, coat care schedules, daily exercise targets, and dietary nutritional tips.',
  },
  {
    icon: Gauge,
    title: 'Honest Confidence Estimation',
    description:
      'Transparent percentage-based confidence estimates that account for lighting, angle, and mixed-breed traits.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2 block">
            Intelligent Vision Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Pet Parents & Enthusiasts
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Everything you need to discover, understand, and care for your pet's distinctive breed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-brand-500/30 hover:bg-slate-900/80 transition duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-4 group-hover:scale-105 transition-transform duration-200">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
