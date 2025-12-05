"use client";
import Link from "next/link";
import { usePlans, useCreateCheckout } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/context";
import { toast } from "react-hot-toast";

export default function Pricing() {
  const { t } = useTranslation();
  const { data: user, isLoading: authLoading } = useAuth();
  const { data: subscriptionPlans = [], isLoading: plansLoading } = usePlans("subscription");
  const { data: addonPlans = [], isLoading: addonsLoading } = usePlans("addon");
  const createCheckout = useCreateCheckout();

  const isLoading = plansLoading || addonsLoading;

  // Format price from cents to dollars
  const formatPrice = (priceInCents, currency = "USD") => {
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

    try {
      await createCheckout.mutateAsync({ price_id: priceId });
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  // Determine if plan is popular (highlighted)
  const isPopular = (plan) => plan.is_popular || false;

  // Format limits for display
  const formatLimits = (limits) => {
    const limitItems = [];
    const perMonth = ` ${t("landing.pricing.perMonth")}`;
    
    if (limits?.seo_audits && limits.seo_audits > 0) {
      limitItems.push(`${limits.seo_audits} ${t("landing.pricing.seoAudits")}${perMonth}`);
    }
    if (limits?.geo_audits && limits.geo_audits > 0) {
      limitItems.push(`${limits.geo_audits} ${t("landing.pricing.geoAudits")}${perMonth}`);
    }
    if (limits?.gbp_audits && limits.gbp_audits > 0) {
      limitItems.push(`${limits.gbp_audits} ${t("landing.pricing.gbpAudits")}${perMonth}`);
    }
    if (limits?.ai_generations && limits.ai_generations > 0) {
      limitItems.push(`${limits.ai_generations} ${t("landing.pricing.aiGenerations")}${perMonth}`);
    }
    if (limits?.searches_per_month && limits.searches_per_month > 0) {
      limitItems.push(`${limits.searches_per_month} ${t("landing.pricing.searchesPerMonth")}`);
    }
    if (limits?.api_calls_per_month && limits.api_calls_per_month > 0) {
      limitItems.push(`${limits.api_calls_per_month} ${t("landing.pricing.apiCallsPerMonth")}`);
    }
    
    return limitItems;
  };

  // Format credits for addon plans
  const formatCredits = (credits) => {
    const creditItems = [];
    
    if (credits?.seo_audits && credits.seo_audits > 0) {
      creditItems.push(`${credits.seo_audits} ${t("landing.pricing.seoAudits")}`);
    }
    if (credits?.geo_audits && credits.geo_audits > 0) {
      creditItems.push(`${credits.geo_audits} ${t("landing.pricing.geoAudits")}`);
    }
    if (credits?.gbp_audits && credits.gbp_audits > 0) {
      creditItems.push(`${credits.gbp_audits} ${t("landing.pricing.gbpAudits")}`);
    }
    if (credits?.ai_generations && credits.ai_generations > 0) {
      creditItems.push(`${credits.ai_generations} ${t("landing.pricing.aiGenerations")}`);
    }
    
    return creditItems;
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("landing.pricing.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t("landing.pricing.subtitle")}
          </p>
        </div>

        {/* Main Pricing Plans */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">{t("landing.pricing.loadingPlans")}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 max-w-4xl mx-auto">
              {subscriptionPlans.map((plan) => {
                const highlighted = isPopular(plan);
                return (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-2xl p-8 shadow-sm ${
                      highlighted
                        ? "border-2 border-primary ring-2 ring-primary/20"
                        : "border border-gray-200"
                    } transition-all hover:shadow-lg`}
                  >
                    {/* Badge */}
                    {plan.is_popular && (
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-primary text-xs font-semibold rounded-full">
                          {t("landing.pricing.agenciesChoice")}
                        </span>
                      </div>
                    )}

                    {/* Plan Name */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-gray-600 text-sm">{t("landing.pricing.from")} </span>
                      <span className="text-4xl font-bold text-gray-900">
                        ${formatPrice(plan.price, plan.currency)}
                      </span>
                      <span className="text-gray-600 text-lg">/{getBillingPeriod(plan.billing_period)}</span>
                    </div>

                    {/* Description */}
                    {plan.description && (
                      <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>
                    )}

                    {/* Limits/Features */}
                    {(() => {
                      const limitItems = plan.limits ? formatLimits(plan.limits) : [];
                      const hasLimits = limitItems.length > 0;
                      const hasFeatures = plan.features && plan.features.length > 0;
                      
                      if (!hasLimits && !hasFeatures) return null;
                      
                      return (
                        <ul className="space-y-3 mb-8">
                          {hasLimits ? (
                            limitItems.map((limit, limitIndex) => (
                              <li key={limitIndex} className="flex items-start">
                                <svg
                                  className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0"
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
                                <span className="text-gray-700 text-sm font-medium">{limit}</span>
                              </li>
                            ))
                          ) : (
                            plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start">
                                <svg
                                  className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0"
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
                                <span className="text-gray-700 text-sm">{feature}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      );
                    })()}

                    {/* CTA Button */}
                    {user ? (
                      <button
                        onClick={() => handleCheckout(plan.stripe_price_id, plan.name)}
                        disabled={createCheckout.isPending}
                        className={`block w-full text-center py-3 px-6 rounded-md font-medium transition-colors ${
                          highlighted
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "bg-primary text-white hover:bg-primary/90"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {createCheckout.isPending ? t("landing.pricing.processing") : t("landing.pricing.startTrial")}
                      </button>
                    ) : (
                      <Link
                        href="/signup"
                        className={`block w-full text-center py-3 px-6 rounded-md font-medium transition-colors ${
                          highlighted
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "bg-primary text-white hover:bg-primary/90"
                        }`}
                      >
                        {t("landing.pricing.startTrial")}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add-ons Section */}
            {addonPlans.length > 0 && (
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {t("landing.pricing.needMore")}
                </h3>

                {/* Add-ons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6 mt-12">
                  {addonPlans.map((addon) => {
                    const creditItems = formatCredits(addon.credits);
                    return (
                      <div
                        key={addon.id}
                        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm transition-all hover:shadow-lg"
                      >
                        <h4 className="text-lg font-bold text-gray-900 mb-4">{addon.name}</h4>
                        <div className="mb-4">
                          <span className="text-gray-600 text-sm">{t("landing.pricing.from")} </span>
                          <span className="text-2xl font-bold text-gray-900">
                            ${formatPrice(addon.price, addon.currency)}
                          </span>
                          <span className="text-gray-600 text-lg">/{getBillingPeriod(addon.billing_period)}</span>
                        </div>
                        
                        {/* Show credits for addons */}
                        {creditItems.length > 0 && (
                          <div className="mb-6">
                            <ul className="space-y-2">
                              {creditItems.map((credit, creditIndex) => (
                                <li key={creditIndex} className="flex items-start">
                                  <svg
                                    className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0"
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
                                  <span className="text-gray-700 text-sm font-medium">{credit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {user ? (
                          <button
                            onClick={() => handleCheckout(addon.stripe_price_id, addon.name)}
                            disabled={createCheckout.isPending}
                            className="block w-full text-center py-3 px-6 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {createCheckout.isPending ? t("landing.pricing.processing") : t("landing.pricing.purchase")}
                          </button>
                        ) : (
                          <Link
                            href="/signup"
                            className="block w-full text-center py-3 px-6 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                          >
                            {t("landing.pricing.purchase")}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
