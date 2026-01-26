"use client";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";
import { HiEye, HiTrash } from "react-icons/hi";
import { getScoreColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { formatEuropeanDate } from "@/utils/dateFormatter";

export default function ContentTable({ contents, onDelete }) {
  const router = useLocalizedRouter();
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.common.score")}</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.aiContent.view.keyword")}</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.aiContent.view.locale")}</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.aiContent.view.wordCount")}</span>
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
            {contents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <p className="text-sm text-gray-500">{t("dashboard.common.noResults")}</p>
                </td>
              </tr>
            ) : (
              contents.map((content, index) => {
                const scoreColors = getScoreColor(content.seoScore || 75);
                return (
                  <tr
                    key={content._id}
                    onClick={() => router.push(`/dashboard/ai-content/${content._id}`)}
                    className={`cursor-pointer transition-colors ${
                      index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${scoreColors.dot}`}></div>
                        <div className={`px-3 py-1.5 rounded-lg font-bold text-lg ${scoreColors.bg} ${scoreColors.text}`}>
                          {content.seoScore || 75}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{content.keyword}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 uppercase">{content.locale}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{content.wordCount || 0}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {formatEuropeanDate(content.createdAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/ai-content/${content._id}`);
                          }}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                          title={t("dashboard.common.view")}
                        >
                          <HiEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(content._id, e);
                          }}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title={t("dashboard.common.delete")}
                        >
                          <HiTrash className="w-5 h-5" />
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

