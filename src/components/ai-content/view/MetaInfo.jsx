"use client";
import { useState } from "react";
import { HiClipboard, HiCheck } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function MetaInfo({ content }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState({ title: false, description: false });

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => {
        setCopied({ ...copied, [type]: false });
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {t("dashboard.aiContent.view.metaTitle")} & {t("dashboard.aiContent.view.metaDescription")}
      </h2>
      
      <div className="space-y-4">
        {/* Meta Title */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {t("dashboard.aiContent.view.metaTitle")}
            </label>
            <button
              onClick={() => handleCopy(content.metaTitle, "title")}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-primary transition-colors"
              title={t("dashboard.aiContent.view.copyMetaTitle")}
            >
              {copied.title ? (
                <>
                  <HiCheck className="w-4 h-4 text-green-600" />
                  <span>{t("dashboard.aiContent.view.copied")}</span>
                </>
              ) : (
                <>
                  <HiClipboard className="w-4 h-4" />
                  <span>{t("dashboard.common.copy")}</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
            {content.metaTitle}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {content.metaTitle.length} / 60 {t("dashboard.seoAudit.view.characters")}
          </p>
        </div>

        {/* Meta Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {t("dashboard.aiContent.view.metaDescription")}
            </label>
            <button
              onClick={() => handleCopy(content.metaDescription, "description")}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-primary transition-colors"
              title={t("dashboard.aiContent.view.copyMetaDescription")}
            >
              {copied.description ? (
                <>
                  <HiCheck className="w-4 h-4 text-green-600" />
                  <span>{t("dashboard.aiContent.view.copied")}</span>
                </>
              ) : (
                <>
                  <HiClipboard className="w-4 h-4" />
                  <span>{t("dashboard.common.copy")}</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900">
            {content.metaDescription}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {content.metaDescription.length} / 155 {t("dashboard.seoAudit.view.characters")}
          </p>
        </div>
      </div>
    </div>
  );
}

