'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export function AnimatedHeatmapBackground() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-colors duration-500">
      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Primary Heatmap Hotspot Blob (Red / Orange Fixation Peak) */}
      <div
        className="absolute -top-16 -left-16 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full animate-blob-1"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(239, 68, 68, 0.28) 0%, rgba(249, 115, 22, 0.18) 40%, rgba(220, 38, 38, 0) 70%)'
              : 'radial-gradient(circle, rgba(254, 202, 202, 0.7) 0%, rgba(254, 215, 170, 0.5) 45%, rgba(254, 226, 226, 0) 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Secondary Attention Blob (Royal Indigo / Violet Scanpath) */}
      <div
        className="absolute top-1/4 -right-24 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full animate-blob-2"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.18) 45%, rgba(147, 51, 234, 0) 70%)'
              : 'radial-gradient(circle, rgba(224, 231, 255, 0.8) 0%, rgba(243, 232, 255, 0.6) 45%, rgba(245, 243, 255, 0) 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Tertiary Amber / Golden Flare Blob */}
      <div
        className="absolute -bottom-28 left-1/3 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full animate-blob-3"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(234, 88, 12, 0.12) 40%, rgba(245, 158, 11, 0) 70%)'
              : 'radial-gradient(circle, rgba(254, 243, 199, 0.7) 0%, rgba(254, 215, 170, 0.45) 45%, rgba(254, 243, 199, 0) 70%)',
          filter: 'blur(75px)',
        }}
      />

      {/* Cyan / Azure Ambient Glow */}
      <div
        className="absolute top-2/3 -left-32 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full animate-blob-1"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, rgba(56, 189, 248, 0.08) 50%, rgba(14, 165, 233, 0) 70%)'
              : 'radial-gradient(circle, rgba(224, 242, 254, 0.65) 0%, rgba(207, 250, 254, 0.4) 50%, rgba(224, 242, 254, 0) 70%)',
          filter: 'blur(65px)',
        }}
      />

      {/* Soft Vignette Edge Shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/10 dark:to-black/30" />
    </div>
  );
}
