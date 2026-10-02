'use client';

import React, { useState } from 'react';
import { AnalysisResponse, ExplainResponse } from '@/types/analysis';
import { AttentionScoreCard } from './AttentionScoreCard';
import { AttentionJourneyCard } from './AttentionJourneyCard';
import { WhyAnalysisCard } from './WhyAnalysisCard';
import { RecommendationsCard } from './RecommendationsCard';
import { MobilePreview } from './MobilePreview';
import { PipelineStatusCard } from './PipelineStatusCard';
import { DisclaimerBanner } from './DisclaimerBanner';
import { useLanguage } from '@/context/LanguageContext';
import {
  Layers,
  Eye,
  Sliders,
  Maximize2,
  Download,
  Flame,
  RotateCcw,
  Sparkles,
  Columns
} from 'lucide-react';

interface AnalysisDashboardProps {
  data: AnalysisResponse;
  onReset: () => void;
  explanation?: ExplainResponse | null;
  onRequestAiExplain?: () => void;
  isLoadingAi?: boolean;
}

export function AnalysisDashboard({
  data,
  onReset,
  explanation,
  onRequestAiExplain,
  isLoadingAi,
}: AnalysisDashboardProps) {
  const [viewMode, setViewMode] = useState<'overlay' | 'original' | 'split'>('overlay');
  const [opacity, setOpacity] = useState<number>(75);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const { t } = useLanguage();

  const originalImg = data.original_image;
  const heatmapImg = data.heatmap || data.original_image;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.diagTitle} {data.image_metadata.filename}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.diagAspect} {data.image_metadata.width} × {data.image_metadata.height}px · Aspect: 16:9 HD
          </p>
        </div>

        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.btnAnalyzeAnother}</span>
          </button>

          <a
            href={originalImg}
            download={`analyzed_${data.image_metadata.filename || 'thumbnail.jpg'}`}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.btnExportReport}</span>
          </a>
        </div>
      </div>

      {/* Main Visual Heatmap & Comparison Area */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs transition-colors">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700">
            <button
              onClick={() => setViewMode('overlay')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'overlay'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{t.modeOverlay}</span>
            </button>

            <button
              onClick={() => setViewMode('original')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'original'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.modeOriginal}</span>
            </button>

            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'split'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>{t.modeSplit}</span>
            </button>
          </div>

          {/* Opacity Slider (When in overlay mode) */}
          {viewMode === 'overlay' && (
            <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-200/70 dark:border-slate-700">
              <Sliders className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{t.labelOpacity}</span>
              <input
                type="range"
                min="10"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-24 sm:w-32 accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 w-8 text-right">{opacity}%</span>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center space-x-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span>{t.labelIntensity}</span>
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">{t.intensityHigh}</span>
              <span className="text-slate-400">→</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">{t.intensityMed}</span>
              <span className="text-slate-400">→</span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">{t.intensityLow}</span>
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
                  <span>{t.originalUploadLabel}</span>
                </p>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={originalImg}
                    alt="Original thumbnail"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.predictedOverlayLabel}</span>
                </p>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={originalImg}
                    alt="Original base"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
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
              <img
                src={originalImg}
                alt="Uploaded thumbnail"
                className="absolute inset-0 w-full h-full object-contain"
              />

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
                // Bbox is [x, y, w, h] in image pixel space
                const imgW = data.image_metadata.width || 1280;
                const imgH = data.image_metadata.height || 720;
                const [bx, by, bw, bh] = step.bbox;
                const leftPct = (bx / imgW) * 100;
                const topPct = (by / imgH) * 100;
                const widthPct = (bw / imgW) * 100;
                const heightPct = (bh / imgH) * 100;

                return (
                  <div key={step.step}>
                    {/* Bounding box outline */}
                    <div
                      style={{
                        left: `${leftPct}%`,
                        top: `${topPct}%`,
                        width: `${widthPct}%`,
                        height: `${heightPct}%`,
                      }}
                      className={`absolute rounded-lg border-2 pointer-events-none transition-all duration-200 ${
                        isSelected
                          ? 'border-indigo-400 bg-indigo-500/20 shadow-lg'
                          : 'border-white/50 bg-black/10'
                      }`}
                    />

                    {/* Numbered Step Badge Marker */}
                    <button
                      onClick={() => setSelectedStep(isSelected ? null : step.step)}
                      style={{
                        left: `${leftPct + widthPct / 2}%`,
                        top: `${topPct + heightPct / 2}%`,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shadow-lg transition-all duration-200 hover:scale-110 ${
                        isSelected
                          ? 'bg-indigo-600 text-white ring-4 ring-white/90 dark:ring-slate-900 scale-110 z-20'
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

      {/* Grid: Attention Score & Journey Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <AttentionScoreCard
          score={data.attention_score}
          signals={data.signals}
        />

        <AttentionJourneyCard
          journey={data.journey}
          selectedStep={selectedStep}
          onSelectStep={setSelectedStep}
        />
      </div>

      {/* Grid: Why Analysis & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <WhyAnalysisCard whyAnalysis={data.why_analysis} />

        <RecommendationsCard
          recommendations={data.recommendations}
          explanation={explanation}
          onRequestAiExplain={onRequestAiExplain}
          isLoadingAi={isLoadingAi}
        />
      </div>

      {/* Real YouTube Mobile Feed simulator */}
      <MobilePreview imageSrc={originalImg} />

      {/* Diagnostics / Pipeline Step Trace */}
      <PipelineStatusCard
        steps={data.pipeline_steps}
        metadata={data.image_metadata}
      />

      {/* Scientific Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
}
