import api from "@/lib/api";

export const SupportService = {
  /**
   * Submit a support request.
   * @param {object} payload - { subject, email, message, name? }
   * @returns {Promise<{ data: { ticketId } }>}
   */
  submitSupportRequest: (payload) =>
    api.post("/support", {
      subject: payload.subject,
      email: payload.email,
      message: payload.message,
      ...(payload.name && { name: payload.name }),
    }),
};
