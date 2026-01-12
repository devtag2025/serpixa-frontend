"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GBPAuditForm from "@/components/gbp-audit/new/GBPAuditForm";
import { useTranslation, useI18n } from "@/i18n/context";
import { mapI18nLocaleToAuditLocale } from "@/utils/localeMapper";
import { useRunGBPAudit } from "@/hooks/gbpAuditHooks";
import { normalizeUrl } from "@/utils/urlNormalizer";

export default function NewGBPAuditPage() {
  const { t } = useTranslation();
  const { locale: i18nLocale } = useI18n();
  const { mutate: runAudit, isPending } = useRunGBPAudit();

  const handleFormSubmit = (payload) => {
    // Map form locale (i18n format) to backend audit locale format
    const formLocale = payload.locale || i18nLocale;
    const backendLocale = mapI18nLocaleToAuditLocale(formLocale);
    
    // Normalize URL if provided
    const normalizedGbpLink = payload.gbpLink ? normalizeUrl(payload.gbpLink) : null;
    
    const finalPayload = {
      ...payload,
      gbpLink: normalizedGbpLink,
      locale: backendLocale,
    };
    
    runAudit(finalPayload);
  };

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t("dashboard.gbpAudit.new.title")}
            </h1>
            <p className="text-gray-600 mt-2">
              {t("dashboard.gbpAudit.new.subtitle")}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <GBPAuditForm onSubmit={handleFormSubmit} isPending={isPending} />
              </div>
            </div>

            {/* Info Section - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">
                  {t("dashboard.gbpAudit.new.whatWillBeAnalyzed")}
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.gbpAudit.new.businessInfo")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.gbpAudit.new.categoryOptimization")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.gbpAudit.new.businessDescription")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.gbpAudit.new.photosRatings")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t("dashboard.gbpAudit.new.optimizationScore")}</span>
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

