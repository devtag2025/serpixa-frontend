import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query-provider";
import ToastProvider from "@/lib/toastProvider";
import { I18nProvider } from "@/i18n/context";
import Navbar from "@/components/layout/Navbar";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import { defaultLocale } from "@/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Serpixa",
  description: "All the tools you need to perfect your SEO and AI visibility",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* CookieYes banner script */}
        <Script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/c4df661fbfc120ea66662be08560fa45/script.js"
          strategy="afterInteractive"
        />
        
        <I18nProvider locale={defaultLocale}>
          <ReactQueryProvider>
            <ToastProvider />
            <Navbar />
            {children}
            <ConditionalFooter />
          </ReactQueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
