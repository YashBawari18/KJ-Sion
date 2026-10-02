'use client';

import React from 'react';
import { AttentionJourneyStep } from '@/types/analysis';
import { Route, ArrowRight, Eye } from 'lucide-react';

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
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Predicted Attention Journey</h3>
            <p className="text-[11px] text-slate-500">Predicted Sequential Fixation Order</p>
          </div>
        </div>

        <span className="text-xs text-slate-400">
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
              className={`group cursor-pointer rounded-xl border p-3.5 transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-500/20'
                  : 'border-slate-200/70 hover:border-indigo-300 hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                  }`}
                >
                  0{item.step}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {item.target}
                    </h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Click any step to highlight position on image</span>
        <span className="flex items-center space-x-1 text-indigo-600 font-medium">
          <Eye className="w-3 h-3" />
          <span>Interactive</span>
        </span>
      </div>
    </div>
  );
}
