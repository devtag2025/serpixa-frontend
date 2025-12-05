import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubscriptionService } from "@/services/subscriptionService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";

// Query keys
export const subscriptionKeys = {
  all: ["subscriptions"],
  plans: (type) => [...subscriptionKeys.all, "plans", type],
  current: () => [...subscriptionKeys.all, "current"],
  credits: () => [...subscriptionKeys.all, "credits"],
};

/**
 * Get available plans (subscriptions and addons)
 */
export function usePlans(type = null) {
  return useQuery({
    queryKey: subscriptionKeys.plans(type),
    queryFn: async () => {
      const response = await SubscriptionService.getAvailablePlans(type);
      const { data } = handleResponse(response);
      return data.plans || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

/**
 * Get current user's subscription
 */
export function useCurrentSubscription() {
  return useQuery({
    queryKey: subscriptionKeys.current(),
    queryFn: async () => {
      const response = await SubscriptionService.getCurrentSubscription();
      const { data } = handleResponse(response);
      return data;
    },
    retry: (failureCount, error) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
}

/**
 * Get user's credits
 */
export function useCredits() {
  return useQuery({
    queryKey: subscriptionKeys.credits(),
    queryFn: async () => {
      const response = await SubscriptionService.getCredits();
      const { data } = handleResponse(response);
      return data;
    },
    retry: (failureCount, error) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });
}

/**
 * Create checkout session mutation
 */
export function useCreateCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SubscriptionService.createCheckout,
    onSuccess: (response) => {
      const { data } = handleResponse(response);
      // Redirect to Stripe checkout
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        toast.error("Failed to get checkout URL");
      }
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Failed to create checkout session");
      console.error("Checkout failed:", message);
    },
  });
}

/**
 * Create billing portal session mutation
 */
export function useCreatePortalSession() {
  return useMutation({
    mutationFn: SubscriptionService.createPortalSession,
    onSuccess: (response) => {
      const { data } = handleResponse(response);
      // Redirect to Stripe billing portal
      if (data.portal_url) {
        window.location.href = data.portal_url;
      } else {
        toast.error("Failed to get portal URL");
      }
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Failed to create portal session");
      console.error("Portal session failed:", message);
    },
  });
}

