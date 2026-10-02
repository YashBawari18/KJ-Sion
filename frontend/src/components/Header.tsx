'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Eye, Sparkles, Sun, Moon, ChevronDown, Check, GitCompare, BookOpen, Layers } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES, Language } from '@/lib/translations';

export type MainNavPage = 'analyze' | 'demo' | 'compare' | 'guide' | 'results';

interface HeaderProps {
  activeTab: MainNavPage;
  setActiveTab: (tab: MainNavPage) => void;
  hasResult?: boolean;
}

export function Header({ activeTab, setActiveTab, hasResult }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('analyze')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/25 text-white transition-transform hover:scale-105">
            <Eye className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-900 dark:from-white dark:via-indigo-200 dark:to-purple-300 bg-clip-text text-transparent">
              Thumbnail IQ
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              {t('taglineShort')}
            </p>
          </div>
        </div>

        {/* Top-Level Page Navigation */}
        <nav className="hidden md:flex items-center bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'analyze'
                ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze</span>
          </button>

          {hasResult && (
            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'results'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs'
                  : 'text-purple-700 dark:text-purple-300 font-bold hover:bg-purple-100 dark:hover:bg-purple-950/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Results</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('demo')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'demo'
                ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Demo Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'compare'
                ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>A/B Compare</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>How It Works</span>
          </button>
        </nav>

        {/* Controls: Language & Theme Toggle */}
        <div className="flex items-center space-x-2">
          {/* Multilingual Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium shadow-xs transition-colors cursor-pointer"
              title="Select Language"
            >
              <span>{currentLang.flag}</span>
              <span className="hidden sm:inline font-semibold">{currentLang.code.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50 animate-fade-in">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                      language === l.code
                        ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{l.flag}</span>
                      <span>{l.nativeName}</span>
                    </span>
                    {language === l.code && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-fade-in" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 animate-fade-in" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-200/60 dark:border-slate-800/80 px-2 py-1.5 bg-slate-50/90 dark:bg-slate-900/90 text-xs">
        <button
          onClick={() => setActiveTab('analyze')}
          className={`px-2.5 py-1 rounded-lg font-semibold ${activeTab === 'analyze' ? 'bg-purple-600 text-white' : 'text-slate-600'}`}
        >
          Analyze
        </button>
        {hasResult && (
          <button
            onClick={() => setActiveTab('results')}
            className={`px-2.5 py-1 rounded-lg font-semibold ${activeTab === 'results' ? 'bg-purple-600 text-white' : 'text-purple-600 font-bold'}`}
          >
            Results
          </button>
        )}
        <button
          onClick={() => setActiveTab('demo')}
          className={`px-2.5 py-1 rounded-lg font-semibold ${activeTab === 'demo' ? 'bg-purple-600 text-white' : 'text-slate-600'}`}
        >
          Demos
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`px-2.5 py-1 rounded-lg font-semibold ${activeTab === 'compare' ? 'bg-purple-600 text-white' : 'text-slate-600'}`}
        >
          Compare
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-2.5 py-1 rounded-lg font-semibold ${activeTab === 'guide' ? 'bg-purple-600 text-white' : 'text-slate-600'}`}
        >
          Guide
        </button>
      </div>
    </header>
  );
}
