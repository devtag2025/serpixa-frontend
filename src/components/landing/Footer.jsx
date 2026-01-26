"use client";
import LocalizedLink from "@/components/common/LocalizedLink";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { removeLocaleFromPath } from "@/utils/localizedLinks";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useTranslation();

  // Hide footer on dashboard pages (check pathname without locale)
  const pathWithoutLocale = pathname ? removeLocaleFromPath(pathname) : "";
  if (pathWithoutLocale?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="relative py-12 px-4 overflow-hidden">
      {/* Background - Similar to Hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600" />
      
      {/* Dot Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* White-to-transparent Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:flex-1 md:max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 flex-shrink-0">
                <Image
                  src="/serpixa-icon.png"
                  alt="Serpixa"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">Serpixa</span>
            </div>
            <p className="text-white/90 text-sm mb-4">
              {t("landing.footer.description")}
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.tiktok.com/@serpixa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/serpixa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/serpixa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Section - Grouped together */}
          <div className="flex flex-row gap-6 sm:gap-8 md:gap-12">
            {/* Quick Links */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                {t("landing.footer.quickLinks")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <LocalizedLink href="/" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.home")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink href="/why-serpixa" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.whySerpixa")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink href="/about-us" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.aboutUs")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink href="/features" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.features")}
                  </LocalizedLink>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                {t("landing.footer.products")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <LocalizedLink href="/dashboard/seo-audit" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.seoAudit")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink href="/dashboard/gbp-audit" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.gbpAudit")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink href="/dashboard/local-seo" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.localSeoAudit")}
                  </LocalizedLink>
                </li>
                <li>
                  <LocalizedLink href="/dashboard/ai-content" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.aiContent")}
                  </LocalizedLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 md:gap-6">
            <p className="text-white/70 text-xs text-left">
              {t("landing.footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <LocalizedLink href="/terms" className="text-white/70 hover:text-white text-xs transition-colors">
                {t("landing.footer.terms")}
              </LocalizedLink>
              <LocalizedLink href="/privacy" className="text-white/70 hover:text-white text-xs transition-colors">
                {t("landing.footer.privacy")}
              </LocalizedLink>
              <LocalizedLink href="/cookies" className="text-white/70 hover:text-white text-xs transition-colors">
                {t("landing.footer.cookies")}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

