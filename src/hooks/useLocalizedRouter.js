"use client";
import { useRouter, useParams } from "next/navigation";
import { localizePath } from "@/utils/localizedLinks";

/**
 * A custom hook that wraps Next.js useRouter to automatically add locale prefix
 * to navigation methods (push, replace).
 * 
 * This ensures that programmatic navigation preserves the current locale.
 * 
 * Usage:
 * const router = useLocalizedRouter();
 * router.push("/dashboard/seo-audit"); // Automatically becomes /fr/dashboard/seo-audit if locale is fr
 * 
 * @returns {Object} Router object with localized push and replace methods
 */
export function useLocalizedRouter() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'en';

  return {
    ...router,
    push: (path, options) => router.push(localizePath(path, locale), options),
    replace: (path, options) => router.replace(localizePath(path, locale), options),
    // Expose the locale for convenience
    locale,
  };
}
