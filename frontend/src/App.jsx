import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DogScannerPage from './pages/DogScannerPage';
import CatScannerPage from './pages/CatScannerPage';
import BreedsPage from './pages/BreedsPage';
import { checkServerStatus } from './services/api';

function AppLayout() {
  const [serverHealth, setServerHealth] = useState(null);

  useEffect(() => {
    checkServerStatus().then(setServerHealth);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-themeDark-900 text-slate-100 font-sans">
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

      {serverHealth?.status !== 'offline' && serverHealth?.geminiConfigured === false && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-200 px-4 py-2.5 text-xs sm:text-sm text-center flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>Setup Notice:</strong> Add your Google AI Studio key as <code>GEMINI_API_KEY</code> in{' '}
            <code>backend/.env</code> to enable breed analysis.
          </span>
        </div>
      )}

      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dog-scanner" element={<DogScannerPage />} />
          <Route path="/cat-scanner" element={<CatScannerPage />} />
          <Route path="/breeds" element={<BreedsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
