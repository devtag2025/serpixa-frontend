"use client";
import { useTranslation } from "@/i18n/context";

/**
 * Reusable route-level loader with Serpixa logo.
 * Use only for major routing / full-route loading (auth checks, dashboard and list/detail page loads).
 * Do not use for: card loaders, pagination, form submit spinners.
 *
 * @param {string} [message] - Optional custom loading text. Defaults to t("dashboard.common.loading").
 */
export default function RouteLoader({ message }) {
  const { t } = useTranslation();
  const label = message != null ? message : t("dashboard.common.loading");

  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="w-10 h-10 bg-primary rounded flex items-center justify-center animate-pulse flex-shrink-0">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <p className="text-gray-600 text-sm sm:text-base">{label}</p>
    </div>
  );
}
