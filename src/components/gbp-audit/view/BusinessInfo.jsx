"use client";
import { HiOfficeBuilding, HiLocationMarker, HiPhone, HiGlobe, HiStar, HiClipboardCopy, HiExternalLink, HiClock } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function BusinessInfo({ businessInfo, onCopyToClipboard }) {
  const { t } = useTranslation();
  if (!businessInfo) return null;

  return (
    <div className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{t("dashboard.gbpAudit.view.businessInfo")}</h2>
      </div>
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessInfo.name && (
            <div className="flex items-start gap-3">
              <HiOfficeBuilding className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.gbpAudit.view.name")}</p>
                <p className="text-sm text-gray-900">{businessInfo.name}</p>
              </div>
            </div>
          )}
          {businessInfo.address && (
            <div className="flex items-start gap-3">
              <HiLocationMarker className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.gbpAudit.view.address")}</p>
                <p className="text-sm text-gray-900">{businessInfo.address}</p>
              </div>
            </div>
          )}
          {businessInfo.phone && (
            <div className="flex items-start gap-3">
              <HiPhone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.gbpAudit.view.phone")}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-900">{businessInfo.phone}</p>
                  <button
                    onClick={() => onCopyToClipboard(businessInfo.phone, "Phone")}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title={t("dashboard.geoAudit.view.copyPhone")}
                  >
                    <HiClipboardCopy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {businessInfo.website && (
            <div className="flex items-start gap-3">
              <HiGlobe className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.gbpAudit.view.website")}</p>
                <a
                  href={businessInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
                >
                  {businessInfo.website}
                  <HiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
          {businessInfo.category && (
            <div className="flex items-start gap-3">
              <HiOfficeBuilding className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.gbpAudit.view.primaryCategory")}</p>
                <p className="text-sm text-gray-900">{businessInfo.category}</p>
              </div>
            </div>
          )}
          {businessInfo.additionalCategories && businessInfo.additionalCategories.length > 0 && (
            <div className="flex items-start gap-3">
              <HiOfficeBuilding className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.gbpAudit.view.additionalCategories")}</p>
                <div className="flex flex-wrap gap-1">
                  {businessInfo.additionalCategories.map((cat, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {(businessInfo.rating || businessInfo.reviewCount) && (
            <div className="flex items-start gap-3">
              <HiStar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.gbpAudit.view.ratingAndReviews")}</p>
                <div className="flex items-center gap-2">
                  {businessInfo.rating && (
                    <span className="text-sm font-semibold text-gray-900">
                      {businessInfo.rating.toFixed(1)} / 5.0
                    </span>
                  )}
                  {businessInfo.reviewCount !== undefined && (
                    <span className="text-sm text-gray-600">
                      ({businessInfo.reviewCount} {t("dashboard.geoAudit.view.reviews")})
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          {businessInfo.hours && Object.keys(businessInfo.hours).length > 0 && (
            <div className="flex items-start gap-3">
              <HiClock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.gbpAudit.view.businessHours")}</p>
                <p className="text-sm text-gray-900">{t("dashboard.gbpAudit.view.set")}</p>
              </div>
            </div>
          )}
          {businessInfo.description && (
            <div className="flex items-start gap-3 md:col-span-2 lg:col-span-3">
              <HiOfficeBuilding className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.gbpAudit.view.description")}</p>
                <p className="text-sm text-gray-900">{businessInfo.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

