"use client";
import { useForm } from "react-hook-form";
import { HiX, HiMail, HiChatAlt } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function SupportModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    // TODO: Implement support email submission
    console.log("Support form data:", data);
    // Reset form after submission
    reset();
    // Close modal (will be handled by backend integration later)
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close"
        >
          <HiX className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-primary/10 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <HiChatAlt className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {t("dashboard.support.title")}
              </h2>
              <p className="text-sm text-gray-600">
                {t("dashboard.support.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t("dashboard.support.subject")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={t("dashboard.support.subjectPlaceholder")}
              {...register("subject", {
                required: t("dashboard.support.subjectRequired"),
                minLength: {
                  value: 3,
                  message: t("dashboard.support.subjectMinLength"),
                },
                maxLength: {
                  value: 200,
                  message: t("dashboard.support.subjectMaxLength"),
                },
              })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t("dashboard.support.email")} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <HiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder={t("dashboard.support.emailPlaceholder")}
                {...register("email", {
                  required: t("dashboard.support.emailRequired"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("dashboard.support.emailInvalid"),
                  },
                })}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              {t("dashboard.support.message")} <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={6}
              placeholder={t("dashboard.support.messagePlaceholder")}
              {...register("message", {
                required: t("dashboard.support.messageRequired"),
                minLength: {
                  value: 10,
                  message: t("dashboard.support.messageMinLength"),
                },
                maxLength: {
                  value: 2000,
                  message: t("dashboard.support.messageMaxLength"),
                },
              })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400 resize-none"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              {t("dashboard.common.cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              {t("dashboard.support.send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
