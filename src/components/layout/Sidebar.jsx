"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
  HiGift,
  HiChatAlt,
  HiX,
} from "react-icons/hi";
import SidebarItem from "./SidebarItem";
import SupportModal from "../support/SupportModal";
import { useTranslation } from "@/i18n/context";

/**
 * Sidebar Component - Modular and reusable with collapsible functionality
 * Handles navigation for dashboard pages
 * Responsive: Hamburger menu on mobile, always visible on desktop
 */
export default function Sidebar({ isMobileOpen = false, onMobileClose }) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [openMenus, setOpenMenus] = useState({});
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  
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
      label: t("dashboard.sidebar.dashboard"),
      href: "/dashboard",
    },
    {
      key: "seo",
      icon: HiSearch,
      label: t("dashboard.sidebar.seoAudits"),
      submenu: [
        { label: t("dashboard.sidebar.newAudit"), href: "/dashboard/seo-audit/new" },
        { label: t("dashboard.sidebar.history"), href: "/dashboard/seo-audit" },
      ],
    },
    {
      key: "geo",
      icon: HiLocationMarker,
      label: t("dashboard.sidebar.localSeoAudits"),
      submenu: [
        { label: t("dashboard.sidebar.newAudit"), href: "/dashboard/geo-audit/new" },
        { label: t("dashboard.sidebar.history"), href: "/dashboard/geo-audit" },
      ],
    },
    {
      key: "gbp",
      icon: HiOfficeBuilding,
      label: t("dashboard.sidebar.gbpAudits"),
      submenu: [
        { label: t("dashboard.sidebar.newAudit"), href: "/dashboard/gbp-audit/new" },
        { label: t("dashboard.sidebar.history"), href: "/dashboard/gbp-audit" },
      ],
    },
    {
      key: "ai",
      icon: HiSparkles,
      label: t("dashboard.sidebar.aiContent"),
      submenu: [
        { label: t("dashboard.sidebar.generator"), href: "/dashboard/ai-content/new" },
        { label: t("dashboard.sidebar.history"), href: "/dashboard/ai-content" },
      ],
    },
    {
      key: "subscription",
      icon: HiCreditCard,
      label: t("dashboard.sidebar.subscription"),
      href: "/dashboard/subscription",
    },
    // {
    //   key: "reports",
    //   icon: HiDocumentReport,
    //   label: t("dashboard.sidebar.reports"),
    //   href: "/dashboard/reports",
    // },
    // {
    //   key: "profile",
    //   icon: HiUser,
    //   label: t("dashboard.sidebar.profile"),
    //   href: "/dashboard/profile",
    // },
    // {
    //   key: "settings",
    //   icon: HiCog,
    //   label: t("dashboard.sidebar.settings"),
    //   href: "/dashboard/settings",
    // },
    // {
    //   key: "billing",
    //   icon: HiCreditCard,
    //   label: t("dashboard.sidebar.billing"),
    //   submenu: [
    //     { label: t("dashboard.sidebar.plan"), href: "/dashboard/billing" },
    //     { label: t("dashboard.sidebar.payment"), href: "/dashboard/billing/payment" },
    //     { label: t("dashboard.sidebar.history"), href: "/dashboard/billing/history" },
    //     { label: t("dashboard.sidebar.addOns"), href: "/dashboard/billing/add-ons" },
    //   ],
    // },
    // {
    //   key: "credits",
    //   icon: HiTicket,
    //   label: t("dashboard.sidebar.credits"),
    //   href: "/dashboard/credits",
    // },
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

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Toggle collapse state and save to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", newState.toString());
  };

  return (
    <>
      {/* Mobile Sidebar - Overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
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
            <span className="text-xl font-semibold text-gray-900 whitespace-nowrap">
              Serpixa
            </span>
          </Link>
          <button
            onClick={onMobileClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
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
                isExpanded={true}
                onNavigate={onMobileClose}
              />
            ))}
          </nav>
        </div>

        {/* Support Button - Fixed at bottom */}
        <div className="border-t border-blue-200 bg-white p-4">
          <button
            onClick={() => {
              setIsSupportModalOpen(true);
              onMobileClose();
            }}
            className="relative w-full shadow-md flex items-center justify-start px-4 space-x-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 text-white bg-gradient-to-r from-primary via-blue-500 to-primary hover:shadow-lg hover:brightness-110"
          >
            <HiChatAlt className="w-5 h-5 flex-shrink-0" />
            <span className="whitespace-nowrap font-bold">Support</span>
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar - Always Visible */}
      <div className="hidden lg:block relative">
        <aside
          className={`${
            isExpanded ? "w-64" : "w-16"
          } bg-white border-r border-gray-200 shadow-md h-screen sticky top-0 flex flex-col transition-all duration-300 ease-in-out`}
          onMouseEnter={() => {
            if (isCollapsed) {
              setIsHovered(true);
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          <div className="flex-1 overflow-y-auto p-4">
            {/* Logo/Brand */}
            <Link 
              href="/" 
              className={`flex items-center ${isExpanded ? "space-x-2" : "justify-center"} mb-8 px-4 hover:opacity-80 transition-opacity cursor-pointer`}
            >
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
            </Link>

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

        {/* Support Button - Fixed at bottom */}
        <div className="border-t border-blue-200 bg-white p-4">
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className={`relative w-full shadow-md flex items-center
              ${isExpanded ? "justify-start px-4 space-x-3" : "justify-center px-2"}
              py-3 text-sm font-medium rounded-lg transition-all duration-300
              text-white
              bg-gradient-to-r from-primary via-blue-500 to-primary
              hover:shadow-lg hover:brightness-110
            `}
            
            title={!isExpanded ? "Support" : ""}
          >
            <HiChatAlt className="w-5 h-5 flex-shrink-0" />
            {isExpanded && (
              <span className="whitespace-nowrap font-bold">Support</span>
            )}
          </button>
        </div>
      </aside>
      
      {/* Desktop Toggle Button - Positioned on the edge, outside aside to avoid overflow clipping */}
      <button
        onClick={toggleCollapse}
        className="fixed top-4 w-6 h-6 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-all duration-300 text-gray-600 hover:text-gray-900 z-60"
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
      
      {/* Support Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </>
  );
}

