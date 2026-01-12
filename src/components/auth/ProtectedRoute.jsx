"use client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";

/**
 * ProtectedRoute component using TanStack Query
 * 
 * Benefits of using TanStack Query here:
 * 1. Automatic caching - user data is cached and reused
 * 2. Built-in loading states - no manual useState needed
 * 3. Automatic error handling - 401 errors are handled gracefully
 * 4. No useEffect needed - React Query handles the lifecycle
 * 5. Automatic refetching options
 */
export default function ProtectedRoute({ children }) {
  const { data: user, isLoading, isError, error } = useAuth();
  const { push } = useLocalizedRouter();

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    // isError with 401 means not authenticated
    if (isError && error?.response?.status === 401) {
      push("/login");
    }
  }, [isError, error, push]);

  // Show loading state while checking authentication
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

  // If error and not 401, show error (401 is handled by redirect above)
  if (isError && error?.response?.status !== 401) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600">Something went wrong. Please try again.</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, render children
  if (user) {
    return <>{children}</>;
  }

  // Fallback (shouldn't reach here due to redirect, but just in case)
  return null;
}

