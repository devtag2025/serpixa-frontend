/**
 * Page Components Map
 * 
 * Maps English slug keys to their React components
 * Used by [slug] dynamic route to render the correct page
 */

import AboutUsPage from "@/components/pages/AboutUsPage";
import FeaturesPage from "@/components/pages/FeaturesPage";
import WhySerpixaPage from "@/components/pages/WhySerpixaPage";
import TermsPage from "@/components/pages/TermsPage";
import PrivacyPage from "@/components/pages/PrivacyPage";
import CookiesPage from "@/components/pages/CookiesPage";

export const pageComponents = {
  "about-us": AboutUsPage,
  "features": FeaturesPage,
  "why-serpixa": WhySerpixaPage,
  "terms": TermsPage,
  "privacy": PrivacyPage,
  "cookies": CookiesPage,
};

/**
 * Get page component by English slug key
 * @param {string} englishSlug - The English slug (key)
 * @returns {React.Component|null} - The component or null if not found
 */
export function getPageComponent(englishSlug) {
  return pageComponents[englishSlug] || null;
}
