'use client';

import React from 'react';
import { HelpCircle, CheckCircle, Lightbulb } from 'lucide-react';

interface WhyAnalysisCardProps {
  whyAnalysis: string[];
}

export function WhyAnalysisCard({ whyAnalysis }: WhyAnalysisCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">Why Viewers Look Here</h3>
          <p className="text-[11px] text-slate-500">Heuristic visual psychology drivers</p>
        </div>
      </div>

      <div className="space-y-3">
        {whyAnalysis.map((reason, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs sm:text-sm text-slate-700 leading-relaxed"
          >
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
