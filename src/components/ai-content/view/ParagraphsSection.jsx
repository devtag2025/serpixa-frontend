"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { HiCheckCircle, HiXCircle, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function ParagraphsSection({ htmlContent }) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [truncatedParagraphs, setTruncatedParagraphs] = useState(new Set());
  const paragraphRefs = useRef({});

  const paragraphs = useMemo(() => {
    if (!htmlContent || typeof window === "undefined") return [];

    try {
      // Parse HTML to extract all paragraph tags
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent.replace(/\\n/g, "\n"), "text/html");
      const paragraphElements = doc.querySelectorAll("p");
      
      return Array.from(paragraphElements)
        .map((p, index) => {
          const text = p.textContent.trim();
          const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
          return {
            id: index + 1,
            text: text,
            characterCount: text.length,
            wordCount: wordCount,
          };
        })
        .filter((p) => p.text.length > 0);
    } catch (error) {
      console.error("Error parsing paragraphs:", error);
      return [];
    }
  }, [htmlContent]);

  const toggleSection = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleRow = (paragraphId) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(paragraphId)) {
        newSet.delete(paragraphId);
      } else {
        newSet.add(paragraphId);
      }
      return newSet;
    });
  };

  // Check if paragraphs are actually truncated after render
  useEffect(() => {
    if (paragraphs.length === 0) return;

    const checkTruncation = () => {
      const newTruncated = new Set();
      
      paragraphs.forEach((paragraph) => {
        const element = paragraphRefs.current[paragraph.id];
        if (element) {
          // Check if content is actually truncated
          // scrollHeight > clientHeight means content is clipped
          const isTruncated = element.scrollHeight > element.clientHeight;
          if (isTruncated) {
            newTruncated.add(paragraph.id);
          }
        }
      });
      
      setTruncatedParagraphs(newTruncated);
    };

    // Check after a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(checkTruncation, 100);
    
    // Also check on window resize
    window.addEventListener('resize', checkTruncation);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkTruncation);
    };
  }, [paragraphs, isExpanded]);

  const shouldShowReadMore = (paragraphId) => {
    return truncatedParagraphs.has(paragraphId);
  };

  if (paragraphs.length === 0) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              {t("dashboard.aiContent.view.paragraphs") || "Paragraphs"}
            </span>
            <HiXCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
          </div>
        </div>
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <p className="text-xs sm:text-sm text-gray-500">
            {t("dashboard.aiContent.view.noParagraphs") || "No paragraphs found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <button
          onClick={toggleSection}
          className="w-full flex items-center justify-between hover:bg-gray-50 -mx-3 sm:-mx-4 lg:-mx-6 px-3 sm:px-4 lg:px-6 py-2 transition-colors"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              {t("dashboard.aiContent.view.paragraphs") || "Paragraphs"}
            </span>
            <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-500">
              {paragraphs.length} {t("dashboard.aiContent.view.found") || "found"}
            </span>
          </div>
          {isExpanded ? (
            <HiChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
          ) : (
            <HiChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
          )}
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-gray-200">
            {paragraphs.map((paragraph, index) => {
              const isRowExpanded = expandedRows.has(paragraph.id);
              const showReadMore = shouldShowReadMore(paragraph.id);
              
              return (
                <div
                  key={paragraph.id}
                  className={`px-3 sm:px-4 py-3 sm:py-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-900">#{paragraph.id}</span>
                    <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-600">
                      <span>{paragraph.characterCount} {t("dashboard.aiContent.view.characters") || "chars"}</span>
                      <span>{paragraph.wordCount} {t("dashboard.aiContent.view.words") || "words"}</span>
                    </div>
                  </div>
                  <div>
                    <p 
                      ref={(el) => {
                        if (el && !isRowExpanded) {
                          paragraphRefs.current[paragraph.id] = el;
                        }
                      }}
                      className={`text-xs sm:text-sm text-gray-700 ${isRowExpanded || !showReadMore ? "" : "line-clamp-3"}`}
                    >
                      {paragraph.text}
                    </p>
                    {showReadMore && (
                      <button
                        onClick={() => toggleRow(paragraph.id)}
                        className="mt-2 flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-[10px] sm:text-xs font-medium"
                      >
                        {isRowExpanded ? (
                          <>
                            <span>{t("dashboard.aiContent.view.readLess") || "Read less"}</span>
                            <HiChevronUp className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            <span>{t("dashboard.aiContent.view.readMore") || "Read more"}</span>
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
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("dashboard.aiContent.view.paragraphContent") || "Content"}
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("dashboard.aiContent.view.characters") || "Characters"}
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("dashboard.aiContent.view.words") || "Words"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paragraphs.map((paragraph, index) => {
                  const isRowExpanded = expandedRows.has(paragraph.id);
                  const showReadMore = shouldShowReadMore(paragraph.id);
                  
                  return (
                    <tr
                      key={paragraph.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {paragraph.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-2xl">
                        <div>
                          <p 
                            ref={(el) => {
                              if (el && !isRowExpanded) {
                                paragraphRefs.current[paragraph.id] = el;
                              }
                            }}
                            className={isRowExpanded || !showReadMore ? "" : "line-clamp-3"}
                          >
                            {paragraph.text}
                          </p>
                          {showReadMore && (
                            <button
                              onClick={() => toggleRow(paragraph.id)}
                              className="mt-2 flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-xs font-medium"
                            >
                              {isRowExpanded ? (
                                <>
                                  <span>{t("dashboard.aiContent.view.readLess") || "Read less"}</span>
                                  <HiChevronUp className="w-3 h-3" />
                                </>
                              ) : (
                                <>
                                  <span>{t("dashboard.aiContent.view.readMore") || "Read more"}</span>
                                  <HiChevronDown className="w-3 h-3" />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {paragraph.characterCount}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {paragraph.wordCount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

