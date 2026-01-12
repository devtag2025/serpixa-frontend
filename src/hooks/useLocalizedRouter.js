"use client";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/i18n/context";
import { localizePath, getLocaleFromPathname } from "@/utils/localizedLinks";

/**
 * Hook to get locale-aware navigation functions and current locale
 */
export function useLocalizedRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useI18n();
  
  /**
   * Get localized path for a given route
   */
  const getLocalizedPath = (path) => {
    return localizePath(path, locale);
  };
  
  /**
   * Navigate to a localized path
   */
  const push = (path) => {
    router.push(getLocalizedPath(path));
  };
  
  /**
   * Replace current route with localized path
   */
  const replace = (path) => {
    router.replace(getLocalizedPath(path));
  };
  
  return {
    locale,
    pathname,
    push,
    replace,
    getLocalizedPath,
  };
}
