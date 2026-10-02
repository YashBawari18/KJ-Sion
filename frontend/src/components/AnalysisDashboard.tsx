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
  Layers,
  Eye,
  Sliders,
  Download,
  Flame,
  RotateCcw,
  Sparkles,
  Columns,
  Target,
  Smartphone,
  GitCompare,
  LayoutGrid
} from 'lucide-react';

interface AnalysisDashboardProps {
  data: AnalysisResponse;
  onReset: () => void;
  explanation?: ExplainResponse | null;
  onRequestAiExplain?: () => void;
  isLoadingAi?: boolean;
}

type DashboardTab = 'all' | 'heatmap' | 'journey' | 'competition' | 'recommendations' | 'mobile' | 'compare';

export function AnalysisDashboard({
  data,
  onReset,
  explanation,
  onRequestAiExplain,
  isLoadingAi,
}: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('all');
  const [viewMode, setViewMode] = useState<'overlay' | 'original' | 'split'>('overlay');
  const [opacity, setOpacity] = useState<number>(75);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const { t } = useLanguage();

  const originalImg = data.original_image;
  const heatmapImg = data.heatmap || data.original_image;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t('diagTitle')} {data.image_metadata.filename}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t('diagAspect')} {data.image_metadata.width} × {data.image_metadata.height}px · Aspect: 16:9 HD · AI Attention Score: <strong className="text-purple-600 dark:text-purple-400">{data.attention_score}/100</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('btnAnalyzeAnother')}</span>
          </button>

          <a
            href={originalImg}
            download={`analyzed_${data.image_metadata.filename || 'thumbnail.jpg'}`}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-medium shadow-md shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('btnExportReport')}</span>
          </a>
        </div>
      </div>

      {/* Navigation Section Tabs */}
      <div className="flex items-center overflow-x-auto pb-2 scrollbar-none gap-1.5 border-b border-slate-200/80 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-800'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Complete Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('heatmap')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'heatmap'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-800'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Heatmap Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('journey')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'journey'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Attention Journey</span>
        </button>

        <button
          onClick={() => setActiveTab('competition')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'competition'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-800'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Competition & Why</span>
        </button>

        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'recommendations'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Recommendations</span>
        </button>

        <button
          onClick={() => setActiveTab('mobile')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'mobile'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-slate-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Feed Check</span>
        </button>

        <button
          onClick={() => setActiveTab('compare')}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'compare'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs'
              : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 border border-purple-200 dark:border-purple-800'
          }`}
        >
          <GitCompare className="w-3.5 h-3.5" />
          <span>Improve & Compare</span>
        </button>
      </div>

      {/* Main Heatmap Inspection Area (Visible in 'all' and 'heatmap') */}
      {(activeTab === 'all' || activeTab === 'heatmap') && (
        <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs transition-colors">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            {/* Mode Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700">
              <button
                onClick={() => setViewMode('overlay')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'overlay'
                    ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('modeOverlay')}</span>
              </button>

              <button
                onClick={() => setViewMode('original')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'original'
                    ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t('modeOriginal')}</span>
              </button>

              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>{t('modeSplit')}</span>
              </button>
            </div>

            {/* Opacity Slider */}
            {viewMode === 'overlay' && (
              <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
                <Sliders className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{t('labelOpacity')}</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-purple-600 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 w-8 text-right">{opacity}%</span>
              </div>
            )}

            {/* Legend */}
            <div className="flex items-center space-x-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <span>{t('labelIntensity')}</span>
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{t('intensityHigh')}</span>
                <span className="text-slate-400">→</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{t('intensityMed')}</span>
                <span className="text-slate-400">→</span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-700 dark:text-slate-300 font-semibold">{t('intensityLow')}</span>
              </div>
            </div>
          </div>

          {/* Viewport Display */}
          <div className="mt-6">
            {viewMode === 'split' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{t('originalUploadLabel')}</span>
                  </p>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={originalImg} alt="Original thumbnail" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center space-x-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t('predictedOverlayLabel')}</span>
                  </p>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xs">
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
                {/* Base image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={originalImg} alt="Uploaded thumbnail" className="absolute inset-0 w-full h-full object-contain" />

                {/* Heatmap overlay */}
                {viewMode === 'overlay' && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={heatmapImg}
                    alt="Attention heatmap"
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-150 pointer-events-none"
                    style={{ opacity: opacity / 100 }}
                  />
                )}

                {/* Attention Journey Interactive Markers */}
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
                        style={{
                          left: `${leftPct}%`,
                          top: `${topPct}%`,
                          width: `${widthPct}%`,
                          height: `${heightPct}%`,
                        }}
                        className={`absolute rounded-lg border-2 pointer-events-none transition-all duration-200 ${
                          isSelected
                            ? 'border-purple-400 bg-purple-500/20 shadow-lg'
                            : 'border-white/50 bg-black/10'
                        }`}
                      />

                      <button
                        onClick={() => setSelectedStep(isSelected ? null : step.step)}
                        style={{
                          left: `${leftPct + widthPct / 2}%`,
                          top: `${topPct + heightPct / 2}%`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600 text-white ring-4 ring-white/90 dark:ring-slate-900 scale-110 z-20'
                            : 'bg-white/95 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 ring-2 ring-black/20 z-10'
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
      )}

      {/* Grid: Attention Score & Journey Sequence (Visible in 'all' and 'journey') */}
      {(activeTab === 'all' || activeTab === 'journey') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <AttentionScoreCard score={data.attention_score} signals={data.signals} />
          <AttentionJourneyCard
            journey={data.journey}
            selectedStep={selectedStep}
            onSelectStep={setSelectedStep}
            imageWidth={data.image_metadata.width}
            imageHeight={data.image_metadata.height}
          />
        </div>
      )}

      {/* Grid: Attention Competition & Why Analysis (Visible in 'all' and 'competition') */}
      {(activeTab === 'all' || activeTab === 'competition') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <AttentionCompetitionCard signals={data.signals} journey={data.journey} />
          <WhyAnalysisCard whyAnalysis={data.why_analysis} />
        </div>
      )}

      {/* AI Recommendations (Visible in 'all' and 'recommendations') */}
      {(activeTab === 'all' || activeTab === 'recommendations') && (
        <RecommendationsCard
          recommendations={data.recommendations}
          explanation={explanation}
          onRequestAiExplain={onRequestAiExplain}
          isLoadingAi={isLoadingAi}
        />
      )}

      {/* Multi-Device Feed Simulator (Visible in 'all' and 'mobile') */}
      {(activeTab === 'all' || activeTab === 'mobile') && (
        <MobilePreview imageSrc={originalImg} />
      )}

      {/* Improve → Re-analyze & Comparison Section (Visible in 'all' and 'compare') */}
      {(activeTab === 'all' || activeTab === 'compare') && (
        <ImproveAndCompareView originalData={data} onResetOriginal={onReset} />
      )}

      {/* Diagnostics / Pipeline Step Trace */}
      <PipelineStatusCard steps={data.pipeline_steps} metadata={data.image_metadata} />

      {/* Scientific Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
}
