"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ContentGenerationForm from "@/components/ai-content/new/ContentGenerationForm";
import ContentGenerationProgress from "@/components/ai-content/new/ContentGenerationProgress";
import { useTranslation, useI18n } from "@/i18n/context";
import { mapI18nLocaleToBackendLocale } from "@/utils/localeMapper";
import { useGenerateAIContent } from "@/hooks/aiContentHooks";
import { useContentGenerationProgress } from "@/hooks/useContentGenerationProgress";

export default function NewAIContentPage() {
  const { t } = useTranslation();
  const { locale: i18nLocale } = useI18n();
  const { mutate: generateContent, isPending } = useGenerateAIContent();
  const [currentKeyword, setCurrentKeyword] = useState("");

  // Progress hook
  const {
    progress,
    currentStep,
    startProgress,
    completeProgress,
    resetProgress,
  } = useContentGenerationProgress();

  // Start progress when generation begins
  useEffect(() => {
    if (isPending) {
      startProgress();
    }
  }, [isPending, startProgress]);

  // Complete progress when generation finishes
  useEffect(() => {
    if (!isPending && progress > 0 && progress < 100) {
      completeProgress();
      // Reset after a brief delay to show 100%
      const timer = setTimeout(() => {
        resetProgress();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPending, progress, completeProgress, resetProgress]);

  const handleFormSubmit = (formData) => {
    // Store keyword for progress modal
    setCurrentKeyword(formData.keyword.trim());
    
    // Map form locale (i18n format) to backend locale
    const formLocale = formData.locale || i18nLocale;
    const backendLocale = mapI18nLocaleToBackendLocale(formLocale);
    
    generateContent({
      keyword: formData.keyword.trim(),
      locale: backendLocale,
    });
  };

  return (
    <DashboardLayout>
      {/* Progress Modal */}
      <ContentGenerationProgress
        isOpen={isPending || progress > 0}
        keyword={currentKeyword}
        progress={progress}
        currentStep={currentStep}
        onClose={progress === 100 ? resetProgress : undefined}
      />

      <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t("dashboard.aiContent.new.title")}
            </h1>
            <p className="text-gray-600 mt-2">
              {t("dashboard.aiContent.new.subtitle")}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <ContentGenerationForm onSubmit={handleFormSubmit} isPending={isPending} />
              </div>
            </div>

            {/* Info Section - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">
                  {t("dashboard.aiContent.new.whatWillBeAnalyzed")}
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.aiContent.new.metaTitle")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.aiContent.new.metaDescription")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.aiContent.new.htmlContent")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.aiContent.new.faq")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.aiContent.new.cta")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.aiContent.new.seoOptimized")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

