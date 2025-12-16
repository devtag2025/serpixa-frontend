"use client";
import { HiExternalLink } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function CompetitorsTable({ competitors, keyword }) {
  const { t } = useTranslation();
  if (!keyword || !competitors || competitors.length === 0) return null;

  const competitorsCount = competitors.length;

  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{t("dashboard.seoAudit.view.competitorAnalysis")}</h2>
          <p className="text-sm text-gray-500 mt-1">{t("dashboard.seoAudit.view.topCompetitors")} {Math.min(competitorsCount, 10)} {t("dashboard.seoAudit.view.competitors")}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.rank")}</span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.title")}</span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.domain")}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {competitors.slice(0, 10).map((competitor, index) => (
                <tr key={competitor._id || competitor.position || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50 hover:bg-gray-50 transition-colors"}>
                  <td className="px-6 py-3">
                    <span className="text-sm font-semibold text-primary">#{competitor.position}</span>
                  </td>
                  <td className="px-6 py-3">
                    <a
                      href={competitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-900 hover:text-primary transition-colors line-clamp-2 flex items-start gap-1"
                    >
                      {competitor.title || t("dashboard.seoAudit.view.noTitle")}
                      <HiExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-60" />
                    </a>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-xs text-gray-600 truncate block max-w-[150px]">
                      {competitor.domain || new URL(competitor.url || '').hostname}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

