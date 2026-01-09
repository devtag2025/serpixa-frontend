"use client";
import { getPriorityColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";

export default function RecommendationsTable({ recommendations }) {
  const { t } = useTranslation();
  if (!recommendations || recommendations.length === 0) return null;

  // Translate priority levels to current locale
  const getTranslatedPriority = (priority) => {
    const priorityMap = {
      critical: t("dashboard.seoAudit.view.critical"),
      high: t("dashboard.seoAudit.view.high"),
      medium: t("dashboard.seoAudit.view.medium"),
      low: t("dashboard.seoAudit.view.low"),
    };
    return priorityMap[priority] || priority;
  };

  return (
    <div className="mb-4 sm:mb-6 bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{t("dashboard.localSeoAudit.view.recommendations")}</h2>
      </div>
      
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {recommendations.map((rec, index) => {
          const priorityColors = getPriorityColor(rec.priority);
          return (
            <div
              key={index}
              className="px-3 sm:px-4 py-3 sm:py-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${priorityColors.badge}`}>
                  {getTranslatedPriority(rec.priority)}
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("dashboard.seoAudit.view.issue")}
                  </p>
                  <p className="text-sm font-medium text-gray-900">{rec.issue || "—"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {t("dashboard.seoAudit.view.action")}
                  </p>
                  <p className="text-sm text-gray-700">{rec.action || "—"}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.severity")}</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.issue")}</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.action")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recommendations.map((rec, index) => {
              const priorityColors = getPriorityColor(rec.priority);
              return (
                <tr
                  key={index}
                  className={`transition-colors ${
                    index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${priorityColors.badge}`}>
                      {getTranslatedPriority(rec.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{rec.issue || "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{rec.action || "—"}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

