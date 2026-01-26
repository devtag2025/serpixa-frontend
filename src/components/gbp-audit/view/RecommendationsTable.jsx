"use client";
import { useState, useMemo } from "react";
import { getPriorityColor, getImpactColor, getEffortColor } from "@/utils/colors";
import { useTranslation } from "@/i18n/context";
import { HiFilter, HiX } from "react-icons/hi";

export default function RecommendationsTable({ recommendations }) {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");
  const [effortFilter, setEffortFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [sortOrder, setSortOrder] = useState("asc");

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

    // Sort by priority only
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
    // Only allow sorting by priority
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
      profile: t("dashboard.gbpAudit.view.categoryProfile"),
      content: t("dashboard.gbpAudit.view.categoryContent"),
      reviews: t("dashboard.gbpAudit.view.categoryReviews"),
      success: t("dashboard.gbpAudit.view.categorySuccess"),
    };
    return labels[category] || category;
  };

  const SortableHeader = ({ label }) => (
    <th
      className="px-6 py-3 text-left cursor-pointer hover:bg-gray-100 transition-colors group"
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
        {/* Header with Filters Toggle */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">{t("dashboard.gbpAudit.view.recommendations")}</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                {filteredAndSorted.length} {t("dashboard.seoAudit.view.of")} {recommendations.length} {t("dashboard.gbpAudit.view.recommendationsFound")}
              </p>
            </div>
            {/* <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HiFilter className="w-4 h-4" />
              {t("dashboard.seoAudit.view.filters")}
              {activeFiltersCount > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-primary text-white text-xs font-semibold rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button> */}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Priority Filter */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  {t("dashboard.gbpAudit.view.priority")}
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

        {/* Mobile Card Layout */}
        <div className="lg:hidden divide-y divide-gray-200">
          {filteredAndSorted.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-xs sm:text-sm text-gray-500">{t("dashboard.seoAudit.view.noRecommendationsMatch")}</p>
            </div>
          ) : (
            filteredAndSorted.map((rec, index) => {
              const priorityColors = getPriorityColor(rec.priority);
              const impactColors = getImpactColor(rec.impact);
              const effortColors = getEffortColor(rec.effort);

              return (
                <div key={index} className="px-4 py-3 sm:py-4 space-y-2 sm:space-y-3">
                  {/* Header: Priority and Category */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${priorityColors.dot}`}></span>
                      <span className={`text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded ${priorityColors.badge}`}>
                        {priorityColors.label}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded">
                      {getCategoryLabel(rec.category)}
                    </span>
                  </div>

                  {/* Issue */}
                  <div>
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{t("dashboard.seoAudit.view.issue")}</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{rec.issue || "—"}</p>
                  </div>

                  {/* Action */}
                  <div>
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{t("dashboard.gbpAudit.view.action")}</p>
                    <p className="text-xs sm:text-sm text-gray-700">{rec.action || "—"}</p>
                  </div>

                  {/* Impact and Effort */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {rec.impact && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] sm:text-xs text-gray-500">{t("dashboard.seoAudit.view.impact")}:</span>
                        <span className={`text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded ${impactColors.badge}`}>
                          {impactColors.label}
                        </span>
                      </div>
                    )}
                    {rec.effort && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] sm:text-xs text-gray-500">{t("dashboard.seoAudit.view.effort")}:</span>
                        <span className={`text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded ${effortColors.badge}`}>
                          {effortColors.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <SortableHeader label={t("dashboard.gbpAudit.view.priority")} />
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
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {t("dashboard.gbpAudit.view.action")}
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
                  <td colSpan={6} className="px-6 py-12 text-center">
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
                            {priorityColors.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-gray-700 px-2 py-1 bg-gray-100 rounded">
                          {getCategoryLabel(rec.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{rec.issue || "—"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{rec.action || "—"}</span>
                      </td>
                      <td className="px-6 py-4">
                        {rec.impact && (
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${impactColors.badge}`}>
                            {impactColors.label}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {rec.effort && (
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${effortColors.badge}`}>
                            {effortColors.label}
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
