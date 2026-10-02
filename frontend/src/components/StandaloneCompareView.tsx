'use client';

import React, { useState, useRef } from 'react';
import { AnalysisResponse } from '@/types/analysis';
import { uploadAndAnalyze } from '@/lib/api';
import { GitCompare, Upload, ArrowRight, TrendingUp, Sparkles, AlertCircle, RotateCcw, Loader2 } from 'lucide-react';

export function StandaloneCompareView() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [dataA, setDataA] = useState<AnalysisResponse | null>(null);
  const [dataB, setDataB] = useState<AnalysisResponse | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heatmapOpacity, setHeatmapOpacity] = useState<number>(75);

  const fileInputARef = useRef<HTMLInputElement>(null);
  const fileInputBRef = useRef<HTMLInputElement>(null);

  const handleSelectSample = async (slot: 'A' | 'B', path: string, name: string) => {
    try {
      const res = await fetch(path);
      const blob = await res.blob();
      const file = new File([blob], name, { type: 'image/jpeg' });
      if (slot === 'A') setFileA(file);
      else setFileB(file);
    } catch {
      setError('Could not load sample thumbnail.');
    }
  };

  const handleRunComparison = async () => {
    if (!fileA || !fileB) {
      setError('Please select or upload both Thumbnail A and Thumbnail B to compare.');
      return;
    }
    setIsComparing(true);
    setError(null);
    try {
      const [resA, resB] = await Promise.all([
        uploadAndAnalyze(fileA),
        uploadAndAnalyze(fileB)
      ]);
      setDataA(resA);
      setDataB(resB);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Comparison failed. Please verify files.';
      setError(msg);
    } finally {
      setIsComparing(false);
    }
  };

  const handleReset = () => {
    setFileA(null);
    setFileB(null);
    setDataA(null);
    setDataB(null);
    setError(null);
  };

  const scoreA = dataA?.attention_score ?? 0;
  const scoreB = dataB?.attention_score ?? 0;
  const scoreDiff = scoreB - scoreA;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Page Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Head-to-Head A/B Comparison</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Compare Two Thumbnail Concepts
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Test different compositions, font sizes, or color treatments against each other to evaluate which variation establishes a cleaner visual hierarchy.
        </p>
      </div>

      {!dataA || !dataB ? (
        <div className="space-y-6">
          {/* Dual Upload Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slot A */}
            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  Thumbnail A (Concept 1)
                </span>
                {fileA && (
                  <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>

              <div
                onClick={() => fileInputARef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-purple-400 hover:bg-purple-50/20 cursor-pointer transition-all aspect-video flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-800/40"
              >
                <input
                  ref={fileInputARef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp"
                  className="hidden"
                  onChange={(e) => e.target.files && setFileA(e.target.files[0])}
                />
                {fileA ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={URL.createObjectURL(fileA)}
                    alt="Thumbnail A preview"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Click to upload Concept A</p>
                    <p className="text-[10px] text-slate-400">PNG, JPG, WebP</p>
                  </div>
                )}
              </div>

              {/* Sample Preset Shortcut */}
              <div className="pt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Or use sample:</span>
                <div className="flex space-x-1.5">
                  <button
                    onClick={() => handleSelectSample('A', '/samples/sample_face.jpg', 'sample_face.jpg')}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100 text-[10px] font-semibold cursor-pointer"
                  >
                    Face
                  </button>
                  <button
                    onClick={() => handleSelectSample('A', '/samples/sample_text.jpg', 'sample_text.jpg')}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100 text-[10px] font-semibold cursor-pointer"
                  >
                    Text
                  </button>
                </div>
              </div>
            </div>

            {/* Slot B */}
            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  Thumbnail B (Concept 2)
                </span>
                {fileB && (
                  <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>

              <div
                onClick={() => fileInputBRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-purple-400 hover:bg-purple-50/20 cursor-pointer transition-all aspect-video flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-800/40"
              >
                <input
                  ref={fileInputBRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp"
                  className="hidden"
                  onChange={(e) => e.target.files && setFileB(e.target.files[0])}
                />
                {fileB ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={URL.createObjectURL(fileB)}
                    alt="Thumbnail B preview"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Click to upload Concept B</p>
                    <p className="text-[10px] text-slate-400">PNG, JPG, WebP</p>
                  </div>
                )}
              </div>

              {/* Sample Preset Shortcut */}
              <div className="pt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Or use sample:</span>
                <div className="flex space-x-1.5">
                  <button
                    onClick={() => handleSelectSample('B', '/samples/sample_text.jpg', 'sample_text.jpg')}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100 text-[10px] font-semibold cursor-pointer"
                  >
                    Text
                  </button>
                  <button
                    onClick={() => handleSelectSample('B', '/samples/sample_product.jpg', 'sample_product.jpg')}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100 text-[10px] font-semibold cursor-pointer"
                  >
                    Product
                  </button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-800 dark:text-rose-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Trigger */}
          <div className="text-center pt-2">
            <button
              onClick={handleRunComparison}
              disabled={isComparing || !fileA || !fileB}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto cursor-pointer"
            >
              {isComparing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Computing Multi-Signal Comparison...</span>
                </>
              ) : (
                <>
                  <GitCompare className="w-4 h-4" />
                  <span>Run Head-to-Head Comparison</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Results Comparison View */
        <div className="space-y-6 animate-fade-in">
          {/* Action header */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Concept A</span>
                <p className="text-xl font-black text-slate-900 dark:text-white">{scoreA}/100</p>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-500" />
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase">Concept B</span>
                <p className="text-xl font-black text-purple-600 dark:text-purple-400">{scoreB}/100</p>
              </div>

              <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                scoreDiff >= 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'
              }`}>
                {scoreDiff >= 0 ? `+${scoreDiff}` : scoreDiff} Pts
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Compare Different Files</span>
            </button>
          </div>

          {/* Dual Heatmaps */}
          <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">Predicted Heatmap Overlays:</span>
              <div className="flex items-center space-x-2">
                <span>Opacity:</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={heatmapOpacity}
                  onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                  className="w-24 accent-purple-600 cursor-pointer"
                />
                <span className="font-bold">{heatmapOpacity}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Concept A Heatmap</p>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={dataA.original_image} alt="Concept A" className="absolute inset-0 w-full h-full object-contain" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dataA.heatmap || dataA.original_image}
                    alt="Heatmap A"
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ opacity: heatmapOpacity / 100 }}
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-2">Concept B Heatmap</p>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-purple-200 dark:border-purple-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={dataB.original_image} alt="Concept B" className="absolute inset-0 w-full h-full object-contain" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dataB.heatmap || dataB.original_image}
                    alt="Heatmap B"
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ opacity: heatmapOpacity / 100 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 6 Signal Differences */}
          <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              Multi-Signal Indicator Breakdown
            </h4>

            {[
              { label: 'Visual Saliency', a: dataA.signals.saliency, b: dataB.signals.saliency },
              { label: 'Face / Person Fixation', a: dataA.signals.face, b: dataB.signals.face },
              { label: 'Text Legibility & Weight', a: dataA.signals.text, b: dataB.signals.text },
              { label: 'Edge & Luminance Contrast', a: dataA.signals.contrast, b: dataB.signals.contrast },
              { label: 'Color Saturation & Harmony', a: dataA.signals.color, b: dataB.signals.color },
              { label: 'Composition & Center Balance', a: dataA.signals.composition, b: dataB.signals.composition },
            ].map((sig, idx) => {
              const diff = Math.round(sig.b - sig.a);
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200 w-44">{sig.label}</span>
                  <div className="flex-1 flex items-center space-x-3 px-4">
                    <span className="w-8 text-right font-bold text-slate-500">{Math.round(sig.a)}%</span>
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div style={{ width: `${sig.a}%` }} className="h-full bg-slate-400 rounded-full" />
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div style={{ width: `${sig.b}%` }} className="h-full bg-purple-600 rounded-full" />
                    </div>
                    <span className="w-8 text-left font-bold text-purple-600">{Math.round(sig.b)}%</span>
                  </div>
                  <span className={`w-12 text-right font-black ${diff > 0 ? 'text-emerald-600' : diff < 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                    {diff > 0 ? `+${diff}` : diff}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
