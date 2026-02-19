"use client";
import { HiLightningBolt, HiExclamationCircle, HiLink, HiDocumentText } from "react-icons/hi";
import { getScoreColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";

export default function SEOAuditStats({ audit }) {
  const { t } = useTranslation();
  const scoreColors = getScoreColor(audit.score);
  const totalIssues = audit.recommendations?.length || 0;
  const totalLinks = (audit.checks?.links?.internal || 0) + (audit.checks?.links?.external || 0);
  const brokenLinks = audit.checks?.links?.broken || 0;
  const competitorsCount = audit.competitors?.length || 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
      {/* SEO Score Card */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className={`p-1.5 sm:p-2.5 rounded-lg ${scoreColors.bg}`}>
            <HiLightningBolt className={`w-4 h-4 sm:w-5 sm:h-5 ${scoreColors.text}`} />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.seoScore")}</span>
        </div>
        <div className="flex items-baseline gap-1 sm:gap-2 mb-2">
          <span className={`text-xl sm:text-2xl lg:text-3xl font-bold ${scoreColors.text}`}>{audit.score}</span>
          <span className="text-sm sm:text-base lg:text-lg text-gray-400">/ 100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`${scoreColors.dot} h-1.5 rounded-full transition-all duration-500`}
            style={{ width: `${audit.score}%` }}
          ></div>
        </div>
        {audit.keyword && audit.serpInfo?.location && (
          <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
            {t("dashboard.seoAudit.view.scoreComparedTo", {
              keyword: audit.keyword,
              location: audit.serpInfo.location,
            })}
          </p>
        )}
      </div>

      {/* Total Issues Card */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2.5 rounded-lg bg-red-50">
            <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.totalIssues")}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{totalIssues}</span>
        </div>
      </div>

      {/* Total Links Card */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2.5 rounded-lg bg-blue-50">
            <HiLink className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.totalLinks")}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{totalLinks}</span>
          {brokenLinks > 0 && (
            <span className="text-xs sm:text-sm text-red-600 font-medium">({brokenLinks} {t("dashboard.seoAudit.view.broken")})</span>
          )}
        </div>
      </div>

      {/* Competitors Found Card */}
      {audit.keyword && (
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2.5 rounded-lg bg-purple-50">
              <HiDocumentText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.competitorsLabel")}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{competitorsCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}

