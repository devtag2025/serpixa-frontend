"use client";
import { useTranslation } from "@/i18n/context";
import { HiCheckCircle } from "react-icons/hi";

export default function StrengthsCard({ strengths }) {
  const { t } = useTranslation();
  if (!strengths || strengths.length === 0) return null;

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4 sm:mb-6">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
          {t("dashboard.seoAudit.view.strengthsTitle")}
        </h2>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
          {t("dashboard.seoAudit.view.strengthsSubtitle")}
        </p>
      </div>
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <ul className="space-y-2 sm:space-y-3">
          {strengths.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-emerald-50/50 border border-emerald-100"
            >
              <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                  {s.category}
                </span>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{s.title}</p>
                {s.description && (
                  <p className="text-xs text-gray-600 mt-1">{s.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
