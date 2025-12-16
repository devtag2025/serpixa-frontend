"use client";
import { HiSparkles, HiX } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function ContentGenerationProgress({
  isOpen,
  keyword,
  progress,
  currentStep,
  onClose,
}) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="Close"
          >
            <HiX className="w-5 h-5" />
          </button>
        )}

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

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {currentStep || t("dashboard.aiContent.progress.processing")}
              </span>
              <span className="text-sm font-semibold text-primary">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Status Message */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              {t("dashboard.aiContent.progress.pleaseWait")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
