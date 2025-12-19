"use client";
import { getScoreColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { HiChartBar, HiHashtag, HiDocumentText } from "react-icons/hi";

export default function SEOStats({ content }) {
  const { t } = useTranslation();
  const scoreColor = getScoreColor(content.seoScore || 75);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {/* SEO Score */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 sm:p-3 rounded-lg ${scoreColor.bg}`}>
            <HiChartBar className={`w-5 h-5 sm:w-6 sm:h-6 ${scoreColor.text}`} />
          </div>
          <span className={`text-xl sm:text-2xl font-bold ${scoreColor.text}`}>
            {content.seoScore || 75}
          </span>
        </div>
        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {t("dashboard.aiContent.view.seoScore")}
        </p>
      </div>

      {/* Keyword Density */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 sm:p-3 rounded-lg bg-blue-50">
            <HiHashtag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            {content.keywordDensity || "N/A"}
          </span>
        </div>
        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {t("dashboard.aiContent.view.keywordDensity")}
        </p>
      </div>

      {/* Word Count */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 sm:p-3 rounded-lg bg-purple-50">
            <HiDocumentText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            {content.wordCount || 0}
          </span>
        </div>
        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {t("dashboard.aiContent.view.wordCount")}
        </p>
      </div>
    </div>
  );
}

