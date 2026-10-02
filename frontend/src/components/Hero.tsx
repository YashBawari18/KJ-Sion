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
  Zap
} from 'lucide-react';

interface HeroProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
  onExploreDemo: () => void;
  error?: string | null;
  onClearError?: () => void;
}

export function Hero({
  onFileSelect,
  isAnalyzing,
  onExploreDemo,
  error,
  onClearError,
}: HeroProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <section className="relative pt-2 pb-6 lg:pt-6 lg:pb-12">
      {/* 2-Column Grid Matching Mockup Image 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: Headline, Metrics, Upload Box, Sequence Info       */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Tag Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="uppercase tracking-wider text-[11px]">NEURAL GAZE HEATMAP V2.4</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            Understand attention.{' '}
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Improve your thumbnail.
            </span>
          </h1>

          {/* 3 Metrics Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            {/* Stat 1 */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-md">
              <div className="flex items-center space-x-1.5 text-rose-500 mb-1">
                <Flame className="w-4 h-4 shrink-0 fill-rose-500/20" />
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">98.4%</span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                FIXATION MATCH
              </p>
            </div>

            {/* Stat 2 */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-md">
              <div className="flex items-center space-x-1.5 text-blue-500 mb-1">
                <Gauge className="w-4 h-4 shrink-0" />
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white">150ms</span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                GAZE PASS
              </p>
            </div>

            {/* Stat 3 */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-md">
              <div className="flex items-center space-x-1.5 text-purple-600 mb-1">
                <TrendingUp className="w-4 h-4 shrink-0" />
                <span className="text-base sm:text-lg font-black text-purple-600 dark:text-purple-400">+24.3%</span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                AVG CTR LIFT
              </p>
            </div>
          </div>

          {/* Clean Upload Dropzone Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isAnalyzing && fileInputRef.current?.click()}
            id="thumbnail-dropzone"
            className={`relative rounded-3xl p-6 sm:p-7 text-center transition-all duration-300 border-2 border-dashed bg-white/95 dark:bg-slate-900/95 shadow-sm hover:shadow-md cursor-pointer ${
              isDragOver
                ? 'border-purple-500 bg-purple-50/80 dark:bg-purple-950/60 scale-[1.01]'
                : isAnalyzing
                ? 'border-purple-300 dark:border-purple-800 cursor-wait'
                : 'border-slate-300/80 dark:border-slate-800 hover:border-purple-400'
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
                {/* Cloud icon inside purple square */}
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/80 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <UploadCloud className="w-6 h-6" />
                </div>

                {/* Upload Callout */}
                <div>
                  <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
                    Drag & drop thumbnail, or{' '}
                    <span className="text-purple-600 dark:text-purple-400 hover:underline">
                      Browse
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    1280×720 PNG, JPG, WebP (Max 10MB)
                  </p>
                </div>

                {/* Dual Buttons: Analyze Thumbnail + Interactive Demo */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 flex items-center space-x-1.5 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analyze Thumbnail</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExploreDemo();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-slate-600 dark:text-slate-300" />
                    <span>Interactive Demo</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Gaze Sequence Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 backdrop-blur-md">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Gaze Target: Face &gt; Text &gt; Object
              </span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
              Sequence: <span className="font-bold text-purple-600 dark:text-purple-400">0.12s ➔ 0.38s</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Interactive Heatmap Visual Showcase Card          */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 relative">
          {/* Main Card Container */}
          <div className="relative rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-3 sm:p-4 shadow-xl backdrop-blur-xl">
            {/* Top Hotspot Tag */}
            <div className="flex items-center space-x-1.5 mb-2.5 px-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Face: Hotspot #1
              </span>
            </div>

            {/* Thumbnail Image with Live Gaze Pins and Thermal Glow */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-inner group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/samples/sample_face.jpg"
                alt="AI is here! YouTube Thumbnail Preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Thermal Saliency Core Overlay over the Face (Right Side) */}
              <div 
                className="absolute top-1/4 right-[16%] w-36 h-36 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(239, 68, 68, 0.75) 0%, rgba(249, 115, 22, 0.6) 35%, rgba(234, 179, 8, 0.4) 60%, transparent 80%)',
                  filter: 'blur(12px)',
                }}
              />

              {/* Numbered Gaze Fixation Pins Matching Image 1 */}
              {/* Pin 1: Face (Right) */}
              <div className="absolute top-[28%] right-[22%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="w-7 h-7 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-lg ring-4 ring-red-500/30 animate-pulse">
                  1
                </span>
              </div>

              {/* Pin 2: Headline Text (Left) */}
              <div className="absolute top-[32%] left-[28%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow-lg ring-4 ring-amber-400/30">
                  2
                </span>
              </div>

              {/* Pin 3: Hologram Code / Hand (Center-Bottom) */}
              <div className="absolute bottom-[30%] left-[52%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center shadow-lg ring-4 ring-blue-400/30">
                  3
                </span>
              </div>

              {/* Bottom Metrics Bar inside the Thumbnail Preview */}
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 backdrop-blur-md px-3 py-2 flex items-center justify-between text-[11px] font-semibold text-white/90 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Face Saliency: <strong className="text-white">94%</strong></span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Text Pop: <strong className="text-white">88%</strong></span>
                  </span>
                </div>
                <div className="text-purple-300 font-bold">
                  Total CTR: 9.8%
                </div>
              </div>
            </div>

            {/* Floating High Contrast Anchor Badge matching Mockup */}
            <div className="absolute -bottom-3 right-5 sm:right-7 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 shadow-lg flex items-center space-x-1.5 text-xs font-bold text-purple-700 dark:text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>High Contrast Anchor</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
