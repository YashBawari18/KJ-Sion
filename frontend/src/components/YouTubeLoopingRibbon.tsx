'use client';

import React from 'react';

interface YouTubeLoopingRibbonProps {
  className?: string;
  variant?: 'card' | 'hero' | 'full';
}

export function YouTubeLoopingRibbon({ className = '', variant = 'card' }: YouTubeLoopingRibbonProps) {
  // Repeating text string for continuous flow
  const ribbonText = "▶ YOUTUBE  •  THUMBNAIL IQ  •  GAZE HEATMAP  •  ATTENTION AI  •  FIRST 500MS  •  CTR LIFT  •  ▶ YOUTUBE  •  NEURAL LENS  •  VISUAL HIERARCHY  •  ▶ YOUTUBE  •  THUMBNAIL IQ  •  ";

  if (variant === 'card') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
        {/* Soft Background Glow */}
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-red-600/20 via-rose-500/10 to-transparent rounded-full blur-3xl opacity-80" />
        
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-full object-cover opacity-45 dark:opacity-35 transition-all duration-700"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Linear Gradients for YouTube Ribbons */}
            <linearGradient id="cardRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="cardRibbonGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            {/* Loop Path Top-Right */}
            <path 
              id="cardPathTopLoop" 
              d="M -100 80 C 150 -40, 320 220, 240 120 C 160 20, 380 -30, 520 140 C 640 280, 780 -60, 920 100" 
              fill="none" 
            />

            {/* Loop Path Bottom-Left */}
            <path 
              id="cardPathBottomLoop" 
              d="M -100 520 C 120 380, 280 660, 380 480 C 480 300, 640 620, 760 460 C 880 300, 950 560, 1100 420" 
              fill="none" 
            />
          </defs>

          {/* TOP RIBBON */}
          {/* Shadow */}
          <use href="#cardPathTopLoop" stroke="#000000" strokeWidth="36" opacity="0.35" filter="blur(5px)" />
          {/* Red Border */}
          <use href="#cardPathTopLoop" stroke="#ef4444" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
          {/* Main Dark Body */}
          <use href="#cardPathTopLoop" stroke="#090d16" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
          {/* Inner Accent Line */}
          <use href="#cardPathTopLoop" stroke="#ef4444" strokeWidth="1" opacity="0.4" strokeDasharray="6 6" />

          {/* Text Along Top Ribbon */}
          <text fill="#ffffff" fontSize="9.5" fontWeight="900" letterSpacing="2.5" className="uppercase font-sans">
            <textPath href="#cardPathTopLoop" startOffset="0%">
              {ribbonText + ribbonText}
              <animate attributeName="startOffset" from="0%" to="-50%" dur="35s" repeatCount="indefinite" />
            </textPath>
          </text>

          {/* BOTTOM RIBBON */}
          {/* Shadow */}
          <use href="#cardPathBottomLoop" stroke="#000000" strokeWidth="36" opacity="0.35" filter="blur(5px)" />
          {/* Red Border */}
          <use href="#cardPathBottomLoop" stroke="#dc2626" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
          {/* Main Dark Body */}
          <use href="#cardPathBottomLoop" stroke="#0f172a" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
          {/* Inner Accent Line */}
          <use href="#cardPathBottomLoop" stroke="#f87171" strokeWidth="1" opacity="0.4" strokeDasharray="6 6" />

          {/* Text Along Bottom Ribbon */}
          <text fill="#ffffff" fontSize="9.5" fontWeight="900" letterSpacing="2.5" className="uppercase font-sans">
            <textPath href="#cardPathBottomLoop" startOffset="-25%">
              {ribbonText + ribbonText}
              <animate attributeName="startOffset" from="-25%" to="25%" dur="40s" repeatCount="indefinite" />
            </textPath>
          </text>
        </svg>
      </div>
    );
  }

  // Full Hero Looping Ribbon Layout (Spans Hero Container Background)
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {/* Soft Ambient Red Glow Halos */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl opacity-70" />

      <svg 
        viewBox="0 0 1400 800" 
        className="w-full h-full object-cover opacity-85 dark:opacity-75 transition-all duration-700"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Full Hero Path 1 - Top Wavy Looping Tape */}
          <path 
            id="heroPathTop" 
            d="M -150 140 C 200 -80, 380 320, 290 160 C 200 0, 480 -40, 640 220 C 800 440, 960 -100, 1150 160 C 1300 320, 1450 -40, 1600 140" 
            fill="none" 
          />

          {/* Full Hero Path 2 - Bottom Wavy Looping Tape */}
          <path 
            id="heroPathBottom" 
            d="M -150 680 C 180 500, 380 860, 520 620 C 660 380, 840 820, 1020 600 C 1200 380, 1350 780, 1600 580" 
            fill="none" 
          />
        </defs>

        {/* TOP HERO RIBBON */}
        {/* Shadow */}
        <use href="#heroPathTop" stroke="#000000" strokeWidth="44" opacity="0.3" filter="blur(7px)" />
        {/* Red Border */}
        <use href="#heroPathTop" stroke="#ef4444" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
        {/* Black Body */}
        <use href="#heroPathTop" stroke="#090d16" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />

        {/* Text Along Top Ribbon */}
        <text fill="#ffffff" fontSize="11" fontWeight="900" letterSpacing="3" className="uppercase font-sans">
          <textPath href="#heroPathTop" startOffset="0%">
            {ribbonText + ribbonText + ribbonText}
            <animate attributeName="startOffset" from="0%" to="-50%" dur="45s" repeatCount="indefinite" />
          </textPath>
        </text>

        {/* BOTTOM HERO RIBBON */}
        {/* Shadow */}
        <use href="#heroPathBottom" stroke="#000000" strokeWidth="44" opacity="0.3" filter="blur(7px)" />
        {/* Red Border */}
        <use href="#heroPathBottom" stroke="#dc2626" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
        {/* Black Body */}
        <use href="#heroPathBottom" stroke="#0f172a" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />

        {/* Text Along Bottom Ribbon */}
        <text fill="#ffffff" fontSize="11" fontWeight="900" letterSpacing="3" className="uppercase font-sans">
          <textPath href="#heroPathBottom" startOffset="-30%">
            {ribbonText + ribbonText + ribbonText}
            <animate attributeName="startOffset" from="-30%" to="20%" dur="50s" repeatCount="indefinite" />
          </textPath>
        </text>
      </svg>
    </div>
  );
}
