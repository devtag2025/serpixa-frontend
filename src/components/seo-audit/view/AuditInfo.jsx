"use client";
import { useState } from "react";
import { HiClipboardCopy, HiChevronDown, HiChevronUp, HiInformationCircle } from "react-icons/hi";
import { getStatusColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { formatEuropeanDate } from "@/utils/dateFormatter";

export default function AuditInfo({ audit, onCopyToClipboard }) {
  const { t } = useTranslation();
  const [showVerification, setShowVerification] = useState(false);
  const verification = audit.keywordAnalysis?.keywordVerification;

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
            {formatEuropeanDate(audit.createdAt, { longMonth: true })}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{t("dashboard.common.status")}</p>
          <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(audit.status)}`}>
            {audit.status}
          </span>
        </div>

        {verification && (
          <div className="pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowVerification((v) => !v)}
              className="flex items-center gap-2 w-full text-left text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              <HiInformationCircle className="w-4 h-4 flex-shrink-0" />
              {t("dashboard.seoAudit.view.keywordCountVerification")}
              {showVerification ? <HiChevronUp className="w-4 h-4 ml-auto" /> : <HiChevronDown className="w-4 h-4 ml-auto" />}
            </button>
            {showVerification && (
              <div className="mt-2 pl-6 space-y-1.5 text-xs text-gray-600">
                <p className="text-gray-500 italic">{verification.source}</p>
                <p><span className="font-medium text-gray-700">{t("dashboard.seoAudit.view.occurrencesInRecommendation")}:</span> {verification.keywordOccurrences}</p>
                <p><span className="font-medium text-gray-700">{t("dashboard.seoAudit.view.wordsAnalyzed")}:</span> {verification.wordCountUsed}</p>
                {verification.wordCountFromApi != null && (
                  <p><span className="font-medium text-gray-700">{t("dashboard.seoAudit.view.wordsFromApi")}:</span> {verification.wordCountFromApi}</p>
                )}
                <p><span className="font-medium text-gray-700">{t("dashboard.seoAudit.view.textLength")}:</span> {verification.analyzedTextLength} {t("dashboard.seoAudit.view.characters")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

