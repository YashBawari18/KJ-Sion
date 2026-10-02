'use client';

import React, { useState } from 'react';
import { ExplainResponse } from '@/types/analysis';
import { Sparkles, Zap, Loader2, Compass, AlertTriangle, Layers, ChevronDown, ChevronUp } from 'lucide-react';

interface RecommendationsCardProps {
  recommendations: string[];
  explanation?: ExplainResponse | null;
  onRequestAiExplain?: () => void;
  isLoadingAi?: boolean;
}

export function RecommendationsCard({
  recommendations,
  explanation,
  onRequestAiExplain,
  isLoadingAi,
}: RecommendationsCardProps) {
  const [isAiExpanded, setIsAiExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Actionable Recommendations</h3>
            <p className="text-[11px] text-slate-500">Fix competing elements & enhance scan path</p>
          </div>
        </div>

        {onRequestAiExplain && (
          <button
            onClick={onRequestAiExplain}
            disabled={isLoadingAi}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
          >
            {isLoadingAi ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                <span>Consulting AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Deep-Dive AI Explanation</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Deep-Dive AI Explanation Panel (When available) */}
      {explanation && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white border border-indigo-200/80 shadow-xs animate-fade-in space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-900">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>AI Visual Attention Diagnosis</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-indigo-700 border border-indigo-200 shadow-xs">
                {explanation.source === 'ai_gemini'
                  ? 'Google Gemini AI'
                  : explanation.source === 'ai_openai'
                  ? 'OpenAI GPT'
                  : 'Rule-Based Heuristic Engine'}
              </span>
              <button
                onClick={() => setIsAiExpanded(!isAiExpanded)}
                className="text-slate-400 hover:text-slate-600"
              >
                {isAiExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {isAiExpanded && (
            <div className="space-y-2.5 text-xs text-slate-700 pt-1 border-t border-indigo-100/70">
              <div className="p-2.5 rounded-lg bg-white/80 border border-indigo-100">
                <span className="font-semibold text-indigo-950 block mb-0.5">
                  1. Strongest Fixation Area:
                </span>
                <p className="text-slate-600 leading-relaxed">{explanation.strongest_area}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/80 border border-indigo-100">
                <span className="font-semibold text-purple-950 block mb-0.5">
                  2. Secondary Scan Destination:
                </span>
                <p className="text-slate-600 leading-relaxed">{explanation.second_strongest}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-white/80 border border-indigo-100">
                  <span className="font-semibold text-slate-800 flex items-center space-x-1 mb-0.5">
                    <Layers className="w-3 h-3 text-indigo-600" />
                    <span>Visual Hierarchy</span>
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{explanation.visual_hierarchy}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60">
                  <span className="font-semibold text-amber-900 flex items-center space-x-1 mb-0.5">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    <span>Competing & Distractions</span>
                  </span>
                  <p className="text-[11px] text-amber-800 leading-relaxed">{explanation.competing_elements}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actionable Improvement Recommendations */}
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
