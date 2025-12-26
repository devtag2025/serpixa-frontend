"use client";
import { useMemo, useState } from "react";
import { HiCheckCircle, HiXCircle, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function ListsSection({ htmlContent }) {
  const { t } = useTranslation();
  const [expandedLists, setExpandedLists] = useState(new Set());

  const lists = useMemo(() => {
    if (!htmlContent || typeof window === "undefined") return [];
    
    try {
      // Parse HTML to extract lists
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent.replace(/\\n/g, "\n"), "text/html");
      const listElements = doc.querySelectorAll("ul, ol");
      
      return Array.from(listElements).map((list, index) => {
        const items = Array.from(list.querySelectorAll("li"))
          .map(li => li.textContent.trim())
          .filter(item => item.length > 0);
        return {
          id: index + 1,
          type: list.tagName.toLowerCase() === "ul" ? "unordered" : "ordered",
          items: items,
          itemCount: items.length,
        };
      }).filter(list => list.itemCount > 0);
    } catch (error) {
      console.error("Error parsing lists:", error);
      return [];
    }
  }, [htmlContent]);

  const toggleList = (listId) => {
    setExpandedLists((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(listId)) {
        newSet.delete(listId);
      } else {
        newSet.add(listId);
      }
      return newSet;
    });
  };

  if (lists.length === 0) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              {t("dashboard.aiContent.view.lists")}
            </span>
            <HiXCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
          </div>
        </div>
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <p className="text-xs sm:text-sm text-gray-500">{t("dashboard.aiContent.view.noLists")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm font-semibold text-gray-900">
            {t("dashboard.aiContent.view.lists")}
          </span>
          <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-500">
            {lists.length} {t("dashboard.aiContent.view.found")}
          </span>
        </div>
      </div>
      
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {lists.map((list, index) => {
          const isListExpanded = expandedLists.has(list.id);
          const displayItems = isListExpanded ? list.items : list.items.slice(0, 3);
          const hasMoreItems = list.items.length > 3;
          
          return (
            <div key={list.id} className={`px-3 sm:px-4 py-3 sm:py-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">#{list.id}</span>
                  <span className={`inline-flex px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold ${
                    list.type === "unordered" 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-purple-100 text-purple-700"
                  }`}>
                    {list.type === "unordered" ? "UL" : "OL"}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-600">({list.itemCount} {t("dashboard.aiContent.view.items")})</span>
                </div>
              </div>
              <div>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-700">
                  {displayItems.map((item, idx) => (
                    <li key={idx} className="break-words">{item}</li>
                  ))}
                </ul>
                {hasMoreItems && (
                  <button
                    onClick={() => toggleList(list.id)}
                    className="mt-2 flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-[10px] sm:text-xs font-medium"
                  >
                    {isListExpanded ? (
                      <>
                        <span>{t("dashboard.aiContent.view.showLess") || "Show less"}</span>
                        <HiChevronUp className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        <span>
                          {t("dashboard.aiContent.view.showMore") || "Show"} {list.items.length - 3} {t("dashboard.aiContent.view.moreItems") || "more items"}
                        </span>
                        <HiChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {t("dashboard.aiContent.view.type")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {t("dashboard.aiContent.view.items")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {t("dashboard.aiContent.view.listContent")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {lists.map((list, index) => {
              const isListExpanded = expandedLists.has(list.id);
              const displayItems = isListExpanded ? list.items : list.items.slice(0, 3);
              const hasMoreItems = list.items.length > 3;
              
              return (
              <tr key={list.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {list.id}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-semibold ${
                    list.type === "unordered" 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-purple-100 text-purple-700"
                  }`}>
                    {list.type === "unordered" ? "UL" : "OL"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {list.itemCount}
                </td>
                <td className="px-6 py-4">
                    <div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {displayItems.map((item, idx) => (
                      <li key={idx} className="truncate max-w-md">{item}</li>
                    ))}
                      </ul>
                      {hasMoreItems && (
                        <button
                          onClick={() => toggleList(list.id)}
                          className="mt-2 flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-xs font-medium"
                        >
                          {isListExpanded ? (
                            <>
                              <span>{t("dashboard.aiContent.view.showLess") || "Show less"}</span>
                              <HiChevronUp className="w-3 h-3" />
                            </>
                          ) : (
                            <>
                              <span>
                                {t("dashboard.aiContent.view.showMore") || "Show"} {list.items.length - 3} {t("dashboard.aiContent.view.moreItems") || "more items"}
                              </span>
                              <HiChevronDown className="w-3 h-3" />
                            </>
                    )}
                        </button>
                      )}
                    </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

