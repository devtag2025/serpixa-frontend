"use client";
import { HiClipboardCopy, HiLink } from "react-icons/hi";
import { getStatusColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";

export default function AuditInfo({ audit, onCopyToClipboard }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{t("dashboard.gbpAudit.view.auditInfo")}</h2>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.gbpAudit.view.businessName")}</p>
          <p className="text-sm text-gray-900">{audit.businessName || "—"}</p>
        </div>
        {audit.gbpLink && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.gbpAudit.view.gbpLink")}</p>
              <button
                onClick={() => onCopyToClipboard(audit.gbpLink, "GBP Link")}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title={t("dashboard.gbpAudit.view.copyGbpLink")}
              >
                <HiClipboardCopy className="w-3.5 h-3.5" />
              </button>
            </div>
            <a
              href={audit.gbpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 break-all"
            >
              {audit.gbpLink}
              <HiLink className="w-3.5 h-3.5 flex-shrink-0" />
            </a>
          </div>
        )}
        {audit.placeId && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.gbpAudit.view.placeId")}</p>
              <button
                onClick={() => onCopyToClipboard(audit.placeId, "Place ID")}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title={t("dashboard.gbpAudit.view.copyPlaceId")}
              >
                <HiClipboardCopy className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-gray-900 font-mono">{audit.placeId}</p>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.common.date")}</p>
          <p className="text-sm text-gray-900">
            {new Date(audit.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.common.status")}</p>
          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusColor(audit.status)}`}>
            {audit.status}
          </span>
        </div>
      </div>
    </div>
  );
}

