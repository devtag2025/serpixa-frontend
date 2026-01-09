"use client";
import { HiLightningBolt, HiUsers, HiExclamationCircle } from "react-icons/hi";
import { getScoreColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";

export default function GeoAuditStats({ audit }) {
  const { t } = useTranslation();
  const totalCompetitors = audit.competitors?.length || 0;
  const totalRecommendations = audit.recommendations?.length || 0;
  const napIssuesCount = audit.napIssues?.issues?.length || 0;
  const scoreColors = getScoreColor(audit.localVisibilityScore || 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
      {/* Local Visibility Score Card */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className={`p-1.5 sm:p-2.5 rounded-lg ${scoreColors.bg}`}>
            <HiLightningBolt className={`w-4 h-4 sm:w-5 sm:h-5 ${scoreColors.text}`} />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.visibilityScore")}</span>
        </div>
        <div className="flex items-baseline gap-1 sm:gap-2 mb-2">
          <span className={`text-xl sm:text-2xl lg:text-3xl font-bold ${scoreColors.text}`}>{audit.localVisibilityScore || 0}</span>
          <span className="text-sm sm:text-base lg:text-lg text-gray-400">/ 100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`${scoreColors.dot} h-1.5 rounded-full transition-all duration-500`}
            style={{ width: `${audit.localVisibilityScore || 0}%` }}
          ></div>
        </div>
      </div>

      {/* Total Competitors Card */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2.5 rounded-lg bg-purple-50">
            <HiUsers className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.competitors")}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{totalCompetitors}</span>
        </div>
      </div>

      {/* NAP Issues Card */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2.5 rounded-lg bg-red-50">
            <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.napIssues")}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{napIssuesCount}</span>
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm col-span-2 lg:col-span-1">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2.5 rounded-lg bg-blue-50">
            <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.recommendations")}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{totalRecommendations}</span>
        </div>
      </div>
    </div>
  );
}

