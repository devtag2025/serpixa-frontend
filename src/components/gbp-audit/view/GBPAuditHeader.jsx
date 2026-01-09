"use client";
import { HiDownload, HiOfficeBuilding } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function GBPAuditHeader({ audit, onDownloadPDF, isDownloadingPDF }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{t("dashboard.gbpAudit.view.title")}</h1>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">{audit.businessName || t("dashboard.gbpAudit.view.businessName")}</p>
              {audit.businessInfo?.name && audit.businessInfo.name !== audit.businessName && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiOfficeBuilding className="w-4 h-4" />
                  <span>{audit.businessInfo.name}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onDownloadPDF}
              disabled={isDownloadingPDF}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm"
            >
              {isDownloadingPDF ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t("dashboard.common.exporting")}</span>
                </>
              ) : (
                <>
                  <HiDownload className="w-4 h-4" />
                  <span>{t("dashboard.common.exportPdf")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

