"use client";
import { HiSearch } from "react-icons/hi";

/**
 * OverviewStats - Displays overview statistics
 */
export default function OverviewStats({ stats = [] }) {
  // Default mock stats if none provided
  const defaultStats = [
    {
      label: "Total Audits",
      value: "24",
      icon: HiSearch,
      color: "#3b82f6", // blue
    },
    {
      label: "Success Rate",
      value: "98%",
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

  const displayStats = stats.length > 0 ? stats : defaultStats;

  const getGradientClass = (color) => {
    if (color === "#3b82f6") return "from-blue-50 to-blue-100/50";
    if (color === "#10b981") return "from-green-50 to-green-100/50";
    return "from-gray-50 to-gray-100/50";
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Overview</h2>
      <div className="space-y-4">
        {displayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-4 bg-gradient-to-r ${getGradientClass(
                stat.color
              )} rounded-xl`}
            >
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <Icon
                  className="w-6 h-6"
                  style={{ color: stat.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

