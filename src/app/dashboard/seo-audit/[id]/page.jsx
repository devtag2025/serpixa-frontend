"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layout/Sidebar";
import { SEOAuditService } from "@/services/seoAuditService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";
import {
  HiCheckCircle,
  HiXCircle,
  HiExclamationCircle,
  HiDownload,
  HiArrowLeft,
  HiClipboardCopy,
  HiExternalLink,
  HiLightningBolt,
  HiLink,
  HiDocumentText,
  HiRefresh,
} from "react-icons/hi";

export default function SEOAuditResultsPage() {
  const params = useParams();
  const router = useRouter();
  const auditId = params.id;
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["seo-audit", auditId],
    queryFn: async () => {
      const response = await SEOAuditService.getAuditWithRawData(auditId);
      const { data } = handleResponse(response);
      return data.audit;
    },
    enabled: !!auditId,
  });

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

  const getScoreColor = (score) => {
    if (score >= 80) return { 
      text: "text-emerald-600", 
      bg: "bg-emerald-50", 
      border: "border-emerald-200", 
      badge: "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-500"
    };
    if (score >= 50) return { 
      text: "text-amber-600", 
      bg: "bg-amber-50", 
      border: "border-amber-200", 
      badge: "bg-amber-100 text-amber-700",
      dot: "bg-amber-500"
    };
    return { 
      text: "text-red-600", 
      bg: "bg-red-50", 
      border: "border-red-200", 
      badge: "bg-red-100 text-red-700",
      dot: "bg-red-500"
    };
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return { 
          bg: "bg-red-50", 
          border: "border-red-200", 
          text: "text-red-700", 
          badge: "bg-red-100 text-red-700", 
          dot: "bg-red-500",
          label: "High"
        };
      case "medium":
        return { 
          bg: "bg-amber-50", 
          border: "border-amber-200", 
          text: "text-amber-700", 
          badge: "bg-amber-100 text-amber-700", 
          dot: "bg-amber-500",
          label: "Medium"
        };
      case "low":
        return { 
          bg: "bg-blue-50", 
          border: "border-blue-200", 
          text: "text-blue-700", 
          badge: "bg-blue-100 text-blue-700", 
          dot: "bg-blue-500",
          label: "Low"
        };
      default:
        return { 
          bg: "bg-gray-50", 
          border: "border-gray-200", 
          text: "text-gray-700", 
          badge: "bg-gray-100 text-gray-700", 
          dot: "bg-gray-500",
          label: "Unknown"
        };
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
                onClick={() => router.push("/dashboard/seo-audit")}
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
  const scoreColors = getScoreColor(audit.score);
  
  // Calculate metrics
  const totalIssues = audit.recommendations?.length || 0;
  const totalLinks = (audit.checks?.links?.internal || 0) + (audit.checks?.links?.external || 0);
  const brokenLinks = audit.checks?.links?.broken || 0;
  const competitorsCount = audit.competitors?.length || 0;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          {/* Header Section */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">SEO Audit Results</h1>
                  <a
                    href={audit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    {audit.url}
                    <HiExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => router.push(`/dashboard/seo-audit?url=${encodeURIComponent(audit.url)}&keyword=${encodeURIComponent(audit.keyword || '')}`)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                  >
                    <HiRefresh className="w-4 h-4" />
                    Re-run Audit
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloadingPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm"
                  >
                    {isDownloadingPDF ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <HiDownload className="w-4 h-4" />
                        <span>Export PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

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

            {/* Top Summary Cards - Full Width Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* SEO Score Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-lg ${scoreColors.bg}`}>
                    <HiLightningBolt className={`w-5 h-5 ${scoreColors.text}`} />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">SEO Score</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-3xl font-bold ${scoreColors.text}`}>{audit.score}</span>
                  <span className="text-lg text-gray-400">/ 100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`${scoreColors.dot} h-1.5 rounded-full transition-all duration-500`}
                    style={{ width: `${audit.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Total Issues Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-red-50">
                    <HiExclamationCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Issues</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{totalIssues}</span>
                </div>
              </div>

              {/* Total Links Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-blue-50">
                    <HiLink className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Links</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{totalLinks}</span>
                  {brokenLinks > 0 && (
                    <span className="text-sm text-red-600 font-medium">({brokenLinks} broken)</span>
                  )}
                </div>
              </div>

              {/* Competitors Found Card */}
              {audit.keyword && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-purple-50">
                      <HiDocumentText className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Competitors</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{competitorsCount}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Row 1: On-Page Analysis | Audit Info + SERP Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              {/* LEFT SIDE - 8 Columns: On-Page Analysis */}
              <div className="lg:col-span-8">
                {/* On-Page Analysis */}
                {audit.checks && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">On-Page Analysis</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {audit.checks.title && (
                        <div className="px-6 py-4 flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-semibold text-gray-900">Title Tag</span>
                              {audit.checks.title.exists ? (
                                <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mb-1 break-words">
                              {audit.checks.title.value || "Not found"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Length: {audit.checks.title.length || 0} characters
                            </p>
                          </div>
                          {audit.checks.title.value && (
                            <button
                              onClick={() => handleCopyToClipboard(audit.checks.title.value, "Title")}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Copy title"
                            >
                              <HiClipboardCopy className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}

                      {audit.checks.description && (
                        <div className="px-6 py-4 flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-semibold text-gray-900">Meta Description</span>
                              {audit.checks.description.exists ? (
                                <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mb-1 break-words">
                              {audit.checks.description.value || "Not found"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Length: {audit.checks.description.length || 0} characters
                            </p>
                          </div>
                          {audit.checks.description.value && (
                            <button
                              onClick={() => handleCopyToClipboard(audit.checks.description.value, "Description")}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Copy description"
                            >
                              <HiClipboardCopy className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}

                      {audit.checks.h1 && (
                        <div className="px-6 py-4 flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-semibold text-gray-900">H1 Tag</span>
                              {audit.checks.h1.exists ? (
                                <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mb-1">
                              Count: <span className="font-semibold">{audit.checks.h1.count || 0}</span>
                            </p>
                            {audit.checks.h1.values && audit.checks.h1.values.length > 0 && (
                              <p className="text-xs text-gray-600 mt-1 break-words">
                                {audit.checks.h1.values.join(", ")}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {audit.checks.images && (
                        <div className="px-6 py-4 flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-semibold text-gray-900">Images</span>
                              {audit.checks.images.withoutAlt === 0 ? (
                                <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <HiXCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-700">
                              <span>Total: <span className="font-semibold">{audit.checks.images.total || 0}</span></span>
                              {audit.checks.images.withoutAlt > 0 && (
                                <span className="text-amber-600 font-semibold">
                                  Without alt: {audit.checks.images.withoutAlt}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {audit.checks.links && (
                        <div className="px-6 py-4 flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-semibold text-gray-900">Links</span>
                              {audit.checks.links.broken === 0 ? (
                                <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-700">
                              <span>Internal: <span className="font-semibold">{audit.checks.links.internal || 0}</span></span>
                              <span>External: <span className="font-semibold">{audit.checks.links.external || 0}</span></span>
                              {audit.checks.links.broken > 0 && (
                                <span className="text-red-600 font-semibold">
                                  Broken: {audit.checks.links.broken}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {audit.checks.canonical && (
                        <div className="px-6 py-4 flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-semibold text-gray-900">Canonical Tag</span>
                              {audit.checks.canonical.exists ? (
                                <HiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                              ) : (
                                <HiXCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                              )}
                            </div>
                            {audit.checks.canonical.value ? (
                              <>
                                <p className="text-sm text-gray-700 mb-2 break-all">
                                  {audit.checks.canonical.value}
                                </p>
                                <button
                                  onClick={() => handleCopyToClipboard(audit.checks.canonical.value, "Canonical URL")}
                                  className="text-xs text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
                                >
                                  <HiClipboardCopy className="w-3.5 h-3.5" />
                                  Copy URL
                                </button>
                              </>
                            ) : (
                              <p className="text-sm text-gray-500">Not found</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE - 4 Columns: Audit Info + SERP Info */}
              <div className="lg:col-span-4 space-y-6">
                {/* Audit Information */}
                {audit.serpInfo && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">SERP Information</h2>
                    </div>
                    <div className="px-6 py-4 space-y-4">
                      {audit.serpInfo.location && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</p>
                          <p className="text-sm text-gray-900">{audit.serpInfo.location}</p>
                        </div>
                      )}
                      {audit.serpInfo.language && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Language</p>
                          <p className="text-sm text-gray-900">{audit.serpInfo.language}</p>
                        </div>
                      )}
                      {audit.serpInfo.device && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Device</p>
                          <p className="text-sm text-gray-900 capitalize">{audit.serpInfo.device}</p>
                        </div>
                      )}
                      {audit.serpInfo.searchInfo?.seResultsCount && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Results</p>
                          <p className="text-sm text-gray-900">
                            {audit.serpInfo.searchInfo.seResultsCount.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Audit Information</h2>
                  </div>
                  <div className="px-6 py-4 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">URL</p>
                        <button
                          onClick={() => handleCopyToClipboard(audit.url, "URL")}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Copy URL"
                        >
                          <HiClipboardCopy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-900 break-all">{audit.url}</p>
                    </div>
                    {audit.keyword && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Target Keyword</p>
                          <button
                            onClick={() => handleCopyToClipboard(audit.keyword, "Keyword")}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Copy Keyword"
                          >
                            <HiClipboardCopy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-900">{audit.keyword}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Date</p>
                      <p className="text-sm text-gray-900">
                        {new Date(audit.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${
                          audit.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : audit.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {audit.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SERP Information */}
                {/* {audit.serpInfo && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-gray-900">SERP Information</h2>
                    </div>
                    <div className="px-6 py-4 space-y-4">
                      {audit.serpInfo.location && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</p>
                          <p className="text-sm text-gray-900">{audit.serpInfo.location}</p>
                        </div>
                      )}
                      {audit.serpInfo.language && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Language</p>
                          <p className="text-sm text-gray-900">{audit.serpInfo.language}</p>
                        </div>
                      )}
                      {audit.serpInfo.device && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Device</p>
                          <p className="text-sm text-gray-900 capitalize">{audit.serpInfo.device}</p>
                        </div>
                      )}
                      {audit.serpInfo.searchInfo?.seResultsCount && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Results</p>
                          <p className="text-sm text-gray-900">
                            {audit.serpInfo.searchInfo.seResultsCount.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )} */}
              </div>
            </div>

            {/* Row 2: Recommendations - Full Width */}
            {audit.recommendations && audit.recommendations.length > 0 && (
              <div className="mb-6">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recommendations</h2>
                    <p className="text-sm text-gray-500 mt-1">{audit.recommendations.length} issues found</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Severity</span>
                          </th>
                          <th className="px-6 py-3 text-left">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Issue</span>
                          </th>
                          <th className="px-6 py-3 text-left">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</span>
                          </th>
                          <th className="px-6 py-3 text-left">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {audit.recommendations.map((rec, index) => {
                          const priorityColors = getPriorityColor(rec.priority);
                          return (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50 hover:bg-gray-50 transition-colors"}>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full ${priorityColors.dot}`}></span>
                                  <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors.badge}`}>
                                    {priorityColors.label}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm font-medium text-gray-900">{rec.issue}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-gray-700 line-clamp-2">{rec.action}</span>
                              </td>
                              <td className="px-6 py-4">
                                <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                                  Learn More →
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Row 3: Competitor Analysis - Full Width */}
            {audit.keyword && audit.competitors && audit.competitors.length > 0 && (
              <div>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Competitor Analysis</h2>
                    <p className="text-sm text-gray-500 mt-1">Top {Math.min(competitorsCount, 10)} competitors</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Rank</span>
                          </th>
                          <th className="px-6 py-3 text-left">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</span>
                          </th>
                          <th className="px-6 py-3 text-left">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Domain</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {audit.competitors.slice(0, 10).map((competitor, index) => (
                          <tr key={competitor._id || competitor.position || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50 hover:bg-gray-50 transition-colors"}>
                            <td className="px-6 py-3">
                              <span className="text-sm font-semibold text-primary">#{competitor.position}</span>
                            </td>
                            <td className="px-6 py-3">
                              <a
                                href={competitor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-900 hover:text-primary transition-colors line-clamp-2 flex items-start gap-1"
                              >
                                {competitor.title || "No title"}
                                <HiExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-60" />
                              </a>
                            </td>
                            <td className="px-6 py-3">
                              <span className="text-xs text-gray-600 truncate block max-w-[150px]">
                                {competitor.domain || new URL(competitor.url || '').hostname}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
