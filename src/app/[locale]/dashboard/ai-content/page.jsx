"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { handleError } from "@/utils/handleError";
import ContentListHeader from "@/components/ai-content/list/ContentListHeader";
import ContentTable from "@/components/ai-content/list/ContentTable";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import Pagination from "@/components/common/Pagination";
import { useTranslation } from "@/i18n/context";
import { useAIContents, useDeleteAIContent } from "@/hooks/aiContentHooks";

export default function AIContentListPage() {
  const router = useRouter();
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
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading content...</p>
          </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Search Bar */}
            {/* {!isEmpty && (
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("dashboard.aiContent.list.searchPlaceholder")}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )} */}

            {/* Empty State */}
            {isEmpty ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("dashboard.aiContent.list.noContent")}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t("dashboard.aiContent.list.noContentDescription")}
                </p>
                <button
                  onClick={() => router.push("/dashboard/ai-content/new")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <span>{t("dashboard.aiContent.list.createNewAudit")}</span>
                </button>
              </div>
            ) : (
              <>
                <ContentTable contents={contents} onDelete={handleDelete} />
                {pagination.pages > 1 && (
                  <Pagination
                    currentPage={pagination.page || currentPage}
                    totalPages={pagination.pages || 1}
                    total={pagination.total || 0}
                    limit={limit}
                    onPageChange={handlePageChange}
                    isLoading={isFetching}
                  />
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

