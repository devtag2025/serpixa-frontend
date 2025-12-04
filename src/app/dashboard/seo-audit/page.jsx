"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import { SEOAuditService } from "@/services/seoAuditService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { HiPlus, HiTrash, HiEye, HiDocumentReport } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SEOAuditListPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["seo-audits"],
    queryFn: async () => {
      const response = await SEOAuditService.getUserAudits({ page: 1, limit: 50 });
      const { data } = handleResponse(response);
      return data;
    },
  });

  const { mutate: deleteAudit } = useMutation({
    mutationFn: SEOAuditService.deleteAudit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-audits"] });
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

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50";
    if (score >= 50) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading audits...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (isError) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4">
                {handleError(error) || "Failed to load audits"}
              </p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const audits = data?.audits || [];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    SEO Audits
                  </h1>
                  <p className="text-gray-600 mt-2">
                    View and manage your SEO audit history
                  </p>
                </div>
                <button
                  onClick={() => router.push("/dashboard/seo-audit/new")}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <HiPlus className="w-5 h-5" />
                  <span>New Audit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {audits.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <HiDocumentReport className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No audits yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first SEO audit
                </p>
                <button
                  onClick={() => router.push("/dashboard/seo-audit/new")}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <HiPlus className="w-5 h-5" />
                  <span>Create New Audit</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {audits.map((audit) => (
                  <div
                    key={audit._id}
                    onClick={() => router.push(`/dashboard/seo-audit/${audit._id}`)}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div
                            className={`px-4 py-2 rounded-lg font-bold text-2xl ${getScoreColor(audit.score)}`}
                          >
                            {audit.score}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {audit.url}
                            </h3>
                            {audit.keyword && (
                              <p className="text-sm text-gray-600">
                                Keyword: <span className="font-medium">{audit.keyword}</span>
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(audit.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {audit.recommendations && audit.recommendations.length > 0 && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>
                              {audit.recommendations.length} recommendation
                              {audit.recommendations.length !== 1 ? "s" : ""}
                            </span>
                            {audit.recommendations.filter((r) => r.priority === "high")
                              .length > 0 && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                                {audit.recommendations.filter((r) => r.priority === "high")
                                  .length}{" "}
                                High Priority
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/seo-audit/${audit._id}`);
                          }}
                          className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="View Audit"
                        >
                          <HiEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(audit._id, e)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Audit"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

