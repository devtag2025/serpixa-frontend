"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * SidebarItem - Individual menu item component
 * Handles both simple links and items with submenus
 * Supports collapsed/expanded states
 */
export default function SidebarItem({
  icon: Icon,
  label,
  href,
  submenu,
  isOpen,
  onToggle,
  isExpanded = true,
  onNavigate,
}) {
  const pathname = usePathname();
  const isActive = href && pathname === href;
  const hasActiveSubmenu = submenu?.some((item) => pathname === item.href);

  // If item has submenu, render as button with toggle
  if (submenu) {
    return (
      <div>
        <button
          onClick={onToggle}
          className={`w-full flex items-center ${
            isExpanded ? "justify-between px-4" : "justify-center px-2"
          } py-3 text-sm font-medium rounded-lg transition-colors ${
            hasActiveSubmenu || isOpen
              ? "bg-primary/10 text-primary"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }`}
          title={!isExpanded ? label : ""}
        >
          <div className={`flex items-center ${isExpanded ? "space-x-3" : ""}`}>
            {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
            {isExpanded && <span className="whitespace-nowrap">{label}</span>}
          </div>
          {isExpanded && (
            <svg
              className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
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
          )}
        </button>

        {/* Submenu - Only show when expanded */}
        {isOpen && isExpanded && (
          <div className="mt-1 ml-4 space-y-1">
            {submenu.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={onNavigate}
                className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Simple link item
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center ${
        isExpanded ? "space-x-3 px-4" : "justify-center px-2"
      } py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
      title={!isExpanded ? label : ""}
    >
      {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
      {isExpanded && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  );
}

