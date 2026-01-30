"use client";
import { HiSparkles } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function ContentGenerationProgress({
  isOpen,
  keyword,
}) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HiSparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              {t("dashboard.aiContent.progress.generating")}
            </h2>
            {keyword && (
              <p className="text-sm text-gray-600 font-bold text-center">
                {t("dashboard.aiContent.progress.keyword")}:{" "}
                <span className="text-primary">{keyword}</span>
              </p>
            )}
          </div>

          {/* Simple Loader */}
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>

          {/* Status Message */}
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              {t("dashboard.aiContent.progress.pleaseWait")}
            </p>
            <p className="text-xs text-gray-600 font-medium">
              {t("dashboard.aiContent.progress.timeWarning")}
            </p>
            <p className="text-xs text-gray-500">
              {t("dashboard.aiContent.progress.emailNotification")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
