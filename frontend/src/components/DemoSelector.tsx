'use client';

import React from 'react';
import { User, Type, Package, Sparkles, ArrowRight, Loader2, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DemoSelectorProps {
  onSelectSample: (sampleId: 'face' | 'text' | 'product', imagePath: string) => void;
  isLoading: boolean;
}

export function DemoSelector({ onSelectSample, isLoading }: DemoSelectorProps) {
  const { t } = useLanguage();

  const samples = [
    {
      id: 'face' as const,
      title: 'Face-Heavy Subject',
      subtitle: 'Shocked reaction face with high-contrast neon rim lighting and emotional gaze anchor.',
      path: '/samples/sample_face.jpg',
      icon: User,
      badge: 'Face Dominant',
      focusSignal: 'YuNet Deep Learning Face DNN',
      expectedFocus: 'Primary Fixation: Expressive Face',
      badgeColor: 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      gradientGlow: 'group-hover:border-purple-500 group-hover:shadow-purple-500/20'
    },
    {
      id: 'text' as const,
      title: 'Text-Heavy Headline',
      subtitle: 'Massive 3D vibrant typography ("DO NOT BUY") with strong luminance edge contrast.',
      path: '/samples/sample_text.jpg',
      icon: Type,
      badge: 'Typography Dominant',
      focusSignal: 'Stroke Width & Contrast Gradient',
      expectedFocus: 'Primary Fixation: 3D Headline',
      badgeColor: 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      gradientGlow: 'group-hover:border-blue-500 group-hover:shadow-blue-500/20'
    },
    {
      id: 'product' as const,
      title: 'Product / Gear Showcase',
      subtitle: 'Centered mirrorless camera gear on illuminated pedestal with cinematic rim haze.',
      path: '/samples/sample_product.jpg',
      icon: Package,
      badge: 'Object / Lighting',
      focusSignal: 'Specular Highlights & Central Framing',
      expectedFocus: 'Primary Fixation: Camera & Lens',
      badgeColor: 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      gradientGlow: 'group-hover:border-amber-500 group-hover:shadow-amber-500/20'
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Demo Gallery</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Test Diverse YouTube Thumbnail Archetypes
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-1.5">
          Select any sample below to run our multi-signal computer vision engine in real-time. Notice how each archetype shifts the visual attention hotspots and scanpath order.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {samples.map((sample) => {
          const Icon = sample.icon;
          return (
            <div
              key={sample.id}
              onClick={() => !isLoading && onSelectSample(sample.id, sample.path)}
              className={`group relative flex flex-col text-left rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-4 shadow-sm hover:shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 cursor-pointer ${sample.gradientGlow} ${
                isLoading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {/* Thumbnail Preview Area with High-Res Image */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 mb-3.5 border border-slate-200 dark:border-slate-800 shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sample.path}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Archetype Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border shadow-xs backdrop-blur-md ${sample.badgeColor}`}
                  >
                    {sample.badge}
                  </span>
                </div>

                {/* Duration Badge Simulation */}
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-white text-[9px] font-black tracking-tight shadow-xs">
                  12:45
                </div>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {sample.title}
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                {sample.subtitle}
              </p>

              {/* Diagnostic Focus Highlight */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-3.5 space-y-1">
                <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>{sample.expectedFocus}</span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Engine: {sample.focusSignal}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Ready to test</span>
                <span className="inline-flex items-center space-x-1 font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze Archetype</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
