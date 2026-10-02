'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
}

export function Logo({
  className = '',
  size = 'md',
  showText = true,
  animated = false,
}: LogoProps) {
  const sizeMap = {
    sm: { icon: 24, text: 'text-base', badge: 'text-[9px] px-1 py-0.2' },
    md: { icon: 32, text: 'text-lg sm:text-xl', badge: 'text-[11px] px-2 py-0.5' },
    lg: { icon: 44, text: 'text-2xl', badge: 'text-xs px-2.5 py-0.5' },
    xl: { icon: 64, text: 'text-3xl sm:text-4xl', badge: 'text-xs px-3 py-1' },
  };

  const { icon, text, badge } = sizeMap[size];

  return (
    <div className={`inline-flex items-center space-x-2.5 select-none ${className}`}>
      {/* SVG Icon */}
      <div
        className={`relative shrink-0 flex items-center justify-center rounded-2xl p-1 bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 shadow-md shadow-purple-500/25 ${
          animated ? 'animate-pulse' : ''
        }`}
        style={{ width: icon + 8, height: icon + 8 }}
      >
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white drop-shadow-sm"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f3e8ff" stopOpacity="0.85" />
            </linearGradient>
            <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="45%" stopColor="#8b5cf6" />
              <stop offset="85%" stopColor="#4338ca" />
            </radialGradient>
          </defs>

          {/* Stylized YouTube Thumbnail Widescreen Frame */}
          <rect
            x="8"
            y="18"
            width="84"
            height="64"
            rx="16"
            stroke="url(#logoGrad)"
            strokeWidth="5"
            strokeOpacity="0.9"
            fill="rgba(15, 23, 42, 0.25)"
          />

          {/* Attention Retina / Heatmap Iris Rings */}
          <circle cx="50" cy="50" r="24" fill="url(#irisGrad)" fillOpacity="0.85" />
          <circle
            cx="50"
            cy="50"
            r="16"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeDasharray="4 3"
            strokeOpacity="0.8"
          />

          {/* Central Play/Attention Core */}
          <polygon
            points="46,42 60,50 46,58"
            fill="#ffffff"
          />

          {/* Top-Right Gaze Fixation Indicator dot */}
          <circle cx="76" cy="30" r="4.5" fill="#f43f5e" />
          <circle cx="76" cy="30" r="7.5" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.6" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex items-center space-x-2">
          <span className={`font-black tracking-tight text-slate-900 dark:text-white ${text}`}>
            Thumbnail<span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">IQ</span>
          </span>
          <span className={`rounded-md bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 font-extrabold text-purple-700 dark:text-purple-300 ${badge}`}>
            V2.4 AI
          </span>
        </div>
      )}
    </div>
  );
}
