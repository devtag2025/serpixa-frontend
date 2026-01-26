import { Geist, Geist_Mono } from "next/font/google";
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
  icons: {
    icon: '/serpixa-icon.png',
    shortcut: '/serpixa-icon.png',
    apple: '/serpixa-icon.png',
  },
  openGraph: {
    images: ['/serpixa-logo.png'],
  },
};

/**
 * Root Layout - Provides HTML structure
 * Locale-agnostic - does not depend on middleware headers
 * Locale-specific rendering happens in [locale]/layout.js
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
