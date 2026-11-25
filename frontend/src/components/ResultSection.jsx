import React, { useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  Trash2,
  AlertTriangle,
  Info,
  CheckCircle2,
  Heart,
  Activity,
  Scissors,
  Utensils,
  ShieldAlert,
  Compass,
  Scale,
  Clock,
  Zap,
  HelpCircle,
  Baby,
  Copy,
  Check,
  Share2,
  Dog,
  Cat,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function ResultSection({
  result,
  previewUrl,
  onAnalyzeAnother,
  onClear,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const {
    isAnimal,
    animalType,
    isDogOrCat,
    isClearImage,
    breed,
    breedCategory,
    confidence,
    isMixedBreed,
    isYoungPet,
    youngPetNote,
    alternativeBreeds,
    identificationSummary,
    breedInformation,
    statusMessage,
    disclaimer,
    meta,
  } = result;

  const isDog = animalType === 'dog';

  const handleCopySummary = () => {
    const textToCopy = `🐾 PetVision AI Breed Identification
Breed: ${breed} (${breedCategory})
Match Confidence: ${confidence}%
Type: ${animalType.toUpperCase()}
Summary: ${identificationSummary || statusMessage}
Origin: ${breedInformation?.origin || 'N/A'}
Lifespan: ${breedInformation?.lifespan || 'N/A'}
Temperament: ${breedInformation?.temperament?.join(', ') || 'N/A'}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Breed summary copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  // Edge Case: Non-animal or not a dog/cat
  if (!isAnimal || !isDogOrCat) {
    return (
      <section id="results" className="py-12 sm:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-900/95 border border-amber-500/30 rounded-3xl p-8 sm:p-12 backdrop-blur-2xl shadow-2xl text-center">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-6">
              <AlertTriangle className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-black text-white mb-3">
              {!isAnimal ? 'No Domestic Pet Detected' : 'Non-Canine/Feline Subject Detected'}
            </h2>

            <p className="text-base text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
              {statusMessage ||
                'PetVision AI is specially trained for domestic dogs and cats. Please provide a clear photograph of a canine or feline.'}
            </p>

            {previewUrl && (
              <div className="w-56 h-56 rounded-2xl overflow-hidden border border-slate-800 mx-auto mb-8 bg-slate-950 shadow-xl">
                <img src={previewUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onAnalyzeAnother}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 transition shadow-lg shadow-amber-500/25"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Upload Another Pet Photo</span>
              </button>

              <button
                type="button"
                onClick={onClear}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Circular gauge coordinates calculation
  const strokeDashoffset = 283 - (283 * confidence) / 100;

  return (
    <section id="results" className="py-12 sm:py-20 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Master Result Card */}
        <div
          className={`rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden border ${
            isDog
              ? 'bg-slate-900/90 border-amber-500/30 shadow-amber-500/10'
              : 'bg-slate-900/90 border-fuchsia-500/30 shadow-fuchsia-500/10'
          }`}
        >
          {/* Top Bar with Badges & Share / Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isDog
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30'
                }`}
              >
                {isDog ? <Dog className="w-3.5 h-3.5" /> : <Cat className="w-3.5 h-3.5" />}
                <span>{animalType}</span>
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {breedCategory}
              </span>

              {isMixedBreed && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Mixed Heritage
                </span>
              )}

              {isYoungPet && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  <Baby className="w-3.5 h-3.5" />
                  <span>Juvenile / Young Pet</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title="Copy identification report"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Report'}</span>
              </button>

              <button
                type="button"
                onClick={onAnalyzeAnother}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition ${
                  isDog
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                    : 'bg-fuchsia-500 hover:bg-fuchsia-400 text-white'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Analyze Another</span>
              </button>

              <button
                type="button"
                onClick={onClear}
                title="Clear Results"
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Identification Showcase */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Image Preview with Zoom Hover */}
            {previewUrl && (
              <div className="md:col-span-5 relative group">
                <div className="rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-2xl aspect-square flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt={breed}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-3 inset-x-3 px-3.5 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-semibold text-slate-300 flex items-center justify-between">
                  <span>Visual Sample Analyzed</span>
                  <span className="capitalize">{animalType}</span>
                </div>
              </div>
            )}

            {/* Breed Title + Radial Confidence Gauge */}
            <div className={`${previewUrl ? 'md:col-span-7' : 'md:col-span-12'} space-y-6`}>
              <div>
                <span
                  className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 mb-1.5 ${
                    isDog ? 'text-amber-400' : 'text-fuchsia-400'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Primary Identified Breed
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {breed}
                </h1>
              </div>

              {/* Confidence Score Display with Circular Gauge & Bar */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-6">
                {/* SVG Gauge */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      className="text-slate-800"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      stroke={confidence >= 80 ? '#10b981' : confidence >= 50 ? '#f59e0b' : '#f97316'}
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-white">{confidence}%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Diagnostic Confidence</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        confidence >= 80
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : confidence >= 50
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-orange-500/20 text-orange-300'
                      }`}
                    >
                      {confidence >= 80 ? 'High Certainty' : confidence >= 50 ? 'Moderate' : 'Low Clarity'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Confidence estimate computed from visible facial proportion, ear posture, coat genetics, and image resolution.
                  </p>
                </div>
              </div>

              {/* Juvenile Young Pet Alert */}
              {isYoungPet && youngPetNote && (
                <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 text-sky-200 text-xs leading-relaxed flex items-start gap-3">
                  <Baby className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Juvenile Morphology Notice:</span>
                    {youngPetNote}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabbed Comprehensive Insights Navigation */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-xl">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800">
            {[
              { id: 'overview', label: 'Overview & Morphology', icon: Sparkles },
              { id: 'temperament', label: 'Temperament & Personality', icon: Heart },
              { id: 'physical', label: 'Physical Characteristics', icon: Scale },
              { id: 'care', label: 'Care, Diet & Grooming', icon: Utensils },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? isDog
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: Overview & Morphology */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Identification Summary */}
              {identificationSummary && (
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-brand-400" />
                    <span>Visual Morphological Assessment</span>
                  </h4>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {identificationSummary}
                  </p>
                </div>
              )}

              {/* Alternative Breeds */}
              {alternativeBreeds && alternativeBreeds.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-brand-400" />
                    <span>Alternative Breed Probabilities & Crossbreed Affinities</span>
                  </h4>
                  <div className="space-y-3">
                    {alternativeBreeds.map((alt, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="font-semibold text-slate-200">{alt.name}</span>
                          <span className="font-mono text-slate-400">~{alt.confidence}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isDog ? 'bg-amber-400' : 'bg-fuchsia-400'
                            }`}
                            style={{ width: `${Math.min(100, alt.confidence * 4)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Temperament & Personality */}
          {activeTab === 'temperament' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Key Temperament & Behavioral Traits</span>
                </h4>
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {breedInformation?.temperament?.map((trait, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20"
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block mb-1">Energy Drive</span>
                    <p className="text-base font-bold text-amber-300">{breedInformation?.energyLevel}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Mental stimulation and exercise required to stay relaxed and content.
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 block mb-1">Social Disposition</span>
                    <p className="text-base font-bold text-teal-300">Companion & Family Orientated</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Responds best to positive reinforcement and regular domestic interaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Physical Characteristics */}
          {activeTab === 'physical' && (
            <div className="space-y-6 animate-fadeIn">
              {/* 5-Item Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1 font-medium">
                    <Compass className="w-3.5 h-3.5 text-brand-400" /> Origin
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white block">
                    {breedInformation?.origin}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-brand-400" /> Lifespan
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white block">
                    {breedInformation?.lifespan}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1 font-medium">
                    <Activity className="w-3.5 h-3.5 text-brand-400" /> Size
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white block">
                    {breedInformation?.size}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1 font-medium">
                    <Scale className="w-3.5 h-3.5 text-brand-400" /> Weight
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white block">
                    {breedInformation?.weight}
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1 font-medium">
                    <Zap className="w-3.5 h-3.5 text-brand-400" /> Height
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white block">
                    {breedInformation?.height}
                  </span>
                </div>
              </div>

              {/* Physical Traits List */}
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Distinguishing Physical Markers</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {breedInformation?.physicalCharacteristics?.map((char, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: Care, Diet & Grooming */}
          {activeTab === 'care' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Diet */}
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-indigo-400" />
                    <span>Nutrition & Dietary Regimen</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {breedInformation?.dietInformation}
                  </p>
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-200">
                    Always measure daily calorie portions according to life stage and activity level.
                  </div>
                </div>

                {/* Grooming */}
                <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-blue-400" />
                    <span>Grooming & Coat Care</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Needs: <strong className="text-blue-300">{breedInformation?.groomingNeeds}</strong>. Regular brushing prevents matting and minimizes shedding.
                  </p>
                  <p className="text-xs text-slate-400">
                    Exercise Target: <strong className="text-emerald-300">{breedInformation?.exerciseNeeds}</strong>
                  </p>
                </div>
              </div>

              {/* Care Tips Checklist */}
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  <span>Actionable Daily Care Tips</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {breedInformation?.careTips?.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legal & Medical Disclaimer Card */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-400 text-xs sm:text-sm flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-200 block">Veterinary & Algorithmic Notice</span>
            <p className="leading-relaxed">
              {disclaimer ||
                'AI-powered breed identification is an estimate. Results may vary depending on image quality, breed similarity, and mixed-breed characteristics.'}
            </p>
            <p className="text-[11px] text-slate-500">
              PetVision AI does not provide veterinary medical advice or lineage certification. Always consult a licensed veterinarian for medical guidance.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={onAnalyzeAnother}
            className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-black shadow-2xl transition transform hover:-translate-y-0.5 ${
              isDog
                ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 shadow-amber-500/25'
                : 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-fuchsia-500/25'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Analyze Another {isDog ? 'Dog' : 'Cat'} Photo</span>
          </button>
        </div>
      </div>
    </section>
  );
}
