"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TabNavigation from "@/components/subscription/TabNavigation";
import CurrentSubscriptionCard from "@/components/subscription/CurrentSubscriptionCard";
import SubscriptionPlansGrid from "@/components/subscription/SubscriptionPlansGrid";
import MyExtras from "@/components/extras/MyExtras";
import BuyMoreExtras from "@/components/extras/BuyMoreExtras";
import { useTranslation } from "@/i18n/context";

export default function ExtrasPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("plan"); // "plan" or "addon"

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-full">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {t("dashboard.subscription.title")}
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                {t("dashboard.subscription.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
          {activeTab === "plan" ? (
            <>
              {/* Current Subscription Card */}
              <CurrentSubscriptionCard />

              {/* Available Plans Section */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {t("dashboard.subscription.availablePlans")}
                  </h2>
                  <p className="text-gray-600 mt-1 text-xs sm:text-sm">
                    {t("dashboard.subscription.availablePlansDescription")}
                  </p>
                </div>
                <SubscriptionPlansGrid />
              </div>
            </>
          ) : (
            <>
              {/* My Extras Section */}
              <MyExtras />

              {/* Buy More Extras Section */}
              <BuyMoreExtras />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

