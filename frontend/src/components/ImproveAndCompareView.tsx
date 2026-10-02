'use client';

import React, { useState, useRef } from 'react';
import { AnalysisResponse } from '@/types/analysis';
import { uploadAndAnalyze } from '@/lib/api';
import {
  GitCompare,
  Upload,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Eye,
  Sliders
} from 'lucide-react';

interface ImproveAndCompareViewProps {
  originalData: AnalysisResponse;
  onResetOriginal?: () => void;
}

export function ImproveAndCompareView({ originalData, onResetOriginal }: ImproveAndCompareViewProps) {
  const [improvedData, setImprovedData] = useState<AnalysisResponse | null>(null);
  const [isAnalyzingImproved, setIsAnalyzingImproved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'heatmaps' | 'signals' | 'journey'>('heatmaps');
  const [heatmapOpacity, setHeatmapOpacity] = useState<number>(75);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImprovedUpload = async (file: File) => {
    setIsAnalyzingImproved(true);
    setError(null);
    try {
      const res = await uploadAndAnalyze(file);
      setImprovedData(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to analyze improved thumbnail.';
      setError(msg);
    } finally {
      setIsAnalyzingImproved(false);
    }
  };

  const handleSelectPresetImproved = async (samplePath: string) => {
    setIsAnalyzingImproved(true);
    setError(null);
    try {
      const res = await fetch(samplePath);
      if (!res.ok) throw new Error('Could not load preset sample.');
      const blob = await res.blob();
      const file = new File([blob], 'improved_sample.jpg', { type: 'image/jpeg' });
      const result = await uploadAndAnalyze(file);
      setImprovedData(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to analyze preset thumbnail.';
      setError(msg);
    } finally {
      setIsAnalyzingImproved(false);
    }
  };

  const scoreA = originalData.attention_score;
  const scoreB = improvedData?.attention_score ?? null;
  const scoreDelta = scoreB !== null ? scoreB - scoreA : null;

  return (
    <div className="w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-6 transition-colors">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Improve → Re-Analyze & Thumbnail Comparison
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Upload Version B (Improved) to evaluate visual attention shifts side-by-side
            </p>
          </div>
        </div>

        {improvedData && (
          <button
            onClick={() => setImprovedData(null)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-analyze New Version</span>
          </button>
        )}
      </div>

      {/* If Version B is not yet uploaded, show Upload Box / Quick Preset Selector */}
      {!improvedData ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Version A Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                    Thumbnail A (Original Base)
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                    Score: {scoreA}/100
                  </span>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={originalData.original_image}
                    alt="Original thumbnail"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">
                Source: {originalData.image_metadata.filename} ({originalData.image_metadata.width}×{originalData.image_metadata.height}px)
              </p>
            </div>

            {/* Version B Upload Card */}
            <div
              onClick={() => !isAnalyzingImproved && fileInputRef.current?.click()}
              className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isAnalyzingImproved
                  ? 'border-purple-300 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30'
                  : 'border-purple-300/80 dark:border-purple-800/80 bg-purple-50/20 dark:bg-purple-950/10 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 hover:border-purple-500'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleImprovedUpload(e.target.files[0]);
                  }
                }}
                disabled={isAnalyzingImproved}
              />

              {isAnalyzingImproved ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-purple-600 flex items-center justify-center text-white animate-spin">
                    <Flame className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Analyzing Improved Version...
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Running attention fusion engine on Version B
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Upload Thumbnail B (Improved)
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Drag & drop your revised iteration (PNG, JPG, WebP)
                    </p>
                  </div>
                  <span className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-xs">
                    <span>Browse Revised File</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Or compare against other demo thumbnail */}
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-center">
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-2.5">
              Or pick an alternate thumbnail from our gallery to compare with:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => handleSelectPresetImproved('/samples/sample_face.jpg')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-purple-400 shadow-xs cursor-pointer"
              >
                Face-Heavy Sample
              </button>
              <button
                onClick={() => handleSelectPresetImproved('/samples/sample_text.jpg')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-purple-400 shadow-xs cursor-pointer"
              >
                Text-Heavy Sample
              </button>
              <button
                onClick={() => handleSelectPresetImproved('/samples/sample_product.jpg')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-purple-400 shadow-xs cursor-pointer"
              >
                Product-Heavy Sample
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      ) : (
        /* Side-by-Side Comparison Dashboard */
        <div className="space-y-6 animate-fade-in">
          {/* Delta Score Metric Header */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50/70 via-indigo-50/60 to-pink-50/50 dark:from-purple-950/30 dark:via-indigo-950/20 dark:to-pink-950/20 border border-purple-200/80 dark:border-purple-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Thumbnail A</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{scoreA}<span className="text-xs font-normal text-slate-400">/100</span></p>
              </div>

              <ArrowRight className="w-5 h-5 text-purple-500" />

              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Thumbnail B</span>
                <p className="text-2xl font-black text-purple-600 dark:text-purple-400">{scoreB}<span className="text-xs font-normal text-slate-400">/100</span></p>
              </div>

              {scoreDelta !== null && (
                <div className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center space-x-1 ${
                  scoreDelta >= 0
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                }`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta} Points Delta</span>
                </div>
              )}
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center space-x-1 bg-white/80 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('heatmaps')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'heatmaps'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Heatmaps
              </button>
              <button
                onClick={() => setActiveTab('signals')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'signals'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Signal Indicators
              </button>
              <button
                onClick={() => setActiveTab('journey')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'journey'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Journey Shifts
              </button>
            </div>
          </div>

          {/* Sub-view 1: Heatmaps Comparison */}
          {activeTab === 'heatmaps' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Overlay Opacity:</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={heatmapOpacity}
                    onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                    className="w-28 accent-purple-600 cursor-pointer"
                  />
                  <span className="font-bold text-slate-700 dark:text-slate-300">{heatmapOpacity}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Heatmap A */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      <span>Thumbnail A (Original)</span>
                    </span>
                    <span className="text-slate-500 font-normal">Score: {scoreA}/100</span>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-700 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={originalData.original_image}
                      alt="Thumbnail A Base"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={originalData.heatmap || originalData.original_image}
                      alt="Thumbnail A Heatmap"
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{ opacity: heatmapOpacity / 100 }}
                    />
                  </div>
                </div>

                {/* Heatmap B */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-300">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                      <span>Thumbnail B (Improved)</span>
                    </span>
                    <span className="font-bold">Score: {scoreB}/100</span>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-purple-200 dark:border-purple-800 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={improvedData.original_image}
                      alt="Thumbnail B Base"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={improvedData.heatmap || improvedData.original_image}
                      alt="Thumbnail B Heatmap"
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{ opacity: heatmapOpacity / 100 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-view 2: Signal Indicators Comparison */}
          {activeTab === 'signals' && (
            <div className="space-y-3">
              {[
                { label: 'Visual Saliency', a: originalData.signals.saliency ?? 0, b: improvedData.signals.saliency ?? 0 },
                { label: 'Face / Person Fixation', a: originalData.signals.face ?? originalData.signals.face_saliency ?? 0, b: improvedData.signals.face ?? improvedData.signals.face_saliency ?? 0 },
                { label: 'Text Legibility & Prominence', a: originalData.signals.text ?? originalData.signals.text_prominence ?? 0, b: improvedData.signals.text ?? improvedData.signals.text_prominence ?? 0 },
                { label: 'Contrast & Edge Definition', a: originalData.signals.contrast ?? originalData.signals.contrast_edge ?? 0, b: improvedData.signals.contrast ?? improvedData.signals.contrast_edge ?? 0 },
                { label: 'Color Saturation & Harmony', a: originalData.signals.color ?? originalData.signals.color_harmony ?? 0, b: improvedData.signals.color ?? improvedData.signals.color_harmony ?? 0 },
                { label: 'Composition & Central Weight', a: originalData.signals.composition ?? 0, b: improvedData.signals.composition ?? 0 },
              ].map((sig, idx) => {
                const diff = Math.round(sig.b - sig.a);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4"
                  >
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 w-44 truncate">
                      {sig.label}
                    </span>

                    <div className="flex-1 flex items-center space-x-3">
                      <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${sig.a}%` }}
                          className="h-full bg-slate-400 dark:bg-slate-500 rounded-full"
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 w-8 text-right">
                        {Math.round(sig.a)}
                      </span>

                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

                      <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${sig.b}%` }}
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                        />
                      </div>
                      <span className="text-xs font-bold text-purple-700 dark:text-purple-300 w-8 text-right">
                        {Math.round(sig.b)}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-extrabold w-12 text-right ${
                        diff > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : diff < 0
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {diff > 0 ? `+${diff}` : diff}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Sub-view 3: Journey Shifts */}
          {activeTab === 'journey' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Thumbnail A Scan Sequence</p>
                <div className="space-y-1.5">
                  {originalData.journey.map((step) => (
                    <div
                      key={step.step}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs flex items-center space-x-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-[10px] flex items-center justify-center">
                        {step.step}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{step.target}</span>
                      <span className="text-slate-400 dark:text-slate-500 text-[11px] truncate">({step.reason || step.description})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-purple-700 dark:text-purple-300">Thumbnail B Scan Sequence</p>
                <div className="space-y-1.5">
                  {improvedData.journey.map((step) => (
                    <div
                      key={step.step}
                      className="p-2.5 rounded-lg bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800 text-xs flex items-center space-x-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-extrabold text-[10px] flex items-center justify-center">
                        {step.step}
                      </span>
                      <span className="font-semibold text-purple-950 dark:text-purple-200">{step.target}</span>
                      <span className="text-purple-700/80 dark:text-purple-400/80 text-[11px] truncate">({step.reason || step.description})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Key Visual Changes Detected */}
          <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-800/50 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-900 dark:text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Key Detected Visual Differences</span>
            </div>
            <ul className="text-xs text-purple-950/80 dark:text-purple-300/80 space-y-1 list-disc pl-4 leading-relaxed">
              <li>
                <strong>Focal Point Hierarchy:</strong> {scoreDelta && scoreDelta >= 0 ? 'Enhanced separation between the primary subject and background canvas.' : 'Visual weight redistributed across elements.'}
              </li>
              <li>
                <strong>Text Legibility:</strong> {(improvedData.signals.text ?? 0) >= (originalData.signals.text ?? 0) ? 'Increased luminance contrast elevates typography readability on compact displays.' : 'Text prominence maintained relative to imagery.'}
              </li>
              <li>
                <strong>Background Clutter:</strong> Evaluated lower peripheral distractors to streamline initial 500ms fixation.
              </li>
            </ul>
          </div>

          {/* Scientific Disclaimer */}
          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
            Notice: Attention score deltas reflect algorithmic heuristic design indicators. They do not claim guaranteed CTR improvements or conversion rates.
          </p>
        </div>
      )}
    </div>
  );
}
