"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * PublicRoute component - redirects authenticated users away from public pages
 * (e.g., if logged in user tries to access /login, redirect to /dashboard)
 * 
 * Uses TanStack Query to check auth status
 */
export default function PublicRoute({ children, redirectTo = "/dashboard" }) {
  const { data: user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is authenticated, redirect away from public pages
    if (user && !isLoading) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  // Show loading while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show public page
  if (!user) {
    return <>{children}</>;
  }

  // If authenticated, don't render (redirect will happen)
  return null;
}

