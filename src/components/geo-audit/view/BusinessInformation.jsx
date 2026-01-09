"use client";
import { HiLocationMarker, HiPhone, HiGlobe, HiStar, HiOfficeBuilding, HiClipboardCopy, HiExternalLink } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function BusinessInformation({ businessInfo, onCopyToClipboard }) {
  const { t } = useTranslation();
  if (!businessInfo) return null;

  // Check if there's any actual data to display
  const hasData = businessInfo.name || businessInfo.address || businessInfo.phone || 
                  businessInfo.website || businessInfo.rating !== null || 
                  businessInfo.reviews !== null || businessInfo.category;

  return (
    <div className="mb-4 sm:mb-6 bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{t("dashboard.localSeoAudit.view.businessInformation")}</h2>
      </div>
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        {!hasData ? (
          <p className="text-sm text-gray-500 italic">{t("dashboard.localSeoAudit.view.noBusinessInfo") || "No business information available"}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {businessInfo.name && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiOfficeBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.localSeoAudit.view.name")}</p>
                <p className="text-xs sm:text-sm text-gray-900 break-words">{businessInfo.name}</p>
              </div>
            </div>
          )}
          {businessInfo.address && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiLocationMarker className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.localSeoAudit.view.address")}</p>
                <p className="text-xs sm:text-sm text-gray-900 break-words">{businessInfo.address}</p>
              </div>
            </div>
          )}
          {businessInfo.phone && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.localSeoAudit.view.phone")}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm text-gray-900 break-words">{businessInfo.phone}</p>
                  <button
                    onClick={() => onCopyToClipboard(businessInfo.phone, "Phone")}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                    title={t("dashboard.localSeoAudit.view.copyPhone")}
                  >
                    <HiClipboardCopy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {businessInfo.website && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiGlobe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.localSeoAudit.view.website")}</p>
                <a
                  href={businessInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 break-all"
                >
                  {businessInfo.website}
                  <HiExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                </a>
              </div>
            </div>
          )}
          {(businessInfo.rating !== null || businessInfo.reviews !== null) && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiStar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.localSeoAudit.view.ratingAndReviews")}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {businessInfo.rating !== null && (
                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                      {businessInfo.rating.toFixed(1)} / 5.0
                    </span>
                  )}
                  {businessInfo.reviews !== null && (
                    <span className="text-xs sm:text-sm text-gray-600">
                      ({businessInfo.reviews} {t("dashboard.localSeoAudit.view.reviews")})
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          {businessInfo.category && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiOfficeBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.localSeoAudit.view.category")}</p>
                <p className="text-xs sm:text-sm text-gray-900 break-words">{businessInfo.category}</p>
              </div>
            </div>
          )}
          </div>
        )}
      </div>
    </div>
  );
}

