'use client';

import React from 'react';
import { ArrowDown, Flame, Layers, Smartphone, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  onScrollToUpload: () => void;
  onExploreDemo: () => void;
}

export function Hero({ onScrollToUpload, onExploreDemo }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative pt-8 pb-6 sm:pt-14 sm:pb-12 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Pill Tagline */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-medium mb-6 shadow-xs backdrop-blur-md animate-fade-in">
          <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600/20" />
          <span>{t('heroPill')}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          {t('heroTitlePrefix')}{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {t('heroTitleGradient')}
          </span>
        </h1>

        {/* Supporting description */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('heroSubtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onScrollToUpload}
            id="cta-analyze-btn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>{t('ctaAnalyze')}</span>
            <ArrowDown className="w-4 h-4 text-white/80" />
          </button>

          <button
            onClick={onExploreDemo}
            id="cta-demo-btn"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm sm:text-base shadow-xs backdrop-blur-md transition-all hover:border-slate-400 dark:hover:border-slate-700 flex items-center justify-center space-x-2"
          >
            <span>{t('ctaDemos')}</span>
          </button>
        </div>

        {/* Quick feature badges */}
        <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{t('featHeatmapTitle')}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('featHeatmapSub')}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 flex items-center justify-center text-indigo-700 dark:text-indigo-300">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{t('featJourneyTitle')}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('featJourneySub')}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-950/70 flex items-center justify-center text-pink-700 dark:text-pink-300">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{t('featMobileTitle')}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('featMobileSub')}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{t('featScoreTitle')}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('featScoreSub')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
