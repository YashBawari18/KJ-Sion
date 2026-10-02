'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export function AnimatedHeatmapBackground() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-colors duration-500">
      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* 1. Purple / Violet Heatmap Blob */}
      <div
        className="absolute -top-20 -left-20 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full animate-blob-1"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(139, 92, 246, 0.15) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(233, 213, 255, 0.75) 0%, rgba(221, 214, 254, 0.5) 45%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* 2. Blue / Indigo Saliency Blob */}
      <div
        className="absolute top-1/4 -right-24 w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full animate-blob-2"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(79, 70, 229, 0.15) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(219, 234, 254, 0.8) 0%, rgba(224, 231, 255, 0.55) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* 3. Pink / Rose Fixation Hotspot Blob */}
      <div
        className="absolute -bottom-24 left-1/4 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full animate-blob-3"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(244, 63, 94, 0.2) 0%, rgba(236, 72, 153, 0.12) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 228, 230, 0.75) 0%, rgba(252, 231, 243, 0.5) 45%, transparent 70%)',
          filter: 'blur(75px)',
        }}
      />

      {/* 4. Cyan / Azure Ambient Glow */}
      <div
        className="absolute top-2/3 -left-28 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full animate-blob-1"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(14, 165, 233, 0.1) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(207, 250, 254, 0.7) 0%, rgba(224, 242, 254, 0.45) 50%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Soft Vignette Edge Shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/5 dark:to-black/30" />
    </div>
  );
}
