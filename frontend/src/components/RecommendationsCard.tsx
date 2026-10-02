'use client';

import React from 'react';
import { Sparkles, ArrowRight, Zap, RefreshCw } from 'lucide-react';

interface RecommendationsCardProps {
  recommendations: string[];
  explanationSource?: string;
  onRequestAiExplain?: () => void;
  isLoadingAi?: boolean;
}

export function RecommendationsCard({
  recommendations,
  explanationSource,
  onRequestAiExplain,
  isLoadingAi,
}: RecommendationsCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Actionable Recommendations</h3>
            <p className="text-[11px] text-slate-500">Fix competing elements & enhance scan path</p>
          </div>
        </div>

        {explanationSource && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {explanationSource === 'rule_based' ? 'Rule-Based Engine' : 'AI Explanation'}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 p-3.5 rounded-xl bg-gradient-to-r from-amber-50/50 to-orange-50/30 border border-amber-200/60 text-xs sm:text-sm text-slate-800"
          >
            <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <p className="leading-relaxed">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
