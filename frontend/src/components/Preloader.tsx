'use client';

import React, { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { Sparkles, Eye, Cpu, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(12);
  const [statusIndex, setStatusIndex] = useState(0);
  const { t } = useLanguage();

  const statusMessages = [
    t('preloaderInit') || 'Initializing Neural Attention Engine...',
    t('preloaderCalibrate') || 'Calibrating Visual Saliency & Heatmap Nodes...',
    t('preloaderReady') || 'Ready to Optimize Your Thumbnails!',
  ];

  useEffect(() => {
    setMounted(true);

    // Fast initial boot progression
    const timer1 = setTimeout(() => {
      setProgress(48);
      setStatusIndex(1);
    }, 200);

    const timer2 = setTimeout(() => {
      setProgress(85);
    }, 450);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusIndex(2);
    }, 700);

    const timer4 = setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-500 ease-out select-none ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient attention glow */}
      <div className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute w-80 h-80 rounded-full bg-pink-600/15 blur-3xl pointer-events-none -mt-32 -mr-32 animate-pulse" />

      {/* Center Preloader Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center space-y-6">
        {/* Pulsing Logo with Radar Rings */}
        <div className="relative flex items-center justify-center">
          {/* Radar ripple rings */}
          <div className="absolute w-28 h-28 rounded-full border border-purple-500/30 animate-ping" />
          <div className="absolute w-36 h-36 rounded-full border border-pink-500/20 animate-pulse" />

          {/* Core Logo */}
          <div className="relative p-2 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
            <Logo size="lg" showText={false} animated={true} />
          </div>
        </div>

        {/* Brand Name */}
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Thumbnail<span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">IQ</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            AI-Powered YouTube Attention Intelligence
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <div className="w-full h-1.5 bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/50 p-px">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-xs shadow-purple-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center space-x-1.5 truncate max-w-[240px]">
              <Sparkles className="w-3 h-3 text-purple-400 animate-spin" />
              <span>{statusMessages[statusIndex] || statusMessages[0]}</span>
            </span>
            <span className="font-bold text-purple-400 shrink-0">{progress}%</span>
          </div>
        </div>

        {/* Small Engine Specs Pill */}
        <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-mono">
          <span className="flex items-center space-x-1">
            <Eye className="w-3 h-3 text-rose-500" />
            <span>Multi-Signal Gaze</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Cpu className="w-3 h-3 text-indigo-400" />
            <span>FLUX.1 AI</span>
          </span>
        </div>
      </div>
    </div>
  );
}
