import api from "@/lib/api";

export const GBPAuditService = {
  runAudit: (data) => api.post("/gbp-audits", data),
  getAuditById: (auditId) => api.get(`/gbp-audits/${auditId}`),
  getAuditWithRawData: (auditId) => api.get(`/gbp-audits/${auditId}`),
  getUserAudits: (params) => api.get("/gbp-audits", { params }),
  deleteAudit: (auditId) => api.delete(`/gbp-audits/${auditId}`),
  downloadPDF: (auditId, view = false) =>
    api.get(`/gbp-audits/${auditId}/pdf`, { 
      responseType: "blob",
      params: view ? { view: true } : undefined,
    }),
};

