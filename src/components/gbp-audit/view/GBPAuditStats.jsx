"use client";
import { HiLightningBolt, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { getScoreColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";

export default function GBPAuditStats({ audit }) {
  const { t } = useTranslation();
  const scoreColors = getScoreColor(audit.score || 0);
  const totalRecommendations = audit.recommendations?.length || 0;
  const completedItems = audit.checklist?.filter((item) => item.completed).length || 0;
  const totalItems = audit.checklist?.length || 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-8">
      {/* Optimization Score Card */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className={`p-1.5 sm:p-2.5 rounded-lg flex-shrink-0 ${scoreColors.bg}`}>
            <HiLightningBolt className={`w-4 h-4 sm:w-5 sm:h-5 ${scoreColors.text}`} />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 leading-tight line-clamp-2">{t("dashboard.gbpAudit.view.optimizationScore")}</span>
        </div>
        <div className="flex items-baseline gap-1 sm:gap-2 mb-2">
          <span className={`text-xl sm:text-2xl lg:text-3xl font-bold ${scoreColors.text}`}>{audit.score || 0}</span>
          <span className="text-sm sm:text-base lg:text-lg text-gray-400">/ 100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`${scoreColors.dot} h-1.5 rounded-full transition-all duration-500`}
            style={{ width: `${audit.score || 0}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist Progress Card */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2.5 rounded-lg bg-blue-50 flex-shrink-0">
            <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 leading-tight line-clamp-2">{t("dashboard.gbpAudit.view.checklist")}</span>
        </div>
        <div className="flex items-baseline gap-1 sm:gap-2">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{completedItems}</span>
          <span className="text-sm sm:text-base lg:text-lg text-gray-400">/ {totalItems}</span>
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-1.5 sm:p-2.5 rounded-lg bg-red-50 flex-shrink-0">
            <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 leading-tight line-clamp-2">{t("dashboard.gbpAudit.view.recommendations")}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{totalRecommendations}</span>
        </div>
      </div>

      {/* Rating Card */}
      {audit.businessInfo?.rating && (
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2.5 rounded-lg bg-amber-50 flex-shrink-0">
              <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
            </div>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-500 leading-tight line-clamp-2">{t("dashboard.gbpAudit.view.googleRating")}</span>
          </div>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{audit.businessInfo.rating.toFixed(1)}</span>
            <span className="text-sm sm:text-base lg:text-lg text-gray-400">/ 5.0</span>
          </div>
        </div>
      )}
    </div>
  );
}

