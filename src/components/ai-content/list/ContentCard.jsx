"use client";
import { HiEye, HiTrash, HiDocumentText } from "react-icons/hi";
import { getScoreColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { formatEuropeanDate } from "@/utils/dateFormatter";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";

/**
 * ContentCard - Individual card component for mobile/tablet view
 * Displays AI content information in a compact, touch-friendly card format
 * 
 * @param {Object} content - The content data object
 * @param {Function} onDelete - Callback function for delete action
 */
export default function ContentCard({ content, onDelete }) {
  const { t } = useTranslation();
  const router = useLocalizedRouter();
  
  const scoreColors = getScoreColor(content.seoScore || 75);

  const handleCardClick = () => {
    router.push(`/dashboard/ai-content/${content._id}`);
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    router.push(`/dashboard/ai-content/${content._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(content._id, e);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99]"
    >
      {/* Card Header - Score and Locale */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {/* Score Badge */}
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${scoreColors.dot}`} />
          <div className={`px-3 py-1.5 rounded-lg font-bold text-xl ${scoreColors.bg} ${scoreColors.text}`}>
            {content.seoScore || 75}
          </div>
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            {t("dashboard.common.score")}
          </span>
        </div>
        
        {/* Locale Badge */}
        <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 uppercase">
          {content.locale}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Keyword */}
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
            {t("dashboard.aiContent.view.keyword")}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {content.keyword || "—"}
          </span>
        </div>

        {/* Word Count and Date Row */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
              {t("dashboard.aiContent.view.wordCount")}
            </span>
            <div className="flex items-center gap-1.5">
              <HiDocumentText className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {content.wordCount || 0}
              </span>
            </div>
          </div>

          {/* Date */}
          <div className="text-right">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
              {t("dashboard.common.date")}
            </span>
            <span className="text-sm text-gray-600">
              {formatEuropeanDate(content.createdAt, { shortMonth: true })}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer - Actions */}
      <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
        <button
          onClick={handleViewClick}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          aria-label={t("dashboard.common.view")}
        >
          <HiEye className="w-4 h-4" />
          <span className="hidden xs:inline">{t("dashboard.common.view")}</span>
        </button>
        <button
          onClick={handleDeleteClick}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label={t("dashboard.common.delete")}
        >
          <HiTrash className="w-4 h-4" />
          <span className="hidden xs:inline">{t("dashboard.common.delete")}</span>
        </button>
      </div>
    </div>
  );
}
