"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GeoAuditForm from "@/components/geo-audit/new/GeoAuditForm";
import { useTranslation } from "@/i18n/context";
import { useRunGeoAudit } from "@/hooks/geoAuditHooks";

export default function NewGeoAuditPage() {
  const { t } = useTranslation();
  const { mutate: runAudit, isPending } = useRunGeoAudit();

  const handleFormSubmit = (payload) => {
    runAudit(payload);
  };

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-full">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t("dashboard.geoAudit.new.title")}
            </h1>
            <p className="text-gray-600 mt-2">
              {t("dashboard.geoAudit.new.subtitle")}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4  py-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  {t("dashboard.geoAudit.new.whatWillBeAnalyzed")}
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.geoAudit.new.localVisibility")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.geoAudit.new.nearbyCompetitors")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.geoAudit.new.citationAnalysis")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.geoAudit.new.recommendations")}</span>
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

