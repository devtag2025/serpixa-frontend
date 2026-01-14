/**
 * Slug Map for Translated URLs
 * 
 * Maps English slugs to their translations in different locales
 * Used for marketing and legal pages only
 * Dashboard and auth pages keep English slugs
 */

export const slugMap = {
  // Marketing pages
  "about-us": {
    en: "about-us",
    fr: "a-propos",
    nl: "over-ons",
  },
  "features": {
    en: "features",
    fr: "fonctionnalites",
    nl: "functionaliteiten",
  },
  "why-serpixa": {
    en: "why-serpixa",
    fr: "pourquoi-serpixa",
    nl: "waarom-serpixa",
  },
  
  // Legal pages
  "terms": {
    en: "terms",
    fr: "conditions",
    nl: "voorwaarden",
  },
  "privacy": {
    en: "privacy",
    fr: "confidentialite",
    nl: "privacy",
  },
  "cookies": {
    en: "cookies",
    fr: "cookies",
    nl: "cookies",
  },
};

/**
 * Get the translated slug for a given English slug and locale
 * @param {string} englishSlug - The English slug (key)
 * @param {string} locale - The target locale (en, fr, nl)
 * @returns {string|null} - The translated slug or null if not found
 */
export function getTranslatedSlug(englishSlug, locale) {
  if (!slugMap[englishSlug]) return null;
  return slugMap[englishSlug][locale] || slugMap[englishSlug].en;
}

/**
 * Get the English slug from a translated slug
 * Used for reverse lookup (when user visits /fr/fonctionnalites, find "features")
 * @param {string} translatedSlug - The translated slug (e.g., "fonctionnalites")
 * @param {string} locale - The locale of the translated slug
 * @returns {string|null} - The English slug (key) or null if not found
 */
export function getEnglishSlug(translatedSlug, locale) {
  // If locale is English, return as-is
  if (locale === "en") {
    return slugMap[translatedSlug] ? translatedSlug : null;
  }
  
  // Search through slugMap to find the English key
  for (const [englishKey, translations] of Object.entries(slugMap)) {
    if (translations[locale] === translatedSlug) {
      return englishKey;
    }
  }
  
  return null;
}

/**
 * Check if a slug should use translated URLs
 * Returns true for marketing and legal pages, false for dashboard/auth
 */
export function shouldUseTranslatedSlug(slug) {
  return slugMap.hasOwnProperty(slug);
}
