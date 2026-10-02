'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Plus, LayoutTemplate, Globe, Check, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Logo } from '@/components/Logo';
import { SUPPORTED_LANGUAGES, Language } from '@/lib/translations';

export type MainNavPage = 'analyze' | 'demo' | 'compare' | 'battle' | 'guide' | 'results' | 'creator';

interface HeaderProps {
  activeTab: MainNavPage;
  setActiveTab: (tab: MainNavPage) => void;
  hasResult?: boolean;
  onNewAnalysis?: () => void;
}

export function Header({ activeTab, setActiveTab, hasResult, onNewAnalysis }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with Custom Visual Identity */}
        <div
          className="cursor-pointer shrink-0"
          onClick={() => setActiveTab('analyze')}
          title="Thumbnail IQ — Home"
        >
          <Logo size="md" showText={true} />
        </div>

        {/* Center Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-5 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`py-1.5 transition-all cursor-pointer relative ${
              activeTab === 'analyze'
                ? 'text-purple-700 dark:text-purple-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{t('tabAnalyze') || 'Analyze'}</span>
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
              <span>{t('tabResults') || 'Results'}</span>
              {activeTab === 'results' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
              )}
            </button>
          )}

          <button
            onClick={() => setActiveTab('creator')}
            className={`py-1.5 transition-all cursor-pointer relative flex items-center space-x-1.5 ${
              activeTab === 'creator'
                ? 'text-purple-700 dark:text-purple-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>{t('tabCreator') || 'AI Creator'}</span>
            <span className="px-1.5 rounded text-[10px] font-black bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xs">
              AI
            </span>
            {activeTab === 'creator' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('battle')}
            className={`py-1.5 transition-all cursor-pointer relative flex items-center space-x-1.5 ${
              activeTab === 'battle'
                ? 'text-purple-700 dark:text-purple-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{t('tabBattle') || 'Feed Battle'}</span>
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
            <span>{t('tabCompare') || 'Compare'}</span>
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
            <span>{t('tabDemo') || 'Demo'}</span>
            {activeTab === 'demo' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-1.5 transition-all cursor-pointer relative ${
              activeTab === 'guide'
                ? 'text-purple-700 dark:text-purple-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{t('tabGuide') || 'Guide'}</span>
            {activeTab === 'guide' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
            )}
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Language Switcher Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setShowLangMenu((prev) => !prev)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              title="Select Language"
              aria-label="Language selector"
            >
              <span className="text-sm leading-none">{currentLangObj.flag}</span>
              <span className="hidden sm:inline font-mono uppercase text-[11px]">{currentLangObj.code}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-1.5 z-50 animate-fade-in">
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {t('selectLanguage') || 'Select Language'}
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = lang.code === language;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{lang.flag}</span>
                        <div>
                          <span>{lang.nativeName}</span>
                          <span className="text-[10px] text-slate-400 ml-1.5 font-normal">({lang.name})</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

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
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* + New Analysis Button */}
          <button
            onClick={onNewAnalysis || (() => setActiveTab('analyze'))}
            className="inline-flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">{t('btnNewAnalysis') || 'New Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar - horizontally scrollable */}
      <div className="flex md:hidden border-t border-slate-200/60 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-900/90 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 px-2 py-1.5 min-w-max text-xs font-semibold">
          <button
            onClick={() => setActiveTab('analyze')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap ${
              activeTab === 'analyze' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {t('tabAnalyze') || 'Analyze'}
          </button>
          {hasResult && (
            <button
              onClick={() => setActiveTab('results')}
              className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap ${
                activeTab === 'results' ? 'bg-purple-600 text-white' : 'text-purple-600'
              }`}
            >
              {t('tabResults') || 'Results'}
            </button>
          )}
          <button
            onClick={() => setActiveTab('creator')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'creator' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>{t('tabCreator') || 'AI Creator'}</span>
            <span className="text-[9px] font-black bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-1 py-0.5 rounded">
              AI
            </span>
          </button>
          <button
            onClick={() => setActiveTab('battle')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap ${
              activeTab === 'battle' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {t('tabBattle') || 'Battle'}
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap ${
              activeTab === 'compare' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {t('tabCompare') || 'Compare'}
          </button>
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap ${
              activeTab === 'demo' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {t('tabDemo') || 'Demo'}
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg shrink-0 whitespace-nowrap ${
              activeTab === 'guide' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {t('tabGuide') || 'Guide'}
          </button>
        </div>
      </div>
    </header>
  );
}
