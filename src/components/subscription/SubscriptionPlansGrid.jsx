"use client";
import { useState } from "react";
import { usePlans, useCreateCheckout } from "@/hooks/useSubscription";
import { useCurrentSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/context";
import { toast } from "react-hot-toast";
import PlanCard from "./PlanCard";

/**
 * SubscriptionPlansGrid - Displays available subscription plans
 */
export default function SubscriptionPlansGrid() {
  const { t } = useTranslation();
  const { data: user } = useAuth();
  const { data: subscriptionPlans = [], isLoading, isError } = usePlans("subscription");
  const { data: currentSubscription } = useCurrentSubscription();
  const createCheckout = useCreateCheckout();
  const [subscribingPriceId, setSubscribingPriceId] = useState(null);
  const [billingPeriod, setBillingPeriod] = useState("monthly"); // monthly or yearly

  // Format price from cents to euros
  const formatPrice = (priceInCents, currency = "EUR") => {
    return (priceInCents / 100).toFixed(2);
  };

  // Get billing period display
  const getBillingPeriod = (billingPeriod) => {
    switch (billingPeriod) {
      case "monthly":
        return t("landing.pricing.perMonth");
      case "yearly":
        return t("landing.pricing.perYear");
      default:
        return t("landing.pricing.perMonth");
    }
  };

  // Handle subscribe button click
  const handleSubscribe = async (priceId, planName) => {
    if (!user) {
      toast.error(t("landing.pricing.signInRequired"));
      return;
    }

    setSubscribingPriceId(priceId);
    try {
      await createCheckout.mutateAsync({ price_id: priceId });
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      // Reset after a delay to allow redirect to Stripe
      setTimeout(() => setSubscribingPriceId(null), 1000);
    }
  };

  // Filter plans by billing period
  const filteredPlans = subscriptionPlans.filter(
    (plan) => plan.billing_period === billingPeriod
  );

  // Get current plan ID if exists
  const currentPlanId = currentSubscription?.plan?.id;
  // Get current plan name to check if user has Premium Plan
  const currentPlanName = currentSubscription?.plan?.name;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary/30 border-t-primary"></div>
            <p className="mt-4 text-gray-600 text-sm">{t("dashboard.common.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <div className="text-center py-8">
          <p className="text-red-600 text-sm sm:text-base">
            {t("dashboard.common.errorLoading")}
          </p>
        </div>
      </div>
    );
  }

  // Check if we have both monthly and yearly plans
  const hasMonthly = subscriptionPlans.some((p) => p.billing_period === "monthly");
  const hasYearly = subscriptionPlans.some((p) => p.billing_period === "yearly");

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Billing Period Toggle */}
      {hasMonthly && hasYearly && (
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-all
                ${
                  billingPeriod === "monthly"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              {t("dashboard.subscription.monthly")}
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-all
                ${
                  billingPeriod === "yearly"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              {t("dashboard.subscription.yearly")}
            </button>
          </div>
        </div>
      )}

      {/* Plans Grid */}
      {filteredPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPlans.map((plan) => {
            const isSubscribing =
              subscribingPriceId === plan.stripe_price_id && createCheckout.isPending;
            const isCurrentPlan = currentPlanId === plan.id;
            // Disable Starter Plan if user has Premium Plan
            const isDowngradeDisabled = currentPlanName === "Premium Plan" && plan.name === "Starter Plan";

            return (
              <PlanCard
                key={plan.id}
                plan={plan}
                formatPrice={formatPrice}
                getBillingPeriod={getBillingPeriod}
                onSubscribe={handleSubscribe}
                isSubscribing={isSubscribing}
                isCurrentPlan={isCurrentPlan}
                isDisabled={isDowngradeDisabled}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-sm sm:text-base text-gray-600">
            {t("dashboard.subscription.noPlansAvailable")}
          </p>
        </div>
      )}
    </div>
  );
}


