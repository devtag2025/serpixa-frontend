"use client";
import { useState } from "react";
import { useCredits } from "@/hooks/useSubscription";
import { useTranslation } from "@/i18n/context";
import {
  HiSearch,
  HiLocationMarker,
  HiOfficeBuilding,
  HiSparkles,
  HiChevronDown,
  HiChevronUp,
  HiClock,
} from "react-icons/hi";
import ExtraCreditCard from "./ExtraCreditCard";
import PurchaseHistory from "./PurchaseHistory";

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
  const [showHistory, setShowHistory] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary/30 border-t-primary"></div>
            <p className="mt-4 text-gray-600 text-sm">{t("dashboard.common.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="text-center py-8">
          <p className="text-red-600">{t("dashboard.common.errorLoading")}</p>
        </div>
      </div>
    );
  }

  // Extract addon credits
  const extras = CREDIT_TYPES.map((type) => {
    const creditInfo = creditsData?.[type.key];
    return {
      ...type,
      credits: creditInfo?.addon_credits || 0,
      label: t(type.label),
    };
  });

  // Check if user has any extras
  const hasExtras = extras.some((extra) => extra.credits > 0);
  const totalExtras = extras.reduce((sum, extra) => sum + extra.credits, 0);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t("dashboard.extras.myExtras")}
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            {totalExtras > 0
              ? `${totalExtras} ${t("dashboard.extras.totalCredits")}`
              : t("dashboard.extras.noExtras")}
          </p>
        </div>
        {hasExtras && (
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
        )}
      </div>

      {/* Purchase History (Dummy Data) */}
      {showHistory && hasExtras && <PurchaseHistory extras={extras} />}

      {/* Extras Cards */}
      {hasExtras ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {extras.map((extra) => (
            <ExtraCreditCard key={extra.key} {...extra} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiSparkles className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("dashboard.extras.noExtrasTitle")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("dashboard.extras.noExtrasDescription")}
            </p>
           
          </div>
        </div>
      )}
    </div>
  );
}

