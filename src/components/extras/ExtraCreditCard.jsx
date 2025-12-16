"use client";
import { useTranslation } from "@/i18n/context";

/**
 * ExtraCreditCard - Displays addon credits for a specific type
 * Simplified version focused on remaining credits
 */
export default function ExtraCreditCard({
  label,
  credits,
  icon: Icon,
  color,
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="p-2 rounded-xl"
            style={{ backgroundColor: `${color}15` }}
          >
            {Icon && <Icon className="w-5 h-5" style={{ color }} />}
          </div>
          <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">{credits}</span>
          <span className="text-sm text-gray-500">
            {t("dashboard.extras.credits")}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {t("dashboard.extras.remaining")}
        </p>
      </div>

      {/* Visual indicator */}
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: credits > 0 ? "100%" : "0%",
            backgroundColor: color,
            opacity: credits > 0 ? 1 : 0.3,
          }}
        />
      </div>

      {credits === 0 && (
        <p className="text-xs text-gray-400 mt-2 text-center">
          {t("dashboard.extras.noCredits")}
        </p>
      )}
    </div>
  );
}

