"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import { GBPAuditService } from "@/services/gbpAuditService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";
import { HiXCircle } from "react-icons/hi";
import GBPAuditHeader from "@/components/gbp-audit/view/GBPAuditHeader";
import GBPAuditStats from "@/components/gbp-audit/view/GBPAuditStats";
import BusinessInfo from "@/components/gbp-audit/view/BusinessInfo";
import Checklist from "@/components/gbp-audit/view/Checklist";
import AuditInfo from "@/components/gbp-audit/view/AuditInfo";
import RecommendationsTable from "@/components/gbp-audit/view/RecommendationsTable";

export default function GBPAuditResultsPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id;
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["gbp-audit", auditId],
    queryFn: async () => {
      const response = await GBPAuditService.getAuditById(auditId);
      const { data } = handleResponse(response);
      return data.audit;
    },
    enabled: !!auditId,
  });

  const handleDownloadPDF = async () => {
    setIsDownloadingPDF(true);
    try {
      const response = await GBPAuditService.downloadPDF(auditId);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gbp-audit-${auditId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      const message = handleError(error);
      toast.error(message || "Failed to download PDF");
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  const handleCopyToClipboard = async (text, label = "Text") => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleRerun = () => {
    router.push(`/dashboard/gbp-audit/new?businessName=${encodeURIComponent(audit?.businessName || '')}`);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading audit results...</p>
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
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <HiXCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Audit</h2>
              <p className="text-gray-600 mb-6">{handleError(error) || "An error occurred while loading the audit"}</p>
              <button
                onClick={() => router.push("/dashboard/gbp-audit")}
                className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Back to Audits
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!data) return null;

  const audit = data;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <GBPAuditHeader
            audit={audit}
            onRerun={handleRerun}
            onDownloadPDF={handleDownloadPDF}
            isDownloadingPDF={isDownloadingPDF}
          />

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Error Alert */}
            {audit.status === "failed" && audit.error_message && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiXCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">Audit Failed</h3>
                    <p className="text-sm text-red-700">{audit.error_message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Not Found Alert */}
            {audit.status === "not_found" && (
              <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <HiXCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">Business Not Found</h3>
                    <p className="text-sm text-amber-700">
                      We couldn't find your business on Google Business Profile. Please verify the business name or GBP link.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <GBPAuditStats audit={audit} />

            {/* Row 1: Checklist | Audit Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              {/* LEFT SIDE - 8 Columns: Checklist */}
              <div className="lg:col-span-8">
                <Checklist checklist={audit.checklist} />
              </div>

              {/* RIGHT SIDE - 4 Columns: Audit Info */}
              <div className="lg:col-span-4">
                <AuditInfo audit={audit} onCopyToClipboard={handleCopyToClipboard} />
              </div>
            </div>

            {/* Row 2: Business Information - Full Width */}
            <BusinessInfo businessInfo={audit.businessInfo} onCopyToClipboard={handleCopyToClipboard} />

            {/* Row 3: Recommendations - Full Width */}
            <RecommendationsTable recommendations={audit.recommendations} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

