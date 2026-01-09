"use client";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiSearch, HiGlobe } from "react-icons/hi";
// import { HiDeviceMobile } from "react-icons/hi"; // Used in commented advanced options
import { useTranslation } from "@/i18n/context";
import SEOAuditLocaleSelect from "./SEOAuditLocaleSelect";
import { isValidUrlFormat } from "@/utils/urlNormalizer";

export default function SEOAuditForm({ onSubmit, isPending }) {
  const { t } = useTranslation();
  // const [showAdvanced, setShowAdvanced] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Website URL */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t("dashboard.seoAudit.form.websiteUrl")} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiGlobe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t("dashboard.seoAudit.form.websiteUrlPlaceholder")}
            {...register("url", {
              required: "Website URL is required",
              validate: {
                validUrl: (value) => {
                  if (!value) return true; // required handles empty
                  return isValidUrlFormat(value) || "Please enter a valid URL (e.g., example.com, www.example.com, or https://example.com)";
                }
              }
            })}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
          />
        </div>
        {errors.url && (
          <p className="mt-2 text-sm text-red-600">
            {errors.url.message}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          {t("dashboard.seoAudit.form.websiteUrlHelp")}
        </p>
      </div>

      {/* Target Keyword */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t("dashboard.seoAudit.form.targetKeyword")}
           {/* <span className="text-gray-400">({t("dashboard.common.optional")})</span> */}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t("dashboard.seoAudit.form.targetKeywordPlaceholder")}
            {...register("keyword", {
              maxLength: {
                value: 100,
                message: "Keyword must be less than 100 characters",
              },
            })}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
          />
        </div>
        {errors.keyword && (
          <p className="mt-2 text-sm text-red-600">
            {errors.keyword.message}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          {t("dashboard.seoAudit.form.targetKeywordHelp")}
        </p>
      </div>

      {/* Locale */}
      <div>
        {/* <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t("dashboard.seoAudit.form.locale")} <span className="text-gray-400">({t("dashboard.common.optional")})</span>
        </label> */}
        <SEOAuditLocaleSelect register={register} />
        <p className="mt-2 text-xs text-gray-500">
          {t("dashboard.seoAudit.form.localeHelp")}
        </p>
      </div>

      {/* Advanced Options - Commented out */}
      {/* 
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          {showAdvanced ? (t("dashboard.seoAudit.form.hideAdvanced") || "Hide Advanced") : (t("dashboard.seoAudit.form.showAdvanced") || "Show Advanced")}
          <span className="ml-1">{showAdvanced ? "−" : "+"}</span>
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {t("dashboard.seoAudit.form.device") || "Device"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiDeviceMobile className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register("device")}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 bg-white"
                  defaultValue="desktop"
                >
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                </select>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {t("dashboard.seoAudit.form.deviceHelp") || "Select the device type for the audit"}
              </p>
            </div>
          </div>
        )}
      </div>
      */}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>{t("dashboard.seoAudit.form.runningAudit")}</span>
            </>
          ) : (
            <>
              <HiSearch className="h-5 w-5" />
              <span>{t("dashboard.seoAudit.form.runAudit")}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

