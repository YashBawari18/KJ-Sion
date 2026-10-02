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
import { AlertCircle, RefreshCw, Terminal, Sparkles, Heart } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'demo'>('analyze');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [explanation, setExplanation] = useState<ExplainResponse | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);
  const [healthMessage, setHealthMessage] = useState<string>('');

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
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
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
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-3 text-xs sm:text-sm shadow-xs animate-fade-in">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-amber-950">Backend API Offline</p>
              <p className="text-amber-800 mt-0.5">
                The Python FastAPI backend is not responding at <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">http://localhost:8000</code>.
              </p>
              <p className="text-amber-700 mt-1 font-mono text-xs">
                Run: <span className="bg-amber-200/80 px-1.5 py-0.5 rounded font-semibold text-amber-950">./start.sh</span> in your terminal to start both backend & frontend.
              </p>
            </div>
            <button
              onClick={async () => {
                const res = await checkBackendHealth();
                setBackendHealthy(res.healthy);
              }}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-200/70 hover:bg-amber-200 text-amber-900 font-medium text-xs transition-colors shrink-0"
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
                <p className="text-xs text-slate-500">
                  Don't have a thumbnail ready?{' '}
                  <button
                    onClick={() => setActiveTab('demo')}
                    className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
                  >
                    Try our 3 synthetic demo samples →
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
      <footer className="border-t border-slate-200/80 bg-white/80 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Thumbnail IQ</span>
            <span>·</span>
            <span>PS 2: AI-Powered YouTube Thumbnail Attention Heatmap</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400">
              Predicted Visual Attention (Not Real Eye Tracking)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
