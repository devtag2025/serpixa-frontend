"use client";
import { HiClipboardCopy } from "react-icons/hi";
import { getStatusColor } from "@/utils/colors";

export default function AuditInfo({ audit, onCopyToClipboard }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Audit Information</h2>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">URL</p>
            <button
              onClick={() => onCopyToClipboard(audit.url, "URL")}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Copy URL"
            >
              <HiClipboardCopy className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm text-gray-900 break-all">{audit.url}</p>
        </div>
        {audit.keyword && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Target Keyword</p>
              <button
                onClick={() => onCopyToClipboard(audit.keyword, "Keyword")}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy Keyword"
              >
                <HiClipboardCopy className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-gray-900">{audit.keyword}</p>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date</p>
          <p className="text-sm text-gray-900">
            {new Date(audit.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Status</p>
          <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(audit.status)}`}>
            {audit.status}
          </span>
        </div>
      </div>
    </div>
  );
}

