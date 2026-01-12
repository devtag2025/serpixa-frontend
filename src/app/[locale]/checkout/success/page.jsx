"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCurrentSubscription } from "@/hooks/useSubscription";
import { useQueryClient } from "@tanstack/react-query";

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const { data: subscription, refetch } = useCurrentSubscription();

  useEffect(() => {
    // Check if we have a success parameter
    const success = searchParams.get("success");
    const sessionId = searchParams.get("session_id");

    if (success === "true") {
      // Invalidate subscription queries to refetch latest data
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      
      // Refetch subscription data
      setTimeout(() => {
        refetch();
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(false);
    }
  }, [searchParams, queryClient, refetch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {isLoading ? (
          <>
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing your payment...</h1>
            <p className="text-gray-600">Please wait while we confirm your subscription.</p>
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Your subscription has been activated. You can now access all premium features.
              </p>
            </div>

            {subscription && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Your Plan:</h3>
                <p className="text-gray-700">{subscription.plan?.name}</p>
                {subscription.current_period_end && (
                  <p className="text-sm text-gray-600 mt-1">
                    Next billing: {new Date(subscription.current_period_end).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="block w-full py-3 px-6 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/"
                className="block w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h1>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}

