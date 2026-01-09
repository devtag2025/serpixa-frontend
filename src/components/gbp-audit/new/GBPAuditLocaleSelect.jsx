"use client";
import { useState, useEffect, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
import CustomDropdown from "@/components/common/CustomDropdown";
import { useTranslation } from "@/i18n/context";
import { useI18n } from "@/i18n/context";

// Locale configuration for GBP Audit - Only 3 languages
const gbpAuditLocales = [
  { 
    value: 'fr', 
    label: 'Français', 
    countryCode: 'FR',
  },
  { 
    value: 'nl', 
    label: 'Nederlands', 
    countryCode: 'NL',
  },
  { 
    value: 'en', 
    label: 'English', 
    countryCode: 'GB',
  },
];

export default function GBPAuditLocaleSelect({ register, defaultValue, className = "" }) {
  const { t } = useTranslation();
  const { locale: currentLocale } = useI18n();
  const defaultLocale = defaultValue || currentLocale || 'en';
  const [selectedLocale, setSelectedLocale] = useState(defaultLocale);
  const hiddenInputRef = useRef(null);

  // Register the hidden input with react-hook-form
  const { onChange, onBlur, name, ref } = register("locale", {
    value: defaultLocale,
  });

  // Sync refs
  useEffect(() => {
    if (ref && hiddenInputRef.current) {
      if (typeof ref === "function") {
        ref(hiddenInputRef.current);
      } else {
        ref.current = hiddenInputRef.current;
      }
    }
  }, [ref]);

  // Update hidden input when selectedLocale changes
  useEffect(() => {
    if (hiddenInputRef.current && onChange) {
      const event = {
        target: {
          name: "locale",
          value: selectedLocale,
        },
      };
      onChange(event);
    }
  }, [selectedLocale, onChange]);

  // Prepare options for CustomDropdown
  const options = gbpAuditLocales.map((locale) => ({
    value: locale.value,
    label: locale.label,
    countryCode: locale.countryCode,
    icon: (
      <ReactCountryFlag
        countryCode={locale.countryCode}
        svg
        style={{
          width: '1.25rem',
          height: '1.25rem',
        }}
        title={locale.label}
        className="rounded-full flex-shrink-0"
      />
    ),
  }));

  const selectedOption = options.find((opt) => opt.value === selectedLocale);

  // Custom trigger with flag icon on the left
  const customTrigger = (isOpen) => {
    const selectedLocaleOption = gbpAuditLocales.find(locale => locale.value === selectedLocale);
    return (
      <div className="relative w-full">
        <button
          type="button"
          className={`w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-left hover:border-primary transition-colors ${
            selectedOption ? 'bg-white' : 'bg-white'
          }`}
        >
          <div className="flex items-center gap-3">
            {selectedOption && selectedLocaleOption ? (
              <>
                <div className="flex-shrink-0">
                  <ReactCountryFlag
                    countryCode={selectedLocaleOption.countryCode}
                    svg
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                    }}
                    title={selectedLocaleOption.label}
                    className="rounded-full"
                  />
                </div>
                <span className="text-gray-900 font-medium">
                  {selectedOption.label}
                </span>
              </>
            ) : (
              <span className="text-gray-500">{t("dashboard.gbpAudit.form.localePlaceholder") || "Select language"}</span>
            )}
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    );
  };

  // Custom render function for dropdown options with flags
  const renderOption = (option, isSelected) => {
    const localeData = gbpAuditLocales.find(locale => locale.value === option.value);
    return (
      <div className={`flex items-center justify-between w-full px-4 py-2 transition-colors ${
        isSelected ? 'bg-primary text-white' : 'text-gray-700 group-hover:bg-primary group-hover:text-white'
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <ReactCountryFlag
              countryCode={localeData.countryCode}
              svg
              style={{
                width: '1.25rem',
                height: '1.25rem',
              }}
              title={localeData.label}
              className="rounded-full"
            />
          </div>
          <span className={`transition-colors ${isSelected ? "text-white font-medium" : "text-gray-700 group-hover:text-white"}`}>
            {option.label}
          </span>
        </div>
        {isSelected && (
          <svg
            className="w-4 h-4 text-white ml-auto flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* Hidden input for react-hook-form */}
      <input
        type="hidden"
        name={name}
        value={selectedLocale}
        ref={hiddenInputRef}
        onBlur={onBlur}
      />
      
      {/* Custom Dropdown */}
      <CustomDropdown
        options={options}
        value={selectedLocale}
        onChange={(value) => setSelectedLocale(value)}
        placeholder={t("dashboard.gbpAudit.form.localePlaceholder") || "Select language"}
        className="w-full"
        trigger={customTrigger}
        menuClassName="w-full"
        position="left"
        renderOption={renderOption}
      />
    </div>
  );
}
