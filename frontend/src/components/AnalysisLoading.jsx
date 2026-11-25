import React, { useState, useEffect } from 'react';
import { Sparkles, Scan, Dog, Cat, ShieldCheck, Activity } from 'lucide-react';

const DOG_STEPS = [
  { message: 'Extracting Canine Facial Landmarks', detail: 'Evaluating craniofacial ratio, stop angle, and muzzle structure...' },
  { message: 'Inspecting Ear Carriage & Eye Set', detail: 'Classifying prick, drop, semi-prick, or button ear posture...' },
  { message: 'Analyzing Coat Texture & Markings', detail: 'Cross-referencing double-coat density, feathering, and patterns...' },
  { message: 'Compiling Health & Care Profile', detail: 'Assembling exercise thresholds, grooming schedules, and nutrition...' },
];

const CAT_STEPS = [
  { message: 'Scanning Feline Facial Contours', detail: 'Measuring modified wedge geometry, whisker pads, and chin alignment...' },
  { message: 'Inspecting Ear Furnishings & Eyes', detail: 'Analyzing ear tufts, eye aperture, and pigment genetics...' },
  { message: 'Classifying Coat Genetics & Fur', detail: 'Evaluating point coloration, agouti banding, and hair density...' },
  { message: 'Preparing Feline Care Guide', detail: 'Compiling indoor enrichment, coat maintenance, and life stages...' },
];

export default function AnalysisLoading({ previewUrl, activePetType = 'dog', onCancel }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const isDog = activePetType === 'dog';
  const steps = isDog ? DOG_STEPS : CAT_STEPS;

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2400);

    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(timer);
    };
  }, [steps.length]);

  const currentStep = steps[currentStepIndex];

  return (
    <div className="py-12 sm:py-16 max-w-3xl mx-auto px-4">
      <div
        className={`rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden border ${
          isDog
            ? 'bg-slate-900/95 border-amber-500/40 shadow-amber-500/10'
            : 'bg-slate-900/95 border-fuchsia-500/40 shadow-fuchsia-500/10'
        }`}
      >
        {/* Glow orb */}
        <div
          className={`absolute -top-32 -right-32 w-72 h-72 blur-3xl rounded-full pointer-events-none ${
            isDog ? 'bg-amber-500/20' : 'bg-fuchsia-500/20'
          }`}
        />

        <div className="flex flex-col items-center text-center">
          {/* Scanning Box with Image Preview */}
          {previewUrl && (
            <div
              className={`relative w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 shadow-2xl mb-8 group ${
                isDog ? 'border-amber-400' : 'border-fuchsia-400'
              }`}
            >
              <img
                src={previewUrl}
                alt="Scanning pet"
                className="w-full h-full object-cover filter brightness-90"
              />

              {/* Dynamic Laser Scanning Line */}
              <div
                className={`absolute inset-x-0 h-1.5 shadow-lg animate-[scan_2s_ease-in-out_infinite] ${
                  isDog
                    ? 'bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_20px_#f59e0b]'
                    : 'bg-gradient-to-r from-transparent via-fuchsia-300 to-transparent shadow-[0_0_20px_#d946ef]'
                }`}
              />

              {/* Corner HUD Reticles */}
              <div
                className={`absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 ${
                  isDog ? 'border-amber-400' : 'border-fuchsia-400'
                }`}
              />
              <div
                className={`absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 ${
                  isDog ? 'border-amber-400' : 'border-fuchsia-400'
                }`}
              />
              <div
                className={`absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 ${
                  isDog ? 'border-amber-400' : 'border-fuchsia-400'
                }`}
              />
              <div
                className={`absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 ${
                  isDog ? 'border-amber-400' : 'border-fuchsia-400'
                }`}
              />

              {/* Center Reticle Pulse */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className={`w-14 h-14 rounded-full border animate-ping ${
                    isDog ? 'border-amber-400/50' : 'border-fuchsia-400/50'
                  }`}
                />
              </div>

              {/* Floating Mode Badge */}
              <div className="absolute bottom-2 inset-x-2 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-slate-300 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  {isDog ? <Dog className="w-3 h-3 text-amber-400" /> : <Cat className="w-3 h-3 text-fuchsia-400" />}
                  {isDog ? 'Canine Vision Engine' : 'Feline Vision Engine'}
                </span>
                <span className="text-emerald-400">Live Scanning</span>
              </div>
            </div>
          )}

          {/* Stepper Status Pill */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-3 ${
              isDog
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                : 'bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/30'
            }`}
          >
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI Diagnostic Stage {currentStepIndex + 1} of {steps.length}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 min-h-[40px] transition-all">
            {currentStep.message}
          </h3>

          <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
            {currentStep.detail}
          </p>

          {/* Stepper Dots */}
          <div className="w-full max-w-md flex items-center justify-between mb-8 px-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                    idx < currentStepIndex
                      ? isDog
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-fuchsia-500 text-white'
                      : idx === currentStepIndex
                      ? isDog
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20'
                        : 'bg-fuchsia-400 text-slate-950 ring-4 ring-fuchsia-400/20'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="text-[10px] text-slate-400 mt-1.5 hidden sm:inline font-medium">
                  Stage {idx + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Shimmer Progress Line */}
          <div className="w-full max-w-md h-2 bg-slate-800/80 rounded-full overflow-hidden mb-6 relative shadow-inner">
            <div
              className={`h-full w-full animate-shimmer ${
                isDog
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500'
                  : 'bg-gradient-to-r from-fuchsia-500 via-purple-300 to-fuchsia-500'
              }`}
            />
          </div>

          {/* Elapsed timer & Cancel/Retry option */}
          <div className="flex items-center justify-between w-full max-w-md text-xs text-slate-500 pt-1">
            <span>Diagnostic elapsed: {secondsElapsed}s</span>
            {secondsElapsed > 12 && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-slate-300 hover:text-white underline font-semibold"
              >
                Cancel or Retry
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
