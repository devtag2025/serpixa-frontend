"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CreditCard from "@/components/dashboard/CreditCard";
import ActionButton from "@/components/dashboard/ActionButton";
import RecentAudits from "@/components/dashboard/RecentAudits";
import OverviewStats from "@/components/dashboard/OverviewStats";
import RouteLoader from "@/components/common/RouteLoader";
import { useAuth } from "@/hooks/useAuth";
import { useDashboard } from "@/hooks/useDashboardStats";
import { useTranslation } from "@/i18n/context";
import {
  HiSearch,
  HiLocationMarker,
  HiOfficeBuilding,
  HiSparkles,
} from "react-icons/hi";

export default function Dashboard() {
  const { data: user, isLoading: isAuthLoading } = useAuth();
  const { t } = useTranslation();
  const {
    credits,
    overviewStats,
    recentAudits,
    subscriptionInfo,
    isLoading: isDashboardLoading,
    isError,
  } = useDashboard(t);

  const isLoading = isAuthLoading || isDashboardLoading;

  const actions = [
    {
      href: "/dashboard/seo-audit/new",
      icon: HiSearch,
      title: t("dashboard.page.newSeoAudit"),
      description: t("dashboard.page.newSeoAuditDesc"),
      gradient: "from-blue-500 to-blue-600",
      textColor: "#3b82f6", // Blue
    },
    {
      href: "/dashboard/local-seo/new",
      icon: HiLocationMarker,
      title: t("dashboard.page.newLocalSeoAudit"),
      description: t("dashboard.page.newLocalSeoAuditDesc"),
      gradient: "from-green-500 to-emerald-600",
      textColor: "#10b981", // Green
    },
    {
      href: "/dashboard/gbp-audit/new",
      icon: HiOfficeBuilding,
      title: t("dashboard.page.newGbpAudit"),
      description: t("dashboard.page.newGbpAuditDesc"),
      gradient: "from-purple-500 to-purple-600",
      textColor: "#8b5cf6", // Purple
    },
    {
      href: "/dashboard/ai-content/new",
      icon: HiSparkles,
      title: t("dashboard.page.aiContent"),
      description: t("dashboard.page.aiContentDesc"),
      gradient: "from-amber-500 to-orange-600",
      textColor: "#f59e0b", // Amber
    },
  ];

  // Get subscription plan name
  const subscriptionPlan = subscriptionInfo.planName || t("dashboard.page.noSubscription") || "No Plan";

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <RouteLoader />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Dashboard</h2>
            <p className="text-gray-600 mb-6">Please try refreshing the page</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-full">
        {/* Header */}
        <div className=" backdrop-blur-sm border-b border-gray-200/50 ">
          <div className="max-w-7xl  mx-auto px-2 sm:px-6 lg:px-8 py-2">
            <div className=" bg-white/70 backdrop-blur-sm rounded-xl py-4 p-2 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {t("dashboard.page.welcomeBack")}{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
                </h1>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-sm text-gray-600">{t("dashboard.page.subscription")}:</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-semibold rounded-full shadow-sm">
                    {subscriptionPlan}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          {/* Credits Section */}
          <div className="mb-2">
            <h2 className="text-xl px-1 font-bold text-gray-900 mb-2">
              {t("dashboard.page.yourCredits")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {credits.map((credit, index) => (
                <CreditCard key={index} {...credit} />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {t("dashboard.page.quickActions")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {actions.map((action, index) => (
                <ActionButton key={index} {...action} />
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentAudits audits={recentAudits} />
            <OverviewStats stats={overviewStats} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
