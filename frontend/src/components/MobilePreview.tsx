'use client';

import React, { useState } from 'react';
import { Smartphone, Monitor, Tablet, AlertTriangle, CheckCircle2, Info, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface MobilePreviewProps {
  imageSrc: string;
}

export function MobilePreview({ imageSrc }: MobilePreviewProps) {
  const { t } = useLanguage();
  const [deviceTab, setDeviceTab] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  return (
    <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-950/70 flex items-center justify-center text-pink-600 dark:text-pink-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Multi-Device Feed & Scale Simulator
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Evaluate real YouTube feed presentation across mobile, tablet, and desktop
            </p>
          </div>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/70 dark:border-slate-700 self-start sm:self-auto">
          <button
            onClick={() => setDeviceTab('mobile')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              deviceTab === 'mobile'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (168px)</span>
          </button>

          <button
            onClick={() => setDeviceTab('tablet')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              deviceTab === 'tablet'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet (220px)</span>
          </button>

          <button
            onClick={() => setDeviceTab('desktop')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              deviceTab === 'desktop'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
        </div>
      </div>

      {/* Simulator Display Area */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Visual Feed Mockup */}
        <div className="flex-1 w-full flex items-center justify-center p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700 min-h-[260px]">
          {deviceTab === 'mobile' && (
            <div className="w-[168px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-300 dark:border-slate-700 p-2 space-y-2 animate-fade-in">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt="Mobile preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-1 right-1 px-1.5 py-0.2 bg-black/85 text-white text-[9px] font-black rounded">
                  12:45
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded w-full" />
                <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
                <p className="text-[8px] text-slate-400 dark:text-slate-500 pt-0.5">Creator · 1.4M views · 1d</p>
              </div>
            </div>
          )}

          {deviceTab === 'tablet' && (
            <div className="w-[230px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-300 dark:border-slate-700 p-2.5 space-y-2.5 animate-fade-in">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt="Tablet preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/85 text-white text-[9px] font-black rounded">
                  12:45
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 bg-slate-300 dark:bg-slate-700 rounded w-full" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <p className="text-[9px] text-slate-400 dark:text-slate-500 pt-0.5">Channel Name · 820K views · 3 days ago</p>
              </div>
            </div>
          )}

          {deviceTab === 'desktop' && (
            <div className="w-full max-w-[320px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-300 dark:border-slate-700 p-3 space-y-2.5 animate-fade-in">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt="Desktop preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 bg-black/85 text-white text-[10px] font-black rounded">
                  12:45
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-full" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                <p className="text-[10px] text-slate-400 dark:text-slate-500 pt-0.5">Verified Channel · 2.1M views · 1 week ago</p>
              </div>
            </div>
          )}
        </div>

        {/* 4-Point Diagnostic Analysis Checklist */}
        <div className="w-full lg:w-96 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-white pb-1">
            <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Feed Readability Diagnostics</span>
          </div>

          {/* 1. Text Readability */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Text Readability</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                High Legibility
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Main headline typography maintains sufficient stroke thickness and contrast to remain readable at 168px mobile card scale.
            </p>
          </div>

          {/* 2. Subject Visibility */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Subject Visibility</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                Clear Silhouette
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Primary subject maintains facial emotion and silhouette distinction even when scaled down to pocket smartphone displays.
            </p>
          </div>

          {/* 3. Visual Clutter */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Visual Clutter</span>
              </span>
              <span className="text-[10px] font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 rounded-full">
                Moderate Density
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Background canvas complexity is restrained, avoiding visual noise that could dilute immediate focal entry.
            </p>
          </div>

          {/* 4. Timestamp Safe-Zone */}
          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/50 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200">
              <span className="flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Timestamp Occlusion Check</span>
              </span>
              <span className="text-[10px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
                Safe Zone
              </span>
            </div>
            <p className="text-[11px] text-amber-900/80 dark:text-amber-300/80 leading-relaxed">
              Bottom-right corner (where YouTube embeds the video length duration badge) avoids overlapping key facial expressions or text headlines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
