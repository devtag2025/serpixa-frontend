import api from "@/lib/api";

export const GeoAuditService = {
  runAudit: (data) => api.post("/geo-audits", data),
  getAuditById: (auditId) => api.get(`/geo-audits/${auditId}`),
  getAuditWithRawData: (auditId) => api.get(`/geo-audits/${auditId}/raw`),
  getUserAudits: (params) => api.get("/geo-audits", { params }),
  deleteAudit: (auditId) => api.delete(`/geo-audits/${auditId}`),
  downloadPDF: (auditId) =>
    api.get(`/geo-audits/${auditId}/pdf`, { responseType: "blob" }),
};

