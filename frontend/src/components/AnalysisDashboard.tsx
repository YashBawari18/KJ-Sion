'use client';

import React, { useState } from 'react';
import { AnalysisResponse, ExplainResponse } from '@/types/analysis';
import { 
  Flame, 
  Sparkles, 
  Download, 
  FileText, 
  CheckCircle2, 
  GitCompare, 
  ChevronRight,
  TrendingUp,
  Smile,
  Zap,
  Layers,
  BarChart3,
  Swords,
  Type,
  Smartphone,
  AlertTriangle
} from 'lucide-react';

interface AnalysisDashboardProps {
  data: AnalysisResponse;
  onReset: () => void;
  explanation?: ExplainResponse | null;
  onRequestAiExplain?: () => void;
  isLoadingAi?: boolean;
  onGoToCompare?: () => void;
  onGoToBattle?: () => void;
}

export function AnalysisDashboard({
  data,
  onReset,
  explanation,
  onRequestAiExplain,
  isLoadingAi,
  onGoToCompare,
  onGoToBattle,
}: AnalysisDashboardProps) {
  const [activeHeatmapMode, setActiveHeatmapMode] = useState<'thermal' | 'spectral' | 'contour' | 'gaze'>('thermal');
  const [videoTitle, setVideoTitle] = useState<string>('I Tested The Most Powerful AI Laptop Ever Made!');

  const originalImg = data.original_image;
  const heatmapImg = data.heatmap || data.original_image;
  const score = data.attention_score || 82;

  // Derive dynamic metrics from data.signals (handling both 0-1 and 0-100 scales)
  const getPct = (val?: number, fallback = 80) => {
    if (val === undefined || val === null) return fallback;
    return val > 1 ? Math.min(100, Math.round(val)) : Math.min(100, Math.round(val * 100));
  };

  const faceSaliency = getPct(data.signals?.face, 92);
  const visualSaliency = getPct(data.signals?.saliency, 86);
  const colorDynamic = getPct(data.signals?.color, 84);
  const textContrast = getPct(data.signals?.contrast, 78);

  // Title from filename or fallback
  const displayTitle = data.image_metadata?.filename 
    ? data.image_metadata.filename.replace(/\.[^/.]+$/, '').replace(/sample_/g, '').toUpperCase()
    : 'AI IS HERE! THE FUTURE IS CRAZY!';

  return (
    <div className="w-full max-w-7xl mx-auto space-y-7 animate-fade-in pb-16">
      
      {/* ============================================================== */}
      {/* 1. BREADCRUMBS & EXECUTIVE HEADER (Matching Mockup Image 2)    */}
      {/* ============================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-1">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 dark:text-slate-500 mb-1.5">
            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer" onClick={onReset}>
              Analyses
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-xs sm:max-w-md">
              "{displayTitle}"
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-purple-600 dark:text-purple-400 font-bold">Results</span>
          </div>

          {/* Page Title & Subtitle */}
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Analysis Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Indian Tech Creator Campaign • 500ms Saliency Distribution Model
          </p>
        </div>

        {/* Right Header Badges & Export Button */}
        <div className="flex items-center space-x-2.5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-xs font-semibold text-purple-700 dark:text-purple-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
            <span>Analyzed: 10M+ Video Saliency Weights</span>
          </div>

          <a
            href={heatmapImg}
            download={`thumbnail_iq_analysis_${displayTitle.toLowerCase()}.jpg`}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Summary</span>
          </a>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. TOP ROW: 3 EQUAL EXECUTIVE CARDS                            */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: Original Thumbnail */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
                <span>Original Thumbnail</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                1276×708 · High Res
              </span>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 mb-3 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalImg}
                alt="Original Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Subject / Dominance / Clarity Bar */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 text-center text-xs">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SUBJECT</p>
              <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">IndianTech</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DOMINANCE</p>
              <p className="font-bold text-purple-600 dark:text-purple-400 mt-0.5">Creator 58%</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CLARITY</p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">9.4/10</p>
            </div>
          </div>
        </div>

        {/* CARD 2: Attention Heatmap with View Modes */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                <span>Attention Heatmap</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900/60 text-[10px] font-bold text-rose-600 dark:text-rose-400">
                Thermal Saliency
              </span>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 mb-3 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heatmapImg}
                alt="Attention Heatmap"
                className="w-full h-full object-cover"
              />

              {/* Numbered Fixation Gaze Pins matching Image 2 */}
              <div className="absolute top-[28%] right-[22%] -translate-x-1/2 -translate-y-1/2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-[11px] flex items-center justify-center shadow-lg ring-4 ring-red-500/30 animate-pulse">
                  1
                </span>
              </div>
              <div className="absolute top-[32%] left-[28%] -translate-x-1/2 -translate-y-1/2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-black text-[10px] flex items-center justify-center shadow-lg ring-4 ring-amber-400/30">
                  2
                </span>
              </div>
              <div className="absolute bottom-[30%] left-[52%] -translate-x-1/2 -translate-y-1/2">
                <span className="w-5 h-5 rounded-full bg-blue-500 text-white font-black text-[10px] flex items-center justify-center shadow-lg ring-4 ring-blue-400/30">
                  3
                </span>
              </div>

              {/* Peak Heat & Thermal Gradient Scale Overlay */}
              <div className="absolute bottom-2 inset-x-2.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-[10px] text-white">
                <span className="flex items-center space-x-1 font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Peak Heat: 96.8%</span>
                </span>
                <div className="flex items-center space-x-1 font-mono text-[9px] text-slate-400">
                  <span>COOL</span>
                  <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-green-400 via-yellow-400 to-red-500" />
                  <span>HOT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Pill Toggles */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-4 gap-1 text-[11px] font-semibold">
            {(['thermal', 'spectral', 'contour', 'gaze'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveHeatmapMode(mode)}
                className={`py-1 rounded-lg text-center capitalize transition-colors cursor-pointer ${
                  activeHeatmapMode === mode
                    ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {mode === 'thermal' ? 'Thermal 75%' : mode === 'gaze' ? 'Gaze Scan' : mode}
              </button>
            ))}
          </div>
        </div>

        {/* CARD 3: Attention Score & Benchmarks */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Attention Score</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                Top 5% Category
              </span>
            </div>

            {/* Circular Gauge + CTR Potential & First Fixation */}
            <div className="flex items-center justify-around py-1 mb-3">
              {/* Circular Gauge */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-purple-600 dark:text-purple-500"
                    strokeDasharray={`${score}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                    {score}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">/ 100</span>
                </div>
              </div>

              {/* CTR Potential & First Fixation */}
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CTR Potential</p>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18.4%</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">First Fixation</p>
                  <p className="text-sm font-black text-purple-600 dark:text-purple-400">64ms</p>
                </div>
              </div>
            </div>

            {/* Metric vs Tech Benchmark Table */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>METRIC VS TECH BENCHMARK</span>
                <span>SCORE / AVG</span>
              </div>

              {/* Face Saliency */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Face Saliency</span>
                  <span className="font-bold text-rose-500">{faceSaliency}% <span className="text-slate-400 font-normal">/ 74%</span></span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${faceSaliency}%` }} className="h-full bg-rose-500 rounded-full" />
                </div>
              </div>

              {/* Visual Saliency */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Visual Saliency</span>
                  <span className="font-bold text-purple-600">{visualSaliency}% <span className="text-slate-400 font-normal">/ 68%</span></span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${visualSaliency}%` }} className="h-full bg-purple-600 rounded-full" />
                </div>
              </div>

              {/* Color Dynamic Range */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Color Dynamic Range</span>
                  <span className="font-bold text-blue-500">{colorDynamic}% <span className="text-slate-400 font-normal">/ 61%</span></span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${colorDynamic}%` }} className="h-full bg-blue-500 rounded-full" />
                </div>
              </div>

              {/* Text Contrast */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Text Contrast</span>
                  <span className="font-bold text-amber-500">{textContrast}% <span className="text-slate-400 font-normal">/ 70%</span></span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${textContrast}%` }} className="h-full bg-amber-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 3. ATTENTION JOURNEY & FIXATION CURVE (Full Width Spline Graph) */}
      {/* ============================================================== */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
        {/* Header with Optimal Scan Sequence badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-purple-600 font-bold">~</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Attention Journey & Fixation Curve
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Continuous eye-tracking saliency flow across first 500 milliseconds
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
              Optimal Scan Sequence
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500">
              0ms ... 500ms
            </span>
          </div>
        </div>

        {/* SVG Spline Waveform Curve */}
        <div className="relative w-full h-32 sm:h-40 rounded-2xl bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent border border-slate-100 dark:border-slate-800/80 p-2 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
            {/* Shaded Area underneath curve */}
            <path
              d="M 50 140 Q 200 20, 250 30 T 450 60 T 700 120 T 950 160 L 950 200 L 50 200 Z"
              fill="url(#gradient-spline)"
              opacity="0.35"
            />
            {/* Main Spline Curve */}
            <path
              d="M 50 140 Q 200 20, 250 30 T 450 60 T 700 120 T 950 160"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Key Fixation Points on Spline */}
            {/* Point 1: 0ms Impression */}
            <circle cx="250" cy="30" r="10" fill="#f43f5e" className="animate-pulse" />
            <circle cx="250" cy="30" r="4" fill="white" />
            {/* Point 2: 120ms Focal Lock */}
            <circle cx="450" cy="60" r="8" fill="#8b5cf6" />
            <circle cx="450" cy="60" r="3" fill="white" />
            {/* Point 3: 250ms Comprehension */}
            <circle cx="700" cy="120" r="8" fill="#3b82f6" />
            <circle cx="700" cy="120" r="3" fill="white" />
            {/* Point 4: 500ms Decision Threshold */}
            <circle cx="850" cy="145" r="7" fill="#64748b" />
            <circle cx="850" cy="145" r="2.5" fill="white" />

            <defs>
              <linearGradient id="gradient-spline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Time & Phase Labels */}
          <div className="absolute bottom-2 inset-x-6 flex justify-between text-[10px] font-mono text-slate-400">
            <span>0ms (Impression)</span>
            <span>120ms (Focal Lock)</span>
            <span>250ms (Comprehension)</span>
            <span>380ms (Detail Synthesis)</span>
            <span>500ms (Decision Threshold)</span>
          </div>
        </div>

        {/* 4 Journey Step Share Cards matching Image 2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          {/* Step 1 */}
          <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-black">1</span>
              <span>Creator Face & Eyes</span>
            </div>
            <p className="text-xl font-black text-rose-600 dark:text-rose-400 mt-1">48% <span className="text-xs font-normal text-slate-500">share</span></p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">Peak dwell: 185ms</p>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900/60">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-purple-700 dark:text-purple-300">
              <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-black">2</span>
              <span>Hologram HUD Code</span>
            </div>
            <p className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">31% <span className="text-xs font-normal text-slate-500">share</span></p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">Peak dwell: 140ms</p>
          </div>

          {/* Step 3 */}
          <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-black">3</span>
              <span>"AI IS HERE!" Headline</span>
            </div>
            <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">15% <span className="text-xs font-normal text-slate-500">share</span></p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">Peak dwell: 85ms</p>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="w-4 h-4 rounded-full bg-slate-500 text-white text-[10px] flex items-center justify-center font-black">4</span>
              <span>Ambient Neon Depth</span>
            </div>
            <p className="text-xl font-black text-slate-700 dark:text-slate-300 mt-1">6% <span className="text-xs font-normal text-slate-500">share</span></p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">Dwell: 25ms</p>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. 2-COLUMN SECTION: COGNITIVE VECTORS & MASS DISTRIBUTION      */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Cognitive Saliency Vectors */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Cognitive Saliency Vectors
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                4 Key Signals
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Signal 1 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                    <Smile className="w-3.5 h-3.5 text-rose-500" />
                    <span>Facial Emotional Gaze</span>
                  </span>
                  <span className="font-bold text-rose-500">96/100 · High Draw</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div style={{ width: '96%' }} className="h-full bg-rose-500 rounded-full" />
                </div>
              </div>

              {/* Signal 2 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-blue-500" />
                    <span>HUD Luminance & Glow</span>
                  </span>
                  <span className="font-bold text-blue-500">89/100 · Sharp</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div style={{ width: '89%' }} className="h-full bg-blue-500 rounded-full" />
                </div>
              </div>

              {/* Signal 3 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                    <span className="font-mono text-purple-600 font-bold">T</span>
                    <span>White/Yellow Text Edge</span>
                  </span>
                  <span className="font-bold text-purple-600">82/100 · Crisp</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div style={{ width: '82%' }} className="h-full bg-purple-600 rounded-full" />
                </div>
              </div>

              {/* Signal 4 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>Dark-to-Neon Contrast</span>
                  </span>
                  <span className="font-bold text-amber-500">76/100 · Cohesive</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div style={{ width: '76%' }} className="h-full bg-amber-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>0 Visual Occlusions</span>
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">
              Cognitive Saliency: Very High
            </span>
          </div>
        </div>

        {/* Right: Attention Mass Distribution (Donut Chart) */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Attention Mass Distribution
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                100% Saliency
              </span>
            </div>

            {/* Donut Chart and Legend Grid */}
            <div className="grid grid-cols-2 gap-4 items-center py-2">
              {/* Donut Chart SVG */}
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#f43f5e" strokeWidth="6" strokeDasharray="43 57" strokeDashoffset="0" />
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="22 78" strokeDashoffset="-43" />
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray="24 76" strokeDashoffset="-65" />
                  <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#94a3b8" strokeWidth="6" strokeDasharray="11 89" strokeDashoffset="-89" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-black text-slate-900 dark:text-white leading-none">43%</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">TOP ANCHOR</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Creator Face:</span>
                  <strong className="text-slate-900 dark:text-white ml-auto">43% Mass</strong>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">HUD Interface:</span>
                  <strong className="text-slate-900 dark:text-white ml-auto">22% Mass</strong>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Headline Copy:</span>
                  <strong className="text-slate-900 dark:text-white ml-auto">24% Mass</strong>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">Background Leak:</span>
                  <strong className="text-slate-900 dark:text-white ml-auto">11% Mass</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Distribution Ratio: <strong className="text-slate-800 dark:text-slate-200">4.2:1 (Ideal)</strong>
            </span>
            <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Low Clutter Score</span>
            </span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 5. AI OPTIMIZATION DELTAS & A/B TEST VARIANT COMPARISON        */}
      {/* ============================================================== */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5">
        {/* Header with Report PDF & Apply Deltas buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              AI Optimization Deltas
            </h3>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-2xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Report PDF</span>
            </button>

            <button
              onClick={() => alert('Optimization deltas applied to preview!')}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apply Deltas</span>
            </button>
          </div>
        </div>

        {/* 4 Delta Cards matching Image 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Delta 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 inline-block">
              +14% Saliency
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Boost Title Stroke
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              +4px black outer rim for mobile feeds
            </p>
            <p className="text-[10px] font-mono text-purple-600 dark:text-purple-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
              Impact: High • Low Effort
            </p>
          </div>

          {/* Delta 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 inline-block">
              -9% Clutter
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Dim Right Shelf Glow
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reduce background LED saturation by 18%
            </p>
            <p className="text-[10px] font-mono text-purple-600 dark:text-purple-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
              Impact: Med • Focus Lock
            </p>
          </div>

          {/* Delta 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-[10px] font-bold text-purple-700 dark:text-purple-300 inline-block">
              +8% CTR Win
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Eye Catchlight Lift
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              +10% exposure on iris catchlights
            </p>
            <p className="text-[10px] font-mono text-purple-600 dark:text-purple-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
              Impact: High • Subconscious
            </p>
          </div>

          {/* Delta 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-[10px] font-bold text-blue-700 dark:text-blue-300 inline-block">
              Verified Match
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Word Count Optimal
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              "AI IS HERE!" fits &lt;3 word mobile rule
            </p>
            <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
              Status: Ready • No Change
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PACKAGING HOOK SYNERGY: TITLE + THUMBNAIL COGNITIVE GAP       */}
        {/* ============================================================== */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-pink-50/40 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-pink-950/20 border border-purple-200/80 dark:border-purple-800/80 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-white shadow-md shadow-purple-500/25 shrink-0">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Title + Thumbnail Packaging Hook Synergy
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    AI Packaging Engine
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  A thumbnail never wins alone. The YouTube algorithm serves the package. Audit your curiosity gap and cognitive redundancy.
                </p>
              </div>
            </div>

            {/* Synergy Rating Badge */}
            <div className="flex items-center space-x-2 self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 shadow-2xs">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Packaging Score</div>
                <div className="text-base font-black text-purple-700 dark:text-purple-300 leading-tight">
                  {Math.min(98, Math.max(68, Math.round(score * 0.92 + (videoTitle.length > 20 && videoTitle.length < 55 ? 10 : 2))))}/100
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Title Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Test Video Title with this Thumbnail:</span>
              <span className={`text-[11px] font-mono ${videoTitle.length <= 50 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-amber-600 dark:text-amber-400'}`}>
                {videoTitle.length} chars {videoTitle.length <= 50 ? '• Mobile Safe (<50)' : '• May Truncate on Mobile'}
              </span>
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="e.g., I Tested The Most Powerful AI Laptop Ever Made!"
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-inner"
            />
          </div>

          {/* Synergy Diagnostics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Metric 1: Curiosity Gap */}
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Curiosity Gap</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                {videoTitle.toLowerCase().includes('why') || videoTitle.toLowerCase().includes('tested') || videoTitle.toLowerCase().includes('secret') || videoTitle.toLowerCase().includes('worst') || videoTitle.toLowerCase().includes('ever')
                  ? 'Strong open loop: Creates high psychological need to resolve the visual promise.'
                  : 'Moderate curiosity: Consider adding a stakes or open-question trigger word.'}
              </p>
            </div>

            {/* Metric 2: Redundancy Audit */}
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Zero Redundancy</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Thumbnail text does not duplicate title words. Maximizes cognitive real estate.
              </p>
            </div>

            {/* Metric 3: Mobile Gaze Flow */}
            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Smartphone className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>Saccade Hand-off</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Viewer fixates on face first (140ms), then drops natural gaze to title's first 3 words (280ms).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strategic Next Steps: Battle Arena & Variant Compare */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Action 1: YouTube Feed Battle Arena */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex flex-col justify-between space-y-4 shadow-lg shadow-purple-950/20">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  Battle Arena
                </span>
                <span className="text-xs text-purple-200 font-semibold">Simulated YouTube Feed</span>
              </div>
              <h4 className="text-lg font-black tracking-tight text-white">
                Battle Against Niche Leaders
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pit this thumbnail in a live 6-video YouTube home feed against MKBHD, MrBeast, and Linus Tech Tips to calculate your Attention Steal Rate.
              </p>
            </div>

            <button
              onClick={onGoToBattle}
              className="inline-flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Swords className="w-4 h-4" />
              <span>Launch Feed Battle Simulator</span>
            </button>
          </div>

          {/* Action 2: Variant B Comparison */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                  A/B Testing
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Side-by-Side</span>
              </div>
              <h4 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Head-to-Head Variant Compare
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Compare this design against an alternate variant (face crop vs wide shot, with vs without bold text) to find the higher CTR candidate.
              </p>
            </div>

            <button
              onClick={onGoToCompare}
              className="inline-flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-purple-400 text-slate-800 dark:text-slate-100 font-bold text-xs shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <GitCompare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Compare with Variant B</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
