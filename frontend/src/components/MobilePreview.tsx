'use client';

import React from 'react';
import { Smartphone, Monitor, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface MobilePreviewProps {
  imageSrc: string;
}

export function MobilePreview({ imageSrc }: MobilePreviewProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xs backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-pink-50 dark:bg-pink-950/70 flex items-center justify-center text-pink-600 dark:text-pink-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{t('feedTitle')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('feedSubtitle')}</p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
          {t('feedBadge168')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* Mobile Preview (168px width standard card) */}
        <div className="bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
            <Smartphone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{t('feedMobileLabel')}</span>
          </div>

          <div className="w-[168px] mx-auto bg-black rounded-xl overflow-hidden relative shadow-md border border-slate-300 dark:border-slate-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="Mobile thumbnail preview"
              className="w-full aspect-video object-cover"
            />
            {/* YouTube Timestamp badge simulation */}
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/85 text-white text-[9px] font-black rounded tracking-tight">
              12:45
            </div>
          </div>

          <div className="w-[168px] mx-auto mt-2.5 space-y-1.5">
            <div className="h-2.5 bg-slate-300 dark:bg-slate-700 rounded w-full" />
            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-1">Creator · 1.2M views · 2 days ago</div>
          </div>
        </div>

        {/* Desktop Feed Preview */}
        <div className="bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
            <Monitor className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{t('feedDesktopLabel')}</span>
          </div>

          <div className="w-full max-w-[260px] mx-auto bg-black rounded-xl overflow-hidden relative shadow-md border border-slate-300 dark:border-slate-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="Desktop thumbnail preview"
              className="w-full aspect-video object-cover"
            />
            {/* YouTube Timestamp badge */}
            <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/85 text-white text-[10px] font-black rounded tracking-tight">
              12:45
            </div>
          </div>

          <div className="w-full max-w-[260px] mx-auto mt-2.5 space-y-1.5">
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-5/6" />
            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          </div>
        </div>
      </div>

      {/* Timestamp safe-zone warning */}
      <div className="mt-4 p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs flex items-center space-x-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span>{t('feedProTip')}</span>
      </div>
    </div>
  );
}
