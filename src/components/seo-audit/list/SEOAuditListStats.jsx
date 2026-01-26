"use client";
import { HiDocumentReport, HiLightningBolt, HiExclamationCircle, HiClock } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function SEOAuditListStats({ audits }) {
  const { t } = useTranslation();
  const totalAudits = audits.length;
  const avgScore = audits.length > 0
    ? Math.round(audits.reduce((sum, a) => sum + (a.score || 0), 0) / audits.length)
    : 0;
  const totalIssues = audits.reduce((sum, a) => sum + (a.recommendations?.length || 0), 0);
  const completedAudits = audits.filter((a) => a.status === "completed").length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
          <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50">
            <HiDocumentReport className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide leading-tight">{t("dashboard.seoAudit.list.totalAudits")}</span>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalAudits}</p>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
          <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50">
            <HiLightningBolt className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide leading-tight">{t("dashboard.seoAudit.list.avgScore")}</span>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">{avgScore}</p>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
          <div className="p-1.5 sm:p-2 rounded-lg bg-red-50">
            <HiExclamationCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide leading-tight">{t("dashboard.seoAudit.list.totalIssues")}</span>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalIssues}</p>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
          <div className="p-1.5 sm:p-2 rounded-lg bg-purple-50">
            <HiClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide leading-tight">{t("dashboard.seoAudit.list.completed")}</span>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">{completedAudits}</p>
      </div>
    </div>
  );
}

