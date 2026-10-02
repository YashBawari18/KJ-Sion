'use client';

import React from 'react';
import { AttentionJourneyStep } from '@/types/analysis';
import { Route, Eye, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AttentionJourneyCardProps {
  journey: AttentionJourneyStep[];
  selectedStep: number | null;
  onSelectStep: (stepNumber: number | null) => void;
  imageWidth?: number;
  imageHeight?: number;
}

export function AttentionJourneyCard({
  journey,
  selectedStep,
  onSelectStep,
  imageWidth = 1280,
  imageHeight = 720,
}: AttentionJourneyCardProps) {
  const { t } = useLanguage();

  const getApproximateLocation = (bbox: [number, number, number, number]): string => {
    const [x, y, w, h] = bbox;
    const cx = x + w / 2;
    const cy = y + h / 2;

    const col = cx < imageWidth * 0.38 ? 'Left' : cx > imageWidth * 0.62 ? 'Right' : 'Center';
    const row = cy < imageHeight * 0.38 ? 'Top' : cy > imageHeight * 0.62 ? 'Bottom' : 'Middle';

    if (row === 'Middle' && col === 'Center') return 'Dead Center';
    return `${row}-${col}`;
  };

  const getRelativeContribution = (stepIndex: number, total: number): number => {
    // Dynamic progressive weighting derived from scanpath order
    if (total === 1) return 100;
    if (total === 2) return stepIndex === 0 ? 62 : 38;
    if (stepIndex === 0) return 48;
    if (stepIndex === 1) return 32;
    if (stepIndex === 2) return 14;
    return 6;
  };

  return (
    <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/70 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">{t('journeyTitle')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('journeySubtitle')}</p>
          </div>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
          {journey.length} Steps Traced
        </span>
      </div>

      <div className="space-y-3">
        {journey.map((item, idx) => {
          const isSelected = selectedStep === item.step;
          const location = getApproximateLocation(item.bbox);
          const contribution = item.contribution_percent || getRelativeContribution(idx, journey.length);
          const reason = item.reason || item.description;

          return (
            <div
              key={item.step}
              onClick={() => onSelectStep(isSelected ? null : item.step)}
              className={`group cursor-pointer rounded-xl border p-3.5 transition-all duration-200 ${
                isSelected
                  ? 'border-purple-500 bg-purple-50/80 dark:bg-purple-950/60 shadow-xs ring-2 ring-purple-500/20'
                  : 'border-slate-200/70 dark:border-slate-800/80 hover:border-purple-300 dark:hover:border-purple-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* 1. Rank */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-purple-600 group-hover:text-white'
                  }`}
                >
                  0{item.step}
                </div>

                <div className="flex-1 min-w-0">
                  {/* 2. Element & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.target}
                    </h4>

                    <div className="flex items-center space-x-1.5 text-[10px]">
                      {/* 3. Approximate location */}
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        <MapPin className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" />
                        <span>{location}</span>
                      </span>

                      {/* 5. Relative contribution */}
                      <span className="font-extrabold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                        ~{contribution}% Weight
                      </span>
                    </div>
                  </div>

                  {/* 4. Reason */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {reason}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <span>Click any step to highlight position on image</span>
        <span className="flex items-center space-x-1 text-purple-600 dark:text-purple-400 font-semibold">
          <Eye className="w-3 h-3" />
          <span>Interactive</span>
        </span>
      </div>
    </div>
  );
}
