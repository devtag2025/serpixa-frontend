"use client";
import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { HiSearch, HiLocationMarker, HiOfficeBuilding } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";
import LocalSeoCountrySelect from "./LocalSeoCountrySelect";
import AutocompleteInput from "@/components/common/AutocompleteInput";
import { searchCities } from "@/services/geoNamesService";

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

  // Clear city when country changes
  useEffect(() => {
    setValue("city", "");
  }, [country, setValue]);

  // Clear city when region changes (optional - user might want to keep it)
  // useEffect(() => {
  //   setValue("city", "");
  // }, [region, setValue]);

  /**
   * Automatically determine locale based on country
   */
  const getLocaleFromCountry = (country) => {
    if (!country) return 'en';
    
    const countryLower = country.toLowerCase().trim();
    
    const countryLocaleMap = {
      'belgium': 'fr_be',
      'france': 'fr_fr',
      'netherlands': 'nl_nl',
    };
    
    return countryLocaleMap[countryLower] || 'en';
  };

  // Search function for cities
  const handleCitySearch = useCallback(async (query) => {
    if (!country) return [];
    return await searchCities(query, country);
  }, [country]);

  const handleFormSubmit = (data) => {
    // Convert googleDomain from ".be" format to "google.be" format
    let normalizedGoogleDomain = null;
    if (data.googleDomain) {
      if (data.googleDomain.startsWith('.')) {
        const tld = data.googleDomain.substring(1);
        normalizedGoogleDomain = `google.${tld}`;
      } else {
        normalizedGoogleDomain = data.googleDomain;
      }
    }

    const countryValue = data.country.trim();
    const locale = getLocaleFromCountry(countryValue);

    const payload = {
      keyword: data.keyword.trim(),
      // City field now holds full DataForSEO location_name from our DB
      city: data.city.trim(),
      country: countryValue,
      locale: locale,
      ...(data.businessName?.trim() && { businessName: data.businessName.trim() }),
      ...(normalizedGoogleDomain && { googleDomain: normalizedGoogleDomain }),
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

      {/* Row 2: Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
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

      {/* Row 3: City (Required - with autocomplete) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <AutocompleteInput
            label={t("dashboard.localSeoAudit.form.city")}
            value={watch("city") || ""}
            onChange={(value) => {
              setValue("city", value);
            }}
            onSearch={handleCitySearch}
            placeholder={t("dashboard.localSeoAudit.form.cityPlaceholder")}
            required
            disabled={!country}
            error={errors.city?.message}
            helpText={
              !country 
                ? (t("dashboard.localSeoAudit.form.selectCountryFirst") || "Select a country first")
                : (t("dashboard.localSeoAudit.form.cityHelpDetailed"))
            }
            icon={<HiLocationMarker className="h-5 w-5 text-gray-400" />}
            getSuggestionValue={(item) => item.name}
            renderSuggestion={(item, isHighlighted) => (
              <div
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  isHighlighted
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{item.name}</div>
                {item.adminName1 && (
                  <div className={`text-sm ${isHighlighted ? "text-white/80" : "text-gray-500"}`}>
                    {item.adminName1}
                    {item.population > 0 && ` • Pop: ${item.population.toLocaleString()}`}
                  </div>
                )}
              </div>
            )}
          />
          {/* Hidden input for form registration and validation */}
          <input 
            type="hidden" 
            {...register("city", {
              required: t("dashboard.localSeoAudit.form.city") + " is required",
            })} 
          />
        </div>
      </div>

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
