"use client";
import Link from "next/link";
import { useI18n } from "@/i18n/context";
import { localizePath } from "@/utils/localizedLinks";

/**
 * LocalizedLink - A wrapper around Next.js Link that automatically adds locale prefix
 * 
 * Usage:
 * <LocalizedLink href="/about-us">About Us</LocalizedLink>
 * // Automatically becomes: /en/about-us, /fr/about-us, etc.
 */
export default function LocalizedLink({ href, children, ...props }) {
  const { locale } = useI18n();
  const localizedHref = localizePath(href, locale);
  
  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
