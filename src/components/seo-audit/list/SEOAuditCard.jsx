"use client";
import { HiEye, HiTrash, HiExternalLink } from "react-icons/hi";
import { getScoreColor, getStatusColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { formatEuropeanDate } from "@/utils/dateFormatter";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";

/**
 * SEOAuditCard - Individual card component for mobile/tablet view
 * Displays audit information in a compact, touch-friendly card format
 * 
 * @param {Object} audit - The audit data object
 * @param {Function} onDelete - Callback function for delete action
 * @param {Function} onView - Callback function for view action
 */
export default function SEOAuditCard({ audit, onDelete }) {
  const { t } = useTranslation();
  const router = useLocalizedRouter();
  
  const scoreColors = getScoreColor(audit.score);
  const criticalHighCount = audit.recommendations?.filter(
    (r) => r.priority === "critical" || r.priority === "high"
  ).length || 0;
  const totalIssues = audit.recommendations?.length || 0;

  const handleCardClick = () => {
    router.push(`/dashboard/seo-audit/${audit._id}`);
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    router.push(`/dashboard/seo-audit/${audit._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(audit._id, e);
  };

  const handleUrlClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99]"
    >
      {/* Card Header - Score and Status */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {/* Score Badge */}
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${scoreColors.dot}`} />
          <div className={`px-3 py-1.5 rounded-lg font-bold text-xl ${scoreColors.bg} ${scoreColors.text}`}>
            {audit.score || 0}
          </div>
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            {t("dashboard.common.score")}
          </span>
        </div>
        
        {/* Status Badge */}
        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusColor(audit.status)}`}>
          {audit.status}
        </span>
      </div>

      {/* Card Body - URL and Keyword */}
      <div className="p-4 space-y-3">
        {/* URL */}
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
            {t("dashboard.common.url")}
          </span>
          <a
            href={audit.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleUrlClick}
            className="text-sm font-medium text-gray-900 hover:text-primary transition-colors flex items-center gap-1.5 break-all"
          >
            <span className="line-clamp-2">{audit.url}</span>
            <HiExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
          </a>
        </div>

        {/* Keyword */}
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
            {t("dashboard.common.keyword")}
          </span>
          <span className="text-sm text-gray-700">
            {audit.keyword || "—"}
          </span>
        </div>

        {/* Issues Row */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
              {t("dashboard.common.issues")}
            </span>
            <div className="flex items-center gap-2">
              {totalIssues > 0 ? (
                <>
                  <span className="text-sm font-medium text-gray-700">{totalIssues}</span>
                  {criticalHighCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                      {criticalHighCount} {t("dashboard.common.urgent")}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm text-gray-400">—</span>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="text-right">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
              {t("dashboard.common.date")}
            </span>
            <span className="text-sm text-gray-600">
              {formatEuropeanDate(audit.createdAt, { shortMonth: true })}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer - Actions */}
      <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
        <button
          onClick={handleViewClick}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          aria-label={t("dashboard.seoAudit.view.viewAudit")}
        >
          <HiEye className="w-4 h-4" />
          <span className="hidden xs:inline">{t("dashboard.common.view") || "View"}</span>
        </button>
        <button
          onClick={handleDeleteClick}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label={t("dashboard.seoAudit.view.deleteAudit")}
        >
          <HiTrash className="w-4 h-4" />
          <span className="hidden xs:inline">{t("dashboard.common.delete") || "Delete"}</span>
        </button>
      </div>
    </div>
  );
}
