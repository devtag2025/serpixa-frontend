"use client";
import { getScoreColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { HiChartBar, HiHashtag, HiDocumentText } from "react-icons/hi";

export default function SEOStats({ content }) {
  const { t } = useTranslation();
  const scoreColor = getScoreColor(content.seoScore || 75);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
      {/* SEO Score */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className={`p-1.5 sm:p-2 lg:p-3 rounded-lg flex-shrink-0 ${scoreColor.bg}`}>
            <HiChartBar className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${scoreColor.text}`} />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 leading-tight line-clamp-2">
            {t("dashboard.aiContent.view.seoScore")}
          </span>
        </div>
        <span className={`text-xl sm:text-2xl lg:text-3xl font-bold ${scoreColor.text}`}>
          {content.seoScore || 75}
        </span>
      </div>

      {/* Keyword Density */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="p-1.5 sm:p-2 lg:p-3 rounded-lg bg-blue-50 flex-shrink-0">
            <HiHashtag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 leading-tight line-clamp-2">
            {t("dashboard.aiContent.view.keywordDensity")}
          </span>
        </div>
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          {content.keywordDensity || "N/A"}
        </span>
      </div>

      {/* Word Count */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 overflow-hidden col-span-2 sm:col-span-1">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="p-1.5 sm:p-2 lg:p-3 rounded-lg bg-purple-50 flex-shrink-0">
            <HiDocumentText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" />
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-500 leading-tight line-clamp-2">
            {t("dashboard.aiContent.view.wordCount")}
          </span>
        </div>
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          {content.wordCount || 0}
        </span>
      </div>
    </div>
  );
}

