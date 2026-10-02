'use client';

import React, { useState } from 'react';
import { AnalysisResponse } from '@/types/analysis';
import { uploadAndAnalyze, analyzeYouTubeUrl } from '@/lib/api';
import {
  GitCompare, Upload, Link, ArrowRight, TrendingUp, AlertCircle, RotateCcw, Loader2, PlayCircle,
} from 'lucide-react';

// Real YouTube video presets for quick compare
const YT_PRESETS = [
  { label: 'Rick Astley', videoId: 'dQw4w9WgXcQ', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { label: 'Lofi Girl', videoId: 'jfKfPfyJRdk', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
  { label: 'MKBHD iPhones', videoId: 'nzjmtJCvnFY', url: 'https://www.youtube.com/watch?v=nzjmtJCvnFY' },
  { label: 'Veritasium', videoId: 'HeQX2HjkcNo', url: 'https://www.youtube.com/watch?v=HeQX2HjkcNo' },
  { label: 'MrBeast', videoId: 'KmVER_DpF7I', url: 'https://www.youtube.com/watch?v=KmVER_DpF7I' },
  { label: 'Yes Theory', videoId: 'nSTiP1cBFSI', url: 'https://www.youtube.com/watch?v=nSTiP1cBFSI' },
];

type SlotMode = 'upload' | 'youtube';

interface SlotState {
  mode: SlotMode;
  file: File | null;
  youtubeUrl: string;
  previewThumb: string | null; // for YT CDN preview
}

const emptySlot = (): SlotState => ({ mode: 'youtube', file: null, youtubeUrl: '', previewThumb: null });

function ytThumb(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function extractVideoId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export function StandaloneCompareView() {
  const [slotA, setSlotA] = useState<SlotState>(emptySlot());
  const [slotB, setSlotB] = useState<SlotState>(emptySlot());
  const [dataA, setDataA] = useState<AnalysisResponse | null>(null);
  const [dataB, setDataB] = useState<AnalysisResponse | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heatmapOpacity, setHeatmapOpacity] = useState<number>(75);

  const fileInputARef = React.useRef<HTMLInputElement>(null);
  const fileInputBRef = React.useRef<HTMLInputElement>(null);

  const updateSlot = (slot: 'A' | 'B', updates: Partial<SlotState>) => {
    if (slot === 'A') setSlotA((s) => ({ ...s, ...updates }));
    else setSlotB((s) => ({ ...s, ...updates }));
  };

  const handleYtUrlChange = (slot: 'A' | 'B', url: string) => {
    const vid = extractVideoId(url);
    updateSlot(slot, { youtubeUrl: url, previewThumb: vid ? ytThumb(vid) : null });
  };

  const handlePreset = (slot: 'A' | 'B', preset: (typeof YT_PRESETS)[0]) => {
    updateSlot(slot, { youtubeUrl: preset.url, previewThumb: ytThumb(preset.videoId), mode: 'youtube' });
  };

  const handleFileChange = (slot: 'A' | 'B', file: File) => {
    updateSlot(slot, { file, mode: 'upload', previewThumb: URL.createObjectURL(file) });
  };

  const analyzeSlot = async (slot: SlotState): Promise<AnalysisResponse> => {
    if (slot.mode === 'youtube') {
      if (!slot.youtubeUrl) throw new Error('Please enter a YouTube URL.');
      return analyzeYouTubeUrl(slot.youtubeUrl);
    } else {
      if (!slot.file) throw new Error('Please upload an image file.');
      return uploadAndAnalyze(slot.file);
    }
  };

  const handleRunComparison = async () => {
    setIsComparing(true);
    setError(null);
    try {
      const [resA, resB] = await Promise.all([analyzeSlot(slotA), analyzeSlot(slotB)]);
      setDataA(resA);
      setDataB(resB);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Comparison failed. Please verify inputs.';
      setError(msg);
    } finally {
      setIsComparing(false);
    }
  };

  const handleReset = () => {
    setSlotA(emptySlot());
    setSlotB(emptySlot());
    setDataA(null);
    setDataB(null);
    setError(null);
  };

  const scoreA = dataA?.attention_score ?? 0;
  const scoreB = dataB?.attention_score ?? 0;
  const scoreDiff = scoreB - scoreA;

  const SlotPanel = ({ slot, slotKey, fileRef }: {
    slot: SlotState;
    slotKey: 'A' | 'B';
    fileRef: React.RefObject<HTMLInputElement | null>;
  }) => (
    <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
          Thumbnail {slotKey} {slotKey === 'A' ? '(Concept 1)' : '(Concept 2)'}
        </span>
        {slot.previewThumb && (
          <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-2 py-0.5 rounded-full">
            Ready ✓
          </span>
        )}
      </div>

      {/* Mode Toggle */}
      <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 text-xs font-semibold">
        <button
          onClick={() => updateSlot(slotKey, { mode: 'youtube' })}
          className={`flex-1 flex items-center justify-center space-x-1.5 py-2 transition-colors cursor-pointer ${
            slot.mode === 'youtube'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span>YouTube URL</span>
        </button>
        <button
          onClick={() => updateSlot(slotKey, { mode: 'upload' })}
          className={`flex-1 flex items-center justify-center space-x-1.5 py-2 transition-colors cursor-pointer ${
            slot.mode === 'upload'
              ? 'bg-purple-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>
      </div>

      {/* YouTube Mode */}
      {slot.mode === 'youtube' && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Link className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="url"
              value={slot.youtubeUrl}
              onChange={(e) => handleYtUrlChange(slotKey, e.target.value)}
              placeholder="Paste YouTube URL (e.g. youtube.com/watch?v=...)"
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Preview */}
          {slot.previewThumb && (
            <div className="aspect-video rounded-xl overflow-hidden border border-purple-300 dark:border-purple-700 bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slot.previewThumb} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Quick-pick presets */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Or pick a preset:</p>
            <div className="flex flex-wrap gap-1.5">
              {YT_PRESETS.map((p) => (
                <button
                  key={p.videoId}
                  onClick={() => handlePreset(slotKey, p)}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ytThumb(p.videoId)} alt={p.label} className="w-6 h-4 rounded object-cover" />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Mode */}
      {slot.mode === 'upload' && (
        <div className="space-y-3">
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-purple-400 hover:bg-purple-50/20 cursor-pointer transition-all aspect-video flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-800/40"
          >
            <input
              ref={fileRef}
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              className="hidden"
              onChange={(e) => e.target.files && handleFileChange(slotKey, e.target.files[0])}
            />
            {slot.previewThumb && slot.mode === 'upload' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={slot.previewThumb} alt="Preview" className="absolute inset-0 w-full h-full object-contain" />
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Click to upload Concept {slotKey}</p>
                <p className="text-[10px] text-slate-400">PNG, JPG, WebP</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

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
          Paste YouTube URLs or upload files — AI scores both and shows you which thumbnail wins on every signal.
        </p>
      </div>

      {!dataA || !dataB ? (
        <div className="space-y-6">
          {/* Dual Slot Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SlotPanel slot={slotA} slotKey="A" fileRef={fileInputARef} />
            <SlotPanel slot={slotB} slotKey="B" fileRef={fileInputBRef} />
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-800 dark:text-rose-200 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="text-center pt-2">
            <button
              onClick={handleRunComparison}
              disabled={isComparing || (slotA.mode === 'youtube' ? !slotA.youtubeUrl : !slotA.file) || (slotB.mode === 'youtube' ? !slotB.youtubeUrl : !slotB.file)}
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
        /* Results View */
        <div className="space-y-6 animate-fade-in">
          {/* Score Header */}
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

              <div className="ml-2 flex items-center space-x-1.5 text-xs font-semibold text-slate-500">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span>{scoreDiff >= 0 ? 'Concept B' : 'Concept A'} Wins</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Compare Different</span>
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

          {/* 6-Signal Breakdown */}
          <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Multi-Signal Indicator Breakdown</h4>

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
