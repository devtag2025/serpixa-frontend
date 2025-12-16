/**
 * Maps frontend i18n locale to backend API locale format for AI Content
 * @param {string} i18nLocale - Frontend locale (en, fr, nl, nl-be, be-fr)
 * @returns {string} Backend locale (en-us, fr-fr, nl-nl, nl-be, fr-be)
 */
export function mapI18nLocaleToBackendLocale(i18nLocale) {
  const localeMap = {
    'en': 'en-us',
    'fr': 'fr-fr',
    'nl': 'nl-nl',
    'nl-be': 'nl-be',
    'be-fr': 'fr-be',
  };

  return localeMap[i18nLocale] || 'en-us';
}

/**
 * Maps frontend i18n locale to backend API locale format for SEO/GBP/Geo Audits
 * @param {string} i18nLocale - Frontend locale (en, fr, nl, nl-be, be-fr)
 * @returns {string} Backend locale (en, fr_fr, fr_be, nl_be, nl_nl)
 */
export function mapI18nLocaleToAuditLocale(i18nLocale) {
  const localeMap = {
    'en': 'en',
    'fr': 'fr_fr',
    'nl': 'nl_nl',
    'nl-be': 'nl_be',
    'be-fr': 'fr_be',
  };

  return localeMap[i18nLocale] || 'en';
}

/**
 * Maps frontend i18n locale to Google domain
 * @param {string} i18nLocale - Frontend locale (en, fr, nl, nl-be, be-fr)
 * @returns {string} Google domain (.be, .fr, .nl, or empty string for en)
 */
export function mapI18nLocaleToGoogleDomain(i18nLocale) {
  const domainMap = {
    'en': '', // English - no specific domain
    'fr': '.fr', // France
    'nl': '.nl', // Netherlands
    'nl-be': '.be', // Belgium (Dutch)
    'be-fr': '.be', // Belgium (French)
  };

  return domainMap[i18nLocale] || '';
}

