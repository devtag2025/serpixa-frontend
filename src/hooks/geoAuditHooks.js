import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GeoAuditService } from "@/services/geoAuditService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";
import { useTranslation } from "@/i18n/context";

// Query keys for Geo audits
export const geoAuditKeys = {
  all: ["geoAudits"],
  lists: () => [...geoAuditKeys.all, "list"],
  list: (filters) => [...geoAuditKeys.lists(), { filters }],
  details: () => [...geoAuditKeys.all, "detail"],
  detail: (id) => [...geoAuditKeys.details(), id],
  raw: (id) => [...geoAuditKeys.detail(id), "raw"],
};

/**
 * Hook to run a new Geo audit
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useRunGeoAudit() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: GeoAuditService.runAudit,
    onSuccess: (response) => {
      const { data } = handleResponse(response);
      toast.success(t("dashboard.common.toast.localSeoAuditCompletedSuccess"));
      // Invalidate the list query to refetch audits
      queryClient.invalidateQueries({ queryKey: geoAuditKeys.lists() });
      // Navigate to the audit detail page
      router.push(`/dashboard/local-seo/${data.audit._id}`);
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.localSeoAuditRunError"));
    },
  });
}

/**
 * Hook to fetch a single Geo audit by ID
 * @param {string} auditId - The audit ID
 * @param {Object} options - Query options (enabled, etc.)
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useGeoAudit(auditId, options = {}) {
  return useQuery({
    queryKey: geoAuditKeys.detail(auditId),
    queryFn: async () => {
      const response = await GeoAuditService.getAuditById(auditId);
      const { data } = handleResponse(response);
      return data.audit;
    },
    enabled: !!auditId && (options.enabled !== false),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    ...options,
  });
}

/**
 * Hook to fetch Geo audit with raw data
 * @param {string} auditId - The audit ID
 * @param {Object} options - Query options
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useGeoAuditRaw(auditId, options = {}) {
  return useQuery({
    queryKey: geoAuditKeys.raw(auditId),
    queryFn: async () => {
      const response = await GeoAuditService.getAuditWithRawData(auditId);
      const { data } = handleResponse(response);
      return data.audit;
    },
    enabled: !!auditId && (options.enabled !== false),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    ...options,
  });
}

/**
 * Hook to fetch list of Geo audits for the current user
 * @param {Object} params - Query parameters (page, limit, search, etc.)
 * @param {Object} options - Query options
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useGeoAudits(params = {}, options = {}) {
  return useQuery({
    queryKey: geoAuditKeys.list(params),
    queryFn: async () => {
      const response = await GeoAuditService.getUserAudits(params);
      const { data } = handleResponse(response);
      return data;
    },
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    keepPreviousData: true, // Keep previous data visible while fetching new page
    ...options,
  });
}

/**
 * Hook to delete a Geo audit
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useDeleteGeoAudit() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: GeoAuditService.deleteAudit,
    onSuccess: (response, auditId) => {
      toast.success(t("dashboard.common.toast.localSeoAuditDeleteSuccess"));
      // Remove the specific audit from cache
      queryClient.removeQueries({ queryKey: geoAuditKeys.detail(auditId) });
      // Invalidate the list to refetch
      queryClient.invalidateQueries({ queryKey: geoAuditKeys.lists() });
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.localSeoAuditDeleteError"));
    },
  });
}

/**
 * Hook to download Geo audit PDF
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useDownloadGeoAuditPDF() {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: GeoAuditService.downloadPDF,
    onSuccess: (blob, auditId) => {
      // Create a download link
      const url = window.URL.createObjectURL(blob.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `local-seo-audit-${auditId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success(t("dashboard.common.toast.pdfDownloadedSuccess"));
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.pdfDownloadError"));
    },
  });
}

