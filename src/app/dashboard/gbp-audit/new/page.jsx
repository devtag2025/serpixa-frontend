"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import { GBPAuditService } from "@/services/gbpAuditService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";
import GBPAuditForm from "@/components/gbp-audit/new/GBPAuditForm";

export default function NewGBPAuditPage() {
  const router = useRouter();

  const { mutate: runAudit, isPending } = useMutation({
    mutationFn: GBPAuditService.runAudit,
    onSuccess: (response) => {
      const { data } = handleResponse(response);
      toast.success("GBP audit completed successfully!");
      router.push(`/dashboard/gbp-audit/${data.audit._id}`);
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Failed to run GBP audit");
    },
  });

  const handleFormSubmit = (payload) => {
    runAudit(payload);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                New GBP Audit
              </h1>
              <p className="text-gray-600 mt-2">
                Analyze your Google Business Profile optimization and completeness
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <GBPAuditForm onSubmit={handleFormSubmit} isPending={isPending} />
            </div>

            {/* Info Section */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                What will be analyzed?
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Business information completeness (name, address, phone, website)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Category optimization and additional categories</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Business description and hours</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Photos, ratings, reviews, and business attributes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Optimization score and actionable recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

