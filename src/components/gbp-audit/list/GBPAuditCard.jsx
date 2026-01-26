"use client";
import { HiEye, HiTrash, HiExclamationCircle } from "react-icons/hi";
import { getScoreColor, getStatusColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { formatEuropeanDate } from "@/utils/dateFormatter";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";

/**
 * GBPAuditCard - Individual card component for mobile/tablet view
 * Displays GBP audit information in a compact, touch-friendly card format
 * 
 * @param {Object} audit - The audit data object
 * @param {Function} onDelete - Callback function for delete action
 */
export default function GBPAuditCard({ audit, onDelete }) {
  const { t } = useTranslation();
  const router = useLocalizedRouter();
  
  const scoreColors = getScoreColor(audit.score || 0);
  const totalRecommendations = audit.recommendations?.length || 0;

  const handleCardClick = () => {
    router.push(`/dashboard/gbp-audit/${audit._id}`);
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    router.push(`/dashboard/gbp-audit/${audit._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(audit._id, e);
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

      {/* Card Body */}
      <div className="p-4 space-y-3">
        {/* Business Name */}
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
            {t("dashboard.localSeoAudit.view.business")}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {audit.businessName || "—"}
          </span>
        </div>

        {/* Recommendations and Date Row */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">
              {t("dashboard.gbpAudit.view.recommendations")}
            </span>
            <div className="flex items-center gap-1.5">
              <HiExclamationCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-gray-700">
                {totalRecommendations}
              </span>
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
          aria-label={t("dashboard.gbpAudit.view.viewAudit")}
        >
          <HiEye className="w-4 h-4" />
          <span className="hidden xs:inline">{t("dashboard.common.view")}</span>
        </button>
        <button
          onClick={handleDeleteClick}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label={t("dashboard.gbpAudit.view.deleteAudit")}
        >
          <HiTrash className="w-4 h-4" />
          <span className="hidden xs:inline">{t("dashboard.common.delete")}</span>
        </button>
      </div>
    </div>
  );
}
