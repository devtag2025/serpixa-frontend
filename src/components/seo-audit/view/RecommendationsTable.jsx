"use client";
import { useState, useMemo } from "react";
import { getPriorityColor, getImpactColor, getEffortColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { HiFilter, HiX } from "react-icons/hi";

export default function RecommendationsTable({ recommendations, audit }) {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");
  const [effortFilter, setEffortFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [sortOrder, setSortOrder] = useState("asc");

  const scoreSummary = audit?.checks?.scoreSummary;
  const hasContext = recommendations?.some((r) => r.context?.trim());

  if (!recommendations || recommendations.length === 0) return null;

  // Get unique categories
  const categories = useMemo(() => {
    const unique = [...new Set(recommendations.map((r) => r.category).filter(Boolean))];
    return unique.sort();
  }, [recommendations]);

  // Filter and sort recommendations
  const filteredAndSorted = useMemo(() => {
    let filtered = recommendations.filter((rec) => {
      if (priorityFilter !== "all" && rec.priority !== priorityFilter) return false;
      if (categoryFilter !== "all" && rec.category !== categoryFilter) return false;
      if (impactFilter !== "all" && rec.impact !== impactFilter) return false;
      if (effortFilter !== "all" && rec.effort !== effortFilter) return false;
      return true;
    });

    // Sort by priority (severity) only
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

    filtered.sort((a, b) => {
      const aVal = priorityOrder[a.priority] ?? 4;
      const bVal = priorityOrder[b.priority] ?? 4;
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [recommendations, priorityFilter, categoryFilter, impactFilter, effortFilter, sortBy, sortOrder]);

  const activeFiltersCount = [
    priorityFilter !== "all",
    categoryFilter !== "all",
    impactFilter !== "all",
    effortFilter !== "all",
  ].filter(Boolean).length;

  const handleSort = () => {
    // Only allow sorting by priority (severity)
    if (sortBy === "priority") {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy("priority");
      setSortOrder("asc");
    }
  };

  const clearFilters = () => {
    setPriorityFilter("all");
    setCategoryFilter("all");
    setImpactFilter("all");
    setEffortFilter("all");
  };

  const getCategoryLabel = (category) => {
    const labels = {
      meta: t("dashboard.seoAudit.view.categoryMeta"),
      content: t("dashboard.seoAudit.view.categoryContent"),
      technical: t("dashboard.seoAudit.view.categoryTechnical"),
      keyword: t("dashboard.seoAudit.view.categoryKeyword"),
      competitor: t("dashboard.seoAudit.view.categoryCompetitor"),
      success: t("dashboard.seoAudit.view.categorySuccess"),
    };
    return labels[category] || category;
  };

  const getTranslatedPriority = (priority) => {
    const priorityMap = {
      critical: t("dashboard.seoAudit.view.critical"),
      high: t("dashboard.seoAudit.view.high"),
      medium: t("dashboard.seoAudit.view.medium"),
      low: t("dashboard.seoAudit.view.low"),
    };
    return priorityMap[priority] || priority;
  };

  const getTranslatedImpact = (impact) => {
    const impactMap = {
      high: t("dashboard.seoAudit.view.high"),
      medium: t("dashboard.seoAudit.view.medium"),
      low: t("dashboard.seoAudit.view.low"),
    };
    return impactMap[impact] || impact;
  };

  const getTranslatedEffort = (effort) => {
    const effortMap = {
      easy: t("dashboard.seoAudit.view.easy"),
      moderate: t("dashboard.seoAudit.view.moderate"),
      difficult: t("dashboard.seoAudit.view.difficult"),
    };
    return effortMap[effort] || effort;
  };

  const SortableHeader = ({ label }) => (
    <th
      className="px-3 sm:px-6 py-3 text-left cursor-pointer hover:bg-gray-100 transition-colors group"
      onClick={handleSort}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
        {sortBy === "priority" && (
          <span className="text-gray-400 text-xs">
            {sortOrder === "asc" ? "↑" : "↓"}
          </span>
        )}
        {sortBy !== "priority" && (
          <span className="text-gray-300 text-xs opacity-0 group-hover:opacity-100">↕</span>
        )}
      </div>
    </th>
  );

  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header with score context and intro */}
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div>
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{t("dashboard.seoAudit.view.recommendations")}</h2>
              <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 mt-1">
                {filteredAndSorted.length} {t("dashboard.seoAudit.view.of")} {recommendations.length} {t("dashboard.seoAudit.view.issuesFound")}
              </p>
            </div>
            {/* <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs lg:text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors self-start sm:self-auto"
            >
              <HiFilter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t("dashboard.seoAudit.view.filters")}
              {activeFiltersCount > 0 && (
                <span className="ml-1 px-1.5 sm:px-2 py-0.5 bg-primary text-white text-[10px] sm:text-xs font-semibold rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button> */}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            {scoreSummary && (
              <p className="text-xs sm:text-sm text-gray-600 mb-2">{scoreSummary}</p>
            )}
            <p className="text-xs sm:text-sm text-gray-500">{t("dashboard.seoAudit.view.recommendationsIntro")}</p>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {/* Priority Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t("dashboard.seoAudit.view.priority")}
                </label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="all">{t("dashboard.seoAudit.view.all")}</option>
                  <option value="critical">{t("dashboard.seoAudit.view.critical")}</option>
                  <option value="high">{t("dashboard.seoAudit.view.high")}</option>
                  <option value="medium">{t("dashboard.seoAudit.view.medium")}</option>
                  <option value="low">{t("dashboard.seoAudit.view.low")}</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t("dashboard.seoAudit.view.category")}
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="all">{t("dashboard.seoAudit.view.all")}</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {getCategoryLabel(cat)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Impact Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t("dashboard.seoAudit.view.impact")}
                </label>
                <select
                  value={impactFilter}
                  onChange={(e) => setImpactFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="all">{t("dashboard.seoAudit.view.all")}</option>
                  <option value="high">{t("dashboard.seoAudit.view.high")}</option>
                  <option value="medium">{t("dashboard.seoAudit.view.medium")}</option>
                  <option value="low">{t("dashboard.seoAudit.view.low")}</option>
                </select>
              </div>

              {/* Effort Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t("dashboard.seoAudit.view.effort")}
                </label>
                <select
                  value={effortFilter}
                  onChange={(e) => setEffortFilter(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="all">{t("dashboard.seoAudit.view.all")}</option>
                  <option value="easy">{t("dashboard.seoAudit.view.easy")}</option>
                  <option value="moderate">{t("dashboard.seoAudit.view.moderate")}</option>
                  <option value="difficult">{t("dashboard.seoAudit.view.difficult")}</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <HiX className="w-4 h-4" />
                  {t("dashboard.seoAudit.view.clearFilters")}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-200">
          {filteredAndSorted.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-gray-500">{t("dashboard.seoAudit.view.noRecommendationsMatch")}</p>
            </div>
          ) : (
            filteredAndSorted.map((rec, index) => {
              const priorityColors = getPriorityColor(rec.priority);
              const impactColors = getImpactColor(rec.impact);
              const effortColors = getEffortColor(rec.effort);
              
              return (
                <div
                  key={index}
                  className="px-4 py-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityColors.dot}`}></span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors.badge}`}>
                        {getTranslatedPriority(rec.priority)}
                      </span>
                      <span className="text-xs font-medium text-gray-700 px-2 py-1 bg-gray-100 rounded">
                        {getCategoryLabel(rec.category)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        {t("dashboard.seoAudit.view.issue")}
                      </p>
                      <p className="text-sm font-medium text-gray-900">{rec.issue}</p>
                    </div>
                    {rec.context?.trim() && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          {t("dashboard.seoAudit.view.vsTop10")}
                        </p>
                        <p className="text-sm text-gray-600">{rec.context}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        {t("dashboard.seoAudit.view.description")}
                      </p>
                      <p className="text-sm text-gray-700">{rec.action}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {rec.impact && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            {t("dashboard.seoAudit.view.impact")}:
                          </span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${impactColors.badge}`}>
                            {getTranslatedImpact(rec.impact)}
                          </span>
                        </div>
                      )}
                      {rec.effort && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            {t("dashboard.seoAudit.view.effort")}:
                          </span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${effortColors.badge}`}>
                            {getTranslatedEffort(rec.effort)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <SortableHeader label={t("dashboard.seoAudit.view.severity")} />
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("dashboard.seoAudit.view.category")}
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("dashboard.seoAudit.view.issue")}
                  </span>
                </th>
                {hasContext && (
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {t("dashboard.seoAudit.view.vsTop10")}
                    </span>
                  </th>
                )}
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("dashboard.seoAudit.view.description")}
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("dashboard.seoAudit.view.impact")}
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("dashboard.seoAudit.view.effort")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSorted.length === 0 ? (
                <tr>
                  <td colSpan={hasContext ? 7 : 6} className="px-6 py-12 text-center">
                    <p className="text-sm text-gray-500">{t("dashboard.seoAudit.view.noRecommendationsMatch")}</p>
                  </td>
                </tr>
              ) : (
                filteredAndSorted.map((rec, index) => {
                  const priorityColors = getPriorityColor(rec.priority);
                  const impactColors = getImpactColor(rec.impact);
                  const effortColors = getEffortColor(rec.effort);
                  
                  return (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-50 transition-colors"}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${priorityColors.dot}`}></span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors.badge}`}>
                            {getTranslatedPriority(rec.priority)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-gray-700 px-2 py-1 bg-gray-100 rounded">
                          {getCategoryLabel(rec.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900 break-words">{rec.issue}</span>
                      </td>
                      {hasContext && (
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 break-words">{rec.context || "—"}</span>
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700 break-words">{rec.action}</span>
                      </td>
                      <td className="px-6 py-4">
                        {rec.impact && (
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${impactColors.badge}`}>
                            {getTranslatedImpact(rec.impact)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {rec.effort && (
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${effortColors.badge}`}>
                            {getTranslatedEffort(rec.effort)}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
