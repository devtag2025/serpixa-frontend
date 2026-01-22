"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCurrentSubscription } from "@/hooks/useSubscription";
import { useQueryClient } from "@tanstack/react-query";
import { formatEuropeanDate } from "@/utils/dateFormatter";
import { SubscriptionService } from "@/services/subscriptionService";
import { useTranslation } from "@/i18n/context";

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const [error, setError] = useState(null);
  const { data: subscription, refetch } = useCurrentSubscription();

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      const success = searchParams.get("success");
      const sessionId = searchParams.get("session_id");

      if (success !== "true" || !sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch checkout session details to know what was purchased
        const response = await SubscriptionService.getCheckoutSession(sessionId);
        const sessionData = response.data?.data;
        
        if (sessionData) {
          setPurchaseInfo(sessionData);
        }

        // Invalidate queries to refetch latest data
        queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
        queryClient.invalidateQueries({ queryKey: ["credits"] });
        
        // Refetch subscription data
        await refetch();
      } catch (err) {
        console.error("Error fetching purchase details:", err);
        // Still show success but without detailed info
        setError("Could not fetch purchase details");
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to allow webhook to process
    const timer = setTimeout(fetchPurchaseDetails, 1500);
    return () => clearTimeout(timer);
  }, [searchParams, queryClient, refetch]);

  // Determine if this was an addon purchase
  const isAddonPurchase = purchaseInfo?.plan_type === "addon";

  // Format credits for display
  const formatCredits = (credits) => {
    if (!credits) return [];
    const items = [];
    if (credits.seo_audits > 0) items.push(`${credits.seo_audits} SEO Audits`);
    if (credits.geo_audits > 0) items.push(`${credits.geo_audits} Geo Audits`);
    if (credits.gbp_audits > 0) items.push(`${credits.gbp_audits} GBP Audits`);
    if (credits.ai_generations > 0) items.push(`${credits.ai_generations} AI Generations`);
    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {isLoading ? (
          <>
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t("checkout.processing") || "Processing your payment..."}
            </h1>
            <p className="text-gray-600">
              {isAddonPurchase || purchaseInfo?.plan_type === "addon"
                ? (t("checkout.confirmingAddon") || "Please wait while we add your credits.")
                : (t("checkout.confirmingSubscription") || "Please wait while we confirm your subscription.")}
            </p>
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {t("checkout.paymentSuccessful") || "Payment Successful!"}
              </h1>
              <p className="text-gray-600 mb-6">
                {isAddonPurchase
                  ? (t("checkout.creditsAdded") || "Your credits have been added to your account.")
                  : (t("checkout.subscriptionActivated") || "Your subscription has been activated. You can now access all premium features.")}
              </p>
            </div>

            {/* Addon Purchase Details */}
            {isAddonPurchase && purchaseInfo && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {t("checkout.addonPurchased") || "Addon Purchased"}
                  </h3>
                </div>
                <p className="text-gray-800 font-medium mb-2">{purchaseInfo.plan_name}</p>
                {purchaseInfo.plan?.credits && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">{t("checkout.creditsReceived") || "Credits received:"}</p>
                    <ul className="space-y-1">
                      {formatCredits(purchaseInfo.plan.credits).map((credit, idx) => (
                        <li key={idx} className="text-sm text-blue-700 flex items-center gap-1">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {credit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Subscription Details */}
            {!isAddonPurchase && (purchaseInfo || subscription) && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("checkout.yourPlan") || "Your Plan:"}
                </h3>
                <p className="text-gray-700">
                  {purchaseInfo?.plan_name || subscription?.plan?.name}
                </p>
                {subscription?.current_period_end && (
                  <p className="text-sm text-gray-600 mt-1">
                    {t("checkout.nextBilling") || "Next billing:"} {formatEuropeanDate(subscription.current_period_end)}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="block w-full py-3 px-6 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                {t("checkout.goToDashboard") || "Go to Dashboard"}
              </Link>
              {isAddonPurchase && (
                <Link
                  href="/dashboard/subscription"
                  className="block w-full py-3 px-6 bg-blue-50 text-blue-700 rounded-md font-medium hover:bg-blue-100 transition-colors"
                >
                  {t("checkout.viewCredits") || "View Your Credits"}
                </Link>
              )}
              <Link
                href="/"
                className="block w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                {t("checkout.backToHome") || "Back to Home"}
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

