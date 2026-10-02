'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export function AnimatedHeatmapBackground() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-colors duration-500">
      {/* 1. Subtle Engineering Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ===================================================================== */}
      {/* HIGH-CONTRAST THERMAL HEATMAP FIXATION SPOTS (Concentric Hotspots)   */}
      {/* Red Core → Orange Mid → Yellow → Cyan / Green Halo                    */}
      {/* ===================================================================== */}

      {/* Heatmap Spot 1: Primary High-Fixation Hotspot (Hero Area / Top Left) */}
      <div
        className="absolute top-12 left-1/4 -translate-x-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full animate-heatspot-1"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(255, 50, 50, 0.95) 0%, rgba(255, 125, 20, 0.82) 24%, rgba(250, 204, 21, 0.65) 48%, rgba(52, 211, 153, 0.42) 68%, rgba(6, 182, 212, 0.18) 84%, transparent 100%)'
              : 'radial-gradient(circle, rgba(239, 68, 68, 0.88) 0%, rgba(249, 115, 22, 0.78) 24%, rgba(234, 179, 8, 0.62) 46%, rgba(16, 185, 129, 0.4) 66%, rgba(6, 182, 212, 0.2) 84%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Heatmap Spot 2: Secondary Fixation Hotspot (Top-Right / Beside Hero) */}
      <div
        className="absolute top-24 -right-12 w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full animate-heatspot-2"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(255, 125, 20, 0.92) 0%, rgba(250, 204, 21, 0.75) 28%, rgba(52, 211, 153, 0.52) 54%, rgba(14, 165, 233, 0.25) 76%, transparent 100%)'
              : 'radial-gradient(circle, rgba(249, 115, 22, 0.86) 0%, rgba(234, 179, 8, 0.74) 28%, rgba(34, 197, 94, 0.52) 52%, rgba(14, 165, 233, 0.26) 75%, transparent 100%)',
          filter: 'blur(22px)',
        }}
      />

      {/* Heatmap Spot 3: Focus Blooming Hotspot (Center / Behind Upload Zone) */}
      <div
        className="absolute top-[480px] left-1/2 -translate-x-1/2 w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full animate-heatspot-3"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(244, 63, 94, 0.92) 0%, rgba(168, 85, 247, 0.72) 34%, rgba(6, 182, 212, 0.38) 64%, transparent 96%)'
              : 'radial-gradient(circle, rgba(239, 68, 68, 0.82) 0%, rgba(244, 63, 94, 0.72) 28%, rgba(168, 85, 247, 0.5) 54%, rgba(6, 182, 212, 0.24) 78%, transparent 100%)',
          filter: 'blur(22px)',
        }}
      />

      {/* Heatmap Spot 4: Lower-Left Attention Hotspot */}
      <div
        className="absolute bottom-20 -left-12 w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] rounded-full animate-heatspot-1"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(255, 68, 68, 0.9) 0%, rgba(255, 125, 20, 0.75) 28%, rgba(250, 204, 21, 0.55) 52%, rgba(52, 211, 153, 0.3) 74%, transparent 100%)'
              : 'radial-gradient(circle, rgba(239, 68, 68, 0.82) 0%, rgba(249, 115, 22, 0.7) 28%, rgba(234, 179, 8, 0.52) 52%, rgba(16, 185, 129, 0.3) 74%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Heatmap Spot 5: Lower-Right Peripheral Hotspot */}
      <div
        className="absolute -bottom-10 right-1/4 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full animate-heatspot-2"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(250, 204, 21, 0.9) 0%, rgba(52, 211, 153, 0.68) 38%, rgba(56, 189, 248, 0.35) 70%, transparent 96%)'
              : 'radial-gradient(circle, rgba(234, 179, 8, 0.82) 0%, rgba(16, 185, 129, 0.62) 36%, rgba(14, 165, 233, 0.32) 68%, transparent 95%)',
          filter: 'blur(20px)',
        }}
      />

      {/* ===================================================================== */}
      {/* AMBIENT DIFFUSED LAVENDER / PURPLE / CYAN GLOWS                       */}
      {/* ===================================================================== */}
      <div
        className="absolute -top-32 -left-32 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full animate-blob-1"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(233, 213, 255, 0.35) 0%, rgba(221, 214, 254, 0.2) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div
        className="absolute top-1/3 -right-32 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full animate-blob-2"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(79, 70, 229, 0.08) 45%, transparent 70%)'
              : 'radial-gradient(circle, rgba(219, 234, 254, 0.38) 0%, rgba(224, 231, 255, 0.22) 45%, transparent 70%)',
          filter: 'blur(85px)',
        }}
      />

      {/* Subtle Vignette Edge Shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/5 dark:to-black/30" />
    </div>
  );
}
