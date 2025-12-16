"use client";
import { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "./locales/en.json";
import frTranslations from "./locales/fr.json";
import nlTranslations from "./locales/nl.json";
import nlBeTranslations from "./locales/nl-be.json";
import beFrTranslations from "./locales/be-fr.json";

const translationsMap = {
  en: enTranslations,
  fr: frTranslations,
  nl: nlTranslations,
  'nl-be': nlBeTranslations,
  'be-fr': beFrTranslations,
};

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
  
  // Get translations synchronously from the map
  const translations = translationsMap[locale] || translationsMap.en;

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
    }
  };

  return (
    <I18nContext.Provider value={{ locale, translations, changeLocale }}>
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
  const { translations } = useI18n();

  const t = (key, params = {}) => {
    if (!translations || Object.keys(translations).length === 0) {
      return key;
    }

    const keys = key.split(".");
    let value = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Log missing translation in development
        if (process.env.NODE_ENV === "development") {
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

  return { t };
}

