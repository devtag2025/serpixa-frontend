"use client";
import { useI18n } from "@/i18n/context";
import { useRef, useEffect, useState } from "react";

/**
 * TranslationBlocker - Blocks rendering until translations are loaded
 * Prevents Flash of Untranslated Keys (FOUK)
 * 
 * Only blocks on the client-side during initial load
 * Never blocks during SSR - content must be server-rendered for SEO
 */
export default function TranslationBlocker({ children }) {
  const { isLoading, translations } = useI18n();
  const [isClient, setIsClient] = useState(false);
  const hasEverHadTranslations = useRef(false);

  // Track if we're on the client (after hydration)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track if we've ever had translations
  useEffect(() => {
    if (translations && Object.keys(translations).length > 0) {
      hasEverHadTranslations.current = true;
    }
  }, [translations]);

  // During SSR (when isClient is false), always render children
  // This ensures content is server-rendered for SEO
  if (!isClient) {
    return <>{children}</>;
  }

  // On client-side: Only block on the VERY FIRST load
  // Once we've had translations once, never block again (smooth language switching)
  if (!hasEverHadTranslations.current && isLoading && (!translations || Object.keys(translations).length === 0)) {
    return null;
  }

  return <>{children}</>;
}
