'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export function AnimatedHeatmapBackground() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-colors duration-500">
      {/* 1. Subtle Engineering Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ===================================================================== */}
      {/* SOFT ELEGANT MESH GLOWS (Low opacity, ultra diffused 100px blur)    */}
      {/* ===================================================================== */}

      {/* Top Left Subtle Purple Accent */}
      <div
        className="absolute -top-24 left-1/4 -translate-x-1/2 w-[500px] h-[500px] rounded-full animate-blob-1"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(219, 234, 254, 0.08) 50%, transparent 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Top Right Subtle Cyan/Blue Accent */}
      <div
        className="absolute -top-20 -right-20 w-[550px] h-[550px] rounded-full animate-blob-2"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(79, 70, 229, 0.05) 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(99, 102, 241, 0.10) 0%, rgba(192, 132, 252, 0.06) 50%, transparent 80%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Center Soft Rose Glow */}
      <div
        className="absolute top-[400px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full animate-blob-3"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 80%)'
              : 'radial-gradient(circle, rgba(244, 63, 94, 0.08) 0%, rgba(219, 234, 254, 0.05) 50%, transparent 80%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Vignette Edge Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/5 dark:to-black/30" />
    </div>
  );
}
