"use client";
import { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";

/**
 * CustomDropdown - A reusable dropdown component
 * 
 * @param {Object} props
 * @param {Array} props.options - Array of option objects: [{ value, label, icon?, disabled? }]
 * @param {string|number} props.value - Currently selected value
 * @param {Function} props.onChange - Callback when option is selected: (value) => void
 * @param {string} props.placeholder - Placeholder text when no value selected
 * @param {string} props.className - Additional classes for the container
 * @param {string} props.buttonClassName - Additional classes for the button
 * @param {string} props.menuClassName - Additional classes for the dropdown menu
 * @param {React.ReactNode} props.trigger - Custom trigger element (optional)
 * @param {string} props.position - Dropdown position: 'left' | 'right' | 'center' (default: 'right')
 * @param {boolean} props.disabled - Disable the dropdown
 * @param {Function} props.renderOption - Custom render function for options: (option, isSelected) => ReactNode
 */
export default function CustomDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  buttonClassName = "",
  menuClassName = "",
  trigger,
  position = "right",
  disabled = false,
  renderOption,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  // Position classes
  const positionClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  // Default button
  const defaultButton = (
    <button
      type="button"
      onClick={() => !disabled && setIsOpen(!isOpen)}
      disabled={disabled}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${buttonClassName}`}
      aria-label="Open dropdown"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      {selectedOption ? (
        <>
          {selectedOption.icon && <span className="text-gray-500">{selectedOption.icon}</span>}
          <span>{selectedOption.label}</span>
        </>
      ) : (
        <span className="text-gray-500">{placeholder}</span>
      )}
      <HiChevronDown
        className={`w-4 h-4 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {trigger ? (
        <div onClick={() => !disabled && setIsOpen(!isOpen)}>
          {typeof trigger === 'function' ? trigger(isOpen) : trigger}
        </div>
      ) : (
        defaultButton
      )}

      {isOpen && (
        <div
          className={`absolute ${positionClasses[position]} mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${menuClassName}`}
          role="listbox"
        >
          <div className="py-1 max-h-60 overflow-auto">
            {options.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500 text-center">
                No options available
              </div>
            ) : (
              options.map((option) => {
                const isSelected = option.value === value;
                const isDisabled = option.disabled || false;

                if (renderOption) {
                  return (
                    <div
                      key={option.value}
                      onClick={() => !isDisabled && handleSelect(option.value)}
                      className={isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    >
                      {renderOption(option, isSelected)}
                    </div>
                  );
                }

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => !isDisabled && handleSelect(option.value)}
                    disabled={isDisabled}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                      isSelected
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {option.icon && <span>{option.icon}</span>}
                    <span>{option.label}</span>
                    {isSelected && (
                      <svg
                        className="w-4 h-4 ml-auto"
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
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
