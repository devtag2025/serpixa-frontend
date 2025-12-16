"use client";
import { HiCheckCircle, HiXCircle, HiClipboardCopy } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function OnPageAnalysis({ checks, onCopyToClipboard }) {
  const { t } = useTranslation();
  if (!checks) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{t("dashboard.seoAudit.view.onPageAnalysis")}</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {checks.title && (
          <div className="px-6 py-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-900">{t("dashboard.seoAudit.view.titleTag")}</span>
                {checks.title.exists ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-700 mb-1 break-words">
                {checks.title.value || t("dashboard.seoAudit.view.notFound")}
              </p>
              <p className="text-xs text-gray-500">
                {t("dashboard.seoAudit.view.length")}: {checks.title.length || 0} {t("dashboard.seoAudit.view.characters")}
              </p>
            </div>
            {checks.title.value && (
              <button
                onClick={() => onCopyToClipboard(checks.title.value, "Title")}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title={t("dashboard.common.copyTitle")}
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
                <span className="text-sm font-semibold text-gray-900">{t("dashboard.seoAudit.view.metaDescription")}</span>
                {checks.description.exists ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-700 mb-1 break-words">
                {checks.description.value || t("dashboard.seoAudit.view.notFound")}
              </p>
              <p className="text-xs text-gray-500">
                {t("dashboard.seoAudit.view.length")}: {checks.description.length || 0} {t("dashboard.seoAudit.view.characters")}
              </p>
            </div>
            {checks.description.value && (
              <button
                onClick={() => onCopyToClipboard(checks.description.value, "Description")}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title={t("dashboard.common.copyDescription")}
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
                <span className="text-sm font-semibold text-gray-900">{t("dashboard.seoAudit.view.h1Tag")}</span>
                {checks.h1.exists ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-700 mb-1">
                {t("dashboard.seoAudit.view.count")}: <span className="font-semibold">{checks.h1.count || 0}</span>
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
                <span className="text-sm font-semibold text-gray-900">{t("dashboard.seoAudit.view.images")}</span>
                {checks.images.withoutAlt === 0 ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <span>{t("dashboard.seoAudit.view.total")}: <span className="font-semibold">{checks.images.total || 0}</span></span>
                {checks.images.withoutAlt > 0 && (
                  <span className="text-amber-600 font-semibold">
                    {t("dashboard.seoAudit.view.withoutAlt")}: {checks.images.withoutAlt}
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
                <span className="text-sm font-semibold text-gray-900">{t("dashboard.seoAudit.view.links")}</span>
                {checks.links.broken === 0 ? (
                  <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <span>{t("dashboard.seoAudit.view.internal")}: <span className="font-semibold">{checks.links.internal || 0}</span></span>
                <span>{t("dashboard.seoAudit.view.external")}: <span className="font-semibold">{checks.links.external || 0}</span></span>
                {checks.links.broken > 0 && (
                  <span className="text-red-600 font-semibold">
                    {t("dashboard.seoAudit.view.broken")}: {checks.links.broken}
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
                <span className="text-sm font-semibold text-gray-900">{t("dashboard.seoAudit.view.canonicalTag")}</span>
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
                    {t("dashboard.common.copyUrl")}
                  </button>
                </>
              ) : (
                <p className="text-sm text-gray-500">{t("dashboard.seoAudit.view.notFound")}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

