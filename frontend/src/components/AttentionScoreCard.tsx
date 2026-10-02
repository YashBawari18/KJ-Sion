'use client';

import React from 'react';
import { SignalScores } from '@/types/analysis';
import { Gauge, Info, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AttentionScoreCardProps {
  score: number;
  signals: SignalScores;
}

export function AttentionScoreCard({ score, signals }: AttentionScoreCardProps) {
  const { t } = useLanguage();

  const getScoreGrade = (val: number) => {
    if (val >= 80) {
      return {
        label: 'Optimal Hierarchy',
        color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
      };
    }
    if (val >= 65) {
      return {
        label: 'Balanced Attention',
        color: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800'
      };
    }
    return {
      label: 'Competing Signals',
      color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800'
    };
  };

  const grade = getScoreGrade(score);

  const signalItems = [
    { label: t('sigSaliency'), weight: '35%', score: signals.saliency || 0 },
    { label: t('sigFace'), weight: '20%', score: signals.face || 0 },
    { label: t('sigText'), weight: '15%', score: signals.text || 0 },
    { label: t('sigContrast'), weight: '10%', score: signals.contrast || 0 },
    { label: t('sigColor'), weight: '10%', score: signals.color || 0 },
    { label: t('sigComposition'), weight: '10%', score: signals.composition || 0 },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xs backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{t('scoreTitle')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('scoreIndexLabel')}</p>
          </div>
        </div>

        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${grade.color}`}>
          {grade.label}
        </span>
      </div>

      {/* Main Score Display */}
      <div className="py-6 flex items-center justify-around border-b border-slate-100 dark:border-slate-800">
        <div className="text-center">
          <div className="relative inline-flex items-baseline">
            <span className="text-5xl font-black tracking-tight bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {score}
            </span>
            <span className="text-slate-400 dark:text-slate-500 text-lg font-medium ml-1">/ 100</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{t('featScoreTitle')}</p>
        </div>

        <div className="max-w-[210px] text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed">
          <p className="font-semibold text-slate-800 dark:text-slate-100 flex items-center space-x-1 mb-1">
            <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Prototype Metric</span>
          </p>
          {t('scoreMetricNote')}
        </div>
      </div>

      {/* Breakdown Breakdown */}
      <div className="mt-5 space-y-3.5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>{t('signalBreakdown')}</span>
          <span>{t('signalWeights')}</span>
        </div>

        {signalItems.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                <span>{item.label}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">({item.weight})</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{Math.round(item.score)}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, item.score))}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 flex items-start space-x-1.5">
        <HelpCircle className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
        <span>{t('scorePrototypeDisclaimer')}</span>
      </div>
    </div>
  );
}
