'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  Flame, 
  Gauge, 
  TrendingUp, 
  UploadCloud, 
  Play, 
  Sparkles, 
  Loader2, 
  FileImage,
  ArrowRight,
  ShieldCheck,
  Zap,
  Eye,
  Scan,
  Activity,
  Compass,
  RotateCcw,
  Smartphone,
  EyeOff
} from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { useCountUp } from '@/hooks/useCountUp';

interface HeroProps {
  onFileSelect: (file: File) => void;
  onYouTubeSelect?: (url: string) => void;
  isAnalyzing: boolean;
  onExploreDemo: () => void;
  error?: string | null;
  onClearError?: () => void;
}

export function Hero({
  onFileSelect,
  onYouTubeSelect,
  isAnalyzing,
  onExploreDemo,
  error,
  onClearError,
}: HeroProps) {
  const { t } = useLanguage();
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'upload' | 'youtube'>('upload');
  const [previewMode, setPreviewMode] = useState<'heatmap' | 'scanpath' | 'original'>('heatmap');
  const [isSquintMode, setIsSquintMode] = useState(false);
  const [isMobileFeedMode, setIsMobileFeedMode] = useState(false);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [replayKey, setReplayKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Smooth Count-Up Animations: 0 -> 500ms
  const animated500 = useCountUp(500, { duration: 1800, delay: 150, triggerKey: replayKey });
  const animatedMatch = useCountUp(98.4, { duration: 1500, decimals: 1, delay: 100, triggerKey: replayKey });
  const animatedLift = useCountUp(24.3, { duration: 1600, decimals: 1, delay: 250, triggerKey: replayKey });

  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  const maxBytes = 10 * 1024 * 1024; // 10MB

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const validateAndProceed = (file: File) => {
    if (onClearError) onClearError();
    if (!allowedTypes.includes(file.type)) {
      alert('Unsupported file format. Please upload a PNG, JPG, JPEG, or WebP thumbnail.');
      return;
    }
    if (file.size > maxBytes) {
      alert('File size exceeds 10MB limit. Please upload an image under 10MB.');
      return;
    }
    setSelectedFileName(file.name);
    onFileSelect(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProceed(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProceed(e.target.files[0]);
    }
  };

  const triggerReplay = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <section className="relative pt-1 pb-6 sm:pt-2 sm:pb-8 lg:pt-6 lg:pb-12">
      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: Headline, Metrics, Upload Box, Sequence Info       */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Top Tag Pill with Pulse Glow Transition */}
          <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-purple-200/80 dark:border-purple-900/60 shadow-xs text-xs font-bold text-slate-700 dark:text-slate-300 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/10">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
            <span className="uppercase tracking-wider text-[10px] sm:text-[11px] font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('heroPill') || 'NEURAL GAZE HEATMAP V2.4'}
            </span>
          </div>

          {/* Main Headline with 0 -> 500ms Animated Counter */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] transition-all">
            {t('heroTitlePrefix') || 'Where will viewers look'}{' '}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent animate-shimmer inline-block">
              in the first <span className="font-mono tabular-nums text-purple-600 dark:text-purple-400 underline decoration-purple-400/40 decoration-wavy decoration-2 underline-offset-4">{animated500}</span>ms?
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            {t('heroSubtitle') || 'AI-powered predicted visual attention analysis for YouTube thumbnails. Diagnose fixation hotspots, trace viewer scan journeys, and optimize your visual hierarchy before you post.'}
          </p>

          {/* 3 Metrics Stats Row with Animated Numbers & Responsive Hover Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Stat 1 */}
            <div className="group p-2.5 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-rose-300 dark:hover:border-rose-900/80 cursor-default">
              <div className="flex items-center space-x-1 sm:space-x-1.5 text-rose-500 mb-0.5 sm:mb-1">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 fill-rose-500/20 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-white tabular-nums">
                  {animatedMatch}%
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
                FIXATION MATCH
              </p>
            </div>

            {/* Stat 2: Animated 0 to 500ms */}
            <div className="group p-2.5 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-purple-200/80 dark:border-purple-900/60 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-purple-400 dark:hover:border-purple-700 cursor-default">
              <div className="flex items-center space-x-1 sm:space-x-1.5 text-blue-500 mb-0.5 sm:mb-1">
                <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-purple-600 dark:text-purple-400 group-hover:rotate-45 transition-transform duration-300" />
                <span className="text-sm sm:text-base md:text-lg font-black text-purple-600 dark:text-purple-400 tabular-nums">
                  {animated500}ms
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
                FIRST 500ms PASS
              </p>
            </div>

            {/* Stat 3 */}
            <div className="group p-2.5 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-900/80 cursor-default">
              <div className="flex items-center space-x-1 sm:space-x-1.5 text-purple-600 mb-0.5 sm:mb-1">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="text-sm sm:text-base md:text-lg font-black text-purple-600 dark:text-purple-400 tabular-nums">
                  +{animatedLift}%
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
                AVG CTR LIFT
              </p>
            </div>
          </div>

          {/* Input Method Segmented Control - Mobile Responsive */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 dark:bg-slate-800/90 rounded-2xl w-full sm:w-fit border border-slate-200/90 dark:border-slate-700/80 text-xs font-bold transition-all">
            <button
              type="button"
              onClick={() => setInputMode('upload')}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                inputMode === 'upload'
                  ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-sm scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5 shrink-0" />
              <span>Upload Image File</span>
            </button>
            <button
              type="button"
              onClick={() => setInputMode('youtube')}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                inputMode === 'youtube'
                  ? 'bg-white dark:bg-slate-900 text-red-600 dark:text-red-400 shadow-sm scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current text-red-600 shrink-0" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Paste YouTube Link</span>
              <span className="hidden xs:inline px-1.5 py-0.2 rounded-md bg-red-100 dark:bg-red-950/80 text-[10px] font-bold text-red-700 dark:text-red-300">
                LIVE
              </span>
            </button>
          </div>

          {/* Clean Upload Dropzone Box OR YouTube URL Box */}
          {inputMode === 'upload' ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isAnalyzing && fileInputRef.current?.click()}
              id="thumbnail-dropzone"
              className={`relative rounded-3xl p-5 sm:p-7 text-center transition-all duration-300 border-2 border-dashed bg-white/95 dark:bg-slate-900/95 shadow-sm hover:shadow-lg group cursor-pointer ${
                isDragOver
                  ? 'border-purple-500 bg-purple-50/80 dark:bg-purple-950/60 scale-[1.02] shadow-purple-500/20'
                  : isAnalyzing
                  ? 'border-purple-300 dark:border-purple-800 cursor-wait'
                  : 'border-slate-300/80 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 hover:-translate-y-0.5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                className="hidden"
                onChange={handleFileInput}
                disabled={isAnalyzing}
              />

              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center space-y-3 py-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 animate-spin">
                    <Loader2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Analyzing visual attention…</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Computing heatmaps, gaze order, and contrast deltas</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/80 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div>
                    <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
                      Drag & drop thumbnail, or{' '}
                      <span className="text-purple-600 dark:text-purple-400 group-hover:underline">
                        Browse
                      </span>
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      1280×720 PNG, JPG, WebP (Max 10MB)
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 flex items-center justify-center space-x-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t('ctaAnalyze') || 'Analyze Thumbnail'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onExploreDemo();
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center space-x-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-slate-600 dark:text-slate-300" />
                      <span>{t('ctaDemos') || 'Interactive Demo'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* YouTube URL Live Analysis Card */
            <div className="relative rounded-3xl p-5 sm:p-7 text-left transition-all duration-300 border-2 border-red-200 dark:border-red-950/80 bg-white/95 dark:bg-slate-900/95 shadow-sm space-y-4 hover:shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/80 flex items-center justify-center text-red-600 shrink-0">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Fetch Live from YouTube</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Pulls 1280x720 HD thumbnail, title & channel metadata</p>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                  Zero Quota / No API Key Needed
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && youtubeUrl.trim() && onYouTubeSelect) {
                        onYouTubeSelect(youtubeUrl.trim());
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (youtubeUrl.trim() && onYouTubeSelect) {
                        onYouTubeSelect(youtubeUrl.trim());
                      }
                    }}
                    disabled={isAnalyzing || !youtubeUrl.trim()}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-500/25 flex items-center justify-center space-x-1.5 transition-all disabled:opacity-50 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                  >
                    {isAnalyzing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>{isAnalyzing ? 'Fetching...' : 'Analyze Video'}</span>
                  </button>
                </div>

                {/* Quick 1-Click Popular Demo Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-400">Quick Test:</span>
                  {[
                    { label: 'Rick Astley', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
                    { label: 'MrBeast ($500k)', url: 'https://www.youtube.com/watch?v=kX3nB4PpJko' },
                    { label: 'Veritasium', url: 'https://www.youtube.com/watch?v=bHIhgxav9LY' },
                  ].map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => {
                        setYoutubeUrl(chip.url);
                        if (onYouTubeSelect) {
                          onYouTubeSelect(chip.url);
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-all hover:scale-105 cursor-pointer"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Gaze Sequence Bar with Replay Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 backdrop-blur-md transition-all hover:border-purple-300 dark:hover:border-purple-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] sm:text-xs">
                Gaze Target: Face &gt; Headline Text &gt; Focal Element
              </span>
            </div>
            
            <div className="flex items-center space-x-2 self-end sm:self-auto">
              <div className="text-slate-500 dark:text-slate-400 font-mono text-[10px] sm:text-[11px] flex items-center space-x-1.5">
                <span>Sequence:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
                  0ms ➔ {animated500}ms
                </span>
              </div>

              {/* Replay Scan Button */}
              <button
                type="button"
                onClick={triggerReplay}
                className="p-1 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-950/80 text-purple-600 dark:text-purple-400 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                title="Replay 0 -> 500ms attention scan"
                aria-label="Replay attention scan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Interactive Heatmap Visual Showcase Card          */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 relative group">
          {/* Ambient Glow behind card */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600/30 via-indigo-600/20 to-pink-600/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />

          {/* Main Card Container */}
          <div className="relative rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-3 sm:p-4 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
            {/* Top Interactive Mode Switcher Header - Responsive Wrap */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1">
                  <span>Neural Attention Lens</span>
                </span>
              </div>

              {/* View Mode & Squint/Mobile Tools */}
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl text-[10px] sm:text-[11px] font-bold border border-slate-200/80 dark:border-slate-700/60 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setPreviewMode('heatmap')}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    previewMode === 'heatmap'
                      ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Show attention thermal intensity"
                >
                  🔥 Heatmap
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('scanpath')}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    previewMode === 'scanpath'
                      ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Show gaze scan vector sequence"
                >
                  🎯 Scanpath
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('original')}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    previewMode === 'original'
                      ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Show original thumbnail"
                >
                  👁️ Raw
                </button>

                <span className="text-slate-300 dark:text-slate-700 px-0.5">•</span>

                {/* Squint Mode Toggle */}
                <button
                  type="button"
                  onClick={() => setIsSquintMode(!isSquintMode)}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 whitespace-nowrap ${
                    isSquintMode
                      ? 'bg-amber-500 text-white shadow-xs font-black'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Simulate squint / peripheral glance test"
                >
                  <EyeOff className="w-3 h-3" />
                  <span>Squint</span>
                </button>

                {/* Mobile Feed View Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMobileFeedMode(!isMobileFeedMode)}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 whitespace-nowrap ${
                    isMobileFeedMode
                      ? 'bg-purple-600 text-white shadow-xs font-black'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title="Simulate YouTube mobile feed card with duration badge"
                >
                  <Smartphone className="w-3 h-3" />
                  <span className="hidden xs:inline">Feed</span>
                </button>
              </div>
            </div>

            {/* Thumbnail Image with Live Gaze Pins and Thermal Glow */}
            <div className={`relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-inner transition-all duration-300 ${
              isMobileFeedMode ? 'ring-4 ring-purple-500/30 max-w-[94%] mx-auto' : ''
            }`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/samples/sample_face.jpg"
                alt="AI is here! YouTube Thumbnail Preview"
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                  isSquintMode ? 'blur-[4px] contrast-125' : ''
                }`}
              />

              {/* Squint Mode Active Floating Watermark */}
              {isSquintMode && (
                <div className="absolute top-2 left-2 z-30 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center space-x-1 animate-fade-in">
                  <EyeOff className="w-3 h-3" />
                  <span>Squint Test Active</span>
                </div>
              )}

              {/* YouTube Duration Badge in Bottom-Right Corner (Occlusion Check) */}
              <div className="absolute bottom-9 sm:bottom-10 right-2 z-20 px-1.5 py-0.5 rounded bg-black/85 text-white font-mono font-bold text-[10px] tracking-tight shadow-md border border-white/10 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>14:20</span>
              </div>

              {/* Laser Radar Sweep Scanline */}
              <div key={replayKey} className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75 blur-xs animate-laser-sweep pointer-events-none" />

              {/* Thermal Saliency Core Overlay over the Face (Right Side) */}
              {previewMode !== 'original' && (
                <div 
                  className={`absolute top-1/4 right-[16%] w-32 h-32 sm:w-36 sm:h-36 rounded-full pointer-events-none transition-opacity duration-500 ${
                    previewMode === 'heatmap' ? 'opacity-90 animate-pulse' : 'opacity-40'
                  }`}
                  style={{
                    background: 'radial-gradient(circle, rgba(239, 68, 68, 0.8) 0%, rgba(249, 115, 22, 0.65) 35%, rgba(234, 179, 8, 0.45) 60%, transparent 80%)',
                    filter: 'blur(14px)',
                  }}
                />
              )}

              {/* Secondary Heatmap Saliency on Text (Left Side) */}
              {previewMode === 'heatmap' && (
                <div 
                  className="absolute top-[28%] left-[24%] w-24 h-16 sm:w-28 sm:h-20 rounded-full pointer-events-none opacity-70 animate-pulse"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(234, 179, 8, 0.7) 0%, rgba(249, 115, 22, 0.4) 45%, transparent 75%)',
                    filter: 'blur(10px)',
                  }}
                />
              )}

              {/* Animated SVG Scanpath Vector Line (Pin 1 -> Pin 2 -> Pin 3) */}
              {previewMode !== 'original' && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-300"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="heroScanGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Curving Scanpath Line */}
                  <path
                    d="M 78 28 C 55 20, 42 24, 28 32 C 34 52, 42 62, 52 70"
                    fill="none"
                    stroke="url(#heroScanGrad)"
                    strokeWidth={previewMode === 'scanpath' ? "2" : "1.2"}
                    strokeOpacity={previewMode === 'scanpath' ? "0.95" : "0.6"}
                    className="animate-scanpath"
                    filter="url(#glow)"
                  />
                </svg>
              )}

              {/* Numbered Gaze Fixation Pins with Interactive Tooltips */}
              {previewMode !== 'original' && (
                <>
                  {/* Pin 1: Face (Right) */}
                  <div 
                    className="absolute top-[28%] right-[22%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 cursor-pointer"
                    onMouseEnter={() => setHoveredPin(1)}
                    onMouseLeave={() => setHoveredPin(null)}
                    onClick={() => setHoveredPin(hoveredPin === 1 ? null : 1)}
                  >
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-600 text-white font-black text-[11px] sm:text-xs flex items-center justify-center shadow-lg ring-4 ring-red-500/40 animate-pulse transition-transform hover:scale-125">
                      1
                    </span>

                    {/* Tooltip */}
                    {hoveredPin === 1 && (
                      <div className="absolute bottom-full mb-2 right-0 sm:right-1/2 sm:translate-x-1/2 w-44 sm:w-48 p-2 rounded-xl bg-slate-900/95 border border-red-500/60 shadow-xl backdrop-blur-md text-[10px] text-white z-30 pointer-events-none animate-fade-in">
                        <div className="font-bold text-red-400 flex items-center justify-between">
                          <span>Hotspot #1 • Face</span>
                          <span className="font-mono">0ms - 150ms</span>
                        </div>
                        <p className="text-slate-300 mt-0.5">High emotional resonance & primary gaze anchor (94% saliency).</p>
                      </div>
                    )}
                  </div>

                  {/* Pin 2: Headline Text (Left) */}
                  <div 
                    className="absolute top-[32%] left-[28%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 cursor-pointer"
                    onMouseEnter={() => setHoveredPin(2)}
                    onMouseLeave={() => setHoveredPin(null)}
                    onClick={() => setHoveredPin(hoveredPin === 2 ? null : 2)}
                  >
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500 text-white font-black text-[10px] sm:text-xs flex items-center justify-center shadow-lg ring-4 ring-amber-400/40 transition-transform hover:scale-125">
                      2
                    </span>

                    {/* Tooltip */}
                    {hoveredPin === 2 && (
                      <div className="absolute bottom-full mb-2 left-0 sm:left-1/2 sm:-translate-x-1/2 w-44 sm:w-48 p-2 rounded-xl bg-slate-900/95 border border-amber-500/60 shadow-xl backdrop-blur-md text-[10px] text-white z-30 pointer-events-none animate-fade-in">
                        <div className="font-bold text-amber-400 flex items-center justify-between">
                          <span>Hotspot #2 • Title</span>
                          <span className="font-mono">150ms - 320ms</span>
                        </div>
                        <p className="text-slate-300 mt-0.5">Clear yellow font against dark backdrop yields 88% contrast pop.</p>
                      </div>
                    )}
                  </div>

                  {/* Pin 3: Hologram Code / Hand (Center-Bottom) */}
                  <div 
                    className="absolute bottom-[30%] left-[52%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 cursor-pointer"
                    onMouseEnter={() => setHoveredPin(3)}
                    onMouseLeave={() => setHoveredPin(null)}
                    onClick={() => setHoveredPin(hoveredPin === 3 ? null : 3)}
                  >
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 text-white font-black text-[10px] sm:text-xs flex items-center justify-center shadow-lg ring-4 ring-blue-400/40 transition-transform hover:scale-125">
                      3
                    </span>

                    {/* Tooltip */}
                    {hoveredPin === 3 && (
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-44 sm:w-48 p-2 rounded-xl bg-slate-900/95 border border-blue-500/60 shadow-xl backdrop-blur-md text-[10px] text-white z-30 pointer-events-none animate-fade-in">
                        <div className="font-bold text-blue-400 flex items-center justify-between">
                          <span>Hotspot #3 • Focus</span>
                          <span className="font-mono">320ms - 500ms</span>
                        </div>
                        <p className="text-slate-300 mt-0.5">Complementary graphic accent completing viewer scan journey.</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Bottom Metrics Bar inside the Thumbnail Preview */}
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-white/90 border-t border-white/10 z-20">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="hidden xs:inline">Face:</span> <strong className="text-white">94%</strong>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="hidden xs:inline">Text:</span> <strong className="text-white">88%</strong>
                  </span>
                </div>
                <div className="text-purple-300 font-bold flex items-center space-x-1">
                  <Activity className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>Predicted CTR: 9.8%</span>
                </div>
              </div>
            </div>

            {/* Floating High Contrast Anchor Badge with Gentle Float Animation */}
            <div className="absolute -bottom-3 right-4 sm:right-7 px-3 py-1 sm:py-1.5 rounded-full bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 shadow-xl flex items-center space-x-1.5 text-[11px] sm:text-xs font-bold text-purple-700 dark:text-purple-300 animate-float-badge z-30">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-spin" />
              <span>High Contrast Anchor</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
