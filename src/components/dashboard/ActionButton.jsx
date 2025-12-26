"use client";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";

/**
 * ActionButton - Modern action button with white background and colored accents
 */
export default function ActionButton({
  href,
  icon: Icon,
  title,
  description,
  gradient,
  textColor,
  onClick,
}) {
  const { t } = useTranslation();
  // Extract color from gradient for icon background
  const getColorFromGradient = (gradient) => {
    if (gradient.includes("blue")) return "#3b82f6";
    if (gradient.includes("green")) return "#10b981";
    if (gradient.includes("purple")) return "#8b5cf6";
    if (gradient.includes("amber") || gradient.includes("orange")) return "#f59e0b";
    return "#3b82f6"; // default blue
  };

  const accentColor = textColor || getColorFromGradient(gradient);

  const content = (
    <div
      className="relative overflow-hidden rounded-2xl p-6 bg-white border-2 border-gray-200 hover:border-opacity-50 hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-lg group cursor-pointer"
      style={{ borderColor: `${accentColor}30` }}
      onClick={onClick}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            {Icon && (
              <Icon
                className="w-6 h-6"
                style={{ color: accentColor }}
              />
            )}
          </div>
        </div>
        <h3
          className="text-lg font-bold mb-1"
          style={{ color: accentColor }}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
        <div
          className="mt-4 flex items-center text-sm font-medium"
          style={{ color: accentColor }}
        >
          {t("dashboard.page.getStarted")}
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: accentColor }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

