"use client";
import { useState } from "react";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { handleError } from "@/utils/handleError";
import { HiPlus, HiLocationMarker } from "react-icons/hi";
import GeoAuditListHeader from "@/components/geo-audit/list/GeoAuditListHeader";
import GeoAuditTable from "@/components/geo-audit/list/GeoAuditTable";
import GeoAuditCardList from "@/components/geo-audit/list/GeoAuditCardList";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import Pagination from "@/components/common/Pagination";
import RouteLoader from "@/components/common/RouteLoader";
import { useTranslation } from "@/i18n/context";
import { useGeoAudits, useDeleteGeoAudit } from "@/hooks/geoAuditHooks";

export default function GeoAuditListPage() {
  const router = useLocalizedRouter();
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

      {/* Main Content - Responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {isEmpty ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">
            <HiLocationMarker className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{t("dashboard.localSeoAudit.list.noAudits")}</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">{t("dashboard.localSeoAudit.list.noAuditsDescription")}</p>
            <button
              onClick={() => router.push("/dashboard/local-seo/new")}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"
            >
              <HiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{t("dashboard.localSeoAudit.list.createNewAudit")}</span>
            </button>
          </div>
        ) : (
          <>
            {/* Mobile/Tablet: Card Layout */}
            <div className="lg:hidden">
              <GeoAuditCardList audits={audits} onDelete={handleDelete} />
            </div>

            {/* Desktop: Table Layout */}
            <div className="hidden lg:block">
              <GeoAuditTable audits={audits} onDelete={handleDelete} />
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
        itemName={auditToDeleteData ? `${auditToDeleteData.businessName || auditToDeleteData.keyword || "Audit"}` : null}
        isDeleting={isDeleting}
        type="audit"
      />
    </DashboardLayout>
  );
}

