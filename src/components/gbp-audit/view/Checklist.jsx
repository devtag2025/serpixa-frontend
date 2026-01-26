"use client";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function Checklist({ checklist }) {
  const { t } = useTranslation();
  if (!checklist || checklist.length === 0) return null;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">{t("dashboard.gbpAudit.view.checklist")}</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {checklist.map((item, index) => (
          <div key={index} className="px-4 sm:px-6 py-3 sm:py-4 flex items-start justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
                {item.completed ? (
                  <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                ) : (
                  <HiXCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-semibold text-gray-900">{item.label}</span>
              </div>
              {item.value !== null && item.value !== undefined && (
                <p className="text-xs sm:text-sm text-gray-600 ml-6 sm:ml-8 break-words">
                  {typeof item.value === "number" ? item.value : item.value}
                </p>
              )}
            </div>
            <span
              className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-semibold flex-shrink-0 ${
                item.completed
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.completed ? t("dashboard.gbpAudit.view.complete") : t("dashboard.gbpAudit.view.missing")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

