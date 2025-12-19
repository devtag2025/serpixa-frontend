"use client";
import { HiClipboardCopy } from "react-icons/hi";
import { getStatusColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";

export default function AuditInfo({ audit, onCopyToClipboard }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{t("dashboard.seoAudit.view.auditInfo")}</h2>
      </div>
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3 lg:space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.common.url")}</p>
            <button
              onClick={() => onCopyToClipboard(audit.url, "URL")}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title={t("dashboard.seoAudit.view.copyUrl")}
            >
              <HiClipboardCopy className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm text-gray-900 break-all">{audit.url}</p>
        </div>
        {audit.keyword && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.seoAudit.view.targetKeyword")}</p>
              <button
                onClick={() => onCopyToClipboard(audit.keyword, "Keyword")}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title={t("dashboard.seoAudit.view.copyKeyword")}
              >
                <HiClipboardCopy className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-gray-900">{audit.keyword}</p>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.common.date")}</p>
          <p className="text-sm text-gray-900">
            {new Date(audit.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.common.status")}</p>
          <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(audit.status)}`}>
            {audit.status}
          </span>
        </div>
      </div>
    </div>
  );
}

