"use client";
import { HiRefresh, HiDownload } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";
import { useRouter } from "next/navigation";

export default function ContentHeader({ content, onRegenerate, onExportHTML, onExportPDF, onDelete, isExporting, isDeleting }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              {t("dashboard.aiContent.view.title")}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <span className="break-words">
                <span className="font-semibold">{t("dashboard.aiContent.view.keyword")}:</span> {content.keyword}
              </span>
              <span>
                <span className="font-semibold">{t("dashboard.aiContent.view.locale")}:</span> {content.locale}
              </span>
            </div>
          </div>
          <div className="flex h-full items-center gap-2 sm:gap-3 flex-shrink-0">
            {onDelete && (
              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs sm:text-sm whitespace-nowrap"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-red-300 border-t-red-700 rounded-full animate-spin"></div>
                    <span>{t("dashboard.common.delete")}...</span>
                  </>
                ) : (
                  <>
                    <span>{t("dashboard.common.delete")}</span>
                  </>
                )}
              </button>
            )}
            {/* Regenerate button removed */}
            {/* <button
              onClick={onRegenerate}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <HiRefresh className="w-4 h-4" />
              {t("dashboard.aiContent.view.regenerate")}
            </button> */}
            {/* Export HTML button commented out */}
            {/* <button
              onClick={onExportHTML}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm"
            >
              <HiDownload className="w-4 h-4" />
              {t("dashboard.aiContent.view.exportHtml")}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

