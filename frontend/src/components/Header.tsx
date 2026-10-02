'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Eye, Sun, Moon, Plus } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export type MainNavPage = 'analyze' | 'demo' | 'compare' | 'battle' | 'guide' | 'results';

interface HeaderProps {
  activeTab: MainNavPage;
  setActiveTab: (tab: MainNavPage) => void;
  hasResult?: boolean;
  onNewAnalysis?: () => void;
}

export function Header({ activeTab, setActiveTab, hasResult, onNewAnalysis }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with V2.4 AI pill */}
        <div 
          className="flex items-center space-x-2.5 cursor-pointer shrink-0" 
          onClick={() => setActiveTab('analyze')}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/25 text-white">
            <Eye className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
              Thumbnail<span className="text-purple-600 dark:text-purple-400">IQ</span>
            </span>
            <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-[11px] font-bold text-purple-700 dark:text-purple-300">
              V2.4 AI
            </span>
          </div>
        </div>

        {/* Center Navigation Tabs with active underline */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`py-1.5 transition-all cursor-pointer relative ${
              activeTab === 'analyze'
                ? 'text-purple-700 dark:text-purple-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Analyze</span>
            {activeTab === 'analyze' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
            )}
          </button>

          {hasResult && (
            <button
              onClick={() => setActiveTab('results')}
              className={`py-1.5 transition-all cursor-pointer relative flex items-center space-x-1.5 ${
                activeTab === 'results'
                  ? 'text-purple-700 dark:text-purple-300 font-bold'
                  : 'text-purple-600 dark:text-purple-400 hover:text-purple-800 font-medium'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Results</span>
              {activeTab === 'results' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
              )}
            </button>
          )}

          <button
            onClick={() => setActiveTab('battle')}
            className={`py-1.5 transition-all cursor-pointer relative flex items-center space-x-1.5 ${
              activeTab === 'battle'
                ? 'text-purple-700 dark:text-purple-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Feed Battle</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-300/60">
              NEW
            </span>
            {activeTab === 'battle' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`py-1.5 transition-all cursor-pointer relative ${
              activeTab === 'compare'
                ? 'text-purple-700 dark:text-purple-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Compare</span>
            {activeTab === 'compare' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`py-1.5 transition-all cursor-pointer relative ${
              activeTab === 'demo'
                ? 'text-purple-700 dark:text-purple-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Demo</span>
            {activeTab === 'demo' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-1.5 transition-all cursor-pointer relative flex items-center space-x-1 ${
              activeTab === 'guide'
                ? 'text-purple-700 dark:text-purple-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Methodology & Math</span>
            {activeTab === 'guide' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
            )}
          </button>
        </nav>

        {/* Right Controls: Docs, Theme Toggle, + New Analysis Button, Avatar */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('guide')}
            className="hidden sm:inline-block text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer px-2 py-1"
          >
            Docs
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Sun className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* + New Analysis Button */}
          <button
            onClick={onNewAnalysis || (() => setActiveTab('analyze'))}
            className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Analysis</span>
          </button>

          {/* User Profile Avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-200 dark:border-purple-800 shadow-xs shrink-0 cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/samples/sample_face.jpg" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-200/60 dark:border-slate-800/80 px-2 py-1.5 bg-slate-50/90 dark:bg-slate-900/90 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('analyze')}
          className={`px-2.5 py-1 rounded-lg shrink-0 ${activeTab === 'analyze' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Analyze
        </button>
        {hasResult && (
          <button
            onClick={() => setActiveTab('results')}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${activeTab === 'results' ? 'bg-purple-600 text-white' : 'text-purple-600'}`}
          >
            Results
          </button>
        )}
        <button
          onClick={() => setActiveTab('battle')}
          className={`px-2.5 py-1 rounded-lg shrink-0 ${activeTab === 'battle' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Battle
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`px-2.5 py-1 rounded-lg shrink-0 ${activeTab === 'compare' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Compare
        </button>
        <button
          onClick={() => setActiveTab('demo')}
          className={`px-2.5 py-1 rounded-lg shrink-0 ${activeTab === 'demo' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Demo
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-2.5 py-1 rounded-lg shrink-0 ${activeTab === 'guide' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Math & Logic
        </button>
      </div>
    </header>
  );
}
