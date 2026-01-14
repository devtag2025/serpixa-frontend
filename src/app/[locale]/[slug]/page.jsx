import { notFound } from "next/navigation";
import { getEnglishSlug } from "@/lib/slugMap";
import { getPageComponent } from "@/lib/pageComponents";

/**
 * Dynamic [slug] route for marketing and legal pages
 * 
 * Handles translated URLs:
 * - /en/features → renders FeaturesPage
 * - /fr/fonctionnalites → renders FeaturesPage
 * - /nl/functionaliteiten → renders FeaturesPage
 */
export default async function SlugPage({ params }) {
  // In Next.js 15, params is a Promise and must be awaited
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';
  const slug = resolvedParams?.slug || '';

  // Map translated slug back to English key
  const englishSlug = getEnglishSlug(slug, locale);

  // If slug is not in slugmap, return 404
  if (!englishSlug) {
    notFound();
  }

  // Get the component for this page
  const PageComponent = getPageComponent(englishSlug);

  // If component doesn't exist, return 404
  if (!PageComponent) {
    notFound();
  }

  // Render the page component (client components can be rendered by server components)
  return <PageComponent />;
}
