"use client";
import { HiExclamationCircle } from "react-icons/hi";

export default function CitationAnalysis({ citationIssues }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Citation Analysis</h2>
      </div>
      <div className="px-6 py-4 space-y-4 max-h-[600px] overflow-y-auto">
        {citationIssues ? (
          <>
            {citationIssues.missingCitations && citationIssues.missingCitations.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Missing Citations</p>
                <ul className="space-y-1">
                  {citationIssues.missingCitations.map((citation, index) => (
                    <li key={index} className="text-sm text-amber-600 flex items-start gap-2">
                      <HiExclamationCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{citation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {citationIssues.inconsistentData && citationIssues.inconsistentData.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Inconsistent Data</p>
                <ul className="space-y-1">
                  {citationIssues.inconsistentData.map((data, index) => (
                    <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                      <HiExclamationCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{data}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(!citationIssues.missingCitations || citationIssues.missingCitations.length === 0) &&
             (!citationIssues.inconsistentData || citationIssues.inconsistentData.length === 0) && (
              <p className="text-sm text-gray-500">No citation issues found</p>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">No citation data available</p>
        )}
      </div>
    </div>
  );
}

