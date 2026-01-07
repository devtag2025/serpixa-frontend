"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth, useLogout } from "@/hooks/useAuth";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "@/i18n/context";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  
  // Hide navbar on dashboard pages
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const { data: user, isLoading } = useAuth();
  const { mutate: logout } = useLogout();

  const isActiveLink = (href) => pathname === href;

  const navLinks = [
    {
      label: t("navbar.whySerpixa"),
      href: "/why-serpixa",
      hasDropdown: false,
    },
    {
      label: t("navbar.aboutUs"),
      href: "/about-us",
      hasDropdown: false,
    },
    {
      label: t("navbar.features"),
      href: "/features",
      hasDropdown: false,
    },
   
    // {
    //   label: "Resources",
    //   href: "#resources",
    //   hasDropdown: true,
    //   items: ["Resource 1", "Resource 2", "Resource 3"],
    // },
  ];

  const toggleDropdown = (label) => {
    setDropdownOpen(dropdownOpen === label ? null : label);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
    <nav 
    className={`
      sticky top-0 z-50 transition-all duration-300
      ${
        isScrolled
          ? "backdrop-blur-xl bg-white/60 border-b border-white/20 shadow-sm backdrop-saturate-150"
          : "bg-white border-b border-gray-200"
      }
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
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
              <span className="text-xl font-semibold text-gray-900">
                Serpixa
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.hasDropdown ? (
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="flex items-center text-gray-700 hover:text-primary font-medium text-sm transition-colors"
                  >
                    {link.label}
                    <svg
                      className="ml-1 w-4 h-4"
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
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center font-medium text-sm transition-colors ${
                      isActiveLink(link.href)
                        ? "text-primary"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.hasDropdown && dropdownOpen === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                    {link.items?.map((item, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <LanguageSwitcher />
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-gray-900 font-medium text-sm"
                >
                  {t("navbar.dashboard")}
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <svg
                      className="w-4 h-4"
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
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {t("navbar.profile")}
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {t("navbar.signOut")}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {t("navbar.signIn")}
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                >
                 {t("navbar.signUp")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions - Language Switcher and Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdowns when clicking outside */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(null)}
        />
      )}
    </nav>

    {/* Mobile Menu Overlay - Outside nav to avoid z-index issues */}
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-[9998] md:hidden transition-opacity duration-300
          ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Side Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[9999] md:hidden
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
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
                  <span className="text-xl font-semibold text-gray-900">
                    Serpixa
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex flex-col h-[calc(100%-73px)] overflow-y-auto">
                {/* Navigation Links */}
                <div className="px-4 py-6 space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 font-medium text-base rounded-lg transition-colors ${
                          isActiveLink(link.href)
                            ? "text-primary bg-gray-50"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                      {link.hasDropdown && link.items && (
                        <div className="pl-4 mt-1 space-y-1">
                          {link.items.map((item, index) => (
                            <Link
                              key={index}
                              href="#"
                              className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-sm rounded-lg transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Auth Buttons */}
                <div className="px-4 py-4 border-t border-gray-200 mt-auto space-y-3">
                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <div className="w-8 h-8 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                    </div>
                  ) : user ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="block w-full px-4 py-3 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 text-center transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t("navbar.dashboard")}
                      </Link>
                      <div className="flex items-center space-x-3 px-4 py-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name || user.email}
                          </p>
                          {user.email && user.name && (
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {t("navbar.signOut")}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block w-full px-4 py-3 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 text-center transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t("navbar.signIn")}
                      </Link>
                      <Link
                        href="/signup"
                        className="block w-full px-4 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 text-center transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t("navbar.signUp")}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
        </>
    </>
  );
}
