"use client";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { handleError } from "@/utils/handleError";
import { HiXCircle } from "react-icons/hi";
import GBPAuditHeader from "@/components/gbp-audit/view/GBPAuditHeader";
import GBPAuditStats from "@/components/gbp-audit/view/GBPAuditStats";
import BusinessInfo from "@/components/gbp-audit/view/BusinessInfo";
import Checklist from "@/components/gbp-audit/view/Checklist";
import AuditInfo from "@/components/gbp-audit/view/AuditInfo";
import RecommendationsTable from "@/components/gbp-audit/view/RecommendationsTable";
import { useGBPAuditRaw, useDownloadGBPAuditPDF } from "@/hooks/gbpAuditHooks";

export default function GBPAuditResultsPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id;

  const { data, isLoading, isError, error } = useGBPAuditRaw(auditId);
  const { mutate: downloadPDF, isPending: isDownloadingPDF } = useDownloadGBPAuditPDF();

  const handleDownloadPDF = () => {
    downloadPDF(auditId);
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
              onClick={() => router.push("/dashboard/gbp-audit")}
              className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Back to Audits
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) return null;

  const audit = data;

  return (
    <DashboardLayout>
      <GBPAuditHeader
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
    </DashboardLayout>
  );
}

