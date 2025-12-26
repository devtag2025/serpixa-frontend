"use client";
import { useI18n } from "@/i18n/context";
import { localeNames, locales } from "@/i18n/config";
import { HiGlobeAlt } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import CustomDropdown from "./CustomDropdown";

export default function LocaleSelect({ register, defaultValue, className = "" }) {
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
  const options = locales.map((locale) => ({
    value: locale,
    label: localeNames[locale],
    icon: <HiGlobeAlt className="h-5 w-5 text-gray-400" />,
  }));

  const selectedOption = options.find((opt) => opt.value === selectedLocale);

  // Custom trigger with icon on the left (function to receive isOpen state)
  const customTrigger = (isOpen) => (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <HiGlobeAlt className="h-5 w-5 text-gray-400" />
      </div>
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white text-left hover:border-gray-400 transition-colors"
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : "Select locale"}
        </span>
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
      />
    </div>
  );
}
