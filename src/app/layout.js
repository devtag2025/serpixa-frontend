import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

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

/**
 * Root Layout - Provides HTML structure with dynamic locale
 * All UI components (Navbar, Footer) are in [locale]/layout.js
 */
export default async function RootLayout({ children }) {
  // Get locale from header set by middleware
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
