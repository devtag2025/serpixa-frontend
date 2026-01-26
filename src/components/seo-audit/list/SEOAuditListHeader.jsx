"use client";
import { HiPlus } from "react-icons/hi";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";
import SEOAuditListStats from "./SEOAuditListStats";
import { useTranslation } from "@/i18n/context";

export default function SEOAuditListHeader({ audits }) {
  const router = useLocalizedRouter();
  const { t } = useTranslation();

  return (
    <div className="border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        {/* Header Card - Responsive layout */}
        <div className="bg-white/90 backdrop-blur-sm shadow-sm rounded-xl p-4 sm:p-4 border border-gray-100 mb-4 sm:mb-6">
          {/* Mobile: Stacked layout, Desktop: Side by side */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
                {t("dashboard.seoAudit.list.title")}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                {t("dashboard.seoAudit.list.subtitle")}
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard/seo-audit/new")}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm"
            >
              <HiPlus className="w-4 h-4" />
              <span>{t("dashboard.common.newAudit")}</span>
            </button>
          </div>
        </div>

        <SEOAuditListStats audits={audits} />
      </div>
    </div>
  );
}

