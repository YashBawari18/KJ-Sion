'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, translations, translateDomText } from '@/lib/translations';

type TranslationKeys = typeof translations.en;
type TranslationFunction = ((key: string) => string) & TranslationKeys;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Build the translate function for a given language
function buildTranslateFn(lang: Language): TranslationFunction {
  const dict = (translations[lang] ?? translations.en) as Record<string, string>;
  const enDict = translations.en as Record<string, string>;

  const tFn = (keyOrText: string): string => {
    // 1. Direct key match in current language dict
    if (dict[keyOrText]) return dict[keyOrText];
    // 2. Direct key match in English (return English text for en)
    if (lang === 'en') return enDict[keyOrText] ?? keyOrText;
    // 3. Try DOM-level phrase translation as fallback
    const domResult = translateDomText(keyOrText, lang);
    if (domResult && domResult !== keyOrText) return domResult;
    // 4. Return original
    return keyOrText;
  };

  // Proxy lets t['someKey'] work in addition to t('someKey')
  return new Proxy(tFn, {
    get(target, prop: string) {
      if (prop in target) return (target as unknown as Record<string, unknown>)[prop];
      return tFn(prop);
    },
  }) as TranslationFunction;
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('thumbnail_iq_lang') as Language | null;
  if (saved && translations[saved]) return saved;
  const browser = navigator.language.slice(0, 2).toLowerCase() as Language;
  if (translations[browser]) return browser;
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try { return getInitialLanguage(); } catch { return 'en'; }
  });

  // Memoised translate fn — recreated only when language changes
  const t = React.useMemo(() => buildTranslateFn(language), [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem('thumbnail_iq_lang', lang); } catch { /* noop */ }
    // Update <html lang> attribute for accessibility
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
