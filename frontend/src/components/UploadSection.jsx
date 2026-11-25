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
} from 'lucide-react';
import toast from 'react-hot-toast';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const DOG_SAMPLES = [
  {
    name: 'Golden Retriever',
    badge: 'Popular Purebred',
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80',
    description: 'Golden dense coat & gentle dark eyes',
  },
  {
    name: 'Siberian Husky',
    badge: 'Nordic Working',
    url: 'https://images.unsplash.com/photo-1617895153857-82fe79adfcd4?auto=format&fit=crop&w=700&q=80',
    description: 'Distinctive facial mask & erect ears',
  },
  {
    name: 'German Shepherd',
    badge: 'Herding & Guard',
    url: 'https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?auto=format&fit=crop&w=700&q=80',
    description: 'Noble wedge-shaped head & alert posture',
  },
  {
    name: 'French Bulldog',
    badge: 'Companion Breed',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=80',
    description: 'Iconic bat ears & compact muscular frame',
  },
];

const CAT_SAMPLES = [
  {
    name: 'Maine Coon',
    badge: 'Gentle Giant',
    url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=700&q=80',
    description: 'Tufted lynx-tipped ears & majestic lion ruff',
  },
  {
    name: 'Siamese Cat',
    badge: 'Oriental Pointed',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=80',
    description: 'Sapphire blue eyes & striking color points',
  },
  {
    name: 'Bengal Cat',
    badge: 'Exotic Hybrid',
    url: 'https://images.unsplash.com/photo-1647806422508-0322f33e270b?auto=format&fit=crop&w=700&q=80',
    description: 'Wild vivid rosettes & sleek athletic body',
  },
  {
    name: 'British Shorthair',
    badge: 'Plush Aristocrat',
    url: 'https://images.unsplash.com/photo-1727683024583-c7ce0cf9e691?auto=format&fit=crop&w=700&q=80',
    description: 'Crisp dense coat & full round cheeks',
  },
];

export default function UploadSection({
  activePetType,
  onPetTypeChange,
  selectedFile,
  previewUrl,
  onFileSelect,
  onClearFile,
  onAnalyze,
  isLoading,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileMeta, setFileMeta] = useState(null);
  const [isFetchingSample, setIsFetchingSample] = useState(false);
  const fileInputRef = useRef(null);

  const isDog = activePetType === 'dog';

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

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setFileMeta({
        name: file.name,
        size: formatFileSize(file.size),
        dimensions: `${img.naturalWidth} × ${img.naturalHeight}px`,
      });
      onFileSelect(file, objectUrl);
    };
    img.onerror = () => {
      toast.error('Unable to read this image file. Please try another image.');
    };
    img.src = objectUrl;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoading) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (isLoading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleSampleClick = async (sample) => {
    if (isLoading || isFetchingSample) return;
    try {
      setIsFetchingSample(true);
      toast.loading(`Loading sample ${sample.name}...`, { id: 'sample' });
      const response = await fetch(sample.url);
      const blob = await response.blob();
      const file = new File([blob], `${sample.name.toLowerCase().replace(/\s+/g, '-')}.jpg`, {
        type: 'image/jpeg',
      });
      toast.dismiss('sample');
      validateAndProcessFile(file);
      toast.success(`Loaded sample: ${sample.name}`);
    } catch (err) {
      toast.dismiss('sample');
      toast.error('Failed to load sample image. Please upload a local image file.');
    } finally {
      setIsFetchingSample(false);
    }
  };

  const currentSamples = isDog ? DOG_SAMPLES : CAT_SAMPLES;

  return (
    <section id="upload-section" className="py-12 sm:py-20 relative scroll-mt-20">
      {/* Dynamic ambient background glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] blur-[140px] rounded-full pointer-events-none -z-10 transition-all duration-700 ${
          isDog ? 'bg-amber-500/15' : 'bg-fuchsia-500/15'
        }`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Interactive Multimodal Breed Laboratory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Choose Your Pet Category
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Select Dog or Cat to activate specialized breed identification models and morphological analysis.
          </p>
        </div>

        {/* Dedicated Dog / Cat Mode Switcher Bar */}
        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mb-8 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl">
          {/* Dog Mode Button */}
          <button
            type="button"
            onClick={() => onPetTypeChange('dog')}
            className={`relative flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
              isDog
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                isDog ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400'
              }`}
            >
              <Dog className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-sm sm:text-base font-extrabold leading-tight">Dog Breed Lab</span>
              <span className={`block text-[11px] ${isDog ? 'text-amber-950 font-semibold' : 'text-slate-400'}`}>
                350+ Canine Breeds
              </span>
            </div>
          </button>

          {/* Cat Mode Button */}
          <button
            type="button"
            onClick={() => onPetTypeChange('cat')}
            className={`relative flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
              !isDog
                ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow-lg shadow-fuchsia-500/30 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                !isDog ? 'bg-white/20 text-white' : 'bg-slate-800 text-fuchsia-400'
              }`}
            >
              <Cat className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-sm sm:text-base font-extrabold leading-tight">Cat Breed Studio</span>
              <span className={`block text-[11px] ${!isDog ? 'text-fuchsia-100 font-semibold' : 'text-slate-400'}`}>
                70+ Feline Breeds
              </span>
            </div>
          </button>
        </div>

        {/* Main Workstation Container Card */}
        <div
          className={`rounded-3xl p-6 sm:p-10 backdrop-blur-2xl transition-all duration-500 border ${
            isDog
              ? 'bg-slate-900/80 border-amber-500/30 shadow-2xl shadow-amber-500/10'
              : 'bg-slate-900/80 border-fuchsia-500/30 shadow-2xl shadow-fuchsia-500/10'
          }`}
        >
          {/* Header indicator inside card */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800 mb-8">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDog ? 'bg-amber-500/15 text-amber-400' : 'bg-fuchsia-500/15 text-fuchsia-400'
                }`}
              >
                {isDog ? <Dog className="w-6 h-6" /> : <Cat className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{isDog ? 'Dog Breed Identification' : 'Cat Breed Identification'}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isDog
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        : 'bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/30'
                    }`}
                  >
                    Active Mode
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  {isDog
                    ? 'Evaluates skull shape, ear carriage, muzzle length, coat texture, and purebred / mix traits.'
                    : 'Evaluates ear tufts, facial whisker pads, eye coloration, coat markings, and feline genealogy.'}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Image Storage • RAM-only</span>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            disabled={isLoading}
          />

          {!previewUrl ? (
            /* Upload Dropzone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center bg-slate-950/50 group ${
                isDragOver
                  ? isDog
                    ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                    : 'border-fuchsia-400 bg-fuchsia-500/10 scale-[1.01]'
                  : isDog
                  ? 'border-slate-800 hover:border-amber-500/60 hover:bg-slate-900/60'
                  : 'border-slate-800 hover:border-fuchsia-500/60 hover:bg-slate-900/60'
              }`}
            >
              {/* Center Icon with Pulse */}
              <div
                className={`w-20 h-20 rounded-2xl border flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                  isDog
                    ? 'bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400 shadow-amber-500/10'
                    : 'bg-gradient-to-tr from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/40 text-fuchsia-400 shadow-fuchsia-500/10'
                }`}
              >
                <UploadCloud className="w-9 h-9" />
              </div>

              <h4 className="text-xl font-black text-white mb-2">
                Drop your {isDog ? "Dog's" : "Cat's"} photo here, or{' '}
                <span
                  className={`underline underline-offset-4 decoration-2 ${
                    isDog
                      ? 'text-amber-400 decoration-amber-400/50'
                      : 'text-fuchsia-400 decoration-fuchsia-400/50'
                  }`}
                >
                  browse files
                </span>
              </h4>

              <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
                Supports JPG, JPEG, PNG, or WEBP up to 5 MB. Capture your pet front-on with good lighting
                for highest breed match accuracy.
              </p>

              <button
                type="button"
                className="px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all duration-200 transform group-hover:-translate-y-0.5"
              >
                Browse Image Files
              </button>

              <div className="mt-10 pt-6 border-t border-slate-800/80 w-full flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Purebreds & Mixed Breeds
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Puppies & Kittens Handled
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Structured JSON
                </span>
              </div>
            </div>
          ) : (
            /* Selected File Preview & Confirmation */
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 max-h-[480px] flex items-center justify-center group">
                <img
                  src={previewUrl}
                  alt="Pet Preview"
                  className="max-h-[460px] w-auto object-contain rounded-xl transition duration-300"
                />

                {/* Floating Action Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    title="Choose a different image"
                    className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-md shadow-lg transition"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onClearFile}
                    disabled={isLoading}
                    title="Remove image"
                    className="p-2.5 rounded-xl bg-red-500/80 hover:bg-red-600 text-white border border-red-400/50 backdrop-blur-md shadow-lg transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mode Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg backdrop-blur-md ${
                      isDog
                        ? 'bg-amber-500/90 text-slate-950'
                        : 'bg-fuchsia-500/90 text-white'
                    }`}
                  >
                    {isDog ? <Dog className="w-3.5 h-3.5" /> : <Cat className="w-3.5 h-3.5" />}
                    <span>{isDog ? 'Dog Mode' : 'Cat Mode'} Active</span>
                  </span>
                </div>

                {/* Bottom Meta Information Pill */}
                {fileMeta && (
                  <div className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-300 shadow-xl">
                    <span className="font-semibold truncate max-w-[220px]">{fileMeta.name}</span>
                    <div className="flex items-center gap-3 text-slate-400">
                      <span>{fileMeta.dimensions}</span>
                      <span>•</span>
                      <span>{fileMeta.size}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClearFile}
                  disabled={isLoading}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onAnalyze}
                  disabled={isLoading}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-black shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 ${
                    isDog
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 shadow-amber-500/30'
                      : 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 hover:from-fuchsia-400 hover:to-purple-400 text-white shadow-fuchsia-500/30'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze {isDog ? 'Dog' : 'Cat'} Breed Now</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Curated Sample Breed Showcase Gallery */}
          {!previewUrl && (
            <div className="mt-10 pt-8 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                    <span>Test with 1-Click {isDog ? 'Dog' : 'Cat'} Breed Samples:</span>
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Click any card below to test breed identification immediately.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
                  {isDog ? 'Canine Gallery' : 'Feline Gallery'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {currentSamples.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSampleClick(sample)}
                    disabled={isLoading || isFetchingSample}
                    className={`group text-left p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${
                      isDog
                        ? 'hover:border-amber-500/50 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-amber-500/10'
                        : 'hover:border-fuchsia-500/50 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-fuchsia-500/10'
                    }`}
                  >
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-2 bg-slate-900">
                      <img
                        src={sample.url}
                        alt={sample.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[9px] font-bold text-slate-200">
                        {sample.badge}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`text-xs font-bold text-slate-200 truncate ${
                          isDog ? 'group-hover:text-amber-300' : 'group-hover:text-fuchsia-300'
                        }`}
                      >
                        {sample.name}
                      </p>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {sample.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
