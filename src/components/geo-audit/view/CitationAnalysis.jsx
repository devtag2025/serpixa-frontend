"use client";
import { HiExclamationCircle } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function CitationAnalysis({ citationIssues }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{t("dashboard.localSeoAudit.view.citationAnalysis")}</h2>
      </div>
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3 lg:space-y-4 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto">
        {citationIssues ? (
          <>
            {citationIssues.missingCitations && citationIssues.missingCitations.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t("dashboard.localSeoAudit.view.missingCitations")}</p>
                <ul className="space-y-1">
                  {citationIssues.missingCitations.map((citation, index) => (
                    <li key={index} className="text-xs sm:text-sm text-amber-600 flex items-start gap-2">
                      <HiExclamationCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{citation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {citationIssues.inconsistentData && citationIssues.inconsistentData.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t("dashboard.localSeoAudit.view.inconsistentData")}</p>
                <ul className="space-y-1">
                  {citationIssues.inconsistentData.map((data, index) => (
                    <li key={index} className="text-xs sm:text-sm text-red-600 flex items-start gap-2">
                      <HiExclamationCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{data}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(!citationIssues.missingCitations || citationIssues.missingCitations.length === 0) &&
             (!citationIssues.inconsistentData || citationIssues.inconsistentData.length === 0) && (
              <p className="text-sm text-gray-500">{t("dashboard.localSeoAudit.view.noCitationIssues")}</p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">{t("dashboard.localSeoAudit.view.noCitationData")}</p>
        )}
      </div>
    </div>
  );
}

