"use client";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

/**
 * Pagination - A reusable pagination component
 * 
 * @param {Object} props
 * @param {number} props.currentPage - Current page number (1-indexed)
 * @param {number} props.totalPages - Total number of pages
 * @param {number} props.total - Total number of items
 * @param {number} props.limit - Items per page
 * @param {Function} props.onPageChange - Callback when page changes (receives new page number)
 * @param {boolean} props.isLoading - Whether data is loading
 */
export default function Pagination({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
  isLoading = false,
}) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage || isLoading) {
      return;
    }
    onPageChange(newPage);
  };

  // Calculate page range to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start
      if (currentPage <= 3) {
        end = Math.min(4, totalPages - 1);
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("ellipsis-start");
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 bg-white border-t border-gray-200">
      {/* Results info */}
      <div className="text-sm text-gray-700 flex items-center gap-2">
        {total > 0 ? (
          <span>
            {t("dashboard.common.pagination.showing", {
              start: startItem,
              end: endItem,
              total: total,
            })}
          </span>
        ) : (
          <span>{t("dashboard.common.pagination.noResults")}</span>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Loading spinner - subtle indicator */}
        {isLoading && (
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-1"></div>
        )}
        
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentPage === 1 || isLoading
              ? "text-gray-400 cursor-not-allowed bg-gray-50"
              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
          }`}
          aria-label={t("dashboard.common.pagination.previous")}
        >
          <HiChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{t("dashboard.common.pagination.previous")}</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-2 text-sm text-gray-500"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={isLoading}
                className={`min-w-[2.5rem] px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  page === currentPage
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={t("dashboard.common.pagination.page", { page })}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentPage === totalPages || isLoading
              ? "text-gray-400 cursor-not-allowed bg-gray-50"
              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
          }`}
          aria-label={t("dashboard.common.pagination.next")}
        >
          <span className="hidden sm:inline">{t("dashboard.common.pagination.next")}</span>
          <HiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

