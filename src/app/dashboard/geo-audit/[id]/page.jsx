"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import { GeoAuditService } from "@/services/geoAuditService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";
import { HiXCircle } from "react-icons/hi";
import GeoAuditHeader from "@/components/geo-audit/view/GeoAuditHeader";
import GeoAuditStats from "@/components/geo-audit/view/GeoAuditStats";
import AuditInfo from "@/components/geo-audit/view/AuditInfo";
import NAPConsistency from "@/components/geo-audit/view/NAPConsistency";
import CitationAnalysis from "@/components/geo-audit/view/CitationAnalysis";
import BusinessInformation from "@/components/geo-audit/view/BusinessInformation";
import RecommendationsTable from "@/components/geo-audit/view/RecommendationsTable";
import CompetitorsTable from "@/components/geo-audit/view/CompetitorsTable";

export default function GeoAuditResultsPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id;
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["geo-audit", auditId],
    queryFn: async () => {
      const response = await GeoAuditService.getAuditById(auditId);
      const { data } = handleResponse(response);
      return data.audit;
    },
    enabled: !!auditId,
  });

  const handleDownloadPDF = async () => {
    setIsDownloadingPDF(true);
    try {
      const response = await GeoAuditService.downloadPDF(auditId);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `geo-audit-${auditId}.pdf`;
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

  const handleRerun = (audit) => {
    router.push(`/dashboard/geo-audit/new?keyword=${encodeURIComponent(audit?.keyword || '')}&location=${encodeURIComponent(audit?.location || '')}`);
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
                onClick={() => router.push("/dashboard/geo-audit")}
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
          <GeoAuditHeader
            audit={audit}
            onRerun={() => handleRerun(audit)}
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

            <GeoAuditStats audit={audit} />

            {/* Info Grid: Audit Info, NAP, Citation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <AuditInfo audit={audit} onCopyToClipboard={handleCopyToClipboard} />
              <NAPConsistency napIssues={audit.napIssues} />
              <CitationAnalysis citationIssues={audit.citationIssues} />
            </div>

            <BusinessInformation businessInfo={audit.businessInfo} onCopyToClipboard={handleCopyToClipboard} />

            <RecommendationsTable recommendations={audit.recommendations} />

            <CompetitorsTable competitors={audit.competitors} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

