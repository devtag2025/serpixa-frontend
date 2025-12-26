"use client";
import { useState } from "react";
import { HiClipboard, HiCheck } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function ContentPreview({ content }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content.htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Parse HTML content (replace \n with actual newlines, then convert to HTML)
  // The content comes as a string with \n escape sequences
  let parsedContent = content.htmlContent;
  
  // If it's a string with literal \n, replace them
  if (typeof parsedContent === "string") {
    parsedContent = parsedContent.replace(/\\n/g, "\n");
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {t("dashboard.aiContent.view.htmlContent")}
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
          title={t("dashboard.aiContent.view.copyContent")}
        >
          {copied ? (
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
      
      <div className="prose prose-lg max-w-none">
        <div 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      </div>
    </div>
  );
}

