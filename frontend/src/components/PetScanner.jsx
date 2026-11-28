import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  X,
  RefreshCw,
  Sparkles,
  Dog,
  Cat,
  ShieldCheck,
  CheckCircle2,
  Info,
  ArrowRight,
  RotateCcw,
  Trash2,
  AlertTriangle,
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
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { analyzePetImage } from '../services/api';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const SCAN_STEPS_CAT = [
  'Measuring feline facial geometry & whisker pads...',
  'Analyzing ear tufts, eye pigmentation & pupil aperture...',
  'Evaluating coat pattern, agouti banding & fur density...',
  'Compiling FIFe breed standards & grooming guidelines...',
];

const SCAN_STEPS_DOG = [
  'Extracting craniofacial ratio & stop angle...',
  'Analyzing ear carriage & eye set posture...',
  'Cross-referencing double-coat density & feathering...',
  'Assembling exercise needs, nutrition & care tips...',
];

export default function PetScanner({ petType = 'cat', samples = [], title, subtitle }) {
  const isCat = petType === 'cat';
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileMeta, setFileMeta] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [isFetchingSample, setIsFetchingSample] = useState(false);

  const steps = isCat ? SCAN_STEPS_CAT : SCAN_STEPS_DOG;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateAndProcessFile = (file) => {
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      toast.error('Unsupported format! Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      toast.error(`Image exceeds 5 MB limit (${formatFileSize(file.size)}). Please choose a smaller photo.`);
      return;
    }

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setFileMeta({
        name: file.name,
        size: formatFileSize(file.size),
        dimensions: `${img.naturalWidth} × ${img.naturalHeight}px`,
      });
      setSelectedFile(file);
      setPreviewUrl(objectUrl);
      setAnalysisResult(null);
    };
    img.onerror = () => {
      toast.error('Unable to read this image file. Please try another image.');
    };
    img.src = objectUrl;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isLoading) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (isLoading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleClearFile = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
  };

  const handleSampleClick = async (sample) => {
    if (isLoading || isFetchingSample) return;
    try {
      setIsFetchingSample(true);
      toast.loading(`Loading sample ${sample.name}...`, { id: 'sample' });
      const response = await fetch(sample.url || sample.image);
      const blob = await response.blob();
      const file = new File([blob], `${sample.name.toLowerCase().replace(/\s+/g, '-')}.jpg`, {
        type: 'image/jpeg',
      });
      toast.dismiss('sample');
      validateAndProcessFile(file);
      toast.success(`Loaded sample: ${sample.name}`);
    } catch (err) {
      toast.dismiss('sample');
      toast.error('Failed to load sample image.');
    } finally {
      setIsFetchingSample(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    // Step animation interval
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2200);

    try {
      const data = await analyzePetImage(selectedFile, petType);
      setAnalysisResult(data);

      if (data.isAnimal && data.isDogOrCat && data.confidence >= 65) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: isCat ? ['#a855f7', '#7c3aed', '#c084fc', '#38bdf8'] : ['#f59e0b', '#7c3aed', '#10b981', '#fbbf24'],
          });
        } catch (e) {
          // ignore
        }
      }

      toast.success(
        data.isDogOrCat
          ? `Identified as ${data.breed}!`
          : data.isAnimal
          ? 'Image processed (Non-canine/feline detected)'
          : 'Analysis complete.'
      );
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Analysis failed. Please try again.');
    } finally {
      clearInterval(interval);
      setIsLoading(false);
      setStepIndex(0);
    }
  };

  const handleCopySummary = () => {
    if (!analysisResult) return;
    const textToCopy = `🐾 PetVision AI Breed Identification
Breed: ${analysisResult.breed} (${analysisResult.breedCategory})
Match Confidence: ${analysisResult.confidence}%
Type: ${analysisResult.animalType.toUpperCase()}
Summary: ${analysisResult.identificationSummary || analysisResult.statusMessage}
Origin: ${analysisResult.breedInformation?.origin || 'N/A'}
Lifespan: ${analysisResult.breedInformation?.lifespan || 'N/A'}
Temperament: ${analysisResult.breedInformation?.temperament?.join(', ') || 'N/A'}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Breed summary copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const strokeDashoffset = analysisResult ? 283 - (283 * analysisResult.confidence) / 100 : 0;

  return (
    <div className="w-full">
      {/* Upload & Scanner Card */}
      <div className="glass-purple-card rounded-3xl p-6 sm:p-10 shadow-purple-card relative overflow-hidden">
        {/* Glow backdrop inside card */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-900/40 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-600/20 border border-brand-500/40 flex items-center justify-center text-brand-400 shadow-inner">
              {isCat ? <Cat className="w-6 h-6 text-brand-400" /> : <Dog className="w-6 h-6 text-amber-400" />}
            </div>
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>{title || (isCat ? 'Cat Breed Scanner' : 'Dog Breed Scanner')}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-brand-600/20 text-brand-300 border border-brand-500/30">
                  AI Vision 3.5
                </span>
              </h3>
              <p className="text-xs text-purple-200/60 mt-0.5">
                {subtitle ||
                  (isCat
                    ? 'Identifies purebred & mixed cat breeds according to FIFe & TICA standards.'
                    : 'Identifies 350+ canine breeds and mixed lineages from morphological cues.')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-purple-300/80">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Volatile Memory Only • No Storage</span>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files && validateAndProcessFile(e.target.files[0])}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          disabled={isLoading}
        />

        {/* STATE 1: Dropzone (No File Selected) */}
        {!previewUrl && !isLoading && (
          <div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center bg-themeDark-950/60 group ${
                isDragOver
                  ? 'border-brand-400 bg-brand-600/15 scale-[1.01]'
                  : 'border-purple-800/40 hover:border-brand-500 hover:bg-themeDark-800/60'
              }`}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600/20 to-purple-500/20 border border-brand-500/30 flex items-center justify-center mb-6 text-brand-400 group-hover:scale-110 transition-transform duration-300 shadow-purple-glow">
                <UploadCloud className="w-10 h-10" />
              </div>

              <h4 className="text-xl font-black text-white mb-2">
                Drop your {isCat ? "Cat's" : "Dog's"} photo here, or{' '}
                <span className="text-brand-400 underline underline-offset-4 decoration-brand-400/50">
                  browse file
                </span>
              </h4>

              <p className="text-xs sm:text-sm text-purple-200/60 max-w-md mb-8 leading-relaxed">
                Supports JPG, PNG, or WEBP up to 5 MB. A well-lit, close-up photo of the face and coat
                gives the most accurate breed breakdown.
              </p>

              <button
                type="button"
                className="px-6 py-3 rounded-full text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-purple-600/30 transition transform group-hover:-translate-y-0.5"
              >
                Choose Photo from Device
              </button>

              <div className="mt-10 pt-6 border-t border-purple-900/40 w-full flex flex-wrap items-center justify-center gap-6 text-xs text-purple-300/70">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Purebreds & Mixed Breeds
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mixed Lineage % Breakdown
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Care & Traits
                </span>
              </div>
            </div>

            {/* Quick Demo Sample Showcase */}
            {samples && samples.length > 0 && (
              <div className="mt-10 pt-8 border-t border-purple-900/40">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    <span>Or Test Immediately With Curated {isCat ? 'Cat' : 'Dog'} Photos:</span>
                  </span>
                  <span className="text-[11px] text-purple-400">1-Click Test</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {samples.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSampleClick(sample)}
                      disabled={isLoading || isFetchingSample}
                      className="group text-left p-2.5 rounded-2xl bg-themeDark-950/70 border border-purple-900/30 hover:border-brand-500/60 hover:bg-themeDark-800/80 transition-all duration-300 flex flex-col justify-between hover:scale-[1.02]"
                    >
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-2 bg-themeDark-900">
                        <img
                          src={sample.url || sample.image}
                          alt={sample.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-brand-300 truncate">
                          {sample.name}
                        </p>
                        <p className="text-[10px] text-purple-300/60 line-clamp-1 mt-0.5">
                          {sample.description || sample.origin}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STATE 2: Image Preview with Confirmation (Before Analysis) */}
        {previewUrl && !isLoading && !analysisResult && (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-themeDark-950 border border-purple-800/40 max-h-[460px] flex items-center justify-center group">
              <img
                src={previewUrl}
                alt="Selected pet"
                className="max-h-[440px] w-auto object-contain rounded-xl"
              />

              {/* Floating Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Choose different image"
                  className="p-2.5 rounded-xl bg-themeDark-900/90 hover:bg-themeDark-800 text-slate-200 border border-purple-800/60 backdrop-blur-md shadow-lg transition"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleClearFile}
                  title="Remove image"
                  className="p-2.5 rounded-xl bg-red-500/80 hover:bg-red-600 text-white border border-red-400/50 backdrop-blur-md shadow-lg transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tag */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-600 text-white shadow-lg">
                  {isCat ? <Cat className="w-3.5 h-3.5" /> : <Dog className="w-3.5 h-3.5" />}
                  <span>{isCat ? 'Cat Scanner Mode' : 'Dog Scanner Mode'}</span>
                </span>
              </div>

              {/* Meta bar */}
              {fileMeta && (
                <div className="absolute bottom-4 left-4 right-4 px-4 py-2.5 rounded-xl bg-themeDark-950/90 backdrop-blur-md border border-purple-900/50 flex flex-wrap items-center justify-between text-xs text-purple-200">
                  <span className="font-semibold truncate max-w-[200px]">{fileMeta.name}</span>
                  <div className="flex items-center gap-3 text-purple-300/70">
                    <span>{fileMeta.dimensions}</span>
                    <span>•</span>
                    <span>{fileMeta.size}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClearFile}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold text-purple-200 hover:text-white bg-themeDark-800 hover:bg-themeDark-750 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAnalyze}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-extrabold text-white bg-brand-600 hover:bg-brand-700 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Sparkles className="w-5 h-5" />
                <span>Scan & Identify {isCat ? 'Cat' : 'Dog'} Breed</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* STATE 3: Loading Laser Scanner State */}
        {isLoading && (
          <div className="py-10 flex flex-col items-center text-center">
            {previewUrl && (
              <div className="relative w-56 h-56 rounded-2xl overflow-hidden border-2 border-brand-500 shadow-purple-glow mb-8 group bg-themeDark-950">
                <img
                  src={previewUrl}
                  alt="Scanning"
                  className="w-full h-full object-cover filter brightness-90"
                />

                {/* Laser scan line */}
                <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-brand-400 to-transparent shadow-[0_0_20px_#8b5cf6] animate-[scan_2s_ease-in-out_infinite]" />

                {/* Corner reticles */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-400" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-400" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-400" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-400" />
              </div>
            )}

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-600/20 text-brand-300 border border-brand-500/30 mb-3">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>AI Multimodal Processing</span>
            </div>

            <h3 className="text-2xl font-black text-white mb-2 transition-all">
              {steps[stepIndex]}
            </h3>
            <p className="text-xs text-purple-200/60 max-w-sm mb-6">
              Comparing uploaded morphological landmarks with registered pedigree standards.
            </p>

            <div className="w-full max-w-md h-2 bg-themeDark-950 rounded-full overflow-hidden relative">
              <div className="h-full bg-gradient-to-r from-brand-600 via-purple-400 to-brand-600 w-full animate-shimmer" />
            </div>
          </div>
        )}

        {/* STATE 4: Result Dashboard View */}
        {analysisResult && (
          <div className="space-y-8 pt-2">
            {/* Edge Case Check */}
            {!analysisResult.isAnimal || !analysisResult.isDogOrCat ? (
              <div className="text-center p-8 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-4">
                <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
                <h4 className="text-2xl font-black text-white">
                  {!analysisResult.isAnimal ? 'No Animal Detected' : 'Non-Target Animal Detected'}
                </h4>
                <p className="text-sm text-purple-200/80 max-w-md mx-auto">
                  {analysisResult.statusMessage ||
                    `This scanner is specialized for ${isCat ? 'cats' : 'dogs'}. Please upload a clear photo of a domestic ${isCat ? 'cat' : 'dog'}.`}
                </p>
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="px-6 py-3 rounded-full text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition"
                >
                  Try Another Photo
                </button>
              </div>
            ) : (
              <>
                {/* Result Hero Showcase Card */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-themeDark-950/70 p-6 rounded-2xl border border-purple-900/50">
                  {/* Photo Thumbnail */}
                  {previewUrl && (
                    <div className="md:col-span-5 relative group">
                      <div className="rounded-2xl overflow-hidden bg-themeDark-900 border border-purple-800/40 aspect-square flex items-center justify-center shadow-xl">
                        <img
                          src={previewUrl}
                          alt={analysisResult.breed}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Identification Details & Radial Gauge */}
                  <div className={`${previewUrl ? 'md:col-span-7' : 'md:col-span-12'} space-y-5`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-brand-600/20 text-brand-300 border border-brand-500/30">
                        {analysisResult.animalType}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-themeDark-800 text-purple-200 border border-purple-700/50">
                        {analysisResult.breedCategory}
                      </span>
                      {analysisResult.isMixedBreed && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                          Mixed Lineage
                        </span>
                      )}
                      {analysisResult.isYoungPet && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                          <Baby className="w-3.5 h-3.5" />
                          <span>Juvenile / Young</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
                        AI Identified Breed
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {analysisResult.breed}
                      </h2>
                    </div>

                    {/* Circular Score Gauge */}
                    <div className="p-4 rounded-2xl bg-themeDark-900 border border-purple-900/60 flex items-center gap-5">
                      <div className="relative w-18 h-18 flex-shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            className="text-themeDark-800"
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
                            stroke="#8b5cf6"
                            fill="transparent"
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-base font-black text-white">{analysisResult.confidence}%</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">Match Certainty</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-brand-600/30 text-brand-300">
                            {analysisResult.confidence >= 80 ? 'High' : 'Moderate'}
                          </span>
                        </div>
                        <p className="text-xs text-purple-200/60 mt-0.5">
                          Evaluated against international breed standards and facial features.
                        </p>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-themeDark-800 hover:bg-themeDark-750 text-slate-200 border border-purple-800/40 transition"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied' : 'Copy Report'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleClearFile}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Scan Another Photo</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tabbed Insight Modules */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-purple-900/40">
                    {[
                      { id: 'overview', label: 'Morphology & Lineage', icon: Sparkles },
                      { id: 'temperament', label: 'Temperament & Traits', icon: Heart },
                      { id: 'physical', label: 'Physical Standards', icon: Scale },
                      { id: 'care', label: 'Care, Diet & Grooming', icon: Utensils },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                            isActive
                              ? 'bg-brand-600 text-white shadow-lg shadow-purple-600/30'
                              : 'text-purple-300 hover:text-white hover:bg-themeDark-800'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* TAB 1: Morphology */}
                  {activeTab === 'overview' && (
                    <div className="space-y-4 pt-2">
                      {analysisResult.identificationSummary && (
                        <div className="p-5 rounded-2xl bg-themeDark-950/70 border border-purple-900/40">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-1.5">
                            <Info className="w-4 h-4 text-brand-400" />
                            <span>Visual Morphological Assessment</span>
                          </h4>
                          <p className="text-sm text-purple-100 leading-relaxed">
                            {analysisResult.identificationSummary}
                          </p>
                        </div>
                      )}

                      {analysisResult.alternativeBreeds && analysisResult.alternativeBreeds.length > 0 && (
                        <div className="p-5 rounded-2xl bg-themeDark-950/70 border border-purple-900/40">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-1.5">
                            <HelpCircle className="w-4 h-4 text-brand-400" />
                            <span>Alternative Breed Probabilities & Crossbreed Affinities</span>
                          </h4>
                          <div className="space-y-3">
                            {analysisResult.alternativeBreeds.map((alt, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                  <span className="font-semibold text-slate-200">{alt.name}</span>
                                  <span className="font-mono text-purple-300">~{alt.confidence}%</span>
                                </div>
                                <div className="w-full h-2 bg-themeDark-900 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-brand-500"
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

                  {/* TAB 2: Temperament */}
                  {activeTab === 'temperament' && (
                    <div className="p-6 rounded-2xl bg-themeDark-950/70 border border-purple-900/40 space-y-5">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-2">
                          <Heart className="w-4 h-4 text-rose-400" />
                          <span>Behavioral Personality Traits</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.breedInformation?.temperament?.map((trait, idx) => (
                            <span
                              key={idx}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-purple-900/40">
                        <div>
                          <span className="text-xs font-bold text-purple-300 block mb-1">Energy Drive</span>
                          <p className="text-sm font-bold text-amber-300">
                            {analysisResult.breedInformation?.energyLevel || 'Moderate'}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-purple-300 block mb-1">Sociability</span>
                          <p className="text-sm font-bold text-teal-300">Companion & Family Friendly</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Physical Standards */}
                  {activeTab === 'physical' && (
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        <div className="p-4 rounded-2xl bg-themeDark-950/70 border border-purple-900/40">
                          <span className="text-[11px] text-purple-300 block mb-1 font-medium">Origin</span>
                          <span className="text-sm font-bold text-white block">
                            {analysisResult.breedInformation?.origin}
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-themeDark-950/70 border border-purple-900/40">
                          <span className="text-[11px] text-purple-300 block mb-1 font-medium">Lifespan</span>
                          <span className="text-sm font-bold text-white block">
                            {analysisResult.breedInformation?.lifespan}
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-themeDark-950/70 border border-purple-900/40">
                          <span className="text-[11px] text-purple-300 block mb-1 font-medium">Size Category</span>
                          <span className="text-sm font-bold text-white block">
                            {analysisResult.breedInformation?.size}
                          </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-themeDark-950/70 border border-purple-900/40">
                          <span className="text-[11px] text-purple-300 block mb-1 font-medium">Adult Weight</span>
                          <span className="text-sm font-bold text-white block">
                            {analysisResult.breedInformation?.weight}
                          </span>
                        </div>
                        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-themeDark-950/70 border border-purple-900/40">
                          <span className="text-[11px] text-purple-300 block mb-1 font-medium">Adult Height</span>
                          <span className="text-sm font-bold text-white block">
                            {analysisResult.breedInformation?.height}
                          </span>
                        </div>
                      </div>

                      {analysisResult.breedInformation?.physicalCharacteristics && (
                        <div className="p-5 rounded-2xl bg-themeDark-950/70 border border-purple-900/40">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Distinguishing Anatomical Traits</span>
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {analysisResult.breedInformation.physicalCharacteristics.map((char, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 p-2.5 rounded-xl bg-themeDark-900 border border-purple-900/40 text-xs text-purple-100"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                <span>{char}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: Care & Diet */}
                  {activeTab === 'care' && (
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-themeDark-950/70 border border-purple-900/40 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                            <Utensils className="w-4 h-4 text-indigo-400" />
                            <span>Nutrition Plan</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                            {analysisResult.breedInformation?.dietInformation}
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-themeDark-950/70 border border-purple-900/40 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                            <Scissors className="w-4 h-4 text-blue-400" />
                            <span>Grooming & Shedding</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                            Requirements: <strong className="text-blue-300">{analysisResult.breedInformation?.groomingNeeds}</strong>.
                            Exercise: <strong className="text-emerald-300">{analysisResult.breedInformation?.exerciseNeeds}</strong>.
                          </p>
                        </div>
                      </div>

                      {analysisResult.breedInformation?.careTips && (
                        <div className="p-5 rounded-2xl bg-themeDark-950/70 border border-purple-900/40">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-brand-400" />
                            <span>Daily Care & Maintenance Guidelines</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {analysisResult.breedInformation.careTips.map((tip, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-themeDark-900 border border-purple-900/40 text-xs text-purple-200 flex items-start gap-2.5"
                              >
                                <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Visible Disclaimer */}
                <div className="p-4 rounded-2xl bg-themeDark-950/60 border border-purple-900/40 text-xs text-purple-300/70 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-purple-200 block mb-0.5">Veterinary AI Disclaimer</span>
                    <p className="leading-relaxed">
                      {analysisResult.disclaimer ||
                        'AI breed predictions are visual estimations. They do not constitute official veterinary lineage diagnosis.'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
