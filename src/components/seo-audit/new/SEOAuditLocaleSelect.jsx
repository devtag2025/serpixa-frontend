"use client";
import { useI18n } from "@/i18n/context";
import { useState, useEffect, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
import CustomDropdown from "@/components/common/CustomDropdown";

// Locale configuration for SEO Audit
const seoAuditLocales = [
  { 
    value: 'be-fr', 
    label: 'French - BE', 
    countryCode: 'BE',
    language: 'French',
    country: 'BE'
  },
  { 
    value: 'nl-be', 
    label: 'Dutch - BE', 
    countryCode: 'BE',
    language: 'Dutch',
    country: 'BE'
  },
  { 
    value: 'fr', 
    label: 'French - FR', 
    countryCode: 'FR',
    language: 'French',
    country: 'FR'
  },
  { 
    value: 'nl', 
    label: 'Dutch - NL', 
    countryCode: 'NL',
    language: 'Dutch',
    country: 'NL'
  },
  { 
    value: 'en', 
    label: 'English', 
    countryCode: 'GB', // British flag for English
    language: 'English',
    country: 'GB'
  },
];

export default function SEOAuditLocaleSelect({ register, defaultValue, className = "" }) {
  const { locale: currentLocale } = useI18n();
  const defaultLocale = defaultValue || currentLocale;
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
  const options = seoAuditLocales.map((locale) => ({
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
    const selectedLocaleOption = seoAuditLocales.find(locale => locale.value === selectedLocale);
    return (
      <div className="relative w-full">
        <button
          type="button"
          className={`w-full flex items-center justify-between px-4 py-3 border border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-left hover:border-blue-600 transition-colors ${
            selectedOption ? 'bg-primary/10' : 'bg-white'
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
              <span className="text-gray-500">Select locale</span>
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
    const localeData = seoAuditLocales.find(loc => loc.value === option.value);
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
        placeholder="Select locale"
        className="w-full"
        trigger={customTrigger}
        menuClassName="w-full"
        position="left"
        renderOption={renderOption}
      />
    </div>
  );
}