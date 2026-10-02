'use client';

import React from 'react';
import { ArrowDown, Flame, Layers, Smartphone, Zap } from 'lucide-react';

interface HeroProps {
  onScrollToUpload: () => void;
  onExploreDemo: () => void;
}

export function Hero({ onScrollToUpload, onExploreDemo }: HeroProps) {
  return (
    <section className="relative pt-10 pb-8 sm:pt-14 sm:pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 -z-10 pointer-events-none opacity-60">
        <div className="absolute top-4 left-1/4 w-72 h-72 bg-purple-300/40 rounded-full blur-3xl" />
        <div className="absolute top-8 right-1/4 w-80 h-80 bg-indigo-300/35 rounded-full blur-3xl" />
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-96 h-48 bg-pink-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Pill Tagline */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-200/70 text-indigo-700 text-xs sm:text-sm font-medium mb-6 shadow-xs animate-fade-in">
          <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
          <span>Understand attention. Improve the thumbnail. Before you publish.</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Where will viewers look{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            in the first 500ms?
          </span>
        </h1>

        {/* Supporting description */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          AI-powered predicted visual attention analysis for YouTube thumbnails.
          Diagnose fixation hotspots, trace viewer scan journeys, and optimize your visual hierarchy before you post.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onScrollToUpload}
            id="cta-analyze-btn"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Analyze Thumbnail</span>
            <ArrowDown className="w-4 h-4 text-white/80" />
          </button>
          
          <button
            onClick={onExploreDemo}
            id="cta-demo-btn"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-700 font-semibold text-sm sm:text-base shadow-xs transition-all hover:border-slate-400 flex items-center justify-center space-x-2"
          >
            <span>Try 3 Demo Samples</span>
          </button>
        </div>

        {/* Quick feature badges */}
        <div className="mt-10 pt-6 border-t border-slate-200/60 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50/70 border border-slate-200/50">
            <div className="w-7 h-7 rounded-md bg-purple-100 flex items-center justify-center text-purple-700">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">Attention Heatmap</p>
              <p className="text-[10px] text-slate-500">Signal fusion map</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50/70 border border-slate-200/50">
            <div className="w-7 h-7 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-700">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">Attention Journey</p>
              <p className="text-[10px] text-slate-500">Scan path sequence</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50/70 border border-slate-200/50">
            <div className="w-7 h-7 rounded-md bg-pink-100 flex items-center justify-center text-pink-700">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">Mobile Previews</p>
              <p className="text-[10px] text-slate-500">168px feed card check</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50/70 border border-slate-200/50">
            <div className="w-7 h-7 rounded-md bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">Design Score</p>
              <p className="text-[10px] text-slate-500">Prototype score /100</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
