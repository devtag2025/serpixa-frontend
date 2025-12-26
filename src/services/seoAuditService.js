import api from "@/lib/api";

export const SEOAuditService = {
  runAudit: (data) => api.post("/seo-audits", data),
  getAuditById: (auditId) => api.get(`/seo-audits/${auditId}`),
  getAuditWithRawData: (auditId) => api.get(`/seo-audits/${auditId}/raw`),
  getUserAudits: (params) => api.get("/seo-audits", { params }),
  deleteAudit: (auditId) => api.delete(`/seo-audits/${auditId}`),
  downloadPDF: (auditId) =>
    api.get(`/seo-audits/${auditId}/pdf`, {
      responseType: "blob",
    }),
};

