"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Lazy-load translation files - only load what's needed
const translationLoaders = {
  en: () => import("./locales/en.json"),
  fr: () => import("./locales/fr.json"),
  nl: () => import("./locales/nl.json"),
};

// Cache for loaded translations
const translationsCache = {};

const I18nContext = createContext();

// Supported locales
const supportedLocales = ['en', 'fr', 'nl'];

// Map browser language to supported locale
const getBrowserLocale = () => {
  if (typeof window === "undefined") return null;
  
  // Get browser language (e.g., "fr-FR", "nl-NL", "en-US", "fr", "nl")
  const browserLang = navigator.language || navigator.userLanguage;
  
  if (!browserLang) return null;
  
  // Extract base language code (e.g., "fr" from "fr-FR")
  const baseLang = browserLang.split('-')[0].toLowerCase();
  
  // Check if base language is supported
  if (supportedLocales.includes(baseLang)) {
    return baseLang;
  }
  
  // Check full language code (e.g., "fr-FR", "nl-NL")
  const fullLang = browserLang.toLowerCase();
  if (supportedLocales.includes(fullLang)) {
    return fullLang;
  }
  
  // Try to map common variations
  const langMap = {
    'fr-be': 'fr',
    'nl-be': 'nl',
    'fr-ca': 'fr',
    'fr-ch': 'fr',
    'nl-nl': 'nl',
    'fr-fr': 'fr',
  };
  
  if (langMap[fullLang]) {
    return langMap[fullLang];
  }
  
  return null;
};

export function I18nProvider({ children, locale: initialLocale = "en", initialTranslations = null }) {
  console.log("[I18nProvider] Rendered with initialLocale:", initialLocale);
  
  // Cache initial translations if provided (from server-side)
  if (initialTranslations && !translationsCache[initialLocale]) {
    translationsCache[initialLocale] = initialTranslations;
  }
  
  // Use locale from URL (passed from layout) - sync with prop changes
  const [locale, setLocale] = useState(initialLocale);
  // Initialize translations from prop (server-side) or cache if available (prevents blocking on language switch)
  const [translations, setTranslations] = useState(() => 
    initialTranslations || translationsCache[initialLocale] || null
  );
  const [hasLoadedOnce, setHasLoadedOnce] = useState(!!(initialTranslations || translationsCache[initialLocale]));
  const [isLoading, setIsLoading] = useState(!(initialTranslations || translationsCache[initialLocale]));

  console.log("[I18nProvider] Current locale state:", locale, "initialLocale prop:", initialLocale);

  // Update locale when prop changes (e.g., URL changes from /en/... to /fr/...)
  useEffect(() => {
    if (initialLocale !== locale) {
      console.log("[I18nProvider] Locale prop changed! Updating state:", locale, "->", initialLocale);
      
      // If new locale translations are in cache, set them immediately (no blocking)
      if (translationsCache[initialLocale]) {
        setTranslations(translationsCache[initialLocale]);
        setIsLoading(false);
      }
      
      setLocale(initialLocale);
    }
  }, [initialLocale, locale]);

  // Preload all languages in parallel on mount (Solution 3)
  useEffect(() => {
    console.log("[I18nProvider] Preloading all languages...");
    const preloadAllLanguages = async () => {
      const loadPromises = supportedLocales.map(async (lang) => {
        if (!translationsCache[lang]) {
          try {
            const loader = translationLoaders[lang];
            const module = await loader();
            translationsCache[lang] = module.default || module;
            console.log(`[I18nProvider] Preloaded translations for: ${lang}`);
          } catch (error) {
            console.error(`[I18nProvider] Failed to preload ${lang}:`, error);
          }
        }
      });
      
      await Promise.all(loadPromises);
      console.log("[I18nProvider] All languages preloaded");
    };
    
    preloadAllLanguages();
  }, []); // Only run once on mount

  // Load translations for the current locale
  useEffect(() => {
    console.log("[I18nProvider] Loading translations for locale:", locale);
    
    // Check cache FIRST - if cached, use immediately (synchronous, no loading state)
    if (translationsCache[locale]) {
      console.log("[I18nProvider] Using cached translations for locale:", locale);
      setTranslations(translationsCache[locale]);
      setIsLoading(false);
      if (!hasLoadedOnce) {
        setHasLoadedOnce(true);
      }
      return;
    }

    // Only set loading state on initial load (first time), not on language switches
    // Since all languages are preloaded, they should be in cache when switching
    if (!hasLoadedOnce) {
      setIsLoading(true);
    }
    console.log("[I18nProvider] Fetching translations for locale:", locale);
    
    const loadTranslations = async () => {
      try {
        const loader = translationLoaders[locale] || translationLoaders.en;
        const module = await loader();
        const loadedTranslations = module.default || module;
        
        // Cache the translations
        translationsCache[locale] = loadedTranslations;
        setTranslations(loadedTranslations);
        console.log("[I18nProvider] Successfully loaded translations for locale:", locale);
      } catch (error) {
        console.error(`[I18nProvider] Failed to load translations for locale: ${locale}`, error);
        // Fallback to English if available
        if (locale !== 'en' && translationsCache.en) {
          setTranslations(translationsCache.en);
        }
      } finally {
        setIsLoading(false);
        if (!hasLoadedOnce) {
          setHasLoadedOnce(true);
        }
      }
    };

    loadTranslations();
  }, [locale, hasLoadedOnce]);

  // Change locale by redirecting to new URL (handled by LanguageSwitcher)
  const changeLocale = (newLocale) => {
    // This is a no-op here - language switching is handled by URL changes
    // Keep for backward compatibility but LanguageSwitcher will handle URL changes
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ locale, translations, changeLocale, isLoading }),
    [locale, translations, isLoading]
  );

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

// Helper function to get nested translation
export function useTranslation() {
  const { translations, isLoading } = useI18n();

  const t = (key, params = {}) => {
    // If translations are still loading or not available, return key silently
    // Don't log warnings during loading state
    if (isLoading || !translations || Object.keys(translations).length === 0) {
      return key;
    }

    const keys = key.split(".");
    let value = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Only log warning if translations are fully loaded and have content
        // This prevents false warnings during the initial async load
        const hasTranslations = translations && 
                                typeof translations === "object" && 
                                Object.keys(translations).length > 0 &&
                                !isLoading;
        
        if (process.env.NODE_ENV === "development" && hasTranslations) {
          console.warn(`Translation missing for key: ${key}`);
        }
        return key; // Return key if translation not found
      }
    }

    // Replace params in string
    if (typeof value === "string" && Object.keys(params).length > 0) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }

    return value || key;
  };

  return { t, isLoading };
}
