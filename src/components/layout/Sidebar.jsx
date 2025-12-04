"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiSearch,
  HiLocationMarker,
  HiOfficeBuilding,
  HiSparkles,
  HiDocumentReport,
  HiUser,
  HiCog,
  HiCreditCard,
  HiTicket,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import SidebarItem from "./SidebarItem";

/**
 * Sidebar Component - Modular and reusable with collapsible functionality
 * Handles navigation for dashboard pages
 */
export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState({});
  
  // Collapsible sidebar state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Computed: sidebar is expanded if not collapsed OR if hovered (when collapsed)
  const isExpanded = !isCollapsed || isHovered;

  // Toggle submenu open/close
  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  // Sidebar menu configuration
  const menuItems = [
    {
      key: "dashboard",
      icon: HiHome,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      key: "seo",
      icon: HiSearch,
      label: "SEO Audits",
      submenu: [
        { label: "New Audit", href: "/dashboard/seo-audit/new" },
        { label: "History", href: "/dashboard/seo-audit" },
      ],
    },
    {
      key: "geo",
      icon: HiLocationMarker,
      label: "GEO Audits",
      submenu: [
        { label: "New Audit", href: "/dashboard/geo-audit/new" },
        { label: "History", href: "/dashboard/geo-audit" },
      ],
    },
    {
      key: "gbp",
      icon: HiOfficeBuilding,
      label: "GBP Audits",
      submenu: [
        { label: "New Audit", href: "/dashboard/gbp-audit/new" },
        { label: "History", href: "/dashboard/gbp-audit" },
      ],
    },
    {
      key: "ai",
      icon: HiSparkles,
      label: "AI Content",
      submenu: [
        { label: "Generator", href: "/dashboard/ai-content/new" },
        { label: "History", href: "/dashboard/ai-content" },
      ],
    },
    {
      key: "reports",
      icon: HiDocumentReport,
      label: "Reports",
      href: "/dashboard/reports",
    },
    {
      key: "profile",
      icon: HiUser,
      label: "Profile",
      href: "/dashboard/profile",
    },
    {
      key: "settings",
      icon: HiCog,
      label: "Settings",
      href: "/dashboard/settings",
    },
    {
      key: "billing",
      icon: HiCreditCard,
      label: "Billing",
      submenu: [
        { label: "Plan", href: "/dashboard/billing" },
        { label: "Payment", href: "/dashboard/billing/payment" },
        { label: "History", href: "/dashboard/billing/history" },
        { label: "Add-ons", href: "/dashboard/billing/add-ons" },
      ],
    },
    {
      key: "credits",
      icon: HiTicket,
      label: "Credits",
      href: "/dashboard/credits",
    },
  ];

  // Auto-open submenu if current path matches any submenu item
  const shouldOpenMenu = (item) => {
    if (!item.submenu) return false;
    return item.submenu.some((subItem) => pathname === subItem.href);
  };

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  // Initialize open menus based on current path
  useEffect(() => {
    const initialOpen = {};
    menuItems.forEach((item) => {
      if (item.submenu && shouldOpenMenu(item)) {
        initialOpen[item.key] = true;
      }
    });
    if (Object.keys(initialOpen).length > 0) {
      setOpenMenus(initialOpen);
    }
  }, [pathname]);

  // Toggle collapse state and save to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState.toString());
  };

  return (
    <div className="relative">
      <aside
        className={`${
          isExpanded ? "w-64" : "w-16"
        } bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out`}
        onMouseEnter={() => {
          if (isCollapsed) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <div className="p-4">

        {/* Logo/Brand */}
        <div className={`flex items-center ${isExpanded ? "space-x-2" : "justify-center"} mb-8 px-4`}>
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          {isExpanded && (
            <span className="text-xl font-semibold text-gray-900 whitespace-nowrap">
              Serpixa
            </span>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              href={item.href}
              submenu={item.submenu}
              isOpen={openMenus[item.key] || shouldOpenMenu(item)}
              onToggle={() => toggleMenu(item.key)}
              isExpanded={isExpanded}
            />
          ))}
        </nav>
      </div>
      </aside>
      
      {/* Toggle Button - Positioned on the edge, outside aside to avoid overflow clipping */}
      <button
        onClick={toggleCollapse}
        className="absolute top-4 w-6 h-6 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-all duration-300 text-gray-600 hover:text-gray-900 z-50"
        style={{
          left: isExpanded ? 'calc(256px - 12px)' : 'calc(64px - 12px)'
        }}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={isCollapsed ? "Expand navigation" : "Collapse navigation"}
      >
        {isCollapsed ? (
          <HiChevronRight className="w-4 h-4" />
        ) : (
          <HiChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

