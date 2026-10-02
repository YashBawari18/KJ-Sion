'use client';

import React from 'react';
import { AttentionJourneyStep } from '@/types/analysis';
import { Route, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AttentionJourneyCardProps {
  journey: AttentionJourneyStep[];
  selectedStep: number | null;
  onSelectStep: (stepNumber: number | null) => void;
}

export function AttentionJourneyCard({
  journey,
  selectedStep,
  onSelectStep,
}: AttentionJourneyCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xs backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/70 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{t('journeyTitle')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('journeySubtitle')}</p>
          </div>
        </div>

        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {journey.length} Steps Traced
        </span>
      </div>

      <div className="space-y-3">
        {journey.map((item) => {
          const isSelected = selectedStep === item.step;
          return (
            <div
              key={item.step}
              onClick={() => onSelectStep(isSelected ? null : item.step)}
              className={`group cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-sm ring-2 ring-indigo-500/20'
                  : 'border-slate-200/70 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white/60 dark:bg-slate-800/40 hover:bg-slate-50/80 dark:hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'
                  }`}
                >
                  0{item.step}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                      {item.target}
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
        <span>{t('journeyInteractiveNote')}</span>
        <span className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-semibold">
          <Eye className="w-3 h-3" />
          <span>{t('journeyInteractiveTag')}</span>
        </span>
      </div>
    </div>
  );
}
