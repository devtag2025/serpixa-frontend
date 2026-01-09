"use client";
import { useState, useEffect, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
import CustomDropdown from "@/components/common/CustomDropdown";
import { useTranslation } from "@/i18n/context";

// Country configuration for Local SEO Audit - Only 3 countries
const localSeoCountries = [
  { 
    value: 'France', 
    label: 'Français', 
    countryCode: 'FR',
  },
  { 
    value: 'Belgium', 
    label: 'Belgium', 
    countryCode: 'BE',
  },
  { 
    value: 'Netherlands', 
    label: 'Nederlands', 
    countryCode: 'NL',
  },
];

export default function LocalSeoCountrySelect({ register, defaultValue, className = "" }) {
  const { t } = useTranslation();
  const defaultCountry = defaultValue || "";
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const hiddenInputRef = useRef(null);

  // Register the hidden input with react-hook-form
  const { onChange, onBlur, name, ref } = register("country", {
    required: t("dashboard.localSeoAudit.form.country") + " is required",
    value: defaultCountry,
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

  // Update hidden input when selectedCountry changes
  useEffect(() => {
    if (hiddenInputRef.current && onChange) {
      const event = {
        target: {
          name: "country",
          value: selectedCountry,
        },
      };
      onChange(event);
    }
  }, [selectedCountry, onChange]);

  // Prepare options for CustomDropdown
  const options = localSeoCountries.map((country) => ({
    value: country.value,
    label: country.label,
    countryCode: country.countryCode,
    icon: (
      <ReactCountryFlag
        countryCode={country.countryCode}
        svg
        style={{
          width: '1.25rem',
          height: '1.25rem',
        }}
        title={country.label}
        className="rounded-full flex-shrink-0"
      />
    ),
  }));

  const selectedOption = options.find((opt) => opt.value === selectedCountry);

  // Custom trigger with flag icon on the left
  const customTrigger = (isOpen) => {
    const selectedCountryOption = localSeoCountries.find(country => country.value === selectedCountry);
    return (
      <div className="relative w-full">
        <button
          type="button"
          className={`w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-left hover:border-primary transition-colors ${
            selectedOption ? 'bg-white' : 'bg-white'
          }`}
        >
          <div className="flex items-center gap-3">
            {selectedOption && selectedCountryOption ? (
              <>
                <div className="flex-shrink-0">
                  <ReactCountryFlag
                    countryCode={selectedCountryOption.countryCode}
                    svg
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                    }}
                    title={selectedCountryOption.label}
                    className="rounded-full"
                  />
                </div>
                <span className="text-gray-900 font-medium">
                  {selectedOption.label}
                </span>
              </>
            ) : (
              <span className="text-gray-500">{t("dashboard.localSeoAudit.form.countryPlaceholder")}</span>
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
    const countryData = localSeoCountries.find(country => country.value === option.value);
    return (
      <div className={`flex items-center justify-between w-full px-4 py-2 transition-colors ${
        isSelected ? 'bg-primary text-white' : 'text-gray-700 group-hover:bg-primary group-hover:text-white'
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <ReactCountryFlag
              countryCode={countryData.countryCode}
              svg
              style={{
                width: '1.25rem',
                height: '1.25rem',
              }}
              title={countryData.label}
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
        value={selectedCountry}
        ref={hiddenInputRef}
        onBlur={onBlur}
      />
      
      {/* Custom Dropdown */}
      <CustomDropdown
        options={options}
        value={selectedCountry}
        onChange={(value) => setSelectedCountry(value)}
        placeholder={t("dashboard.localSeoAudit.form.countryPlaceholder")}
        className="w-full"
        trigger={customTrigger}
        menuClassName="w-full"
        position="left"
        renderOption={renderOption}
      />
    </div>
  );
}
