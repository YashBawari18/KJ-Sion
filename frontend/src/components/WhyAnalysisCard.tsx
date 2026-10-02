'use client';

import React from 'react';
import { Lightbulb, Smile, Type, Split, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface WhyAnalysisCardProps {
  whyAnalysis: string[];
}

export function WhyAnalysisCard({ whyAnalysis }: WhyAnalysisCardProps) {
  const { t } = useLanguage();

  const getCategoryIconAndTag = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('face') || lower.includes('eye') || lower.includes('expression')) {
      return {
        tag: 'FACE SIGNAL',
        color: 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
        icon: Smile,
      };
    }
    if (lower.includes('text') || lower.includes('headline') || lower.includes('typography')) {
      return {
        tag: 'TEXT / TYPOGRAPHY',
        color: 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        icon: Type,
      };
    }
    if (lower.includes('contrast') || lower.includes('edge') || lower.includes('luminance')) {
      return {
        tag: 'CONTRAST DYNAMICS',
        color: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        icon: Split,
      };
    }
    return {
      tag: 'VISUAL SALIENCY',
      color: 'bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
      icon: Sparkles,
    };
  };

  return (
    <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
      <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">{t('whyTitle')}</h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('whySubtitle')}</p>
        </div>
      </div>

      <div className="space-y-3">
        {whyAnalysis.map((reason, idx) => {
          const { tag, color, icon: Icon } = getCategoryIconAndTag(reason);
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${color}`}>
                  <Icon className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">Signal Driver #{idx + 1}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {reason}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
