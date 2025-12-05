"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOfficeBuilding, HiLink, HiLocationMarker, HiGlobe } from "react-icons/hi";

export default function GBPAuditForm({ onSubmit, isPending }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const gbpLink = watch("gbpLink");
  const businessName = watch("businessName");

  const handleFormSubmit = (data) => {
    const payload = {
      businessName: data.businessName?.trim() || null,
      gbpLink: data.gbpLink?.trim() || null,
      location: data.location?.trim() || "United States",
      languageCode: data.languageCode || "en",
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Business Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Business Name <span className="text-gray-400">(Optional if GBP Link provided)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiOfficeBuilding className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="e.g., My Restaurant"
            {...register("businessName", {
              validate: (value) => {
                if (!value && !gbpLink) {
                  return "Business name or GBP link is required";
                }
                return true;
              },
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
          The name of your business as it appears on Google Business Profile
        </p>
      </div>

      {/* GBP Link */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          GBP Link <span className="text-gray-400">(Optional if Business Name provided)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiLink className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            placeholder="https://www.google.com/maps/place/..."
            {...register("gbpLink", {
              validate: (value) => {
                if (!value && !businessName) {
                  return "Business name or GBP link is required";
                }
                return true;
              },
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Please enter a valid URL",
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
          Direct link to your Google Business Profile (optional, but helps find your business faster)
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
            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiLocationMarker className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="e.g., United States, New York"
                  {...register("location", {
                    maxLength: {
                      value: 200,
                      message: "Location must be less than 200 characters",
                    },
                  })}
                  defaultValue="United States"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400"
                />
              </div>
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Location for business search (defaults to "United States")
              </p>
            </div>

            {/* Language Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Language Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiGlobe className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register("languageCode")}
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 bg-white"
                  defaultValue="en"
                >
                  <option value="en">English (en)</option>
                  <option value="fr">French (fr)</option>
                  <option value="de">German (de)</option>
                  <option value="es">Spanish (es)</option>
                  <option value="nl">Dutch (nl)</option>
                  <option value="it">Italian (it)</option>
                </select>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Language code for the business information
              </p>
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
              <HiOfficeBuilding className="h-5 w-5" />
              <span>Run GBP Audit</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

