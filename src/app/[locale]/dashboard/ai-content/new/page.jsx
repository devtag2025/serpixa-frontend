"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ContentGenerationForm from "@/components/ai-content/new/ContentGenerationForm";
// import ContentGenerationProgress from "@/components/ai-content/new/ContentGenerationProgress"; // Loader commented out: email sent when ready
import { useTranslation, useI18n } from "@/i18n/context";
import { useGenerateAIContent } from "@/hooks/aiContentHooks";
import { toast } from "react-hot-toast";

export default function NewAIContentPage() {
  const { t } = useTranslation();
  const { locale: i18nLocale } = useI18n();
  const { mutate: generateContent, isPending } = useGenerateAIContent();

  const handleFormSubmit = (formData) => {
    const language = formData.language || i18nLocale || "en";
    generateContent({
      topic: formData.topic.trim(),
      keyword: formData.keyword.trim(),
      language,
    });

    // Show email notification toast shortly after user starts generation
    setTimeout(() => {
      toast.success(t("dashboard.common.toast.contentGenerationStarted"));
    }, 1500);
  };

  return (
    <DashboardLayout>
      {/* Loader commented out: user stays on this page and can keep using the app */}
      {/* <ContentGenerationProgress isOpen={isPending} keyword={currentKeyword} /> */}

      <div>
        {/* Header */}
        <div className="backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl py-4 px-3 sm:px-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {t("dashboard.aiContent.new.title")}
                </h1>
                <p className="text-gray-600 mt-2">
                  {t("dashboard.aiContent.new.subtitle")}
                </p>
              </div>
            </div>
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
                <p className="mt-4 pt-4 border-t border-blue-200 text-sm text-blue-800">
                  {t("dashboard.aiContent.progress.emailNotification")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

