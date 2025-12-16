"use client";
import { HiDownload, HiExternalLink } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function SEOAuditHeader({ audit, onDownloadPDF, isDownloadingPDF }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{t("dashboard.seoAudit.view.title")}</h1>
            <a
              href={audit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1.5"
            >
              {audit.url}
              <HiExternalLink className="w-3.5 h-3.5" />
            </a>
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
                  <span>{t("dashboard.common.generating")}</span>
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

