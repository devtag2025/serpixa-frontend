"use client";
import { HiClipboardCopy } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function AuditInfo({ audit, onCopyToClipboard }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{t("dashboard.geoAudit.view.auditInfo")}</h2>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.geoAudit.view.keyword")}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-900">{audit.keyword || "—"}</p>
            {audit.keyword && (
              <button
                onClick={() => onCopyToClipboard(audit.keyword, "Keyword")}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title={t("dashboard.geoAudit.view.copyKeyword")}
              >
                <HiClipboardCopy className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.geoAudit.view.location")}</p>
          <p className="text-sm text-gray-900">{audit.location || "—"}</p>
        </div>
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
          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${
            audit.status === "completed" ? "bg-emerald-100 text-emerald-700" :
            audit.status === "pending" ? "bg-amber-100 text-amber-700" :
            "bg-red-100 text-red-700"
          }`}>
            {audit.status}
          </span>
        </div>
      </div>
    </div>
  );
}

