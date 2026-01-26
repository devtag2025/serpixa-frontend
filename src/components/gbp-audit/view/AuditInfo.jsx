"use client";
import { HiClipboardCopy, HiLink } from "react-icons/hi";
import { getStatusColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { formatEuropeanDate } from "@/utils/dateFormatter";

export default function AuditInfo({ audit, onCopyToClipboard }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">{t("dashboard.gbpAudit.view.auditInfo")}</h2>
      </div>
      <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
        <div>
          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.gbpAudit.view.businessName")}</p>
          <p className="text-xs sm:text-sm text-gray-900 break-words">{audit.businessName || "—"}</p>
        </div>
        {audit.gbpLink && (
          <div>
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.gbpAudit.view.gbpLink")}</p>
              <button
                onClick={() => onCopyToClipboard(audit.gbpLink, "GBP Link")}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title={t("dashboard.gbpAudit.view.copyGbpLink")}
              >
                <HiClipboardCopy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
            <a
              href={audit.gbpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 break-all"
            >
              <span className="break-all">{audit.gbpLink}</span>
              <HiLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            </a>
          </div>
        )}
        {audit.placeId && (
          <div>
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.gbpAudit.view.placeId")}</p>
              <button
                onClick={() => onCopyToClipboard(audit.placeId, "Place ID")}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title={t("dashboard.gbpAudit.view.copyPlaceId")}
              >
                <HiClipboardCopy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-900 font-mono break-all">{audit.placeId}</p>
          </div>
        )}
        <div>
          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.common.date")}</p>
          <p className="text-xs sm:text-sm text-gray-900">
            {formatEuropeanDate(audit.createdAt, { longMonth: true })}
          </p>
        </div>
        <div>
          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.common.status")}</p>
          <span className={`inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-semibold ${getStatusColor(audit.status)}`}>
            {audit.status}
          </span>
        </div>
      </div>
    </div>
  );
}

