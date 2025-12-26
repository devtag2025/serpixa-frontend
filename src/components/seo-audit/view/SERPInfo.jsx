"use client";
import { useTranslation } from "@/i18n/context";

export default function SERPInfo({ serpInfo }) {
  const { t } = useTranslation();
  if (!serpInfo) return null;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{t("dashboard.seoAudit.view.serpInfo")}</h2>
      </div>
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3 lg:space-y-4">
        {serpInfo.location && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.seoAudit.view.location")}</p>
            <p className="text-sm text-gray-900">{serpInfo.location}</p>
          </div>
        )}
        {serpInfo.language && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.seoAudit.view.language")}</p>
            <p className="text-sm text-gray-900">{serpInfo.language}</p>
          </div>
        )}
        {serpInfo.device && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.seoAudit.view.device")}</p>
            <p className="text-sm text-gray-900 capitalize">{serpInfo.device}</p>
          </div>
        )}
        {serpInfo.searchInfo?.seResultsCount && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.seoAudit.view.totalResults")}</p>
            <p className="text-sm text-gray-900">
              {serpInfo.searchInfo.seResultsCount.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

