import { getTranslatedSlug, shouldUseTranslatedSlug } from '@/lib/slugMap';

/**
 * Utility functions for handling localized URLs
 */

/**
 * Get the current locale from the pathname
 */
export function getLocaleFromPathname(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const possibleLocale = segments[0];
  const supportedLocales = ['en', 'fr', 'nl'];
  
  if (supportedLocales.includes(possibleLocale)) {
    return possibleLocale;
  }
  
  return 'en'; // default
}

/**
 * Add locale prefix to a path and translate slugs if needed
 * @param {string} path - The path (e.g., "/about-us" or "/features")
 * @param {string} locale - The target locale (en, fr, nl)
 * @returns {string} - The localized path with translated slug if applicable
 */
export function localizePath(path, locale) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If path already starts with a locale, remove it first
  const segments = cleanPath.split('/');
  const supportedLocales = ['en', 'fr', 'nl'];
  if (supportedLocales.includes(segments[0])) {
    segments.shift(); // Remove locale prefix
  }
  
  // Get the first segment (the slug/page name)
  const firstSegment = segments[0] || '';
  
  // Check if this path should use translated slugs (marketing/legal pages)
  if (firstSegment && shouldUseTranslatedSlug(firstSegment)) {
    // Get translated slug for this locale
    const translatedSlug = getTranslatedSlug(firstSegment, locale);
    if (translatedSlug) {
      segments[0] = translatedSlug;
    }
  }
  
  // Add locale prefix
  return `/${locale}${segments.length > 0 ? '/' + segments.join('/') : ''}`;
}

/**
 * Remove locale prefix from a path
 */
export function removeLocaleFromPath(path) {
  const segments = path.split('/').filter(Boolean);
  const supportedLocales = ['en', 'fr', 'nl'];
  
  if (segments.length > 0 && supportedLocales.includes(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }
  
  return path;
}
