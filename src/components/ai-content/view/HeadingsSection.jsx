"use client";
import { useMemo, useState } from "react";
import { HiCheckCircle, HiXCircle, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function HeadingsSection({ htmlContent }) {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState({
    h1: true,
    h2: true,
    h3: false,
    h4: false,
    h5: false,
    h6: false,
  });

  const headingsByType = useMemo(() => {
    if (!htmlContent || typeof window === "undefined") return {};

    try {
      // Parse HTML to extract all heading tags
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent.replace(/\\n/g, "\n"), "text/html");
      
      const headings = {
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
      };

      // Extract all heading tags
      ["h1", "h2", "h3", "h4", "h5", "h6"].forEach((tag) => {
        const elements = doc.querySelectorAll(tag);
        headings[tag] = Array.from(elements)
          .map((el, index) => ({
            id: index + 1,
            text: el.textContent.trim(),
          }))
          .filter((h) => h.text.length > 0);
      });

      return headings;
    } catch (error) {
      console.error("Error parsing headings:", error);
      return {};
    }
  }, [htmlContent]);

  const toggleSection = (tagType) => {
    setExpandedSections((prev) => ({
      ...prev,
      [tagType]: !prev[tagType],
    }));
  };

  const totalHeadings = Object.values(headingsByType).reduce(
    (sum, headings) => sum + headings.length,
    0
  );

  if (totalHeadings === 0) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              {t("dashboard.aiContent.view.headings")}
            </span>
            <HiXCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
          </div>
        </div>
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <p className="text-xs sm:text-sm text-gray-500">{t("dashboard.aiContent.view.noHeadings")}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm font-semibold text-gray-900">
            {t("dashboard.aiContent.view.headings")}
          </span>
          <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-500">
            {totalHeadings} {t("dashboard.aiContent.view.found")}
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {["h1", "h2", "h3", "h4", "h5", "h6"].map((tagType) => {
          const headings = headingsByType[tagType] || [];
          if (headings.length === 0) return null;

          const isExpanded = expandedSections[tagType];

          return (
            <div key={tagType} className="border-b border-gray-200 last:border-b-0">
              {/* Section Header - Clickable */}
              <button
                onClick={() => toggleSection(tagType)}
                className="w-full px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">
                    {t(`dashboard.aiContent.view.${tagType}Tags`)}
                  </span>
                  <span className="px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] sm:text-xs font-semibold flex-shrink-0">
                    {headings.length}
                  </span>
                </div>
                {isExpanded ? (
                  <HiChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <HiChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {/* Section Content - Expandable */}
              {isExpanded && (
                <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[300px]">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-3 sm:px-4 py-2 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            #
                          </th>
                          <th className="px-3 sm:px-4 py-2 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            {t(`dashboard.aiContent.view.${tagType}Content`)}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {headings.map((heading, index) => (
                          <tr
                            key={heading.id}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                          >
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-900">
                              {heading.id}
                            </td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 break-words">
                              {heading.text}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

