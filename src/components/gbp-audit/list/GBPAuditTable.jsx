"use client";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";
import { HiEye, HiTrash } from "react-icons/hi";
import { getScoreColor } from "@/utils/colors";
import { getStatusColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { formatEuropeanDate } from "@/utils/dateFormatter";

export default function GBPAuditTable({ audits, onDelete }) {
  const router = useLocalizedRouter();
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.common.score")}</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.localSeoAudit.view.business")}</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.gbpAudit.view.recommendations")}</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.common.status")}</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.common.date")}</span>
              </th>
              <th className="px-6 py-3 text-right">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.common.actions")}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {audits.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <p className="text-sm text-gray-500">{t("dashboard.common.noResults")}</p>
                </td>
              </tr>
            ) : (
              audits.map((audit, index) => {
                const scoreColors = getScoreColor(audit.score || 0);
                return (
                  <tr
                    key={audit._id}
                    onClick={() => router.push(`/dashboard/gbp-audit/${audit._id}`)}
                    className={`cursor-pointer transition-colors ${
                      index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${scoreColors.dot}`}></div>
                        <div className={`px-3 py-1.5 rounded-lg font-bold text-lg ${scoreColors.bg} ${scoreColors.text}`}>
                          {audit.score || 0}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{audit.businessName || "—"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{audit.recommendations?.length || 0}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusColor(audit.status)}`}>
                        {audit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {formatEuropeanDate(audit.createdAt, { shortMonth: true })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/gbp-audit/${audit._id}`);
                          }}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title={t("dashboard.gbpAudit.view.viewAudit")}
                        >
                          <HiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(audit._id, e);
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t("dashboard.gbpAudit.view.deleteAudit")}
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

