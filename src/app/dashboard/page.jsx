"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import CreditCard from "@/components/dashboard/CreditCard";
import ActionButton from "@/components/dashboard/ActionButton";
import RecentAudits from "@/components/dashboard/RecentAudits";
import OverviewStats from "@/components/dashboard/OverviewStats";
import { useAuth } from "@/hooks/useAuth";
import {
  HiSearch,
  HiLocationMarker,
  HiOfficeBuilding,
  HiSparkles,
} from "react-icons/hi";

export default function Dashboard() {
  const { data: user, isLoading } = useAuth();

  // Mock credit data - Replace with real data from API
  const credits = [
    {
      title: "SEO Audits",
      used: 5,
      total: 50,
      color: "#3b82f6", // blue
      icon: HiSearch,
    },
    {
      title: "GEO Audits",
      used: 2,
      total: 10,
      color: "#10b981", // green
      icon: HiLocationMarker,
    },
    {
      title: "GBP Audits",
      used: 2,
      total: 5,
      color: "#8b5cf6", // purple
      icon: HiOfficeBuilding,
    },
    {
      title: "AI Content",
      used: 38,
      total: 50,
      color: "#f59e0b", // amber
      icon: HiSparkles,
    },
  ];

  const actions = [
    {
      href: "/dashboard/seo-audit/new",
      icon: HiSearch,
      title: "New SEO Audit",
      description: "Analyze website SEO performance",
      gradient: "from-blue-500 to-blue-600",
      textColor: "#3b82f6", // Blue
    },
    {
      href: "/dashboard/geo-audit/new",
      icon: HiLocationMarker,
      title: "New GEO Audit",
      description: "Check local search visibility",
      gradient: "from-green-500 to-emerald-600",
      textColor: "#10b981", // Green
    },
    {
      href: "/dashboard/gbp-audit/new",
      icon: HiOfficeBuilding,
      title: "New GBP Audit",
      description: "Audit Google Business Profile",
      gradient: "from-purple-500 to-purple-600",
      textColor: "#8b5cf6", // Purple
    },
    {
      href: "/dashboard/ai-content/new",
      icon: HiSparkles,
      title: "AI Content",
      description: "Generate optimized content",
      gradient: "from-amber-500 to-orange-600",
      textColor: "#f59e0b", // Amber
    },
  ];

  // Mock subscription plan - Replace with real data
  const subscriptionPlan = "Premium Plan";

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
      {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
                  </h1>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="text-sm text-gray-600">Subscription:</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-primary to-blue-600 text-white text-sm font-semibold rounded-full shadow-sm">
                      {subscriptionPlan}
                    </span>
      </div>
                </div>
              </div>
            </div>
        </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Credits Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Your Credits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {credits.map((credit, index) => (
                  <CreditCard key={index} {...credit} />
              ))}
            </div>
          </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {actions.map((action, index) => (
                  <ActionButton key={index} {...action} />
                ))}
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentAudits />
              <OverviewStats />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
