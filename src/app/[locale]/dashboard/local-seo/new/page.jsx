"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GeoAuditForm from "@/components/geo-audit/new/GeoAuditForm";
import { useTranslation } from "@/i18n/context";
import { useRunGeoAudit } from "@/hooks/geoAuditHooks";
import { toast } from "react-hot-toast";

export default function NewGeoAuditPage() {
  const { t } = useTranslation();
  const { mutate: runAudit, isPending } = useRunGeoAudit();

  const handleFormSubmit = (payload) => {
    runAudit(payload);

    // Inform user the local SEO audit may take a moment and results will arrive by email
    setTimeout(() => {
      toast.success(t("dashboard.common.toast.contentGenerationStarted"));
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="min-h-full">
        {/* Header */}
        <div className="backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl py-4 px-3 sm:px-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {t("dashboard.localSeoAudit.new.title")}
                </h1>
                <p className="text-gray-600 mt-2">
                  {t("dashboard.localSeoAudit.new.subtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4  py-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-5">
            {/* Form Section - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <GeoAuditForm onSubmit={handleFormSubmit} isPending={isPending} />
              </div>
            </div>

            {/* Info Section - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">
                  {t("dashboard.localSeoAudit.new.whatWillBeAnalyzed")}
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.localSeoAudit.new.localVisibility")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.localSeoAudit.new.nearbyCompetitors")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.localSeoAudit.new.citationAnalysis")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.localSeoAudit.new.recommendations")}</span>
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

