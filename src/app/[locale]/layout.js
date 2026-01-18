import Script from "next/script";
import { notFound } from "next/navigation";
import ReactQueryProvider from "@/lib/react-query-provider";
import ToastProvider from "@/lib/toastProvider";
import { I18nProvider } from "@/i18n/context";
import TranslationBlocker from "@/components/common/TranslationBlocker";
import Navbar from "@/components/layout/Navbar";
import ConditionalFooter from "@/components/layout/ConditionalFooter";

const locales = ["en", "fr", "nl"];

export const metadata = {
  title: "Serpixa",
  description: "All the tools you need to perfect your SEO and AI visibility",
};

export default async function LocaleLayout({ children, params }) {
  // In Next.js 15, params is a Promise and must be awaited
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';
  
  // Validate locale - return 404 for invalid locales
  if (!locales.includes(locale)) {
    notFound();
  }
  
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
      
      <I18nProvider locale={locale}>
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
