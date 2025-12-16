import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SEOAuditService } from "@/services/seoAuditService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";

// Query keys for SEO audits
export const seoAuditKeys = {
  all: ["seoAudits"],
  lists: () => [...seoAuditKeys.all, "list"],
  list: (filters) => [...seoAuditKeys.lists(), { filters }],
  details: () => [...seoAuditKeys.all, "detail"],
  detail: (id) => [...seoAuditKeys.details(), id],
  raw: (id) => [...seoAuditKeys.detail(id), "raw"],
};

/**
 * Hook to run a new SEO audit
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useRunSEOAudit() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: SEOAuditService.runAudit,
    onSuccess: (response) => {
      const { data } = handleResponse(response);
      toast.success("SEO audit completed successfully!");
      // Invalidate the list query to refetch audits
      queryClient.invalidateQueries({ queryKey: seoAuditKeys.lists() });
      // Navigate to the audit detail page
      router.push(`/dashboard/seo-audit/${data.audit._id}`);
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Failed to run SEO audit");
    },
  });
}

/**
 * Hook to fetch a single SEO audit by ID
 * @param {string} auditId - The audit ID
 * @param {Object} options - Query options (enabled, etc.)
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useSEOAudit(auditId, options = {}) {
  return useQuery({
    queryKey: seoAuditKeys.detail(auditId),
    queryFn: async () => {
      const response = await SEOAuditService.getAuditById(auditId);
      const { data } = handleResponse(response);
      return data.audit;
    },
    enabled: !!auditId && (options.enabled !== false),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    ...options,
  });
}

/**
 * Hook to fetch SEO audit with raw data
 * @param {string} auditId - The audit ID
 * @param {Object} options - Query options
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useSEOAuditRaw(auditId, options = {}) {
  return useQuery({
    queryKey: seoAuditKeys.raw(auditId),
    queryFn: async () => {
      const response = await SEOAuditService.getAuditWithRawData(auditId);
      const { data } = handleResponse(response);
      return data.audit;
    },
    enabled: !!auditId && (options.enabled !== false),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    ...options,
  });
}

/**
 * Hook to fetch list of SEO audits for the current user
 * @param {Object} params - Query parameters (page, limit, search, etc.)
 * @param {Object} options - Query options
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useSEOAudits(params = {}, options = {}) {
  return useQuery({
    queryKey: seoAuditKeys.list(params),
    queryFn: async () => {
      const response = await SEOAuditService.getUserAudits(params);
      const { data } = handleResponse(response);
      return data;
    },
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    ...options,
  });
}

/**
 * Hook to delete an SEO audit
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useDeleteSEOAudit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SEOAuditService.deleteAudit,
    onSuccess: (response, auditId) => {
      const { message } = handleResponse(response);
      toast.success(message || "Audit deleted successfully");
      // Remove the specific audit from cache
      queryClient.removeQueries({ queryKey: seoAuditKeys.detail(auditId) });
      // Invalidate the list to refetch
      queryClient.invalidateQueries({ queryKey: seoAuditKeys.lists() });
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Failed to delete audit");
    },
  });
}

/**
 * Hook to download SEO audit PDF
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useDownloadSEOAuditPDF() {
  return useMutation({
    mutationFn: SEOAuditService.downloadPDF,
    onSuccess: (blob, auditId) => {
      // Create a download link
      const url = window.URL.createObjectURL(blob.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `seo-audit-${auditId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("PDF downloaded successfully");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Failed to download PDF");
    },
  });
}
