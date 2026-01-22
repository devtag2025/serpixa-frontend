"use client";
import { useState, useRef, useEffect, useCallback } from "react";

/**
 * AutocompleteInput - Reusable autocomplete input component
 * 
 * @param {Object} props
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Callback when value changes: (value) => void
 * @param {Function} props.onSearch - Async function to fetch suggestions: (query) => Promise<Array>
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.label - Label text
 * @param {boolean} props.required - Whether field is required
 * @param {boolean} props.disabled - Whether field is disabled
 * @param {string} props.error - Error message to display
 * @param {string} props.helpText - Help text below input
 * @param {React.ReactNode} props.icon - Icon to display in input
 * @param {string} props.className - Additional classes
 * @param {Function} props.renderSuggestion - Custom render for suggestion: (item) => ReactNode
 * @param {Function} props.getSuggestionValue - Get display value from suggestion: (item) => string
 * @param {number} props.debounceMs - Debounce delay in milliseconds (default: 300)
 * @param {number} props.minChars - Minimum characters before searching (default: 2)
 */
export default function AutocompleteInput({
  value = "",
  onChange,
  onSearch,
  placeholder = "",
  label = "",
  required = false,
  disabled = false,
  error = "",
  helpText = "",
  icon = null,
  className = "",
  renderSuggestion,
  getSuggestionValue = (item) => item.name || item.displayName || item,
  debounceMs = 300,
  minChars = 2,
}) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  // Sync external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  const debouncedSearch = useCallback(
    async (query) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (!query || query.length < minChars) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const results = await onSearch(query);
          setSuggestions(results || []);
          setIsOpen(results && results.length > 0);
          setHighlightedIndex(-1);
        } catch (error) {
          console.error("Autocomplete search error:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, debounceMs);
    },
    [onSearch, debounceMs, minChars]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    debouncedSearch(newValue);
  };

  // Handle suggestion selection
  const handleSelect = (suggestion) => {
    const selectedValue = getSuggestionValue(suggestion);
    setInputValue(selectedValue);
    onChange(selectedValue, suggestion); // Pass full suggestion object as second param
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "ArrowDown" && inputValue.length >= minChars) {
        debouncedSearch(inputValue);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Handle focus
  const handleFocus = () => {
    if (inputValue.length >= minChars && suggestions.length > 0) {
      setIsOpen(true);
    }
  };

  // Default suggestion renderer
  const defaultRenderSuggestion = (item, isHighlighted) => (
    <div
      className={`px-4 py-2 cursor-pointer transition-colors ${
        isHighlighted
          ? "bg-primary text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="font-medium">{getSuggestionValue(item)}</span>
      {item.adminName1 && item.adminName1 !== getSuggestionValue(item) && (
        <span className={`ml-2 text-sm ${isHighlighted ? "text-white/80" : "text-gray-500"}`}>
          {item.adminName1}
        </span>
      )}
    </div>
  );

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className={`block w-full ${icon ? "pl-12" : "pl-4"} pr-10 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}

        {/* Clear button */}
        {!isLoading && inputValue && !disabled && (
          <button
            type="button"
            onClick={() => {
              setInputValue("");
              onChange("");
              setSuggestions([]);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.geonameId || index}
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {renderSuggestion
                ? renderSuggestion(suggestion, index === highlightedIndex)
                : defaultRenderSuggestion(suggestion, index === highlightedIndex)}
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && suggestions.length === 0 && inputValue.length >= minChars && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg">
          <div className="px-4 py-3 text-sm text-gray-500 text-center">
            No results found
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {/* Help text */}
      {helpText && !error && (
        <p className="mt-2 text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
}
