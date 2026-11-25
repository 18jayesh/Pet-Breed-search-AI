import React, { useState, useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import AnalysisLoading from './components/AnalysisLoading';
import ResultSection from './components/ResultSection';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';
import { analyzePetImage, checkServerStatus } from './services/api';
import { AlertTriangle } from 'lucide-react';

export default function App() {
  const [activePetType, setActivePetType] = useState('dog'); // 'dog' | 'cat'
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [serverHealth, setServerHealth] = useState(null);

  // Check backend server readiness on initial load
  useEffect(() => {
    async function verifyBackend() {
      const health = await checkServerStatus();
      setServerHealth(health);
    }
    verifyBackend();
  }, []);

  const scrollToUpload = () => {
    const el = document.getElementById('upload-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectModeAndScroll = (type) => {
    setActivePetType(type);
    scrollToUpload();
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToResults = () => {
    setTimeout(() => {
      const el = document.getElementById('results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleFileSelect = (file, url) => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(file);
    setPreviewUrl(url);
    setAnalysisResult(null);
  };

  const handleClearFile = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select or drop an image first.');
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const data = await analyzePetImage(selectedFile, activePetType);
      setAnalysisResult(data);

      if (data.isAnimal && data.isDogOrCat && data.confidence >= 65) {
        // Trigger celebratory confetti
        try {
          const colors =
            activePetType === 'dog'
              ? ['#f59e0b', '#fbbf24', '#10b981', '#38bdf8']
              : ['#d946ef', '#a855f7', '#6366f1', '#06b6d4'];

          confetti({
            particleCount: 85,
            spread: 70,
            origin: { y: 0.65 },
            colors,
          });
        } catch (e) {
          // canvas fallback
        }
      }

      toast.success(
        data.isDogOrCat
          ? `Identified as ${data.breed}!`
          : data.isAnimal
          ? 'Image processed (Non-canine/feline detected)'
          : 'Analysis complete.'
      );

      scrollToResults();
    } catch (err) {
      console.error('Analysis error:', err);
      toast.error(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelLoading = () => {
    setIsLoading(false);
    toast('Analysis cancelled.');
  };

  const handleAnalyzeAnother = () => {
    handleClearFile();
    scrollToUpload();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500/20 selection:text-brand-300">
      {/* Toast Provider */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#f8fafc',
            border: '1px solid #334155',
            borderRadius: '14px',
            fontSize: '14px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
            fontWeight: '600',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#022c22',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#450a0a',
            },
          },
        }}
      />

      {/* Backend API Key Alert Banner if key not yet added */}
      {serverHealth && serverHealth.geminiConfigured === false && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-200 px-4 py-2.5 text-xs sm:text-sm text-center flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>Setup Notice:</strong> Backend is running, but <code>GEMINI_API_KEY</code> is not configured in <code>backend/.env</code>. Add your Google AI Studio key to enable live AI vision requests.
          </span>
        </div>
      )}

      {/* Top Navbar with Mode Buttons */}
      <Navbar
        activePetType={activePetType}
        onSelectModeAndScroll={handleSelectModeAndScroll}
        onScrollToUpload={scrollToUpload}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSelectModeAndScroll={handleSelectModeAndScroll}
          onScrollToHowItWorks={scrollToHowItWorks}
        />

        {/* Dedicated Dog / Cat Upload Workstation */}
        {!isLoading && (
          <UploadSection
            activePetType={activePetType}
            onPetTypeChange={setActivePetType}
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onClearFile={handleClearFile}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        )}

        {/* Sci-Fi Scanning HUD */}
        {isLoading && (
          <AnalysisLoading
            previewUrl={previewUrl}
            activePetType={activePetType}
            onCancel={handleCancelLoading}
          />
        )}

        {/* Detailed Result Dashboard */}
        {!isLoading && analysisResult && (
          <ResultSection
            result={analysisResult}
            previewUrl={previewUrl}
            onAnalyzeAnother={handleAnalyzeAnother}
            onClear={handleClearFile}
          />
        )}

        {/* Product Guide Sections */}
        <HowItWorks />
        <Features />
        <About />
      </main>

      {/* Footer */}
      <Footer onScrollToUpload={scrollToUpload} />
    </div>
  );
}
