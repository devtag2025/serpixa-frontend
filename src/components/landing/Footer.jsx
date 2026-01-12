"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/context";
import { HiHome, HiSearch, HiChartBar, HiSparkles } from "react-icons/hi";

export default function Footer() {
  const pathname = usePathname();
  const { t } = useTranslation();

  // Hide footer on dashboard pages
  if (pathname?.startsWith("/dashboard")) {
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
              <HiSparkles className="w-6 h-6 text-white" />
              <span className="text-xl font-bold text-white">Serpixa</span>
            </div>
            <p className="text-white/90 text-sm mb-4">
              {t("landing.footer.description")}
            </p>
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
                  <Link href="/" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.home")}
                  </Link>
                </li>
                <li>
                  <Link href="/why-serpixa" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.whySerpixa")}
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.features")}
                  </Link>
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
                  <Link href="/dashboard/seo-audit" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.seoAudit")}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/gbp-audit" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.gbpAudit")}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/local-seo" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.localSeoAudit")}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/ai-content" className="text-white/80 hover:text-white text-sm transition-colors">
                    {t("landing.footer.aiContent")}
                  </Link>
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
              <Link href="/terms" className="text-white/70 hover:text-white text-xs transition-colors">
                {t("landing.footer.terms")}
              </Link>
              <Link href="/privacy" className="text-white/70 hover:text-white text-xs transition-colors">
                {t("landing.footer.privacy")}
              </Link>
              <Link href="/cookies" className="text-white/70 hover:text-white text-xs transition-colors">
                {t("landing.footer.cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

