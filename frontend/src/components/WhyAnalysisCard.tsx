'use client';

import React from 'react';
import { CheckCircle, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface WhyAnalysisCardProps {
  whyAnalysis: string[];
}

export function WhyAnalysisCard({ whyAnalysis }: WhyAnalysisCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xs backdrop-blur-md">
      <div className="flex items-center space-x-2.5 pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{t('whyTitle')}</h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('whySubtitle')}</p>
        </div>
      </div>

      <div className="space-y-3">
        {whyAnalysis.map((reason, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
          >
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>{reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
