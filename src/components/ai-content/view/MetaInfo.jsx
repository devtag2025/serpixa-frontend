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
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
        {t("dashboard.aiContent.view.metaTitle")} & {t("dashboard.aiContent.view.metaDescription")}
      </h2>
      
      <div className="space-y-3 sm:space-y-4">
        {/* Meta Title */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {t("dashboard.aiContent.view.metaTitle")}
            </label>
            <button
              onClick={() => handleCopy(content.metaTitle, "title")}
              className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-600 hover:text-primary transition-colors flex-shrink-0"
              title={t("dashboard.aiContent.view.copyMetaTitle")}
            >
              {copied.title ? (
                <>
                  <HiCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                  <span>{t("dashboard.aiContent.view.copied")}</span>
                </>
              ) : (
                <>
                  <HiClipboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{t("dashboard.common.copy")}</span>
                </>
              )}
            </button>
          </div>
          <div className="p-2.5 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-900 break-words">
            {content.metaTitle}
          </div>
          <p className="mt-1 text-[10px] sm:text-xs text-gray-500">
            {content.metaTitle.length} / 60 {t("dashboard.seoAudit.view.characters")}
          </p>
        </div>

        {/* Meta Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {t("dashboard.aiContent.view.metaDescription")}
            </label>
            <button
              onClick={() => handleCopy(content.metaDescription, "description")}
              className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-600 hover:text-primary transition-colors flex-shrink-0"
              title={t("dashboard.aiContent.view.copyMetaDescription")}
            >
              {copied.description ? (
                <>
                  <HiCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                  <span>{t("dashboard.aiContent.view.copied")}</span>
                </>
              ) : (
                <>
                  <HiClipboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{t("dashboard.common.copy")}</span>
                </>
              )}
            </button>
          </div>
          <div className="p-2.5 sm:p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-900 break-words">
            {content.metaDescription}
          </div>
          <p className="mt-1 text-[10px] sm:text-xs text-gray-500">
            {content.metaDescription.length} / 155 {t("dashboard.seoAudit.view.characters")}
          </p>
        </div>
      </div>
    </div>
  );
}

