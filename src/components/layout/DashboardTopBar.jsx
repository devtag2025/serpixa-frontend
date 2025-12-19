"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth, useLogout } from "@/hooks/useAuth";
import LanguageSwitcher from "./LanguageSwitcher";
import { HiUser, HiLogout, HiMenu } from "react-icons/hi";

export default function DashboardTopBar({ onMenuClick = () => {} }) {
  const { data: user, isLoading } = useAuth();
  const { mutate: logout } = useLogout();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    }

    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 h-14 bg-white border-b border-gray-200 z-50">
      <div className="h-full flex items-center px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mr-3"
          aria-label="Open menu"
        >
          <HiMenu className="w-6 h-6" />
        </button>

        {/* Right side content - always aligned to the right */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Profile Dropdown */}
          {isLoading ? (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          ) : user ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                aria-label="User menu"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {user.name?.charAt(0).toUpperCase() ||
                      user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    profileDropdownOpen ? "rotate-180" : ""
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

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <HiUser className="w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <HiLogout className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

