import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";
import { ContentService } from "@/services/contentService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";
import { useTranslation } from "@/i18n/context";

// Query keys for AI Content
export const aiContentKeys = {
  all: ["aiContent"],
  lists: () => [...aiContentKeys.all, "list"],
  list: (filters) => [...aiContentKeys.lists(), { filters }],
  details: () => [...aiContentKeys.all, "detail"],
  detail: (id) => [...aiContentKeys.details(), id],
};

/**
 * Hook to generate new AI content
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useGenerateAIContent() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ContentService.generateContent,
    onSuccess: (response) => {
      handleResponse(response);
      queryClient.invalidateQueries({ queryKey: aiContentKeys.lists() });
      // Intentionally no redirect here; success toast is handled at call site
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.contentGenerateError"));
    },
  });
}

/**
 * Hook to fetch a single AI content by ID
 * @param {string} contentId - The content ID
 * @param {Object} options - Query options (enabled, etc.)
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useAIContent(contentId, options = {}) {
  return useQuery({
    queryKey: aiContentKeys.detail(contentId),
    queryFn: async () => {
      const response = await ContentService.getContentById(contentId);
      const { data } = handleResponse(response);
      return data.content;
    },
    enabled: !!contentId && (options.enabled !== false),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    ...options,
  });
}

/**
 * Hook to fetch list of AI content for the current user
 * @param {Object} params - Query parameters (page, limit, keyword, etc.)
 * @param {Object} options - Query options
 * @returns {Object} Query object with data, isLoading, error, etc.
 */
export function useAIContents(params = {}, options = {}) {
  return useQuery({
    queryKey: aiContentKeys.list(params),
    queryFn: async () => {
      const response = await ContentService.getUserContent(params);
      const { data } = handleResponse(response);
      return data;
    },
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    keepPreviousData: true, // Keep previous data visible while fetching new page
    ...options,
  });
}

/**
 * Hook to delete AI content
 * @returns {Object} Mutation object with mutate, isPending, etc.
 */
export function useDeleteAIContent() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ContentService.deleteContent,
    onSuccess: (response, contentId) => {
      toast.success(t("dashboard.common.toast.contentDeletedSuccess"));
      // Remove the specific content from cache
      queryClient.removeQueries({ queryKey: aiContentKeys.detail(contentId) });
      // Invalidate the list to refetch
      queryClient.invalidateQueries({ queryKey: aiContentKeys.lists() });
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.contentDeleteError"));
    },
  });
}

