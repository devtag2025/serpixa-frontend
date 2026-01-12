"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { handleError } from "@/utils/handleError";
import { HiPlus, HiLocationMarker } from "react-icons/hi";
import GeoAuditListHeader from "@/components/geo-audit/list/GeoAuditListHeader";
import GeoAuditTable from "@/components/geo-audit/list/GeoAuditTable";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import Pagination from "@/components/common/Pagination";
import { useTranslation } from "@/i18n/context";
import { useGeoAudits, useDeleteGeoAudit } from "@/hooks/geoAuditHooks";

export default function GeoAuditListPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [auditToDelete, setAuditToDelete] = useState(null);

  const limit = 10;
  const { data, isLoading, isFetching, isError, error } = useGeoAudits({ page: currentPage, limit });
  const { mutate: deleteAudit, isPending: isDeleting } = useDeleteGeoAudit();

  const handleDelete = (auditId, e) => {
    e.stopPropagation();
    setAuditToDelete(auditId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (auditToDelete) {
      deleteAudit(auditToDelete, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setAuditToDelete(null);
        },
      });
    }
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setAuditToDelete(null);
    }
  };

  // Only show full page loader on initial load when there's no data
  if (isLoading && !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading audits...</p>
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
            <p className="text-red-600 mb-4">{handleError(error) || "Failed to load audits"}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const audits = data?.audits || [];
  const pagination = data?.pagination || {};
  const isEmpty = audits.length === 0 && currentPage === 1;
  const auditToDeleteData = audits.find((a) => a._id === auditToDelete);

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
      <GeoAuditListHeader audits={audits} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
            {isEmpty ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                <HiLocationMarker className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("dashboard.localSeoAudit.list.noAudits")}</h3>
                <p className="text-gray-600 mb-6">{t("dashboard.localSeoAudit.list.noAuditsDescription")}</p>
                <button
                  onClick={() => router.push("/dashboard/local-seo/new")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <HiPlus className="w-5 h-5" />
                  <span>{t("dashboard.localSeoAudit.list.createNewAudit")}</span>
                </button>
              </div>
            ) : (
              <>
                {/* Search Bar */}
                {/* <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("dashboard.localSeoAudit.list.searchPlaceholder")}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div> */}

                <GeoAuditTable audits={audits} onDelete={handleDelete} />
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
        itemName={auditToDeleteData ? `${auditToDeleteData.businessName || auditToDeleteData.keyword || "Audit"}` : null}
        isDeleting={isDeleting}
        type="audit"
      />
    </DashboardLayout>
  );
}

