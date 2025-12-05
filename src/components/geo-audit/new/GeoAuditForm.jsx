"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiSearch, HiLocationMarker, HiGlobe, HiOfficeBuilding } from "react-icons/hi";

export default function GeoAuditForm({ onSubmit, isPending }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const googleDomain = watch("googleDomain");
  const country = watch("country");

  // Map Google domains to countries
  const domainToCountry = {
    ".be": "Belgium",
    ".fr": "France",
    ".nl": "Netherlands",
  };

  // Update country when domain changes
  const handleDomainChange = (e) => {
    const domain = e.target.value;
    if (domain && domainToCountry[domain]) {
      // This will be handled by react-hook-form's watch
    }
  };

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
      businessName: data.businessName?.trim() || null,
      languageName: data.languageName || "English",
      device: data.device || "desktop",
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Keyword */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Keyword <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="e.g., restaurants, plumbers, lawyers"
            {...register("keyword", {
              required: "Keyword is required",
              maxLength: {
                value: 200,
                message: "Keyword must be less than 200 characters",
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
          The search term you want to analyze for local results
        </p>
      </div>

      {/* Google Domain */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Google Domain <span className="text-gray-400">(Optional)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiGlobe className="h-5 w-5 text-gray-400" />
          </div>
          <select
            {...register("googleDomain")}
            onChange={(e) => {
              handleDomainChange(e);
              register("googleDomain").onChange(e);
            }}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 bg-white"
          >
            <option value="">Select Google Domain</option>
            <option value=".be">.be (Belgium)</option>
            <option value=".fr">.fr (France)</option>
            <option value=".nl">.nl (Netherlands)</option>
          </select>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Select the Google domain for your target market
        </p>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          City <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiLocationMarker className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="e.g., Brussels, Paris, Amsterdam"
            {...register("city", {
              required: "City is required",
              maxLength: {
                value: 200,
                message: "City must be less than 200 characters",
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
          The city where you want to analyze local search results (e.g., "New York", "Brussels", "Paris")
        </p>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Country <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiGlobe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="e.g., Belgium, France, Netherlands"
            {...register("country", {
              required: "Country is required",
              maxLength: {
                value: 200,
                message: "Country must be less than 200 characters",
              },
            })}
            defaultValue={googleDomain ? domainToCountry[googleDomain] : ""}
            className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
          />
        </div>
        {errors.country && (
          <p className="mt-2 text-sm text-red-600">
            {errors.country.message}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          The country for local search analysis (used if city is not provided, e.g., "United States", "Belgium")
        </p>
      </div>

      {/* Business Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Business Name <span className="text-gray-400">(Optional)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiOfficeBuilding className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="e.g., My Restaurant"
            {...register("businessName", {
              maxLength: {
                value: 200,
                message: "Business name must be less than 200 characters",
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
          Leave blank to see all competitors. If provided, we'll find your business in the results.
        </p>
      </div>

      {/* Advanced Options */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          {showAdvanced ? "Hide" : "Show"} Advanced Options
          <span className="ml-1">{showAdvanced ? "−" : "+"}</span>
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            {/* Language */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Language
              </label>
              <select
                {...register("languageName")}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 bg-white"
                defaultValue="English"
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Dutch">Dutch</option>
                <option value="German">German</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            {/* Device */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Device
              </label>
              <select
                {...register("device")}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 bg-white"
                defaultValue="desktop"
              >
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
              </select>
            </div>
          </div>
        )}
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
              <span>Running Audit...</span>
            </>
          ) : (
            <>
              <HiSearch className="h-5 w-5" />
              <span>Run GEO Audit</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

