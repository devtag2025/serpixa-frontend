"use client";
import { useTranslation } from "@/i18n/context";

/**
 * OverviewStats - Displays overview statistics
 */
export default function OverviewStats({ stats = [] }) {
  const { t } = useTranslation();
  
  const displayStats = stats.length > 0 ? stats : [];

  const getGradientClass = (color) => {
    if (color === "#3b82f6") return "from-blue-50 to-blue-100/50";
    if (color === "#10b981") return "from-green-50 to-green-100/50";
    return "from-gray-50 to-gray-100/50";
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6">{t("dashboard.page.overview")}</h2>
      <div className="space-y-4">
        {displayStats.length > 0 ? (
          displayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-4 bg-gradient-to-r ${getGradientClass(
                stat.color
              )} rounded-xl`}
            >
              <div>
                  <p className="text-sm text-gray-600 mb-1">{t(stat.label) || stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                  {typeof Icon === "function" ? (
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  ) : (
                <Icon
                  className="w-6 h-6"
                  style={{ color: stat.color }}
                />
                  )}
              </div>
            </div>
          );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>{t("dashboard.page.noStats") || "No statistics available"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

