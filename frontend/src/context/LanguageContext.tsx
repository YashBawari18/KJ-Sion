'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, SUPPORTED_LANGUAGES, translations } from '@/lib/translations';

type TranslationKeys = typeof translations.en;
type TranslationFunction = ((key: keyof TranslationKeys) => string) & TranslationKeys;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('thumbnail_iq_lang') as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    } else {
      // Check browser language
      const browserLang = navigator.language.slice(0, 2).toLowerCase() as Language;
      if (translations[browserLang]) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('thumbnail_iq_lang', lang);
  };

  const tFn = (key: keyof TranslationKeys): string => {
    const dict = translations[language] || translations.en;
    return (dict as any)[key] || (translations.en as any)[key] || String(key);
  };

  const tProxy = new Proxy(tFn, {
    get(target, prop: string) {
      if (prop in target) {
        return (target as any)[prop];
      }
      const dict = translations[language] || translations.en;
      return (dict as any)[prop] || (translations.en as any)[prop] || prop;
    },
  }) as TranslationFunction;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: tProxy }}>
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
