"use client";
import { useI18n } from "@/i18n/context";
import { localeNames, locales } from "@/i18n/config";
import { HiGlobeAlt } from "react-icons/hi";

export default function LocaleSelect({ register, defaultValue, className = "" }) {
  const { locale: currentLocale } = useI18n();
  const defaultLocale = defaultValue || currentLocale;

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <HiGlobeAlt className="h-5 w-5 text-gray-400" />
      </div>
      <select
        {...register("locale")}
        defaultValue={defaultLocale}
        className={`block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 bg-white ${className}`}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
