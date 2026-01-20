"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiX, HiMail, HiChatAlt } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";
import { toast } from "react-hot-toast";
import { SupportService } from "@/services/supportService";
import { handleError } from "@/utils/handleError";

export default function SupportModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await SupportService.submitSupportRequest({
        subject: data.subject,
        email: data.email,
        message: data.message,
      });
      toast.success(t("dashboard.support.messageSentSuccess"));
      reset();
      setTimeout(() => onClose(), 500);
    } catch (error) {
      toast.error(handleError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[80] flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-lg mx-3 sm:mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label={t("dashboard.common.close")}
        >
          <HiX className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="bg-primary/10 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-primary/20 rounded-lg flex-shrink-0">
              <HiChatAlt className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {t("dashboard.support.title")}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                {t("dashboard.support.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {/* Subject */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
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
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
            />
            {errors.subject && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
              {t("dashboard.support.email")} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <HiMail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
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
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
              {t("dashboard.support.message")} <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
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
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400 resize-none"
            />
            {errors.message && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-3 sm:pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              {t("dashboard.common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("dashboard.support.sending") : t("dashboard.support.send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
