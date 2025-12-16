"use client";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiSearch, HiLocationMarker, HiGlobe, HiOfficeBuilding, HiLink } from "react-icons/hi";
// import { HiDeviceMobile } from "react-icons/hi"; // Used in commented advanced options
import { useTranslation } from "@/i18n/context";

export default function GeoAuditForm({ onSubmit, isPending }) {
  const { t } = useTranslation();
  // const [showAdvanced, setShowAdvanced] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const googleDomain = watch("googleDomain"); // Commented out - domain is now auto-set based on language
  const country = watch("country");

  // Map Google domains to countries (kept for reference)
  // const domainToCountry = {
  //   ".be": "Belgium",
  //   ".fr": "France",
  //   ".nl": "Netherlands",
  // };

  // Update country when domain changes (commented out)
  // const handleDomainChange = (e) => {
  //   const domain = e.target.value;
  //   if (domain && domainToCountry[domain]) {
  //     // This will be handled by react-hook-form's watch
  //   }
  // };

  const handleFormSubmit = (data) => {
    // Send location - prioritize city name for better backend parsing
    // The backend has location codes for major cities, so city name works better
    // If only country is provided, use country. Backend will handle the parsing.
    let location = "";
    if (data.city) {
      // Use city name only - backend can match it to location codes
      location = data.city.trim();
    } else if (data.country) {
      // Fallback to country if no city provided
      location = data.country.trim();
    }

    const payload = {
      keyword: data.keyword.trim(),
      location: location,
      // Only include businessName if it has a value (omit if empty)
      ...(data.businessName?.trim() && { businessName: data.businessName.trim() }),
      googleDomain: data.googleDomain,
      ...(data.device && { device: data.device }),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Row 1: Keyword and Business Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keyword */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("dashboard.geoAudit.form.keyword")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("dashboard.geoAudit.form.keywordPlaceholder")}
              {...register("keyword", {
                required: t("dashboard.geoAudit.form.keyword") + " is required",
                maxLength: {
                  value: 200,
                  message: t("dashboard.geoAudit.form.keyword") + " must be less than 200 characters",
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
            {t("dashboard.geoAudit.form.keywordHelpDetailed")}
          </p>
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("dashboard.geoAudit.form.businessName")} <span className="text-gray-400">({t("dashboard.common.optional")})</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiOfficeBuilding className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("dashboard.geoAudit.form.businessNamePlaceholder")}
              {...register("businessName", {
                maxLength: {
                  value: 200,
                  message: t("dashboard.geoAudit.form.businessName") + " must be less than 200 characters",
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
            {t("dashboard.geoAudit.form.businessNameHelpDetailed")}
          </p>
        </div>
      </div>

      {/* Row 2: City and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("dashboard.geoAudit.form.city")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiLocationMarker className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("dashboard.geoAudit.form.cityPlaceholder")}
              {...register("city", {
                required: t("dashboard.geoAudit.form.city") + " is required",
                maxLength: {
                  value: 200,
                  message: t("dashboard.geoAudit.form.city") + " must be less than 200 characters",
                },
              })}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
            />
          </div>
          {errors.city && (
            <p className="mt-2 text-sm text-red-600">
              {errors.city.message}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            {t("dashboard.geoAudit.form.cityHelpDetailed")}
          </p>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("dashboard.geoAudit.form.country")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiGlobe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("dashboard.geoAudit.form.countryPlaceholder")}
              {...register("country", {
                required: t("dashboard.geoAudit.form.country") + " is required",
                maxLength: {
                  value: 200,
                  message: t("dashboard.geoAudit.form.country") + " must be less than 200 characters",
                },
              })}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
            />
          </div>
          {errors.country && (
            <p className="mt-2 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            {t("dashboard.geoAudit.form.countryHelpDetailed")}
          </p>
        </div>
      </div>

      {/* Row 3: Google Domain */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {t("dashboard.geoAudit.form.googleDomain")} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiLink className="h-5 w-5 text-gray-400" />
          </div>
          <select
            {...register("googleDomain", {
              required: t("dashboard.geoAudit.form.googleDomain") + " is required",
            })}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 bg-white"
          >
            <option value="">{t("dashboard.geoAudit.form.googleDomainPlaceholder")}</option>
            <option value=".be">.be (Belgium)</option>
            <option value=".fr">.fr (France)</option>
            <option value=".nl">.nl (Netherlands)</option>
          </select>
        </div>
        {errors.googleDomain && (
          <p className="mt-2 text-sm text-red-600">
            {errors.googleDomain.message}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          {t("dashboard.geoAudit.form.googleDomainHelp")}
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
          {showAdvanced ? t("dashboard.geoAudit.form.hideAdvanced") : t("dashboard.geoAudit.form.showAdvanced")}
          <span className="ml-1">{showAdvanced ? "−" : "+"}</span>
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {t("dashboard.geoAudit.form.device")}
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
                {t("dashboard.geoAudit.form.deviceHelp") || "Select the device type for the audit"}
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
              <span>{t("dashboard.geoAudit.form.runningAudit")}</span>
            </>
          ) : (
            <>
              <HiSearch className="h-5 w-5" />
              <span>{t("dashboard.geoAudit.form.runAudit")}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

