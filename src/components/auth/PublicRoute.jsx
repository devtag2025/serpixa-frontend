"use client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/hooks/useAuth";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";

/**
 * PublicRoute component - redirects authenticated users away from public pages
 * (e.g., if logged in user tries to access /login, redirect to /dashboard)
 * 
 * Uses TanStack Query to check auth status
 */
export default function PublicRoute({ children, redirectTo = "/dashboard" }) {
  const { data: user, isLoading } = useAuth();
  const { push } = useLocalizedRouter();
  const queryClient = useQueryClient();

  // Check if we have cached data (even if it's an error state)
  const queryState = queryClient.getQueryState(authKeys.profile());
  const hasCachedData = queryState?.dataUpdatedAt !== undefined || queryState?.error !== undefined;
  const isInitialLoading = isLoading && !hasCachedData;

  useEffect(() => {
    // If user is authenticated, redirect away from public pages
    if (user && !isLoading) {
      push(redirectTo);
    }
  }, [user, isLoading, push, redirectTo]);

  // Show loading ONLY if there's no cached data at all (true initial load)
  // If we have cached data (even error), skip loading to prevent flash
  if (isInitialLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show public page immediately (using cached data)
  if (!user) {
    return <>{children}</>;
  }

  // If authenticated, don't render (redirect will happen)
  return null;
}

