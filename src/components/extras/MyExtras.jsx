"use client";
// import { useState } from "react";
import { useCredits } from "@/hooks/useSubscription";
import { useTranslation } from "@/i18n/context";
import {
  HiSearch,
  HiLocationMarker,
  HiOfficeBuilding,
  HiSparkles,
  // HiChevronDown,
  // HiChevronUp,
  // HiClock,
} from "react-icons/hi";
import ExtraCreditCard from "./ExtraCreditCard";
// import PurchaseHistory from "./PurchaseHistory";

const CREDIT_TYPES = [
  {
    key: "seo_audits",
    label: "dashboard.sidebar.seoAudits",
    icon: HiSearch,
    color: "#3b82f6",
  },
  {
    key: "geo_audits",
    label: "dashboard.sidebar.geoAudits",
    icon: HiLocationMarker,
    color: "#10b981",
  },
  {
    key: "gbp_audits",
    label: "dashboard.sidebar.gbpAudits",
    icon: HiOfficeBuilding,
    color: "#8b5cf6",
  },
  {
    key: "ai_generations",
    label: "dashboard.sidebar.aiContent",
    icon: HiSparkles,
    color: "#f59e0b",
  },
];

export default function MyExtras() {
  const { t } = useTranslation();
  const { data: creditsData, isLoading, isError } = useCredits();
  // const [showHistory, setShowHistory] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-4 border-primary/30 border-t-primary"></div>
            <p className="mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm">{t("dashboard.common.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="text-center py-6 sm:py-8">
          <p className="text-red-600 text-sm sm:text-base">{t("dashboard.common.errorLoading")}</p>
        </div>
      </div>
    );
  }

  // Extract addon credits and filter to only show purchased extras
  const allExtras = CREDIT_TYPES.map((type) => {
    const creditInfo = creditsData?.[type.key];
    return {
      ...type,
      credits: creditInfo?.addon_credits || 0,
      label: t(type.label),
    };
  });

  // Filter to only show extras that were actually purchased (credits > 0)
  const extras = allExtras.filter((extra) => extra.credits > 0);

  // Check if user has any extras
  const hasExtras = extras.length > 0;
  const totalExtras = extras.reduce((sum, extra) => sum + extra.credits, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t("dashboard.extras.myExtras")}
          </h2>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm">
            {totalExtras > 0
              ? `${totalExtras} ${t("dashboard.extras.totalCredits")}`
              : t("dashboard.extras.noExtras")}
          </p>
        </div>
        {/* Purchase History Button - Commented out for now */}
        {/* {hasExtras && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiClock className="w-4 h-4" />
            <span>{t("dashboard.extras.purchaseHistory")}</span>
            {showHistory ? (
              <HiChevronUp className="w-4 h-4" />
            ) : (
              <HiChevronDown className="w-4 h-4" />
            )}
          </button>
        )} */}
      </div>

      {/* Purchase History (Dummy Data) - Commented out for now */}
      {/* {showHistory && hasExtras && <PurchaseHistory extras={extras} />} */}

      {/* Extras Cards - Only show purchased extras */}
      {hasExtras ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {extras.map((extra) => {
            const { key, ...extraProps } = extra;
            return <ExtraCreditCard key={key} {...extraProps} />;
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg sm:rounded-2xl p-6 sm:p-8 lg:p-12 shadow-sm border border-gray-100 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <HiSparkles className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {t("dashboard.extras.noExtrasTitle")}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {t("dashboard.extras.noExtrasDescription")}
            </p>
           
          </div>
        </div>
      )}
    </div>
  );
}

