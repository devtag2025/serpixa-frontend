import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "@/services/dashboardService";
import { handleResponse } from "@/utils/handleResponse";
import {
  HiSearch,
  HiLocationMarker,
  HiOfficeBuilding,
  HiSparkles,
} from "react-icons/hi";

// Query keys
export const dashboardKeys = {
  all: ["dashboard"],
  credits: () => [...dashboardKeys.all, "credits"],
  stats: () => [...dashboardKeys.all, "stats"],
};

/**
 * Transform backend credits data to frontend format
 */
const transformCredits = (creditsData, t) => {
  if (!creditsData || !creditsData.credits) {
    return [];
  }

  const { credits } = creditsData;

  return [
    {
      title: t("dashboard.sidebar.seoAudits"),
      used: credits.seo?.used || 0,
      total: credits.seo?.available || 0,
      remaining: credits.seo?.remaining || 0,
      percentageUsed: credits.seo?.percentageUsed || 0,
      color: "#3b82f6", // blue
      icon: HiSearch,
    },
    {
      title: t("dashboard.sidebar.geoAudits"),
      used: credits.geo?.used || 0,
      total: credits.geo?.available || 0,
      remaining: credits.geo?.remaining || 0,
      percentageUsed: credits.geo?.percentageUsed || 0,
      color: "#10b981", // green
      icon: HiLocationMarker,
    },
    {
      title: t("dashboard.sidebar.gbpAudits"),
      used: credits.gbp?.used || 0,
      total: credits.gbp?.available || 0,
      remaining: credits.gbp?.remaining || 0,
      percentageUsed: credits.gbp?.percentageUsed || 0,
      color: "#8b5cf6", // purple
      icon: HiOfficeBuilding,
    },
    {
      title: t("dashboard.sidebar.aiContent"),
      used: credits.ai?.used || 0,
      total: credits.ai?.available || 0,
      remaining: credits.ai?.remaining || 0,
      percentageUsed: credits.ai?.percentageUsed || 0,
      color: "#f59e0b", // amber
      icon: HiSparkles,
    },
  ];
};

/**
 * Transform backend stats data to frontend format
 */
const transformStats = (statsData, t) => {
  if (!statsData) {
    return {
      overviewStats: [],
      recentAudits: [],
    };
  }

  const { overview, recentAudits, breakdown } = statsData;

  // Transform overview stats
  const overviewStats = [
    {
      label: "dashboard.page.totalAudits",
      value: overview?.totalAudits?.toString() || "0",
      icon: HiSearch,
      color: "#3b82f6", // blue
    },
    {
      label: "dashboard.page.successRate",
      value: overview?.successRate ? `${overview.successRate}%` : "100%",
      icon: () => (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "#10b981", // green
    },
  ];

  // Transform recent audits
  const transformedAudits = (recentAudits || []).map((audit) => {
    // Format time ago
    const createdAt = new Date(audit.createdAt);
    const now = new Date();
    const diffInMs = now - createdAt;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    let timeAgo;
    if (diffInHours >= 24) {
      const days = Math.floor(diffInHours / 24);
      timeAgo = `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (diffInHours > 0) {
      timeAgo = `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInMinutes > 0) {
      timeAgo = `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      timeAgo = "Just now";
    }

    return {
      id: audit.id,
      type: audit.type?.toUpperCase() || "AUDIT",
      name: audit.name || audit.displayName || "Audit",
      time: timeAgo,
      status: audit.status || "pending",
      createdAt: audit.createdAt,
    };
  });

  return {
    overviewStats,
    recentAudits: transformedAudits,
    breakdown: breakdown || {},
  };
};

/**
 * Hook to fetch and transform dashboard credits
 */
export function useDashboardCredits() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: dashboardKeys.credits(),
    queryFn: async () => {
      const response = await DashboardService.getCredits();
      const { data } = handleResponse(response);
      return data;
    },
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    refetchOnWindowFocus: true,
  });

  return {
    creditsData: data,
    isLoading,
    isError,
    error,
  };
}

/**
 * Hook to fetch and transform dashboard stats
 */
export function useDashboardStats() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      const response = await DashboardService.getStats();
      const { data } = handleResponse(response);
      return data;
    },
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    refetchOnWindowFocus: true,
  });

  return {
    statsData: data,
    isLoading,
    isError,
    error,
  };
}

/**
 * Main hook that combines credits and stats with transformations
 */
export function useDashboard(t) {
  const creditsQuery = useDashboardCredits();
  const statsQuery = useDashboardStats();

  const isLoading = creditsQuery.isLoading || statsQuery.isLoading;
  const isError = creditsQuery.isError || statsQuery.isError;

  // Transform credits data
  const credits = creditsQuery.creditsData
    ? transformCredits(creditsQuery.creditsData, t)
    : [];

  // Transform stats data
  const { overviewStats, recentAudits, breakdown } = statsQuery.statsData
    ? transformStats(statsQuery.statsData, t)
    : { overviewStats: [], recentAudits: [], breakdown: {} };

  // Get subscription info
  const subscriptionInfo = creditsQuery.creditsData
    ? {
        hasActiveSubscription: creditsQuery.creditsData.hasActiveSubscription || false,
        planName: creditsQuery.creditsData.plan?.name || null,
        billingPeriod: creditsQuery.creditsData.plan?.billingPeriod || null,
        subscriptionStatus: creditsQuery.creditsData.subscription?.status || null,
      }
    : {
        hasActiveSubscription: false,
        planName: null,
        billingPeriod: null,
        subscriptionStatus: null,
      };

  return {
    credits,
    overviewStats,
    recentAudits,
    breakdown,
    subscriptionInfo,
    isLoading,
    isError,
    error: creditsQuery.error || statsQuery.error,
  };
}
