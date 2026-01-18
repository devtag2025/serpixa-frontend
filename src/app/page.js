import { headers } from "next/headers";
import { redirect } from "next/navigation";

const locales = ["en", "fr", "nl"];
const defaultLocale = "en";

/**
 * Get locale from Accept-Language header
 * Parses the header and returns the best matching locale
 */
function getLocaleFromAcceptLanguage(acceptLanguageHeader) {
  if (!acceptLanguageHeader) return defaultLocale;

  // Parse Accept-Language header (e.g., "fr-FR,fr;q=0.9,en;q=0.8")
  const languages = acceptLanguageHeader.split(",").map(lang => {
    const [code] = lang.split(";");
    return code.trim().toLowerCase();
  });

  // Try to match supported languages
  for (const lang of languages) {
    // Extract base language code (e.g., "fr" from "fr-FR")
    const baseLang = lang.split("-")[0];
    if (locales.includes(baseLang)) {
      return baseLang;
    }
  }

  return defaultLocale;
}

/**
 * Root Page - Handles server-side redirect from / to /{locale}
 * This ensures proper SEO and prevents 404 responses for the root path
 */
export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  const locale = getLocaleFromAcceptLanguage(acceptLanguage);

  // Server-side redirect to the appropriate locale
  redirect(`/${locale}`);
}
