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
  EyeOff,
  CheckCircle2
} from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';
import { useCountUp } from '@/hooks/useCountUp';
import { YouTubeLoopingRibbon } from '@/components/YouTubeLoopingRibbon';

interface HeroProps {
  onFileSelect: (file: File) => void;
  onYouTubeSelect?: (url: string) => void;
  isAnalyzing: boolean;
  onExploreDemo: () => void;
  error?: string | null;
  onClearError?: () => void;
}

type SampleKey = 'face' | 'product' | 'text';

const SAMPLES_DATA = {
  face: {
    id: 'face' as SampleKey,
    label: 'Face',
    icon: '😀',
    src: '/samples/sample_face.jpg',
    ctr: '9.8%',
    clarityScore: 94,
    blobs: [
      { top: '28%', left: '78%', width: '130px', height: '130px', bg: 'radial-gradient(circle, rgba(239, 68, 68, 0.9) 0%, rgba(249, 115, 22, 0.7) 35%, rgba(234, 179, 8, 0.45) 60%, transparent 80%)', blur: '14px' },
      { top: '28%', left: '28%', width: '100px', height: '80px', bg: 'radial-gradient(ellipse, rgba(234, 179, 8, 0.75) 0%, rgba(249, 115, 22, 0.45) 45%, transparent 75%)', blur: '10px' }
    ],
    path1: 'M 78 15.75 C 60 10, 46 10, 28 18',
    path2: 'M 28 18 C 30 28, 40 32, 52 39.38',
    pins: [
      { id: 1, top: '28%', left: '78%', label: 'Fixation #1 · Face Anchor', time: '0–150ms', colorBg: 'bg-red-600', ringColor: 'ring-red-500/40', textColor: 'text-red-400', borderColor: 'border-red-500/60', desc: 'Biological face recognition triggers instant primary gaze focus (94% weight).' },
      { id: 2, top: '28%', left: '28%', label: 'Fixation #2 · Headline Text', time: '150–320ms', colorBg: 'bg-amber-500', ringColor: 'ring-amber-400/40', textColor: 'text-amber-400', borderColor: 'border-amber-500/60', desc: 'Saccade moves to bold typography driven by luminance contrast (88% dwell).' },
      { id: 3, top: '70%', left: '52%', label: 'Fixation #3 · Focal Detail', time: '320–500ms', colorBg: 'bg-blue-500', ringColor: 'ring-blue-400/40', textColor: 'text-blue-400', borderColor: 'border-blue-500/60', desc: 'Terminal fixation completes the viewer evaluation loop before clicking.' }
    ],
    pin1Pos: { cx: 78, cy: 15.75 },
    pin2Pos: { cx: 28, cy: 18 },
    pin3Pos: { cx: 52, cy: 39.38 },
    metrics: [
      { name: 'Face', val: '94%', color: 'bg-red-500' },
      { name: 'Text', val: '88%', color: 'bg-amber-400' },
      { name: 'Detail', val: '72%', color: 'bg-blue-500' }
    ]
  },
  product: {
    id: 'product' as SampleKey,
    label: 'Product',
    icon: '📦',
    src: '/samples/sample_product.jpg',
    ctr: '11.4%',
    clarityScore: 96,
    blobs: [
      { top: '42%', left: '50%', width: '150px', height: '150px', bg: 'radial-gradient(circle, rgba(239, 68, 68, 0.9) 0%, rgba(249, 115, 22, 0.7) 35%, rgba(234, 179, 8, 0.45) 60%, transparent 80%)', blur: '16px' },
      { top: '25%', left: '25%', width: '110px', height: '80px', bg: 'radial-gradient(ellipse, rgba(234, 179, 8, 0.8) 0%, rgba(249, 115, 22, 0.4) 45%, transparent 75%)', blur: '12px' }
    ],
    path1: 'M 50 23.6 C 38 18, 30 16, 25 14',
    path2: 'M 25 14 C 42 24, 58 30, 75 38.25',
    pins: [
      { id: 1, top: '42%', left: '50%', label: 'Fixation #1 · Hero Product', time: '0–160ms', colorBg: 'bg-red-600', ringColor: 'ring-red-500/40', textColor: 'text-red-400', borderColor: 'border-red-500/60', desc: 'Central product lighting and isolation capture instant user focus (96% weight).' },
      { id: 2, top: '25%', left: '25%', label: 'Fixation #2 · Brand Tag', time: '160–310ms', colorBg: 'bg-amber-500', ringColor: 'ring-amber-400/40', textColor: 'text-amber-400', borderColor: 'border-amber-500/60', desc: 'Gaze travels to high-contrast brand identifier (85% dwell).' },
      { id: 3, top: '68%', left: '75%', label: 'Fixation #3 · Spec Callout', time: '310–500ms', colorBg: 'bg-blue-500', ringColor: 'ring-blue-400/40', textColor: 'text-blue-400', borderColor: 'border-blue-500/60', desc: 'Bottom-right spec callout validates value proposition.' }
    ],
    pin1Pos: { cx: 50, cy: 23.6 },
    pin2Pos: { cx: 25, cy: 14 },
    pin3Pos: { cx: 75, cy: 38.25 },
    metrics: [
      { name: 'Product', val: '96%', color: 'bg-red-500' },
      { name: 'Brand', val: '85%', color: 'bg-amber-400' },
      { name: 'Spec', val: '69%', color: 'bg-blue-500' }
    ]
  },
  text: {
    id: 'text' as SampleKey,
    label: 'Typography',
    icon: '🔤',
    src: '/samples/sample_text.jpg',
    ctr: '10.2%',
    clarityScore: 91,
    blobs: [
      { top: '25%', left: '50%', width: '160px', height: '100px', bg: 'radial-gradient(ellipse, rgba(239, 68, 68, 0.9) 0%, rgba(249, 115, 22, 0.7) 40%, transparent 80%)', blur: '12px' },
      { top: '65%', left: '30%', width: '120px', height: '90px', bg: 'radial-gradient(ellipse, rgba(249, 115, 22, 0.8) 0%, rgba(234, 179, 8, 0.5) 45%, transparent 75%)', blur: '12px' }
    ],
    path1: 'M 50 14 C 42 22, 35 28, 30 36.56',
    path2: 'M 30 36.56 C 45 35, 62 33, 75 30.93',
    pins: [
      { id: 1, top: '25%', left: '50%', label: 'Fixation #1 · Impact Title', time: '0–140ms', colorBg: 'bg-red-600', ringColor: 'ring-red-500/40', textColor: 'text-red-400', borderColor: 'border-red-500/60', desc: 'Massive high-contrast title typography commands first gaze (98% weight).' },
      { id: 2, top: '65%', left: '30%', label: 'Fixation #2 · Contrast Arrow', time: '140–330ms', colorBg: 'bg-amber-500', ringColor: 'ring-amber-400/40', textColor: 'text-amber-400', borderColor: 'border-amber-500/60', desc: 'Visual accent graphic draws secondary gaze scan (87% dwell).' },
      { id: 3, top: '55%', left: '75%', label: 'Fixation #3 · Context Portrait', time: '330–500ms', colorBg: 'bg-blue-500', ringColor: 'ring-blue-400/40', textColor: 'text-blue-400', borderColor: 'border-blue-500/60', desc: 'Supporting reaction face provides emotional confirmation.' }
    ],
    pin1Pos: { cx: 50, cy: 14 },
    pin2Pos: { cx: 30, cy: 36.56 },
    pin3Pos: { cx: 75, cy: 30.93 },
    metrics: [
      { name: 'Title', val: '98%', color: 'bg-red-500' },
      { name: 'Arrow', val: '87%', color: 'bg-amber-400' },
      { name: 'Face', val: '76%', color: 'bg-blue-500' }
    ]
  }
};

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
  const [activeSampleKey, setActiveSampleKey] = useState<SampleKey>('face');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeSample = SAMPLES_DATA[activeSampleKey];

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
          {(() => {
            const heroTitlePrefix = t('heroTitlePrefix') || 'Where will viewers look ';
            const heroTitleGradient = t('heroTitleGradient') || 'in the first 500ms?';

            let prefixNode: React.ReactNode = heroTitlePrefix;
            let gradientNode: React.ReactNode = heroTitleGradient;

            if (heroTitleGradient.includes('500')) {
              const [b, a] = heroTitleGradient.split('500');
              gradientNode = (
                <>
                  {b}
                  <span className="font-mono tabular-nums text-purple-600 dark:text-purple-400">{animated500}</span>
                  {a}
                </>
              );
            } else if (heroTitlePrefix.includes('500')) {
              const [b, a] = heroTitlePrefix.split('500');
              prefixNode = (
                <>
                  {b}
                  <span className="font-mono tabular-nums text-purple-600 dark:text-purple-400">{animated500}</span>
                  {a}
                </>
              );
            }

            return (
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] transition-all">
                {prefixNode}{' '}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent animate-shimmer inline-block">
                  {gradientNode}
                </span>
              </h1>
            );
          })()}

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
        {/* RIGHT COLUMN: Redesigned High-Tech Showcase Card               */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 relative group">
          {/* Subtle Ambient Card Glow with YouTube Red Accent */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 via-purple-600/20 to-rose-600/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />

          {/* Main Card Glass Container */}
          <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-xl transition-all duration-300 overflow-hidden">
            
            {/* 0. YouTube Ribbon Background Overlay & Top-Right Corner Sash */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
              {/* 3D Looping Ribbon Streamers (Threads Style) */}
              <YouTubeLoopingRibbon variant="card" />

              {/* Radial Red Glow in Background */}
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-red-600/15 via-rose-500/10 to-transparent rounded-full blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Horizontal YouTube Brand Ribbon Wave in Background */}
              <div className="absolute top-1/2 -left-12 -right-12 -translate-y-1/2 -rotate-6 py-2 bg-gradient-to-r from-red-600/10 via-rose-500/15 to-red-700/10 border-y border-red-500/20 opacity-60 dark:opacity-40 backdrop-blur-[2px] flex items-center justify-around text-[10px] font-black uppercase tracking-widest text-red-600/40 dark:text-red-400/30 select-none">
                <span className="flex items-center space-x-1">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  <span>YOUTUBE GAZE ENGINE</span>
                </span>
                <span className="flex items-center space-x-1 hidden sm:flex">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  <span>THUMBNAIL IQ</span>
                </span>
              </div>

              {/* YouTube Play Icon Watermark in Bottom-Right Corner */}
              <div className="absolute -bottom-8 -right-8 opacity-[0.04] dark:opacity-[0.08] text-red-600 transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.10] rotate-12">
                <svg className="w-56 h-56 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>

              {/* High-Tech Diagonal YouTube Corner Ribbon Sash */}
              <div className="absolute top-0 right-0 w-36 h-36 overflow-hidden z-20 pointer-events-none">
                <div className="absolute transform rotate-45 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-[9px] sm:text-[10px] tracking-widest uppercase py-1 shadow-lg shadow-red-600/40 text-center w-48 -right-10 top-7 border-y border-white/30 flex items-center justify-center space-x-1.5 transition-transform duration-300 group-hover:scale-105">
                  <svg className="w-3 h-3 fill-current text-white shrink-0 animate-pulse" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YOUTUBE AI</span>
                </div>
              </div>
            </div>

            {/* 1. Header: Live Title on Left, View Mode Switcher on Right */}
            <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-750 shadow-xs backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                  Neural Gaze Lens
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/80 text-[10px] font-bold text-purple-700 dark:text-purple-300">
                  LIVE AI
                </span>
              </div>

              {/* View Mode Switcher (Heatmap, Scanpath, Raw) */}
              <div className="flex items-center space-x-1 bg-white/90 dark:bg-slate-800/90 p-1 rounded-xl text-[11px] font-bold border border-slate-200/90 dark:border-slate-700/80 shadow-xs backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setPreviewMode('heatmap')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    previewMode === 'heatmap'
                      ? 'bg-rose-500 text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  🔥 Heatmap
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('scanpath')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    previewMode === 'scanpath'
                      ? 'bg-purple-600 text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  🎯 Scanpath
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('original')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    previewMode === 'original'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  👁️ Raw
                </button>
              </div>
            </div>

            {/* 2. Sub-Toolbar: Sample Tabs Left, Squint & Feed Tools Right */}
            <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
              {/* Sample Segmented Control */}
              <div className="flex items-center space-x-1 bg-slate-100/90 dark:bg-slate-800/90 p-0.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
                {(Object.keys(SAMPLES_DATA) as SampleKey[]).map((key) => {
                  const sample = SAMPLES_DATA[key];
                  const isActive = activeSampleKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveSampleKey(key)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                        isActive
                          ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-xs ring-1 ring-purple-500/20'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <span>{sample.icon}</span>
                      <span>{sample.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Squint and Mobile Feed Toggle Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setIsSquintMode(!isSquintMode)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                    isSquintMode
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title="Simulate peripheral / glance squint test"
                >
                  <EyeOff className="w-3 h-3" />
                  <span>Squint</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileFeedMode(!isMobileFeedMode)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                    isMobileFeedMode
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title="Simulate YouTube mobile feed card layout"
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Feed</span>
                </button>
              </div>
            </div>

            {/* 3. Thumbnail Canvas Frame */}
            <div className={`relative aspect-video rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-slate-950 shadow-inner transition-all duration-300 ${
              isMobileFeedMode ? 'ring-4 ring-purple-500/30 max-w-[95%] mx-auto' : ''
            }`}>
              {/* Main Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSample.src}
                alt={activeSample.label}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isSquintMode ? 'blur-[5px] contrast-125 brightness-90' : 'group-hover:scale-[1.02]'
                }`}
              />

              {/* Squint Test Active Overlay Badge */}
              {isSquintMode && (
                <div className="absolute top-2.5 left-2.5 z-30 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center space-x-1.5 animate-fade-in">
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Squint Simulation Active</span>
                </div>
              )}

              {/* YouTube Duration Badge (Occlusion Indicator) */}
              <div className="absolute bottom-9 sm:bottom-10 right-2 z-20 px-1.5 py-0.5 rounded bg-black/90 text-white font-mono font-bold text-[10px] tracking-tight shadow-md border border-white/15 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>14:20</span>
              </div>

              {/* Laser Radar Sweep Scanline */}
              <div key={replayKey} className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 blur-xs animate-laser-sweep pointer-events-none z-10" />

              {/* Thermal Saliency Heatmap Overlays */}
              {previewMode !== 'original' && activeSample.blobs.map((blob, idx) => (
                <div 
                  key={idx}
                  className={`absolute rounded-full pointer-events-none transition-opacity duration-500 ${
                    previewMode === 'heatmap' ? 'opacity-90 animate-pulse' : 'opacity-40'
                  }`}
                  style={{
                    top: blob.top,
                    left: blob.left,
                    width: blob.width,
                    height: blob.height,
                    transform: 'translate(-50%, -50%)',
                    background: blob.bg,
                    filter: `blur(${blob.blur})`,
                  }}
                />
              ))}

              {/* Animated SVG Scanpath Vector Path */}
              {previewMode !== 'original' && (
                <svg
                  key={`${replayKey}-${activeSampleKey}`}
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 100 56.25"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="scanGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <filter id="scanGlowHero" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <marker id="arrowA" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                      <polygon points="0 0, 5 2.5, 0 5" fill="#a855f7" opacity="0.95" />
                    </marker>
                    <marker id="arrowB" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                      <polygon points="0 0, 5 2.5, 0 5" fill="#3b82f6" opacity="0.95" />
                    </marker>
                  </defs>

                  {/* Segment 1 */}
                  <path
                    d={activeSample.path1}
                    fill="none"
                    stroke="url(#scanGradHero)"
                    strokeWidth={previewMode === 'scanpath' ? '1.6' : '1.0'}
                    strokeOpacity={previewMode === 'scanpath' ? '1' : '0.6'}
                    strokeLinecap="round"
                    markerEnd="url(#arrowA)"
                    className="animate-scanpath"
                    filter="url(#scanGlowHero)"
                    style={{ animationDelay: '0.1s' }}
                  />

                  {/* Segment 2 */}
                  <path
                    d={activeSample.path2}
                    fill="none"
                    stroke="url(#scanGradHero)"
                    strokeWidth={previewMode === 'scanpath' ? '1.6' : '1.0'}
                    strokeOpacity={previewMode === 'scanpath' ? '1' : '0.6'}
                    strokeLinecap="round"
                    markerEnd="url(#arrowB)"
                    className="animate-scanpath"
                    filter="url(#scanGlowHero)"
                    style={{ animationDelay: '0.9s' }}
                  />

                  {/* Scanpath Mode Fixation Dwell Rings */}
                  {previewMode === 'scanpath' && (
                    <>
                      <circle cx={activeSample.pin1Pos.cx} cy={activeSample.pin1Pos.cy} r="4.5" fill="none" stroke="#f43f5e" strokeWidth="0.8" strokeOpacity="0.8" className="animate-ping" />
                      <circle cx={activeSample.pin1Pos.cx} cy={activeSample.pin1Pos.cy} r="2" fill="#f43f5e" fillOpacity="0.95" />
                      
                      <circle cx={activeSample.pin2Pos.cx} cy={activeSample.pin2Pos.cy} r="4" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.8" className="animate-ping" style={{ animationDelay: '0.9s' }} />
                      <circle cx={activeSample.pin2Pos.cx} cy={activeSample.pin2Pos.cy} r="2" fill="#f59e0b" fillOpacity="0.95" />
                      
                      <circle cx={activeSample.pin3Pos.cx} cy={activeSample.pin3Pos.cy} r="4" fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.8" className="animate-ping" style={{ animationDelay: '1.7s' }} />
                      <circle cx={activeSample.pin3Pos.cx} cy={activeSample.pin3Pos.cy} r="2" fill="#3b82f6" fillOpacity="0.95" />
                    </>
                  )}
                </svg>
              )}

              {/* Fixation Pins with Dynamic Hover Tooltips */}
              {previewMode !== 'original' && activeSample.pins.map((pin) => {
                const isHovered = hoveredPin === pin.id;
                return (
                  <div
                    key={pin.id}
                    className="absolute z-20 cursor-pointer"
                    style={{ top: pin.top, left: pin.left, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => setHoveredPin(pin.id)}
                    onMouseLeave={() => setHoveredPin(null)}
                    onClick={() => setHoveredPin(isHovered ? null : pin.id)}
                  >
                    {pin.id === 1 && (
                      <span className="absolute rounded-full bg-red-500/40 animate-ping" style={{ width: 28, height: 28, top: -4, left: -4 }} />
                    )}
                    <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${pin.colorBg} text-white font-black text-[11px] sm:text-xs flex items-center justify-center shadow-lg ring-4 ${pin.ringColor} transition-transform duration-200 hover:scale-125 relative`}>
                      {pin.id}
                    </span>

                    {/* Popover Tooltip */}
                    {isHovered && (
                      <div className={`absolute bottom-full mb-2 ${pin.id === 1 ? 'right-0' : pin.id === 3 ? 'left-1/2 -translate-x-1/2' : 'left-0'} w-52 p-2.5 rounded-xl bg-slate-900/95 border ${pin.borderColor} shadow-2xl backdrop-blur-md text-[10px] text-white z-30 pointer-events-none animate-fade-in`}>
                        <div className={`font-bold ${pin.textColor} flex items-center justify-between mb-1`}>
                          <span>{pin.label}</span>
                          <span className="font-mono text-slate-400 text-[9px]">{pin.time}</span>
                        </div>
                        <p className="text-slate-300 leading-snug">{pin.desc}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bottom Metrics HUD inside the Thumbnail */}
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-white/90 border-t border-white/10 z-20">
                <div className="flex items-center space-x-2.5">
                  {activeSample.metrics.map((m, idx) => (
                    <span key={idx} className="flex items-center space-x-1">
                      <span className={`w-2 h-2 rounded-full ${m.color}`} />
                      <span className="text-slate-400">{m.name}:</span> <strong className="text-white">{m.val}</strong>
                    </span>
                  ))}
                </div>
                <div className="text-purple-300 font-bold flex items-center space-x-1">
                  <Activity className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>Predicted CTR: {activeSample.ctr}</span>
                </div>
              </div>
            </div>

            {/* 4. Bottom Card Analytics HUD Footer */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs relative z-10">
              <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Clarity Score:</span>
                <span className="font-mono font-black text-purple-600 dark:text-purple-400">{activeSample.clarityScore}/100</span>
              </div>

              <div className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] bg-emerald-50 dark:bg-emerald-950/70 px-2.5 py-1 rounded-lg border border-emerald-200/80 dark:border-emerald-900/60">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+24.3% CTR Lift</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
