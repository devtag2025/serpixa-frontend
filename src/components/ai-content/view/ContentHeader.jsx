"use client";
import { HiRefresh, HiDownload, HiClipboard } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";
import { useRouter } from "next/navigation";

export default function ContentHeader({ content, onRegenerate, onExportHTML, onExportPDF, onCopyAllHTML, onDelete, isExporting, isDeleting, isExportingPDF }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              {t("dashboard.aiContent.view.title")}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              {content.topic && (
                <span className="break-words">
                  <span className="font-semibold">{t("dashboard.aiContent.view.topic")}:</span> {content.topic}
                </span>
              )}
              <span className="break-words">
                <span className="font-semibold">{t("dashboard.aiContent.view.keyword")}:</span> {content.keyword}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {onExportPDF && (
              <button
                onClick={onExportPDF}
                disabled={isExportingPDF}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs sm:text-sm shadow-sm flex-1 sm:flex-none min-w-0"
              >
                {isExportingPDF ? (
                  <>
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></div>
                    <span className="truncate">{t("dashboard.aiContent.view.exportingPdf")}...</span>
                  </>
                ) : (
                  <>
                    <HiDownload className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{t("dashboard.aiContent.view.exportPdf")}</span>
                  </>
                )}
              </button>
            )}
            {onCopyAllHTML && (
              <button
                onClick={onCopyAllHTML}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-primary bg-white border border-primary rounded-lg hover:bg-primary/5 transition-colors font-medium text-xs sm:text-sm flex-1 sm:flex-none min-w-0"
              >
                <HiClipboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{t("dashboard.aiContent.view.copyAllHtml")}</span>
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs sm:text-sm flex-1 sm:flex-none min-w-0"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-red-300 border-t-red-700 rounded-full animate-spin flex-shrink-0"></div>
                    <span className="truncate">{t("dashboard.common.delete")}...</span>
                  </>
                ) : (
                  <>
                    <span className="truncate">{t("dashboard.common.delete")}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

