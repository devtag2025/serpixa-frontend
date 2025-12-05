"use client";
import { HiDownload, HiRefresh, HiOfficeBuilding } from "react-icons/hi";

export default function GBPAuditHeader({ audit, onRerun, onDownloadPDF, isDownloadingPDF }) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">GBP Audit Results</h1>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900">{audit.businessName || "Business"}</p>
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
              onClick={onRerun}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              <HiRefresh className="w-4 h-4" />
              Re-run Audit
            </button>
            <button
              onClick={onDownloadPDF}
              disabled={isDownloadingPDF}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm"
            >
              {isDownloadingPDF ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <HiDownload className="w-4 h-4" />
                  <span>Export PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

