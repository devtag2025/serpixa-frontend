"use client";
import { useTranslation } from "@/i18n/context";

/**
 * TabNavigation - Simple tab navigation component
 */
export default function TabNavigation({ activeTab, onTabChange }) {
  const { t } = useTranslation();

  const tabs = [
    {
      id: "plan",
      label: t("dashboard.subscription.tabs.planManagement"),
    },
    {
      id: "addon",
      label: t("dashboard.subscription.tabs.addonManagement"),
    },
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all duration-200
                border-b-2
                ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}


