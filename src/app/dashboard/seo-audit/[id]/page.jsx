"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SEOAuditService } from "@/services/seoAuditService";
import { handleError } from "@/utils/handleError";
import { toast } from "react-hot-toast";
import { HiXCircle } from "react-icons/hi";
import { useSEOAudit } from "@/hooks/seoAuditHooks";
import SEOAuditHeader from "@/components/seo-audit/view/SEOAuditHeader";
import SEOAuditStats from "@/components/seo-audit/view/SEOAuditStats";
import OnPageAnalysis from "@/components/seo-audit/view/OnPageAnalysis";
import SERPInfo from "@/components/seo-audit/view/SERPInfo";
import AuditInfo from "@/components/seo-audit/view/AuditInfo";
import RecommendationsTable from "@/components/seo-audit/view/RecommendationsTable";
import CompetitorsTable from "@/components/seo-audit/view/CompetitorsTable";

export default function SEOAuditResultsPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id;
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  const { data: audit, isLoading, isError, error } = useSEOAudit(auditId);

  const handleDownloadPDF = async () => {
    setIsDownloadingPDF(true);
    try {
      const response = await SEOAuditService.downloadPDF(auditId);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `seo-audit-${auditId}.pdf`;
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

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading audit results...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <HiXCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Audit</h2>
            <p className="text-gray-600 mb-6">{handleError(error) || "An error occurred while loading the audit"}</p>
            <button
              onClick={() => router.push("/dashboard/seo-audit")}
              className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Back to Audits
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!audit) return null;

  return (
    <DashboardLayout>
      <SEOAuditHeader
        audit={audit}
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

            <SEOAuditStats audit={audit} />

            {/* Row 1: On-Page Analysis | Audit Info + SERP Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              {/* LEFT SIDE - 8 Columns: On-Page Analysis */}
              <div className="lg:col-span-8">
                <OnPageAnalysis checks={audit.checks} onCopyToClipboard={handleCopyToClipboard} />
              </div>

              {/* RIGHT SIDE - 4 Columns: SERP Info + Audit Info */}
              <div className="lg:col-span-4 space-y-6">
                <SERPInfo serpInfo={audit.serpInfo} />
                <AuditInfo audit={audit} onCopyToClipboard={handleCopyToClipboard} />
              </div>
            </div>

            {/* Row 2: Recommendations - Full Width */}
            <RecommendationsTable recommendations={audit.recommendations} />

            {/* Row 3: Competitor Analysis - Full Width */}
            <CompetitorsTable competitors={audit.competitors} keyword={audit.keyword} />
          </div>
    </DashboardLayout>
  );
}
