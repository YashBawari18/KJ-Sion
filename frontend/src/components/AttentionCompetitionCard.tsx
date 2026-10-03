'use client';

import React from 'react';
import { SignalScores, AttentionJourneyStep } from '@/types/analysis';
import { Target, Zap, AlertTriangle, Layers, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AttentionCompetitionCardProps {
  signals: SignalScores;
  journey: AttentionJourneyStep[];
}

export function AttentionCompetitionCard({ signals, journey }: AttentionCompetitionCardProps) {
  const { t } = useLanguage();
  // Compute primary, secondary, and distraction dynamically from actual signals & journey
  const primaryStep = journey[0];
  const secondaryStep = journey[1] || { target: 'Secondary Accent', reason: 'Supporting element' };
  
  const faceScore = signals.face ?? signals.face_saliency ?? 50;
  const textScore = signals.text ?? signals.text_prominence ?? 50;
  const contrastScore = signals.contrast ?? signals.contrast_edge ?? 50;
  const colorScore = signals.color ?? signals.color_harmony ?? 50;
  const compositionScore = signals.composition ?? 50;
  const saliencyScore = signals.saliency ?? 50;
  
  let primaryLabel = primaryStep ? primaryStep.target : 'Main Subject';
  let primaryReason = primaryStep ? (primaryStep.reason || primaryStep.description) : 'Highest computed visual saliency';
  let primaryWeight = Math.min(52, Math.max(38, Math.round(saliencyScore * 0.5)));

  let secondaryLabel = secondaryStep ? secondaryStep.target : 'Headline Text';
  let secondaryReason = secondaryStep ? (secondaryStep.reason || secondaryStep.description) : 'Secondary focal attractor';
  let secondaryWeight = Math.min(36, Math.max(24, Math.round(contrastScore * 0.35)));

  let distractionLabel = compositionScore < 65 
    ? 'Background Texture & Peripheral Elements' 
    : colorScore > 75 
    ? 'High-Saturation Edge Gradients' 
    : 'Lower-Third Detail Clutter';
  let distractionReason = 'Competes with focal flow and diffuses central gaze anchoring.';
  let distractionWeight = 100 - (primaryWeight + secondaryWeight);

  return (
    <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-5 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/70 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {t('Attention Competition & Hierarchy')}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t('Primary vs secondary attractors & visual distractors')}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-full">
          {t('Signal Weighting')}
        </span>
      </div>

      {/* Visual Distribution Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600 dark:text-slate-300">Relative Weight Distribution</span>
          <span className="text-slate-400 dark:text-slate-500 text-[11px]">Prototype Indicator</span>
        </div>
        
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 p-0.5 gap-0.5 border border-slate-200/60 dark:border-slate-700/60">
          <div
            style={{ width: `${primaryWeight}%` }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-l-full"
            title={`Primary: ${primaryWeight}%`}
          />
          <div
            style={{ width: `${secondaryWeight}%` }}
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
            title={`Secondary: ${secondaryWeight}%`}
          />
          <div
            style={{ width: `${distractionWeight}%` }}
            className="h-full bg-gradient-to-r from-slate-400 to-rose-400 rounded-r-full"
            title={`Distraction: ${distractionWeight}%`}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-purple-600 inline-block" />
            <span>Primary ({primaryWeight}%)</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            <span>Secondary ({secondaryWeight}%)</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
            <span>Competing ({distractionWeight}%)</span>
          </span>
        </div>
      </div>

      {/* Tri-Card Breakdown */}
      <div className="space-y-3">
        {/* 1. Primary Attention */}
        <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-900/50 flex items-start space-x-3">
          <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            1
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-950 dark:text-purple-200">
                Primary Attention: {primaryLabel}
              </span>
              <span className="text-[10px] font-semibold bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded-full">
                ~{primaryWeight}% Weight
              </span>
            </div>
            <p className="text-xs text-purple-900/80 dark:text-purple-300/80 mt-1 leading-relaxed">
              {primaryReason}
            </p>
          </div>
        </div>

        {/* 2. Secondary Attention */}
        <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 flex items-start space-x-3">
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            2
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-200">
                Secondary Attention: {secondaryLabel}
              </span>
              <span className="text-[10px] font-semibold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                ~{secondaryWeight}% Weight
              </span>
            </div>
            <p className="text-xs text-amber-900/80 dark:text-amber-300/80 mt-1 leading-relaxed">
              {secondaryReason}
            </p>
          </div>
        </div>

        {/* 3. Distraction / Competing Element */}
        <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/50 flex items-start space-x-3">
          <div className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-950 dark:text-rose-200">
                Competing Distraction: {distractionLabel}
              </span>
              <span className="text-[10px] font-semibold bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded-full">
                ~{distractionWeight}% Weight
              </span>
            </div>
            <p className="text-xs text-rose-900/80 dark:text-rose-300/80 mt-1 leading-relaxed">
              {distractionReason}
            </p>
          </div>
        </div>
      </div>

      {/* Strict Disclaimer Notice */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-start space-x-2 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
        <Info className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
        <span>
          Values indicate relative computed model weights across visual feature channels, NOT actual human viewer percentages or eye-tracking statistics.
        </span>
      </div>
    </div>
  );
}
