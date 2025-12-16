import api from "@/lib/api";

export const DashboardService = {
  getCredits: () => api.get("/dashboard/credits"),
  getStats: () => api.get("/dashboard/stats"),
};
