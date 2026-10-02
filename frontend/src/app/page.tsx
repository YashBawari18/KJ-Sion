'use client';

import React, { useState, useEffect } from 'react';
import { Header, MainNavPage } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { UploadDropzone } from '@/components/UploadDropzone';
import { DemoSelector } from '@/components/DemoSelector';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { StandaloneCompareView } from '@/components/StandaloneCompareView';
import { FeedBattleView } from '@/components/FeedBattleView';
import { GuideView } from '@/components/GuideView';
import { ThumbnailCreator } from '@/components/ThumbnailCreator';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { Logo } from '@/components/Logo';
import { checkBackendHealth, uploadAndAnalyze, analyzeYouTubeUrl, requestExplanation } from '@/lib/api';
import { AnalysisResponse, ExplainResponse } from '@/types/analysis';
import { useLanguage } from '@/context/LanguageContext';
import { AlertCircle, RefreshCw, ArrowRight, Eye, Sparkles } from 'lucide-react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<MainNavPage>('analyze');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [explanation, setExplanation] = useState<ExplainResponse | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let isMounted = true;
    const verifyHealth = async () => {
      const res = await checkBackendHealth();
      if (isMounted) {
        setBackendHealthy(res.healthy);
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
      setCurrentPage('results'); // Automatically transition to results page
      handleRequestAiExplain(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Analysis failed. Please check backend connection.';
      setError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleYouTubeSelect = async (youtubeUrl: string) => {
    setIsAnalyzing(true);
    setError(null);
    setExplanation(null);
    try {
      const result = await analyzeYouTubeUrl(youtubeUrl);
      setAnalysisResult(result);
      setCurrentPage('results'); // Automatically navigate to results page
      handleRequestAiExplain(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch and analyze YouTube video.';
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
      setCurrentPage('results'); // Automatically navigate to results page
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
    setCurrentPage('analyze');
  };

  const scrollToDropzone = () => {
    const el = document.getElementById('thumbnail-dropzone');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans selection:bg-purple-500 selection:text-white text-slate-900 dark:text-slate-100">
      {/* Sticky Header with Page Navigation */}
      <Header
        activeTab={currentPage}
        setActiveTab={setCurrentPage}
        hasResult={!!analysisResult}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Backend offline warning banner */}
        {backendHealthy === false && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 flex items-start space-x-3 text-xs sm:text-sm shadow-xs backdrop-blur-xs animate-fade-in">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-amber-950 dark:text-amber-100">Backend Server Offline</p>
              <p className="text-amber-800 dark:text-amber-300 mt-0.5">
                The Python attention engine is not responding at <code className="bg-amber-100 dark:bg-amber-900/50 px-1 py-0.5 rounded font-mono">http://localhost:8000</code>.
              </p>
              <p className="text-amber-700 dark:text-amber-400 mt-1 font-mono text-xs">
                Run: <span className="bg-amber-200/80 dark:bg-amber-900/80 px-1.5 py-0.5 rounded font-semibold text-amber-950 dark:text-amber-100">./start.sh</span> in your terminal to start services.
              </p>
            </div>
            <button
              onClick={async () => {
                const res = await checkBackendHealth();
                setBackendHealthy(res.healthy);
              }}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-200/70 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-900 dark:text-amber-100 font-medium text-xs transition-colors shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 1: ANALYZE / HOME (Matching Mockup Image 1)         */}
        {/* ======================================================== */}
        {currentPage === 'analyze' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* If user already has an active analysis, show quick jump banner */}
            {analysisResult && (
              <div className="p-3.5 px-4 rounded-2xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200/80 dark:border-purple-800 flex items-center justify-between shadow-xs">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-sm sm:max-w-md">
                    Active analysis: {analysisResult.image_metadata.filename} ({analysisResult.attention_score}/100)
                  </span>
                </div>
                <button
                  onClick={() => setCurrentPage('results')}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs cursor-pointer shrink-0"
                >
                  <span>View Results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Unified 2-Column Hero with Embedded Dropzone & Showcase Card */}
            <Hero
              onFileSelect={handleFileSelect}
              onYouTubeSelect={handleYouTubeSelect}
              isAnalyzing={isAnalyzing}
              onExploreDemo={() => {
                const el = document.getElementById('demo-thumbnails-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setCurrentPage('demo');
              }}
              error={error}
              onClearError={() => setError(null)}
            />

            {/* Try Demo Thumbnails (Comparative Attention Audits) */}
            <div id="demo-thumbnails-section">
              <DemoSelector
                onSelectYouTube={handleYouTubeSelect}
                isLoading={isAnalyzing}
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 2: RESULTS DASHBOARD (Matching Mockup Image 2)      */}
        {/* ======================================================== */}
        {currentPage === 'results' && analysisResult && (
          <AnalysisDashboard
            data={analysisResult}
            onReset={handleReset}
            explanation={explanation}
            onRequestAiExplain={handleRequestAiExplain}
            isLoadingAi={isLoadingAi}
            onGoToCompare={() => setCurrentPage('compare')}
            onGoToBattle={() => setCurrentPage('battle')}
          />
        )}

        {/* ======================================================== */}
        {/* PAGE 3: YOUTUBE FEED BATTLE ARENA (NEW EXTENDED SCOPE)   */}
        {/* ======================================================== */}
        {currentPage === 'battle' && (
          <div className="space-y-8 animate-fade-in">
            <FeedBattleView
              userThumbnailUrl={analysisResult?.original_image || undefined}
              userScore={analysisResult?.attention_score || 82}
              onAnalyzeNew={() => setCurrentPage('analyze')}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE: THUMBNAIL CREATOR                                   */}
        {/* ======================================================== */}
        {currentPage === 'creator' && (
          <div className="animate-fade-in">
            <ThumbnailCreator onAnalyzeThumbnail={handleFileSelect} />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 4: DEMO GALLERY                                     */}
        {/* ======================================================== */}
        {currentPage === 'demo' && (
          <div className="space-y-8 animate-fade-in">
            <DemoSelector
              onSelectYouTube={handleYouTubeSelect}
              isLoading={isAnalyzing}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 5: A/B HEAD-TO-HEAD COMPARE                         */}
        {/* ======================================================== */}
        {currentPage === 'compare' && (
          <div className="space-y-8 animate-fade-in">
            <StandaloneCompareView />
          </div>
        )}

        {/* ======================================================== */}
        {/* PAGE 5: HOW IT WORKS / GUIDE / DOCS                      */}
        {/* ======================================================== */}
        {currentPage === 'guide' && (
          <div className="space-y-8 animate-fade-in">
            <GuideView
              onStartAnalyzing={() => setCurrentPage('analyze')}
              onExploreDemos={() => setCurrentPage('demo')}
            />
          </div>
        )}
      </main>

      {/* Clean Professional Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-6 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2.5">
            <Logo size="sm" showText={false} />
            <span className="font-bold text-slate-800 dark:text-slate-200">Thumbnail<span className="text-purple-600 dark:text-purple-400">IQ</span></span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>{t('heroSubtitle') || 'Understand attention. Improve your thumbnail. Before you publish.'}</span>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            <span>© {new Date().getFullYear()} Thumbnail IQ • Neural Gaze Heatmap Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
