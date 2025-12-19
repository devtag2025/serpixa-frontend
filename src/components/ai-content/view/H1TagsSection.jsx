"use client";
import { useMemo } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function H1TagsSection({ htmlContent }) {
  const { t } = useTranslation();

  const h1Tags = useMemo(() => {
    if (!htmlContent || typeof window === "undefined") return [];
    
    try {
      // Parse HTML to extract H1 tags
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent.replace(/\\n/g, "\n"), "text/html");
      const h1Elements = doc.querySelectorAll("h1");
      
      return Array.from(h1Elements).map((h1, index) => ({
        id: index + 1,
        text: h1.textContent.trim(),
      })).filter(h1 => h1.text.length > 0);
    } catch (error) {
      console.error("Error parsing H1 tags:", error);
      return [];
    }
  }, [htmlContent]);

  if (h1Tags.length === 0) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              {t("dashboard.aiContent.view.h1Tags")}
            </span>
            <HiXCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
          </div>
        </div>
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <p className="text-xs sm:text-sm text-gray-500">{t("dashboard.aiContent.view.noH1Tags")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm font-semibold text-gray-900">
            {t("dashboard.aiContent.view.h1Tags")}
          </span>
          <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-500">
            {h1Tags.length} {t("dashboard.aiContent.view.found")}
          </span>
        </div>
      </div>
      
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {h1Tags.map((h1, index) => (
          <div
            key={h1.id}
            className={`px-3 sm:px-4 py-3 sm:py-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xs sm:text-sm font-medium text-gray-900">#{h1.id}</span>
              <p className="text-xs sm:text-sm text-gray-700 break-words flex-1">{h1.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {t("dashboard.aiContent.view.h1Content")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {h1Tags.map((h1, index) => (
              <tr key={h1.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {h1.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 break-words">
                  {h1.text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

