"use client";
import { HiDownload, HiExternalLink } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function SEOAuditHeader({ audit, onDownloadPDF, isDownloadingPDF }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">{t("dashboard.seoAudit.view.title")}</h1>
            <a
              href={audit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1.5 break-all"
            >
              {audit.url}
              <HiExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            </a>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onDownloadPDF}
              disabled={isDownloadingPDF}
              className="flex items-center cursor-pointer gap-2 px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs sm:text-sm shadow-sm whitespace-nowrap"
            >
              {isDownloadingPDF ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>{t("dashboard.common.exporting")}</span>
                </>
              ) : (
                <>
                  <HiDownload className="w-4 h-4" />
                  <span className="hidden sm:inline">{t("dashboard.common.exportPdf")}</span>
                  <span className="sm:hidden">{t("dashboard.common.export")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

