'use client';

import React from 'react';
import { ArrowDown, Flame, Layers, Smartphone, Zap, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  onScrollToUpload: () => void;
  onExploreDemo: () => void;
}

export function Hero({ onScrollToUpload, onExploreDemo }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative pt-6 pb-6 sm:pt-12 sm:pb-10 overflow-hidden">
      {/* Dynamic Thermal Heatmap Hotspot directly behind the Hero */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[580px] h-[320px] sm:h-[480px] rounded-full pointer-events-none -z-10 animate-heatspot-1"
        style={{
          background:
            'radial-gradient(circle, rgba(239, 68, 68, 0.45) 0%, rgba(249, 115, 22, 0.35) 26%, rgba(234, 179, 8, 0.22) 48%, rgba(16, 185, 129, 0.12) 68%, rgba(6, 182, 212, 0.05) 84%, transparent 100%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Subtle Gaze Tracking Fixation Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full border border-purple-400/20 dark:border-purple-500/20 pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Pill Tagline */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-50/80 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs backdrop-blur-md animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>YouTube Thumbnail Attention Intelligence</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Understand attention.<br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Improve your thumbnail.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          AI-powered predicted visual attention analysis for YouTube thumbnails.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onScrollToUpload}
            id="cta-analyze-btn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Analyze Thumbnail</span>
            <ArrowDown className="w-4 h-4 text-white/80" />
          </button>

          <button
            onClick={onExploreDemo}
            id="cta-demo-btn"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm sm:text-base shadow-xs backdrop-blur-md transition-all hover:border-purple-300 dark:hover:border-purple-700 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Try 3 Demo Samples</span>
          </button>
        </div>

        {/* Quick feature badges */}
        <div className="mt-10 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/80 backdrop-blur-md shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{t('featHeatmapTitle')}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('featHeatmapSub')}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/80 backdrop-blur-md shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 flex items-center justify-center text-indigo-700 dark:text-indigo-300">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{t('featJourneyTitle')}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('featJourneySub')}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/80 backdrop-blur-md shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-950/70 flex items-center justify-center text-pink-700 dark:text-pink-300">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{t('featMobileTitle')}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{t('featMobileSub')}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/80 backdrop-blur-md shadow-xs">
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
