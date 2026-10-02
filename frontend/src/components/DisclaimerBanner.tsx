'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-5xl mx-auto my-6 p-4 rounded-xl bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs flex items-start space-x-3 shadow-xs backdrop-blur-xs transition-colors">
      <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
      <div className="leading-relaxed">
        <strong className="text-slate-800 dark:text-slate-200">{t.disclaimerBannerTitle}</strong>{' '}
        {t.disclaimerBannerBody}
      </div>
    </div>
  );
}
