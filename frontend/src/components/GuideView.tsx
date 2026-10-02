'use client';

import React from 'react';
import { Eye, Flame, Layers, Smartphone, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, Zap, Target } from 'lucide-react';

interface GuideViewProps {
  onStartAnalyzing: () => void;
  onExploreDemos: () => void;
}

export function GuideView({ onStartAnalyzing, onExploreDemos }: GuideViewProps) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 animate-fade-in pb-16">
      {/* Hero Header */}
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Platform Methodology & Guide</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          How Predicted Visual Attention Works
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          When YouTube viewers scroll their feed, visual fixations happen in the first <strong>300–500 milliseconds</strong>. Thumbnail IQ simulates this cognitive response using multi-signal computer vision.
        </p>
      </div>

      {/* 3-Step Workflow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-700 dark:text-purple-300 font-black text-sm">
            01
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Multi-Signal Extraction</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The engine analyzes spectral saliency, deep learning face landmarks (YuNet ONNX), high-contrast edge gradients, and luminance variance across your thumbnail.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-black text-sm">
            02
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Attention Fusion Heatmap</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Signals are combined using visual psychology heuristics to generate an attention density heatmap and calculate your predicted scanpath journey.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-pink-700 dark:text-pink-300 font-black text-sm">
            03
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Actionable Optimization</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Receive specific design recommendations, verify small-screen mobile legibility (168px), and upload improved revisions to verify score gains.
          </p>
        </div>
      </div>

      {/* 6 Visual Signal Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs backdrop-blur-md space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">The 6 Core Visual Attention Signals</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            How our heuristic model calculates the AI Attention Score (/100)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-300 font-bold text-xs">
              <Flame className="w-4 h-4" />
              <span>Visual Saliency (35%)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Detects high-frequency luminance and spatial contrast that pop instinctively in peripheral vision.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
              <Eye className="w-4 h-4" />
              <span>Face Fixation (20%)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Human eyes naturally gravitate towards faces, emotional expressions, and eye contact.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300 font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>Typography Weight (15%)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Bold headline size and strong text-to-background contrast establish a cognitive semantic anchor.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-300 font-bold text-xs">
              <Target className="w-4 h-4" />
              <span>Edge Contrast (10%)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Clean separation between the subject and the background prevents visual blending.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center space-x-2 text-pink-700 dark:text-pink-300 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Color Saturation (10%)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Vibrant complementary hues stimulate early cone cells in human visual processing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
              <Layers className="w-4 h-4" />
              <span>Composition & Center (10%)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Central bias and Rule of Thirds alignment guide smooth scanpath transitions.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 border border-purple-200/70 dark:border-purple-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-base">Ready to test your thumbnail?</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Upload your draft image or test our 3 pre-built viral thumbnail archetypes.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onExploreDemos}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-xs cursor-pointer"
          >
            Explore Demos
          </button>
          <button
            onClick={onStartAnalyzing}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Analyze Your Thumbnail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
