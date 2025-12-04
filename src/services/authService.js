import api from "@/lib/api";

export const AuthService = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  resetPassword: (data) => api.post("/auth/reset-password", data),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  resendVerification: (data) => api.post("/auth/resend-verification", data),
  getProfile: () => api.get("/auth/profile"),
  logout: () => api.post("/auth/logout"),
};
