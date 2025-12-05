"use client";
import { HiCheckCircle, HiXCircle, HiClipboardCopy } from "react-icons/hi";

export default function OnPageAnalysis({ checks, onCopyToClipboard }) {
  if (!checks) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">On-Page Analysis</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {checks.title && (
          <div className="px-6 py-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-900">Title Tag</span>
                {checks.title.exists ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-700 mb-1 break-words">
                {checks.title.value || "Not found"}
              </p>
              <p className="text-xs text-gray-500">
                Length: {checks.title.length || 0} characters
              </p>
            </div>
            {checks.title.value && (
              <button
                onClick={() => onCopyToClipboard(checks.title.value, "Title")}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy title"
              >
                <HiClipboardCopy className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {checks.description && (
          <div className="px-6 py-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-900">Meta Description</span>
                {checks.description.exists ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-700 mb-1 break-words">
                {checks.description.value || "Not found"}
              </p>
              <p className="text-xs text-gray-500">
                Length: {checks.description.length || 0} characters
              </p>
            </div>
            {checks.description.value && (
              <button
                onClick={() => onCopyToClipboard(checks.description.value, "Description")}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy description"
              >
                <HiClipboardCopy className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {checks.h1 && (
          <div className="px-6 py-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-900">H1 Tag</span>
                {checks.h1.exists ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-700 mb-1">
                Count: <span className="font-semibold">{checks.h1.count || 0}</span>
              </p>
              {checks.h1.values && checks.h1.values.length > 0 && (
                <p className="text-xs text-gray-600 mt-1 break-words">
                  {checks.h1.values.join(", ")}
                </p>
              )}
            </div>
          </div>
        )}

        {checks.images && (
          <div className="px-6 py-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-900">Images</span>
                {checks.images.withoutAlt === 0 ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <span>Total: <span className="font-semibold">{checks.images.total || 0}</span></span>
                {checks.images.withoutAlt > 0 && (
                  <span className="text-amber-600 font-semibold">
                    Without alt: {checks.images.withoutAlt}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {checks.links && (
          <div className="px-6 py-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-900">Links</span>
                {checks.links.broken === 0 ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <span>Internal: <span className="font-semibold">{checks.links.internal || 0}</span></span>
                <span>External: <span className="font-semibold">{checks.links.external || 0}</span></span>
                {checks.links.broken > 0 && (
                  <span className="text-red-600 font-semibold">
                    Broken: {checks.links.broken}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {checks.canonical && (
          <div className="px-6 py-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-900">Canonical Tag</span>
                {checks.canonical.exists ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
              {checks.canonical.value ? (
                <>
                  <p className="text-sm text-gray-700 mb-2 break-all">
                    {checks.canonical.value}
                  </p>
                  <button
                    onClick={() => onCopyToClipboard(checks.canonical.value, "Canonical URL")}
                    className="text-xs text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
                  >
                    <HiClipboardCopy className="w-3.5 h-3.5" />
                    Copy URL
                  </button>
                </>
              ) : (
                <p className="text-sm text-gray-500">Not found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

