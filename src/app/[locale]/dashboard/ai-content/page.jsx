"use client";
import { useState } from "react";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { handleError } from "@/utils/handleError";
import ContentListHeader from "@/components/ai-content/list/ContentListHeader";
import ContentTable from "@/components/ai-content/list/ContentTable";
import ContentCardList from "@/components/ai-content/list/ContentCardList";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import Pagination from "@/components/common/Pagination";
import RouteLoader from "@/components/common/RouteLoader";
import { useTranslation } from "@/i18n/context";
import { useAIContents, useDeleteAIContent } from "@/hooks/aiContentHooks";

export default function AIContentListPage() {
  const router = useLocalizedRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState(null);

  const limit = 10;
  const params = { page: currentPage, limit };
  if (searchQuery.trim()) {
    params.keyword = searchQuery.trim();
  }

  const { data, isLoading, isFetching, isError, error } = useAIContents(params);
  const { mutate: deleteContent, isPending: isDeleting } = useDeleteAIContent();

  const handleDelete = (contentId, e) => {
    e.stopPropagation();
    setContentToDelete(contentId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (contentToDelete) {
      deleteContent(contentToDelete, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setContentToDelete(null);
        },
      });
    }
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setContentToDelete(null);
    }
  };

  // Only show full page loader on initial load when there's no data
  if (isLoading && !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <RouteLoader />
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="text-center max-w-md">
            <p className="text-red-600 mb-4">{handleError(error) || "Failed to load content"}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const contents = data?.contents || [];
  const pagination = data?.pagination || {};
  const isEmpty = contents.length === 0 && !searchQuery && currentPage === 1;
  const contentToDeleteData = contents.find((c) => c._id === contentToDelete);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <DashboardLayout>
      <ContentListHeader />

      {/* Main Content - Responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Empty State */}
        {isEmpty ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {t("dashboard.aiContent.list.noContent")}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {t("dashboard.aiContent.list.noContentDescription")}
            </p>
            <button
              onClick={() => router.push("/dashboard/ai-content/new")}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"
            >
              <span>{t("dashboard.aiContent.list.createNewAudit")}</span>
            </button>
          </div>
        ) : (
          <>
            {/* Mobile/Tablet: Card Layout */}
            <div className="lg:hidden">
              <ContentCardList contents={contents} onDelete={handleDelete} />
            </div>

            {/* Desktop: Table Layout */}
            <div className="hidden lg:block">
              <ContentTable contents={contents} onDelete={handleDelete} />
            </div>

            {/* Pagination - Works for both layouts */}
            {pagination.pages > 1 && (
              <div className="mt-4 sm:mt-6">
                <Pagination
                  currentPage={pagination.page || currentPage}
                  totalPages={pagination.pages || 1}
                  total={pagination.total || 0}
                  limit={limit}
                  onPageChange={handlePageChange}
                  isLoading={isFetching}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        itemName={contentToDeleteData ? `${contentToDeleteData.keyword || "Content"}` : null}
        isDeleting={isDeleting}
        type="content"
      />
    </DashboardLayout>
  );
}

