"use client";
import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import CustomDropdown from "@/components/common/CustomDropdown";
import { useTranslation } from "@/i18n/context";
import { useI18n } from "@/i18n/context";

// Locale configuration for GBP Audit - Language + Country combinations
const gbpAuditLocales = [
  // Belgium
  { 
    value: 'fr_be', 
    label: 'Français (Belgique)', 
    countryCode: 'BE',
  },
  { 
    value: 'nl_be', 
    label: 'Nederlands (België)', 
    countryCode: 'BE',
  },
  // France
  { 
    value: 'fr_fr', 
    label: 'Français (France)', 
    countryCode: 'FR',
  },
  // Netherlands
  { 
    value: 'nl_nl', 
    label: 'Nederlands (Nederland)', 
    countryCode: 'NL',
  },
  // UK/US English
  { 
    value: 'en_us', 
    label: 'English (US)', 
    countryCode: 'US',
  },
  { 
    value: 'en_gb', 
    label: 'English (UK)', 
    countryCode: 'GB',
  },
];

export default function GBPAuditLocaleSelect({ register, setValue, defaultValue, onChangeLocale, className = "" }) {
  const { t } = useTranslation();
  const { locale: currentLocale } = useI18n();
  
  // Map browser locale to our locale codes, default to Belgium French
  const mapLocale = (loc) => {
    if (!loc) return 'fr_be';
    const l = loc.toLowerCase();
    if (l.startsWith('nl')) return l.includes('be') ? 'nl_be' : 'nl_nl';
    if (l.startsWith('fr')) return l.includes('be') ? 'fr_be' : 'fr_fr';
    if (l.startsWith('en')) return 'en_us';
    return 'fr_be'; // Default to Belgium French
  };
  
  const defaultLocale = defaultValue || mapLocale(currentLocale);
  const [selectedLocale, setSelectedLocale] = useState(defaultLocale);

  // Register the field with react-hook-form
  useEffect(() => {
    if (register) {
      register("locale");
    }
  }, [register]);

  // Set initial value
  useEffect(() => {
    if (setValue) {
      setValue("locale", defaultLocale);
    }
    if (onChangeLocale) {
      onChangeLocale(defaultLocale);
    }
  }, [setValue, defaultLocale, onChangeLocale]);

  // Update form value when selection changes
  const handleLocaleChange = (value) => {
    console.log('[GBPAuditLocaleSelect] Locale changed to:', value);
    setSelectedLocale(value);
    if (setValue) {
      setValue("locale", value);
    }
    if (onChangeLocale) {
      onChangeLocale(value);
    }
  };

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
      {/* Custom Dropdown */}
      <CustomDropdown
        options={options}
        value={selectedLocale}
        onChange={handleLocaleChange}
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
