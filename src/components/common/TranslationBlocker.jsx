"use client";
import { useI18n } from "@/i18n/context";
import { useRef, useEffect } from "react";

/**
 * TranslationBlocker - Blocks rendering until translations are loaded
 * Prevents Flash of Untranslated Keys (FOUK)
 * 
 * Only blocks on the very first initial load
 * Never blocks on language switches (since all languages are preloaded)
 */
export default function TranslationBlocker({ children }) {
  const { isLoading, translations } = useI18n();
  const hasEverHadTranslations = useRef(false);

  // Track if we've ever had translations
  useEffect(() => {
    if (translations && Object.keys(translations).length > 0) {
      hasEverHadTranslations.current = true;
    }
  }, [translations]);

  // Only block on the VERY FIRST load (before we've ever had translations)
  // Once we've had translations once, never block again (smooth language switching)
  if (!hasEverHadTranslations.current && isLoading && (!translations || Object.keys(translations).length === 0)) {
    return null;
  }

  return <>{children}</>;
}
