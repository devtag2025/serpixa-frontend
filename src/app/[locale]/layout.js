import Script from "next/script";
import { notFound } from "next/navigation";
import ReactQueryProvider from "@/lib/react-query-provider";
import ToastProvider from "@/lib/toastProvider";
import { I18nProvider } from "@/i18n/context";
import TranslationBlocker from "@/components/common/TranslationBlocker";
import Navbar from "@/components/layout/Navbar";
import ConditionalFooter from "@/components/layout/ConditionalFooter";

// Import translations for server-side rendering
import enTranslations from "@/i18n/locales/en.json";
import frTranslations from "@/i18n/locales/fr.json";
import nlTranslations from "@/i18n/locales/nl.json";

const locales = ["en", "fr", "nl"];

const translationsMap = {
  en: enTranslations,
  fr: frTranslations,
  nl: nlTranslations,
};

export const metadata = {
  title: "Serpixa",
  description: "All the tools you need to perfect your SEO and AI visibility",
  icons: {
    icon: '/serpixa-icon.png',
    shortcut: '/serpixa-icon.png',
    apple: '/serpixa-icon.png',
  },
};

export default async function LocaleLayout({ children, params }) {
  // In Next.js 15, params is a Promise and must be awaited
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';
  
  // Validate locale - return 404 for invalid locales
  if (!locales.includes(locale)) {
    notFound();
  }
  
  // Get translations for this locale (server-side)
  const initialTranslations = translationsMap[locale] || translationsMap.en;
  
  console.log("[LocaleLayout] Rendered with locale from params:", locale, "resolvedParams:", resolvedParams);

  return (
    <>
      {/* CookieYes banner script */}
      <Script
        id="cookieyes"
        type="text/javascript"
        src="https://cdn-cookieyes.com/client_data/c4df661fbfc120ea66662be08560fa45/script.js"
        strategy="afterInteractive"
      />
      
      <I18nProvider locale={locale} initialTranslations={initialTranslations}>
        <TranslationBlocker>
          <ReactQueryProvider>
            <ToastProvider />
            <Navbar />
            {children}
            <ConditionalFooter />
          </ReactQueryProvider>
        </TranslationBlocker>
      </I18nProvider>
    </>
  );
}
