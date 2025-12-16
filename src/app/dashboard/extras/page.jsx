"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MyExtras from "@/components/extras/MyExtras";
import BuyMoreExtras from "@/components/extras/BuyMoreExtras";
import { useTranslation } from "@/i18n/context";
import { useCredits } from "@/hooks/useSubscription";

export default function ExtrasPage() {
  const { t } = useTranslation();
  const { data: creditsData, isLoading: creditsLoading } = useCredits();
  
  // Get current plan name
  const currentPlan = creditsData?.subscription?.plan_name || null;
  const hasActiveSubscription = !!creditsData?.subscription;

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-full">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {t("dashboard.extras.title")}
                </h1>
                <p className="text-gray-600 mt-2">
                  {t("dashboard.extras.subtitle")}
                </p>
              </div>
              {!creditsLoading && hasActiveSubscription && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{t("dashboard.page.subscription")}:</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-semibold rounded-full shadow-sm">
                    {currentPlan}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* My Extras Section */}
          <MyExtras />

          {/* Buy More Extras Section */}
          <BuyMoreExtras />
        </div>
      </div>
    </DashboardLayout>
  );
}

