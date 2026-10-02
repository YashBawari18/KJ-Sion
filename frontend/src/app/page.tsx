'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { UploadDropzone } from '@/components/UploadDropzone';
import { DemoSelector } from '@/components/DemoSelector';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { checkBackendHealth, uploadAndAnalyze, requestExplanation } from '@/lib/api';
import { AnalysisResponse, ExplainResponse } from '@/types/analysis';
import { useLanguage } from '@/context/LanguageContext';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'demo'>('analyze');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [explanation, setExplanation] = useState<ExplainResponse | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);
  const [healthMessage, setHealthMessage] = useState<string>('');
  const { t } = useLanguage();

  useEffect(() => {
    let isMounted = true;
    const verifyHealth = async () => {
      const res = await checkBackendHealth();
      if (isMounted) {
        setBackendHealthy(res.healthy);
        setHealthMessage(res.message);
      }
    };
    verifyHealth();
    const interval = setInterval(verifyHealth, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleRequestAiExplain = async (targetResult?: AnalysisResponse) => {
    const dataToExplain = targetResult || analysisResult;
    if (!dataToExplain) return;
    setIsLoadingAi(true);
    try {
      const exp = await requestExplanation(dataToExplain);
      setExplanation(exp);
    } catch (err) {
      console.warn('AI explanation request fallback:', err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setExplanation(null);
    try {
      const result = await uploadAndAnalyze(file);
      setAnalysisResult(result);
      // Auto-trigger explanation in background for seamless UX
      handleRequestAiExplain(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Analysis failed. Please check backend connection.';
      setError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSelectSample = async (sampleId: string, imagePath: string) => {
    setIsAnalyzing(true);
    setError(null);
    setExplanation(null);
    try {
      const res = await fetch(imagePath);
      if (!res.ok) throw new Error('Could not load sample thumbnail.');
      const blob = await res.blob();
      const file = new File([blob], `sample_${sampleId}.jpg`, { type: 'image/jpeg' });
      const result = await uploadAndAnalyze(file);
      setAnalysisResult(result);
      // Auto-trigger explanation
      handleRequestAiExplain(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to analyze sample image.';
      setError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setExplanation(null);
    setError(null);
  };

  const scrollToDropzone = () => {
    const el = document.getElementById('thumbnail-dropzone');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans selection:bg-indigo-500 selection:text-white text-slate-900 dark:text-slate-100">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendHealthy={backendHealthy}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Backend offline warning banner */}
        {backendHealthy === false && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 flex items-start space-x-3 text-xs sm:text-sm shadow-xs backdrop-blur-xs animate-fade-in">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-amber-950 dark:text-amber-100">{t.apiOffline}</p>
              <p className="text-amber-800 dark:text-amber-300 mt-0.5">
                The Python FastAPI backend is not responding at <code className="bg-amber-100 dark:bg-amber-900/50 px-1 py-0.5 rounded font-mono">http://localhost:8000</code>.
              </p>
              <p className="text-amber-700 dark:text-amber-400 mt-1 font-mono text-xs">
                Run: <span className="bg-amber-200/80 dark:bg-amber-900/80 px-1.5 py-0.5 rounded font-semibold text-amber-950 dark:text-amber-100">./start.sh</span> in your terminal to start both backend & frontend.
              </p>
            </div>
            <button
              onClick={async () => {
                const res = await checkBackendHealth();
                setBackendHealthy(res.healthy);
              }}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-200/70 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-900 dark:text-amber-100 font-medium text-xs transition-colors shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* If no analysis result yet, show Hero & Upload or Demo selector */}
        {!analysisResult ? (
          <div className="space-y-8">
            <Hero
              onScrollToUpload={scrollToDropzone}
              onExploreDemo={() => setActiveTab('demo')}
            />

            {activeTab === 'analyze' ? (
              <div className="pt-2">
                <UploadDropzone
                  onFileSelect={handleFileSelect}
                  isAnalyzing={isAnalyzing}
                  error={error}
                  onClearError={() => setError(null)}
                />
              </div>
            ) : (
              <DemoSelector
                onSelectSample={handleSelectSample}
                isLoading={isAnalyzing}
              />
            )}

            {/* Quick Demo toggle under Upload zone */}
            {activeTab === 'analyze' && (
              <div className="text-center pt-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.noThumbnailNotice}{' '}
                  <button
                    onClick={() => setActiveTab('demo')}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2 transition-colors"
                  >
                    {t.trySamplesLink}
                  </button>
                </p>
              </div>
            )}

            <DisclaimerBanner />
          </div>
        ) : (
          /* Analysis Dashboard */
          <AnalysisDashboard
            data={analysisResult}
            onReset={handleReset}
            explanation={explanation}
            onRequestAiExplain={handleRequestAiExplain}
            isLoadingAi={isLoadingAi}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-6 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">Thumbnail IQ</span>
            <span>·</span>
            <span>PS 2: AI-Powered YouTube Thumbnail Attention Heatmap</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400 dark:text-slate-500">
              {t.disclaimerShort}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
