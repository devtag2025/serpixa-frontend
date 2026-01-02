"use client";
import { useTranslation } from "@/i18n/context";
import { useCurrentSubscription } from "@/hooks/useSubscription";
import {
  HiCreditCard,
  HiCalendar,
  HiCheckCircle,
  HiXCircle,
  HiClock,
} from "react-icons/hi";

/**
 * CurrentSubscriptionCard - Displays current subscription information
 */
export default function CurrentSubscriptionCard() {
  const { t } = useTranslation();
  const { data: subscription, isLoading, isError } = useCurrentSubscription();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary/30 border-t-primary"></div>
            <p className="mt-4 text-gray-600 text-sm">{t("dashboard.common.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !subscription || subscription.status === "none") {
    return (
      <div className="bg-white rounded-lg sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiCreditCard className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            {t("dashboard.subscription.noSubscription")}
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            {t("dashboard.subscription.noSubscriptionDescription")}
          </p>
        </div>
      </div>
    );
  }

  const { plan, status, current_period_start, current_period_end, cancel_at_period_end } =
    subscription;

  // Format price
  const formatPrice = (price, currency = "EUR") => {
    return (price / 100).toFixed(2);
  };

  // Get billing period display
  const getBillingPeriod = (billingPeriod) => {
    switch (billingPeriod) {
      case "monthly":
        return t("landing.pricing.perMonth");
      case "yearly":
        return t("landing.pricing.perYear");
      default:
        return "";
    }
  };

  // Get status badge
  const getStatusBadge = () => {
    const statusConfig = {
      active: {
        icon: HiCheckCircle,
        color: "text-green-600 bg-green-50",
        label: t("dashboard.subscription.status.active"),
      },
      trial: {
        icon: HiClock,
        color: "text-blue-600 bg-blue-50",
        label: t("dashboard.subscription.status.trial"),
      },
      canceled: {
        icon: HiXCircle,
        color: "text-red-600 bg-red-50",
        label: t("dashboard.subscription.status.canceled"),
      },
      past_due: {
        icon: HiXCircle,
        color: "text-amber-600 bg-amber-50",
        label: t("dashboard.subscription.status.pastDue"),
      },
    };

    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${config.color}`}
      >
        <Icon className="w-4 h-4" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {t("dashboard.subscription.currentPlan")}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">{plan?.name || "N/A"}</p>
        </div>
        {getStatusBadge()}
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Plan Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Price */}
          <div className="flex items-start gap-3">
            <HiCreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {t("dashboard.subscription.price")}
              </p>
              <p className="text-lg font-semibold text-gray-900">
                €{formatPrice(plan?.price, plan?.currency)}
                {plan?.billing_period && (
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    /{getBillingPeriod(plan.billing_period)}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Renewal Date */}
          {current_period_end && (
            <div className="flex items-start gap-3">
              <HiCalendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {cancel_at_period_end
                    ? t("dashboard.subscription.endsOn")
                    : t("dashboard.subscription.renewsOn")}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(current_period_end).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cancel Notice */}
        {cancel_at_period_end && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              {t("dashboard.subscription.cancelingNotice")}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <button
            className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
            onClick={() => {
              // TODO: Implement manage subscription (Stripe Portal)
              console.log("Manage subscription clicked");
            }}
          >
            {t("dashboard.subscription.manageSubscription")}
          </button>
          {!cancel_at_period_end && (
            <button
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
              onClick={() => {
                // TODO: Implement upgrade plan
                console.log("Upgrade plan clicked");
              }}
            >
              {t("dashboard.subscription.upgradePlan")}
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
}


