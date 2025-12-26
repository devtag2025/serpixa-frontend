"use client";
import { useState } from "react";
import { usePlans, useCreateCheckout } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/context";
import { toast } from "react-hot-toast";
import AddonCard from "./AddonCard";

export default function BuyMoreExtras() {
  const { t } = useTranslation();
  const { data: user } = useAuth();
  const { data: addonPlans = [], isLoading, isError } = usePlans("addon");
  const createCheckout = useCreateCheckout();
  const [purchasingPriceId, setPurchasingPriceId] = useState(null);

  // Format price from cents to euros
  const formatPrice = (priceInCents, currency = "EUR") => {
    const price = (priceInCents / 100).toFixed(2);
    return price;
  };

  // Get billing period display
  const getBillingPeriod = (billingPeriod) => {
    switch (billingPeriod) {
      case "monthly":
        return t("landing.pricing.perMonth");
      case "yearly":
        return t("landing.pricing.perYear");
      case "one_time":
        return t("landing.pricing.oneTime");
      default:
        return t("landing.pricing.perMonth");
    }
  };

  // Handle checkout button click
  const handleCheckout = async (priceId, planName) => {
    if (!user) {
      toast.error(t("landing.pricing.signInRequired"));
      return;
    }

    setPurchasingPriceId(priceId);
    try {
      await createCheckout.mutateAsync({ price_id: priceId });
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      // Reset after a delay to allow redirect to Stripe
      setTimeout(() => setPurchasingPriceId(null), 1000);
    }
  };

  // Format credits for addon plans
  const formatCredits = (credits) => {
    const creditItems = [];

    if (credits?.seo_audits && credits.seo_audits > 0) {
      creditItems.push({
        type: "seo_audits",
        label: t("landing.pricing.seoAudits"),
        value: credits.seo_audits,
      });
    }
    if (credits?.geo_audits && credits.geo_audits > 0) {
      creditItems.push({
        type: "geo_audits",
        label: t("landing.pricing.geoAudits"),
        value: credits.geo_audits,
      });
    }
    if (credits?.gbp_audits && credits.gbp_audits > 0) {
      creditItems.push({
        type: "gbp_audits",
        label: t("landing.pricing.gbpAudits"),
        value: credits.gbp_audits,
      });
    }
    if (credits?.ai_generations && credits.ai_generations > 0) {
      creditItems.push({
        type: "ai_generations",
        label: t("landing.pricing.aiGenerations"),
        value: credits.ai_generations,
      });
    }

    return creditItems;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-4 border-primary/30 border-t-primary"></div>
            <p className="mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm">{t("dashboard.common.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="text-center py-6 sm:py-8">
          <p className="text-red-600 text-sm sm:text-base">{t("dashboard.common.errorLoading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div id="buy-more-extras" className="space-y-4 sm:space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t("dashboard.extras.buyMore")}
        </h2>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm">
          {t("dashboard.extras.buyMoreDescription")}
        </p>
      </div>

      {/* Addon Cards */}
      {addonPlans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {addonPlans.map((addon) => {
            const creditItems = formatCredits(addon.credits);
            const isPurchasing = purchasingPriceId === addon.stripe_price_id && createCheckout.isPending;
            return (
              <AddonCard
                key={addon.id}
                addon={addon}
                creditItems={creditItems}
                formatPrice={formatPrice}
                getBillingPeriod={getBillingPeriod}
                onPurchase={handleCheckout}
                isPurchasing={isPurchasing}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg sm:rounded-2xl p-6 sm:p-8 lg:p-12 shadow-sm border border-gray-100 text-center">
          <p className="text-sm sm:text-base text-gray-600">
            {t("dashboard.extras.noAddonsAvailable")}
          </p>
        </div>
      )}
    </div>
  );
}

