"use client";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOfficeBuilding, HiLink, HiGlobe } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";
import GBPAuditLocaleSelect from "./GBPAuditLocaleSelect";
import { isValidUrlFormat } from "@/utils/urlNormalizer";

export default function GBPAuditForm({ onSubmit, isPending }) {
  const { t } = useTranslation();
  // const [showAdvanced, setShowAdvanced] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const payload = {
      businessName: data.businessName.trim(), // Required
      // Only include gbpLink if it has a value (optional, helps with accuracy)
      ...(data.gbpLink?.trim() && { gbpLink: data.gbpLink.trim() }),
      ...(data.locale && { locale: data.locale }),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Business Name - REQUIRED */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t("dashboard.gbpAudit.form.businessName")} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiOfficeBuilding className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t("dashboard.gbpAudit.form.businessNamePlaceholder")}
            {...register("businessName", {
              required: t("dashboard.gbpAudit.form.businessNameRequired") || "Business name is required",
              minLength: {
                value: 2,
                message: t("dashboard.gbpAudit.form.businessNameMinLength") || "Business name must be at least 2 characters",
              },
              maxLength: {
                value: 200,
                message: t("dashboard.gbpAudit.form.businessName") + " must be less than 200 characters",
              },
            })}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
          />
        </div>
        {errors.businessName && (
          <p className="mt-2 text-sm text-red-600">
            {errors.businessName.message}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          {t("dashboard.gbpAudit.form.businessNameHelpDetailed")}
        </p>
      </div>

      {/* GBP Link - OPTIONAL (improves accuracy) */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t("dashboard.gbpAudit.form.gbpLink")} <span className="text-gray-400">({t("dashboard.common.optional")})</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiLink className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t("dashboard.gbpAudit.form.gbpLinkPlaceholder")}
            {...register("gbpLink", {
              validate: (value) => {
                if (value && value.trim() && !isValidUrlFormat(value)) {
                  return t("dashboard.gbpAudit.form.validUrlRequired") + " (e.g., https://www.google.com/maps/place/...)";
                }
                return true;
              },
            })}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
          />
        </div>
        {errors.gbpLink && (
          <p className="mt-2 text-sm text-red-600">
            {errors.gbpLink.message}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          {t("dashboard.gbpAudit.form.gbpLinkHelpOptional") || t("dashboard.gbpAudit.form.gbpLinkHelp")}
        </p>
      </div>

      {/* Locale */}
      <div>
        {/* <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t("dashboard.gbpAudit.form.locale")} <span className="text-gray-400">({t("dashboard.common.optional")})</span>
        </label> */}
        <GBPAuditLocaleSelect register={register} />
        <p className="mt-2 text-xs text-gray-500">
          {t("dashboard.gbpAudit.form.localeHelp")}
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
          {showAdvanced ? t("dashboard.gbpAudit.form.hideAdvanced") : t("dashboard.gbpAudit.form.showAdvanced")}
          <span className="ml-1">{showAdvanced ? "−" : "+"}</span>
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            Advanced options can be added here in the future
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
              <span>{t("dashboard.gbpAudit.form.runningAudit")}</span>
            </>
          ) : (
            <>
              <HiOfficeBuilding className="h-5 w-5" />
              <span>{t("dashboard.gbpAudit.form.runAudit")}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

