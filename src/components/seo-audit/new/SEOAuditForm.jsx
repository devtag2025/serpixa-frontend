"use client";
import { useForm } from "react-hook-form";
import { HiSearch, HiGlobe } from "react-icons/hi";

export default function SEOAuditForm({ onSubmit, isPending }) {
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
          Website URL <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiGlobe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            placeholder="https://example.com"
            {...register("url", {
              required: "Website URL is required",
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                message: "Please enter a valid URL",
              },
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
          Enter the full URL of the page you want to audit
        </p>
      </div>

      {/* Target Keyword */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Target Keyword <span className="text-gray-400">(Optional)</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <HiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="e.g., best seo tools"
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
          The primary keyword you want to optimize for
        </p>
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
              <span>Run SEO Audit</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

