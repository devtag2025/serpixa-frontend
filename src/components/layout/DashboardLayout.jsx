"use client";
import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "./Sidebar";
import DashboardTopBar from "./DashboardTopBar";

/**
 * DashboardLayout - Reusable layout wrapper for all dashboard pages
 * Includes:
 * - ProtectedRoute wrapper for authentication
 * - Sidebar navigation (responsive: hamburger on mobile, always visible on desktop)
 * - Top bar with profile and language switcher
 * - Content area with proper spacing
 */
export default function DashboardLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile Backdrop Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
            onClick={closeMobileSidebar}
          />
        )}

        {/* Sidebar */}
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />

        <div className="flex-1 flex flex-col lg:ml-0">
          <DashboardTopBar onMenuClick={toggleMobileSidebar} />
          {/* Content area */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

