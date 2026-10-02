'use client';

import React from 'react';
import { SignalScores } from '@/types/analysis';
import { Gauge, Info, HelpCircle } from 'lucide-react';

interface AttentionScoreCardProps {
  score: number;
  signals: SignalScores;
}

export function AttentionScoreCard({ score, signals }: AttentionScoreCardProps) {
  // Score interpretation
  const getScoreGrade = (val: number) => {
    if (val >= 80) return { label: 'Optimal Hierarchy', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val >= 65) return { label: 'Balanced Attention', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    return { label: 'Competing Signals', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  };

  const grade = getScoreGrade(score);

  const signalItems = [
    { label: 'Visual Saliency', weight: '35%', score: signals.saliency || 0, desc: 'Spectral frequency & raw luminance contrast' },
    { label: 'Face / Emotion Saliency', weight: '20%', score: signals.face || 0, desc: 'Facial landmarks & biological gaze attraction' },
    { label: 'Text Legibility & Weight', weight: '15%', score: signals.text || 0, desc: 'Stroke density and typographical prominence' },
    { label: 'Edge & Luminance Contrast', weight: '10%', score: signals.contrast || 0, desc: 'Foreground vs background dynamic separation' },
    { label: 'Color Saturation & Vibrancy', weight: '10%', score: signals.color || 0, desc: 'Hue chromatic intensity & dominant accents' },
    { label: 'Composition & Framing', weight: '10%', score: signals.composition || 0, desc: 'Rule of thirds, center bias, and balance' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Attention Score</h3>
            <p className="text-[11px] text-slate-500">Prototype Heuristic Design Index</p>
          </div>
        </div>

        <div className="group relative cursor-pointer">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${grade.color}`}>
            {grade.label}
          </span>
        </div>
      </div>

      {/* Main Score Display */}
      <div className="py-6 flex items-center justify-around border-b border-slate-100">
        <div className="text-center">
          <div className="relative inline-flex items-baseline">
            <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-transparent">
              {score}
            </span>
            <span className="text-slate-400 text-lg font-medium ml-1">/ 100</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Design Attention Index</p>
        </div>

        <div className="max-w-[200px] text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
          <p className="font-semibold text-slate-800 flex items-center space-x-1 mb-1">
            <Info className="w-3.5 h-3.5 text-indigo-600" />
            <span>Prototype Metric</span>
          </p>
          Combined weighted model estimating viewer fixation strength.
        </div>
      </div>

      {/* Breakdown Breakdown */}
      <div className="mt-5 space-y-3.5">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Signal Breakdown</span>
          <span>Engine Weight · Score</span>
        </div>

        {signalItems.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700 flex items-center space-x-1">
                <span>{item.label}</span>
                <span className="text-[10px] text-slate-400">({item.weight})</span>
              </span>
              <span className="font-semibold text-slate-900">{Math.round(item.score)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, item.score))}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Scientific disclaimer note */}
      <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-start space-x-1.5">
        <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>Weights represent initial prototype engineering heuristics; not validated clinical gaze statistics.</span>
      </div>
    </div>
  );
}
