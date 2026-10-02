'use client';

import React from 'react';
import { Eye, Sparkles, Activity, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyze' | 'demo';
  setActiveTab: (tab: 'analyze' | 'demo') => void;
  backendHealthy: boolean | null;
}

export function Header({ activeTab, setActiveTab, backendHealthy }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
            <Eye className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-900 bg-clip-text text-transparent">
                Thumbnail IQ
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-purple-100 text-purple-800 border border-purple-200/60">
                PS 2 · AI/ML
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Predicted YouTube Attention Heatmap & Diagnostics
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/60">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'analyze'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze</span>
          </button>
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'demo'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Demo Samples</span>
          </button>
        </div>

        {/* System Health & Scientific Badge */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 border border-slate-200 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Predicted Attention (Not Eye Tracking)</span>
          </div>

          <div
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
              backendHealthy === true
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : backendHealthy === false
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
            title={backendHealthy === true ? 'Backend online' : 'Backend offline or connecting'}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                backendHealthy === true
                  ? 'bg-emerald-500 animate-pulse'
                  : backendHealthy === false
                  ? 'bg-rose-500'
                  : 'bg-amber-500 animate-ping'
              }`}
            />
            <span className="hidden sm:inline">
              {backendHealthy === true
                ? 'API Ready'
                : backendHealthy === false
                ? 'API Offline'
                : 'Checking API...'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
