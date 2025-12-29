"use client";
import { useI18n } from "@/i18n/context";
import { headerLocaleNames, localeNames } from "@/i18n/config";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Support both mouse and touch events for mobile
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (newLocale) => {
    changeLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="Change language"
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.196 2.196a3 3 0 001.5 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="hidden sm:inline">{headerLocaleNames[locale] || localeNames[locale] || locale.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
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

      {isOpen && (
        <div className="absolute right-0 md:right-0 md:left-auto left-0 mt-2 w-22 md:w-40 bg-white rounded-md shadow-lg border border-gray-200 z-[10000]">
          <div className="py-1">
            {Object.entries(headerLocaleNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLocaleChange(code)}
                className={`w-full text-left px-2.5 md:px-4 py-1.5 md:py-2 text-xs md:text-sm transition-colors touch-manipulation ${
                  locale === code
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100 active:bg-gray-100"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

