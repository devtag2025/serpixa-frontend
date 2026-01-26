"use client";
import { useTranslation } from "@/i18n/context";
import Image from "next/image";

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
      className="flex items-center justify-center gap-3"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse flex-shrink-0 p-1">
        <Image
          src="/serpixa-icon.png"
          alt=""
          width={24}
          height={24}
          className="object-contain"
          aria-hidden="true"
        />
      </div>
      <p className="text-gray-600 text-sm sm:text-base">{label}</p>
    </div>
  );
}
