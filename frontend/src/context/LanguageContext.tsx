'use client';

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Language, translations, translateDomText } from '@/lib/translations';

type TranslationKeys = typeof translations.en;
type TranslationFunction = ((key: string) => string) & TranslationKeys;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const isTranslatingRef = useRef(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Perform whole-document DOM translation
  const applyDomTranslation = useCallback((targetLang: Language) => {
    if (typeof document === 'undefined') return;
    if (isTranslatingRef.current) return;
    isTranslatingRef.current = true;

    try {
      // 1. Update HTML document language tag
      document.documentElement.lang = targetLang;

      // 2. Walk all text nodes in document.body
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toLowerCase();
            // Skip code, pre, script, style, and elements marked notranslate
            if (
              tag === 'script' ||
              tag === 'style' ||
              tag === 'noscript' ||
              tag === 'code' ||
              parent.classList.contains('notranslate') ||
              parent.closest('.notranslate')
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      let currentNode: Node | null;
      while ((currentNode = walker.nextNode())) {
        const textNode = currentNode as Text & { __origText?: string };
        const currentVal = textNode.nodeValue || '';
        if (!currentVal.trim()) continue;

        // Cache original text when first seen
        if (textNode.__origText === undefined) {
          textNode.__origText = currentVal;
        }

        if (targetLang === 'en') {
          if (textNode.__origText !== undefined && textNode.nodeValue !== textNode.__origText) {
            textNode.nodeValue = textNode.__origText;
          }
        } else {
          const original = textNode.__origText;
          const translated = translateDomText(original, targetLang);
          if (translated && translated !== textNode.nodeValue) {
            textNode.nodeValue = translated;
          }
        }
      }

      // 3. Translate form placeholders and title attributes
      const inputsAndTitles = document.querySelectorAll<HTMLElement>(
        'input[placeholder], textarea[placeholder], [title], [aria-label]'
      );

      inputsAndTitles.forEach((el) => {
        const customEl = el as HTMLElement & {
          __origPlaceholder?: string;
          __origTitle?: string;
          __origAriaLabel?: string;
        };

        // Inputs / Textareas
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          if (el.placeholder) {
            if (customEl.__origPlaceholder === undefined) {
              customEl.__origPlaceholder = el.placeholder;
            }
            if (targetLang === 'en') {
              el.placeholder = customEl.__origPlaceholder;
            } else {
              el.placeholder = translateDomText(customEl.__origPlaceholder, targetLang);
            }
          }
        }

        // Title tooltips
        if (el.title) {
          if (customEl.__origTitle === undefined) {
            customEl.__origTitle = el.title;
          }
          if (targetLang === 'en') {
            el.title = customEl.__origTitle;
          } else {
            el.title = translateDomText(customEl.__origTitle, targetLang);
          }
        }

        // Aria labels
        const aria = el.getAttribute('aria-label');
        if (aria) {
          if (customEl.__origAriaLabel === undefined) {
            customEl.__origAriaLabel = aria;
          }
          if (targetLang === 'en') {
            el.setAttribute('aria-label', customEl.__origAriaLabel);
          } else {
            el.setAttribute('aria-label', translateDomText(customEl.__origAriaLabel, targetLang));
          }
        }
      });
    } finally {
      // Small timeout before resetting translation lock to avoid MutationObserver echo
      setTimeout(() => {
        isTranslatingRef.current = false;
      }, 50);
    }
  }, []);

  // Initialize language from localStorage or browser preferences
  useEffect(() => {
    const saved = localStorage.getItem('thumbnail_iq_lang') as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
      applyDomTranslation(saved);
    } else {
      const browserLang = navigator.language.slice(0, 2).toLowerCase() as Language;
      if (translations[browserLang]) {
        setLanguageState(browserLang);
        applyDomTranslation(browserLang);
      }
    }
  }, [applyDomTranslation]);

  // Re-run DOM translation whenever language changes
  useEffect(() => {
    applyDomTranslation(language);
  }, [language, applyDomTranslation]);

  // Set up MutationObserver to translate dynamically rendered elements (tabs, modals, cards)
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const observer = new MutationObserver(() => {
      if (isTranslatingRef.current) return;
      if (language === 'en') return;

      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        applyDomTranslation(language);
      }, 60);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [language, applyDomTranslation]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('thumbnail_iq_lang', lang);
    // Immediately apply translation to the DOM
    setTimeout(() => {
      applyDomTranslation(lang);
    }, 10);
  };

  // Translation function that handles dictionary keys as well as arbitrary text
  const tFn = (keyOrText: string): string => {
    if (language === 'en') {
      const enDict = translations.en as Record<string, string>;
      return enDict[keyOrText] || keyOrText;
    }
    const currentDict = (translations[language] || translations.en) as Record<string, string>;
    if (currentDict[keyOrText]) {
      return currentDict[keyOrText];
    }
    return translateDomText(keyOrText, language);
  };

  const tProxy = new Proxy(tFn, {
    get(target, prop: string) {
      if (prop in target) {
        return (target as any)[prop];
      }
      return tFn(prop);
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
