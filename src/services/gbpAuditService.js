import api from "@/lib/api";

export const GBPAuditService = {
  runAudit: (data) => api.post("/gbp-audits", data),
  getAuditById: (auditId) => api.get(`/gbp-audits/${auditId}`),
  getAuditWithRawData: (auditId) => api.get(`/gbp-audits/${auditId}/raw`),
  getUserAudits: (params) => api.get("/gbp-audits", { params }),
  deleteAudit: (auditId) => api.delete(`/gbp-audits/${auditId}`),
  downloadPDF: (auditId) =>
    api.get(`/gbp-audits/${auditId}/pdf`, { responseType: "blob" }),
};

