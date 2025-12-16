import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GBPAuditService } from "@/services/gbpAuditService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";

// Query keys for GBP audits
export const gbpAuditKeys = {
  all: ["gbpAudits"],
  lists: () => [...gbpAuditKeys.all, "list"],
  list: (filters) => [...gbpAuditKeys.lists(), { filters }],
  details: () => [...gbpAuditKeys.all, "detail"],
  detail: (id) => [...gbpAuditKeys.details(), id],
  raw: (id) => [...gbpAuditKeys.detail(id), "raw"],
};

/**
 * Hook to run a new GBP audit
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useRunGBPAudit() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: GBPAuditService.runAudit,
    onSuccess: (response) => {
      const { data } = handleResponse(response);
      toast.success("GBP audit completed successfully!");
      // Invalidate the list query to refetch audits
      queryClient.invalidateQueries({ queryKey: gbpAuditKeys.lists() });
      // Navigate to the audit detail page
      router.push(`/dashboard/gbp-audit/${data.audit._id}`);
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Failed to run GBP audit");
    },
  });
}

/**
 * Hook to fetch a single GBP audit by ID
 * @param {string} auditId - The audit ID
 * @param {Object} options - Query options (enabled, etc.)
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useGBPAudit(auditId, options = {}) {
  return useQuery({
    queryKey: gbpAuditKeys.detail(auditId),
    queryFn: async () => {
      const response = await GBPAuditService.getAuditById(auditId);
      const { data } = handleResponse(response);
      return data.audit;
    },
    enabled: !!auditId && (options.enabled !== false),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    ...options,
  });
}

/**
 * Hook to fetch GBP audit with raw data
 * @param {string} auditId - The audit ID
 * @param {Object} options - Query options
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useGBPAuditRaw(auditId, options = {}) {
  return useQuery({
    queryKey: gbpAuditKeys.raw(auditId),
    queryFn: async () => {
      const response = await GBPAuditService.getAuditWithRawData(auditId);
      const { data } = handleResponse(response);
      return data.audit;
    },
    enabled: !!auditId && (options.enabled !== false),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    ...options,
  });
}

/**
 * Hook to fetch list of GBP audits for the current user
 * @param {Object} params - Query parameters (page, limit, search, etc.)
 * @param {Object} options - Query options
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useGBPAudits(params = {}, options = {}) {
  return useQuery({
    queryKey: gbpAuditKeys.list(params),
    queryFn: async () => {
      const response = await GBPAuditService.getUserAudits(params);
      const { data } = handleResponse(response);
      return data;
    },
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    ...options,
  });
}

/**
 * Hook to delete a GBP audit
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useDeleteGBPAudit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: GBPAuditService.deleteAudit,
    onSuccess: (response, auditId) => {
      const { message } = handleResponse(response);
      toast.success(message || "Audit deleted successfully");
      // Remove the specific audit from cache
      queryClient.removeQueries({ queryKey: gbpAuditKeys.detail(auditId) });
      // Invalidate the list to refetch
      queryClient.invalidateQueries({ queryKey: gbpAuditKeys.lists() });
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Failed to delete audit");
    },
  });
}

/**
 * Hook to download GBP audit PDF
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useDownloadGBPAuditPDF() {
  return useMutation({
    mutationFn: (auditId, view = false) => GBPAuditService.downloadPDF(auditId, view),
    onSuccess: (blob, auditId) => {
      // Create a download link
      const url = window.URL.createObjectURL(blob.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `gbp-audit-${auditId}.pdf`;
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

