"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "./Sidebar";
import DashboardTopBar from "./DashboardTopBar";

/**
 * DashboardLayout - Reusable layout wrapper for all dashboard pages
 * Includes:
 * - ProtectedRoute wrapper for authentication
 * - Sidebar navigation
 * - Top bar with profile and language switcher
 * - Content area with proper spacing
 */
export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <DashboardTopBar />
          {/* Content area */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

