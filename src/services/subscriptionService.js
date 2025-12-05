import api from "@/lib/api";

export const SubscriptionService = {
  // Get available plans (public endpoint)
  getAvailablePlans: (type) => {
    const params = type ? { type } : {};
    return api.get("/subscriptions/plans", { params });
  },

  // Get current user's subscription (protected)
  getCurrentSubscription: () => api.get("/subscriptions/current"),

  // Get user's credits (protected)
  getCredits: () => api.get("/subscriptions/credits"),

  // Create checkout session (protected)
  createCheckout: (data) => api.post("/subscriptions/checkout", data),

  // Create billing portal session (protected)
  createPortalSession: () => api.post("/subscriptions/portal"),
};

