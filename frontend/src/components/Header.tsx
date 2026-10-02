'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Eye, Sparkles, ShieldCheck, Sun, Moon, Globe, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES, Language } from '@/lib/translations';

interface HeaderProps {
  activeTab: 'analyze' | 'demo';
  setActiveTab: (tab: 'analyze' | 'demo') => void;
  backendHealthy: boolean | null;
}

export function Header({ activeTab, setActiveTab, backendHealthy }: HeaderProps) {
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('analyze')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/25 text-white transition-transform hover:scale-105">
            <Eye className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-900 dark:from-white dark:via-indigo-200 dark:to-purple-300 bg-clip-text text-transparent">
                {t('appName')}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
                {t('problemBadge')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              {t('taglineShort')}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-xs">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`flex items-center space-x-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'analyze'
                ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('tabAnalyze')}</span>
          </button>
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex items-center space-x-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'demo'
                ? 'bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t('tabDemo')}</span>
          </button>
        </div>

        {/* Controls: Language, Theme Toggle & System Status */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Scientific Badge */}
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('disclaimerShort')}</span>
          </div>

          {/* Multilingual Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium shadow-xs transition-colors"
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
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                      language === l.code
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{l.flag}</span>
                      <span>{l.nativeName}</span>
                    </span>
                    {language === l.code && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xs transition-all hover:scale-105 active:scale-95"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-fade-in" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 animate-fade-in" />
            )}
          </button>

          {/* Backend Status Indicator */}
          <div
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
              backendHealthy === true
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : backendHealthy === false
                ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
            }`}
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
            <span className="hidden md:inline">
              {backendHealthy === true
                ? t('apiReady')
                : backendHealthy === false
                ? t('apiOffline')
                : t('apiChecking')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
