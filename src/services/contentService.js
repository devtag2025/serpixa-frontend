import api from "@/lib/api";

export const ContentService = {
  generateContent: (data) => api.post("/claude/content-optimization", data),
  getContentById: (contentId) => api.get(`/claude/content/${contentId}`),
  getUserContent: (params) => api.get("/claude/content", { params }),
  deleteContent: (contentId) => api.delete(`/claude/content/${contentId}`),
};

