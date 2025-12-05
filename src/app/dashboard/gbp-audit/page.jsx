"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import { GBPAuditService } from "@/services/gbpAuditService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { HiPlus, HiOfficeBuilding } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GBPAuditListHeader from "@/components/gbp-audit/list/GBPAuditListHeader";
import GBPAuditTable from "@/components/gbp-audit/list/GBPAuditTable";

export default function GBPAuditListPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["gbp-audits"],
    queryFn: async () => {
      const response = await GBPAuditService.getUserAudits({ page: 1, limit: 50 });
      const { data } = handleResponse(response);
      return data;
    },
  });

  const { mutate: deleteAudit } = useMutation({
    mutationFn: GBPAuditService.deleteAudit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gbp-audits"] });
      toast.success("Audit deleted successfully");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Failed to delete audit");
    },
  });

  const handleDelete = (auditId, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this audit?")) {
      deleteAudit(auditId);
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading audits...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (isError) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <p className="text-red-600 mb-4">{handleError(error) || "Failed to load audits"}</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const audits = data?.audits || [];
  const filteredAudits = audits.filter((audit) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return audit.businessName?.toLowerCase().includes(query);
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <GBPAuditListHeader audits={audits} />

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            {audits.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                <HiOfficeBuilding className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No audits yet</h3>
                <p className="text-gray-600 mb-6">Get started by creating your first GBP audit</p>
                <button
                  onClick={() => router.push("/dashboard/gbp-audit/new")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <HiPlus className="w-5 h-5" />
                  <span>Create New Audit</span>
                </button>
              </div>
            ) : (
              <>
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by business name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <GBPAuditTable audits={filteredAudits} onDelete={handleDelete} />
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

