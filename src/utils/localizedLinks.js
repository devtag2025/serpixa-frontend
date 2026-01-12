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
 * Add locale prefix to a path
 */
export function localizePath(path, locale) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If path already starts with a locale, replace it
  const segments = cleanPath.split('/');
  const supportedLocales = ['en', 'fr', 'nl'];
  if (supportedLocales.includes(segments[0])) {
    segments[0] = locale;
    return '/' + segments.join('/');
  }
  
  // Add locale prefix
  return `/${locale}${cleanPath ? '/' + cleanPath : ''}`;
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
