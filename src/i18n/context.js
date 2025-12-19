"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

// Lazy-load translation files - only load what's needed
const translationLoaders = {
  en: () => import("./locales/en.json"),
  fr: () => import("./locales/fr.json"),
  nl: () => import("./locales/nl.json"),
  'nl-be': () => import("./locales/nl-be.json"),
  'be-fr': () => import("./locales/be-fr.json"),
};

// Cache for loaded translations
const translationsCache = {};

const I18nContext = createContext();

export function I18nProvider({ children, locale: initialLocale = "en" }) {
  // Initialize locale from localStorage if available (client-side only)
  const getInitialLocale = () => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale");
      return savedLocale || initialLocale;
    }
    return initialLocale;
  };

  const [locale, setLocale] = useState(() => getInitialLocale());
  const [translations, setTranslations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for the current locale
  useEffect(() => {
    const loadTranslations = async () => {
      // Check cache first
      if (translationsCache[locale]) {
        setTranslations(translationsCache[locale]);
        setIsLoading(false);
        return;
      }

      // Load from cache or fetch
      try {
        const loader = translationLoaders[locale] || translationLoaders.en;
        const module = await loader();
        const loadedTranslations = module.default || module;
        
        // Cache the translations
        translationsCache[locale] = loadedTranslations;
        setTranslations(loadedTranslations);
      } catch (error) {
        console.error(`Failed to load translations for locale: ${locale}`, error);
        // Fallback to English if available
        if (locale !== 'en' && translationsCache.en) {
          setTranslations(translationsCache.en);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [locale]);

  // Preload English as fallback (non-blocking)
  useEffect(() => {
    if (!translationsCache.en) {
      translationLoaders.en().then((module) => {
        translationsCache.en = module.default || module;
      });
    }
  }, []);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    setIsLoading(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }
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

