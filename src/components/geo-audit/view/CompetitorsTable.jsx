"use client";
import { HiStar, HiExternalLink } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function CompetitorsTable({ competitors }) {
  const { t } = useTranslation();
  if (!competitors || competitors.length === 0) return null;

  // Hide columns that are empty for every competitor
  const hasReviews = competitors.some((c) => c.reviews != null && Number(c.reviews) > 0);
  const hasDistance = competitors.some((c) => c.distance);
  const hasAddress = competitors.some((c) => c.address);
  const hasPhone = competitors.some((c) => c.phone);
  const hasWebsite = competitors.some((c) => c.website);

  return (
    <div className="mb-4 sm:mb-6 bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{t("dashboard.localSeoAudit.view.nearbyCompetitors")}</h2>
      </div>
      
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {competitors.map((competitor, index) => (
          <div
            key={index}
            className={`px-3 sm:px-4 py-3 sm:py-4 bg-white hover:bg-gray-50 transition-colors ${
              index < 3 ? "bg-emerald-50/30" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className={`text-sm font-semibold ${
                index === 0 ? "text-emerald-600" :
                index === 1 ? "text-amber-600" :
                index === 2 ? "text-blue-600" :
                "text-gray-600"
              }`}>
                #{competitor.position || index + 1}
              </span>
              {competitor.rating && (
                <div className="flex items-center gap-1">
                  <HiStar className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-gray-900">{competitor.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {t("dashboard.localSeoAudit.view.name")}
                </p>
                <p className="text-sm font-medium text-gray-900">{competitor.name || "—"}</p>
              </div>
              {(hasReviews || competitor.distance || competitor.address || competitor.phone || competitor.website) && (
                <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
                  {hasReviews && (
                    <div>
                      <span className="text-gray-500">{t("dashboard.localSeoAudit.view.reviews")}: </span>
                      <span className="text-gray-700">{competitor.reviews ?? 0}</span>
                    </div>
                  )}
                  {competitor.distance && (
                    <div>
                      <span className="text-gray-500">{t("dashboard.localSeoAudit.view.distance")}: </span>
                      <span className="text-gray-700">{competitor.distance}</span>
                    </div>
                  )}
                  {competitor.address && (
                    <div>
                      <span className="text-gray-500">{t("dashboard.localSeoAudit.view.address")}: </span>
                      <span className="text-gray-700 break-words">{competitor.address}</span>
                    </div>
                  )}
                  {competitor.phone && (
                    <div>
                      <span className="text-gray-500">{t("dashboard.localSeoAudit.view.phone")}: </span>
                      <span className="text-gray-700">{competitor.phone}</span>
                    </div>
                  )}
                  {competitor.website && (
                    <div>
                      <a
                        href={competitor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("dashboard.localSeoAudit.view.visit")}
                        <HiExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View - only show columns that have data */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-0">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.rank")}</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.name")}</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.rating")}</th>
              {hasReviews && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.reviews")}</th>}
              {hasDistance && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.distance")}</th>}
              {hasAddress && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.address")}</th>}
              {hasPhone && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.phone")}</th>}
              {hasWebsite && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.website")}</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {competitors.map((competitor, index) => (
              <tr
                key={index}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-50"
                } ${index < 3 ? "bg-emerald-50/30" : ""}`}
              >
                <td className="px-6 py-4">
                  <span className={`text-sm font-semibold ${
                    index === 0 ? "text-emerald-600" :
                    index === 1 ? "text-amber-600" :
                    index === 2 ? "text-blue-600" :
                    "text-gray-600"
                  }`}>
                    #{competitor.position || index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{competitor.name || "—"}</span>
                </td>
                <td className="px-6 py-4">
                  {competitor.rating ? (
                    <div className="flex items-center gap-1">
                      <HiStar className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-900">{competitor.rating.toFixed(1)}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                {hasReviews && (
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{competitor.reviews ?? 0}</span>
                  </td>
                )}
                {hasDistance && (
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{competitor.distance || "—"}</span>
                  </td>
                )}
                {hasAddress && (
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 break-words">{competitor.address || "—"}</span>
                  </td>
                )}
                {hasPhone && (
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{competitor.phone || "—"}</span>
                  </td>
                )}
                {hasWebsite && (
                  <td className="px-6 py-4">
                    {competitor.website ? (
                      <a
                        href={competitor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("dashboard.localSeoAudit.view.visit")}
                        <HiExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

