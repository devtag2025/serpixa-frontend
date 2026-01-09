"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiSearch, HiLocationMarker, HiOfficeBuilding } from "react-icons/hi";
// import { HiDeviceMobile } from "react-icons/hi"; // Used in commented advanced options
import { useTranslation } from "@/i18n/context";
import LocalSeoCountrySelect from "./LocalSeoCountrySelect";

export default function GeoAuditForm({ onSubmit, isPending }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const country = watch("country");

  // Map countries to their Google domains
  const countryToGoogleDomain = {
    'France': '.fr',
    'Belgium': '.be',
    'Netherlands': '.nl',
  };

  // Automatically set Google domain when country changes
  useEffect(() => {
    if (country && countryToGoogleDomain[country]) {
      setValue("googleDomain", countryToGoogleDomain[country], { shouldValidate: true });
    }
  }, [country, setValue]);

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

  /**
   * Automatically determine locale based on country
   * For Belgium, France, Netherlands: use their specific locale
   * For all other countries: default to English
   */
  const getLocaleFromCountry = (country) => {
    if (!country) return 'en';
    
    const countryLower = country.toLowerCase().trim();
    
    const countryLocaleMap = {
      'belgium': 'fr_be',      // Belgium defaults to French
      'france': 'fr_fr',       // France uses French
      'netherlands': 'nl_nl',  // Netherlands uses Dutch
    };
    
    return countryLocaleMap[countryLower] || 'en'; // Default to English for any other country
  };

  const handleFormSubmit = (data) => {
    // Convert googleDomain from ".be" format to "google.be" format
    let normalizedGoogleDomain = null;
    if (data.googleDomain) {
      if (data.googleDomain.startsWith('.')) {
        // Convert ".be" to "google.be"
        const tld = data.googleDomain.substring(1); // Remove the dot
        normalizedGoogleDomain = `google.${tld}`;
      } else {
        // Already in correct format or use as is
        normalizedGoogleDomain = data.googleDomain;
      }
    }

    // Automatically determine locale based on country
    const country = data.country.trim();
    const locale = getLocaleFromCountry(country);

    const payload = {
      keyword: data.keyword.trim(),
      city: data.city.trim(),
      country: country,
      locale: locale, // Add locale to payload
      // Only include businessName if it has a value (omit if empty)
      ...(data.businessName?.trim() && { businessName: data.businessName.trim() }),
      // Only include googleDomain if it has a value (omit if empty)
      ...(normalizedGoogleDomain && { googleDomain: normalizedGoogleDomain }),
      // Only include language if it has a value (omit if empty)
      ...(data.language && { language: data.language }),
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
            {t("dashboard.localSeoAudit.form.keyword")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("dashboard.localSeoAudit.form.keywordPlaceholder")}
              {...register("keyword", {
                required: t("dashboard.localSeoAudit.form.keyword") + " is required",
                maxLength: {
                  value: 200,
                  message: t("dashboard.localSeoAudit.form.keyword") + " must be less than 200 characters",
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
            {t("dashboard.localSeoAudit.form.keywordHelpDetailed")}
          </p>
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("dashboard.localSeoAudit.form.businessName")} <span className="text-gray-400">({t("dashboard.common.optional")})</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiOfficeBuilding className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("dashboard.localSeoAudit.form.businessNamePlaceholder")}
              {...register("businessName", {
                maxLength: {
                  value: 200,
                  message: t("dashboard.localSeoAudit.form.businessName") + " must be less than 200 characters",
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
            {t("dashboard.localSeoAudit.form.businessNameHelpDetailed")}
          </p>
        </div>
      </div>

      {/* Row 2: City and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("dashboard.localSeoAudit.form.city")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiLocationMarker className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("dashboard.localSeoAudit.form.cityPlaceholder")}
              {...register("city", {
                required: t("dashboard.localSeoAudit.form.city") + " is required",
                maxLength: {
                  value: 200,
                  message: t("dashboard.localSeoAudit.form.city") + " must be less than 200 characters",
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
            {t("dashboard.localSeoAudit.form.cityHelpDetailed")}
          </p>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            {t("dashboard.localSeoAudit.form.country")} <span className="text-red-500">*</span>
          </label>
          <LocalSeoCountrySelect
            register={register}
            defaultValue=""
            className="w-full"
          />
          {errors.country && (
            <p className="mt-2 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            {t("dashboard.localSeoAudit.form.countryHelpDetailed")}
          </p>
        </div>
      </div>


      {/* Advanced Options - Commented out */}
      {/* 
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          {showAdvanced ? t("dashboard.localSeoAudit.form.hideAdvanced") : t("dashboard.localSeoAudit.form.showAdvanced")}
          <span className="ml-1">{showAdvanced ? "−" : "+"}</span>
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {t("dashboard.localSeoAudit.form.device")}
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
                {t("dashboard.localSeoAudit.form.deviceHelp") || "Select the device type for the audit"}
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
              <span>{t("dashboard.localSeoAudit.form.runningAudit")}</span>
            </>
          ) : (
            <>
              <HiSearch className="h-5 w-5" />
              <span>{t("dashboard.localSeoAudit.form.runAudit")}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

