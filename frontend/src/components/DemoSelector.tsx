'use client';

import React from 'react';
import { User, Type, Package, Sparkles } from 'lucide-react';

interface DemoSelectorProps {
  onSelectSample: (sampleId: 'face' | 'text' | 'product', imagePath: string) => void;
  isLoading: boolean;
}

export function DemoSelector({ onSelectSample, isLoading }: DemoSelectorProps) {
  const samples = [
    {
      id: 'face' as const,
      title: 'Face-Heavy Subject',
      subtitle: 'Shocked reaction face with high-contrast text banner',
      expectedHighlight: 'Eye fixation & facial emotion saliency dominance',
      path: '/samples/sample_face.jpg',
      icon: User,
      badge: 'Face Dominant',
      gradient: 'from-purple-500/20 to-pink-500/10',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    {
      id: 'text' as const,
      title: 'Text-Heavy Headline',
      subtitle: 'High-contrast typography with system checklist badges',
      expectedHighlight: 'High text frequency & luminance edge scanpaths',
      path: '/samples/sample_text.jpg',
      icon: Type,
      badge: 'Typography Dominant',
      gradient: 'from-blue-500/20 to-indigo-500/10',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    {
      id: 'product' as const,
      title: 'Product / Gear Showcase',
      subtitle: 'Center-stage gadget showcase with pedestal rim lighting',
      expectedHighlight: 'Center bias, circular lens reflection & specular highlights',
      path: '/samples/sample_product.jpg',
      icon: Package,
      badge: 'Object / Lighting',
      gradient: 'from-amber-500/20 to-emerald-500/10',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-200'
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Demos</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Try Pre-generated Synthetic Thumbnails
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-1">
          Select one of our 3 diverse test thumbnails. Each thumbnail exercises different CV signals (faces, typography, and object contrast).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {samples.map((sample) => {
          const Icon = sample.icon;
          return (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample.id, sample.path)}
              disabled={isLoading}
              className={`group relative flex flex-col text-left rounded-2xl bg-white border border-slate-200/80 p-4 shadow-xs hover:shadow-md hover:border-indigo-400 transition-all duration-200 hover:-translate-y-0.5 ${
                isLoading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {/* Thumbnail Preview Area */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 mb-3.5 border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sample.path}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sample.badgeColor}`}
                  >
                    {sample.badge}
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-700">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {sample.title}
                </h3>
              </div>

              <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                {sample.subtitle}
              </p>

              <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Target Signal</span>
                <span className="font-medium text-indigo-600">Analyze Sample →</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
