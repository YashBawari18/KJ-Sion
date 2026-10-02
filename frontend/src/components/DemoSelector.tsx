'use client';

import React from 'react';
import { User, Type, Package, Sparkles } from 'lucide-react';
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
      title: t('demoFaceTitle'),
      subtitle: t('demoFaceSub'),
      path: '/samples/sample_face.jpg',
      icon: User,
      badge: t('demoFaceBadge'),
      badgeColor: 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    },
    {
      id: 'text' as const,
      title: t('demoTextTitle'),
      subtitle: t('demoTextSub'),
      path: '/samples/sample_text.jpg',
      icon: Type,
      badge: t('demoTextBadge'),
      badgeColor: 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    },
    {
      id: 'product' as const,
      title: t('demoProductTitle'),
      subtitle: t('demoProductSub'),
      path: '/samples/sample_product.jpg',
      icon: Package,
      badge: t('demoProductBadge'),
      badgeColor: 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('demoBadge')}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {t('demoHeading')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-1">
          {t('demoSubheading')}
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
              className={`group relative flex flex-col text-left rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 p-4 shadow-sm hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                isLoading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {/* Thumbnail Preview Area */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 mb-3.5 border border-slate-200 dark:border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sample.path}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${sample.badgeColor}`}
                  >
                    {sample.badge}
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {sample.title}
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                {sample.subtitle}
              </p>

              <div className="mt-auto pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 dark:text-slate-500">Target Signal</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  {t('demoActionAnalyze')}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
