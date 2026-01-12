"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/landing/Footer";
import { removeLocaleFromPath } from "@/utils/localizedLinks";

// Routes where we don't want to show the marketing footer
const HIDDEN_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/dashboard",
];

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (!pathname) return null;

  // Remove locale prefix to check routes
  const pathWithoutLocale = removeLocaleFromPath(pathname);

  const shouldHide = HIDDEN_ROUTES.some((route) =>
    pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
  );

  if (shouldHide) return null;

  return <Footer />;
}


