'use client';

import React, { useState } from 'react';
import { AnalysisResponse, ExplainResponse } from '@/types/analysis';
import { AttentionScoreCard } from './AttentionScoreCard';
import { AttentionJourneyCard } from './AttentionJourneyCard';
import { WhyAnalysisCard } from './WhyAnalysisCard';
import { AttentionCompetitionCard } from './AttentionCompetitionCard';
import { RecommendationsCard } from './RecommendationsCard';
import { MobilePreview } from './MobilePreview';
import { ImproveAndCompareView } from './ImproveAndCompareView';
import { PipelineStatusCard } from './PipelineStatusCard';
import { DisclaimerBanner } from './DisclaimerBanner';
import { useLanguage } from '@/context/LanguageContext';
import {
  Flame,
  Route,
  Sparkles,
  Smartphone,
  GitCompare,
  RotateCcw,
  Download,
  ArrowRight,
  ArrowLeft,
  Eye,
  Sliders,
  Columns
} from 'lucide-react';

interface AnalysisDashboardProps {
  data: AnalysisResponse;
  onReset: () => void;
  explanation?: ExplainResponse | null;
  onRequestAiExplain?: () => void;
  isLoadingAi?: boolean;
}

type DashboardPage = 1 | 2 | 3 | 4 | 5;

export function AnalysisDashboard({
  data,
  onReset,
  explanation,
  onRequestAiExplain,
  isLoadingAi,
}: AnalysisDashboardProps) {
  const [currentPage, setCurrentPage] = useState<DashboardPage>(1);
  const [viewMode, setViewMode] = useState<'overlay' | 'original' | 'split'>('overlay');
  const [opacity, setOpacity] = useState<number>(75);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const { t } = useLanguage();

  const originalImg = data.original_image;
  const heatmapImg = data.heatmap || data.original_image;

  const pages = [
    { num: 1 as const, title: 'Heatmap & Score', icon: Flame, desc: 'Visual fixation peaks' },
    { num: 2 as const, title: 'Scan Journey & Why', icon: Route, desc: 'Sequential eye flow' },
    { num: 3 as const, title: 'AI Recommendations', icon: Sparkles, desc: 'Actionable design fixes' },
    { num: 4 as const, title: 'Mobile Simulator', icon: Smartphone, desc: '168px feed check' },
    { num: 5 as const, title: 'Improve & Compare', icon: GitCompare, desc: 'Version A vs B test' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in pb-16">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate max-w-sm sm:max-w-md">
              {data.image_metadata.filename}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {data.image_metadata.width} × {data.image_metadata.height}px · AI Attention Score:{' '}
            <strong className="text-purple-600 dark:text-purple-400">{data.attention_score}/100</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Analyze Another</span>
          </button>

          <a
            href={originalImg}
            download={`analyzed_${data.image_metadata.filename || 'thumbnail.jpg'}`}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </a>
        </div>
      </div>

      {/* Sleek Step-Based Page Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
        {pages.map((p) => {
          const Icon = p.icon;
          const isActive = currentPage === p.num;
          return (
            <button
              key={p.num}
              onClick={() => setCurrentPage(p.num)}
              className={`flex items-center space-x-2 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-sm border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                0{p.num}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate leading-tight">{p.title}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate hidden md:block">{p.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* PAGE 1: HEATMAP STUDIO & ATTENTION SCORE                 */}
      {/* ======================================================== */}
      {currentPage === 1 && (
        <div className="space-y-6 animate-fade-in">
          {/* Main Visual Heatmap Studio */}
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm transition-colors">
            {/* Heatmap Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700">
                <button
                  onClick={() => setViewMode('overlay')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'overlay'
                      ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Attention Heatmap</span>
                </button>

                <button
                  onClick={() => setViewMode('original')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'original'
                      ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Original Image</span>
                </button>

                <button
                  onClick={() => setViewMode('split')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'split'
                      ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Side-by-Side</span>
                </button>
              </div>

              {viewMode === 'overlay' && (
                <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                  <Sliders className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Opacity:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-24 sm:w-28 accent-purple-600 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 w-8 text-right">{opacity}%</span>
                </div>
              )}

              {/* Fixation Intensity Legend */}
              <div className="flex items-center space-x-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <span>Fixation:</span>
                <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">High</span>
                  <span className="text-slate-400">→</span>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">Med</span>
                  <span className="text-slate-400">→</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">Low</span>
                </div>
              </div>
            </div>

            {/* Viewport Canvas */}
            <div className="mt-6">
              {viewMode === 'split' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Original Thumbnail</p>
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={originalImg} alt="Original thumbnail" className="w-full h-full object-contain" />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Predicted Attention Heatmap</p>
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={originalImg} alt="Original base" className="absolute inset-0 w-full h-full object-contain" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={heatmapImg}
                        alt="Heatmap"
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{ opacity: opacity / 100 }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={originalImg} alt="Uploaded thumbnail" className="absolute inset-0 w-full h-full object-contain" />

                  {viewMode === 'overlay' && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={heatmapImg}
                      alt="Attention heatmap"
                      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-150 pointer-events-none"
                      style={{ opacity: opacity / 100 }}
                    />
                  )}

                  {/* Journey Markers */}
                  {data.journey.map((step) => {
                    const isSelected = selectedStep === step.step;
                    const imgW = data.image_metadata.width || 1280;
                    const imgH = data.image_metadata.height || 720;
                    const [bx, by, bw, bh] = step.bbox;
                    const leftPct = (bx / imgW) * 100;
                    const topPct = (by / imgH) * 100;
                    const widthPct = (bw / imgW) * 100;
                    const heightPct = (bh / imgH) * 100;

                    return (
                      <div key={step.step}>
                        <div
                          style={{ left: `${leftPct}%`, top: `${topPct}%`, width: `${widthPct}%`, height: `${heightPct}%` }}
                          className={`absolute rounded-lg border-2 pointer-events-none transition-all duration-200 ${
                            isSelected ? 'border-purple-400 bg-purple-500/20 shadow-lg' : 'border-white/50 bg-black/10'
                          }`}
                        />
                        <button
                          onClick={() => setSelectedStep(isSelected ? null : step.step)}
                          style={{ left: `${leftPct + widthPct / 2}%`, top: `${topPct + heightPct / 2}%` }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600 text-white ring-4 ring-white/90 scale-110 z-20'
                              : 'bg-white/95 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 ring-2 ring-black/20 z-10'
                          }`}
                          title={`${step.step}: ${step.target}`}
                        >
                          {step.step}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* AI Attention Score & Signal Indicators */}
          <AttentionScoreCard score={data.attention_score} signals={data.signals} />

          {/* Bottom Stepper Navigation */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setCurrentPage(2)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              <span>Next: View Scan Journey & Hierarchy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PAGE 2: SCAN JOURNEY & ATTENTION HIERARCHY               */}
      {/* ======================================================== */}
      {currentPage === 2 && (
        <div className="space-y-6 animate-fade-in">
          <AttentionJourneyCard
            journey={data.journey}
            selectedStep={selectedStep}
            onSelectStep={setSelectedStep}
            imageWidth={data.image_metadata.width}
            imageHeight={data.image_metadata.height}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <AttentionCompetitionCard signals={data.signals} journey={data.journey} />
            <WhyAnalysisCard whyAnalysis={data.why_analysis} />
          </div>

          {/* Bottom Stepper Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentPage(1)}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Heatmap & Score</span>
            </button>

            <button
              onClick={() => setCurrentPage(3)}
              className="inline-flex items-center space-x-1.5 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              <span>Next: Actionable Recommendations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PAGE 3: AI RECOMMENDATIONS & FIXES                       */}
      {/* ======================================================== */}
      {currentPage === 3 && (
        <div className="space-y-6 animate-fade-in">
          <RecommendationsCard
            recommendations={data.recommendations}
            explanation={explanation}
            onRequestAiExplain={onRequestAiExplain}
            isLoadingAi={isLoadingAi}
          />

          {/* Bottom Stepper Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentPage(2)}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Scan Journey</span>
            </button>

            <button
              onClick={() => setCurrentPage(4)}
              className="inline-flex items-center space-x-1.5 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              <span>Next: Test on Mobile Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PAGE 4: MOBILE & MULTI-DEVICE SIMULATOR                  */}
      {/* ======================================================== */}
      {currentPage === 4 && (
        <div className="space-y-6 animate-fade-in">
          <MobilePreview imageSrc={originalImg} />

          {/* Bottom Stepper Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentPage(3)}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Recommendations</span>
            </button>

            <button
              onClick={() => setCurrentPage(5)}
              className="inline-flex items-center space-x-1.5 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              <span>Next: Improve & Re-analyze (A/B Test)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PAGE 5: IMPROVE & RE-ANALYZE (A/B TEST)                  */}
      {/* ======================================================== */}
      {currentPage === 5 && (
        <div className="space-y-6 animate-fade-in">
          <ImproveAndCompareView originalData={data} onResetOriginal={onReset} />

          {/* Bottom Stepper Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentPage(4)}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Mobile Simulator</span>
            </button>

            <button
              onClick={() => setCurrentPage(1)}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-200 text-xs font-bold cursor-pointer"
            >
              <span>Return to Heatmap Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Transparency / Diagnostics */}
      <PipelineStatusCard steps={data.pipeline_steps} metadata={data.image_metadata} />

      {/* Scientific Notice */}
      <DisclaimerBanner />
    </div>
  );
}
