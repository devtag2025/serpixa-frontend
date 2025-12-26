"use client";
import { useState } from "react";
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
  const [purchasingPriceId, setPurchasingPriceId] = useState(null);

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

  // Get translated plan name or description
  const getPlanTranslation = (planName, type = 'name') => {
    // Map database plan names to translation keys
    const planKeyMap = {
      'Starter Plan': 'plans.starterPlan',
      'Premium Plan': 'plans.premiumPlan',
      'Extra 10 SEO Audits': 'plans.extra10SeoAudits',
      'Extra 10 GEO Audits': 'plans.extra10GeoAudits',
      'Extra 5 GBP Audits': 'plans.extra5GbpAudits',
      'Extra 50 AI Generations': 'plans.extra50AiGenerations',
    };
    
    const key = planKeyMap[planName];
    if (key) {
      const translation = t(`${key}.${type}`);
      // If translation exists and is different from key (not a fallback), return it
      if (translation && !translation.startsWith('plans.')) {
        return translation;
      }
    }
    // Fallback to original value if no translation found
    return planName;
  };

  return (
    <section id="pricing" className="relative py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">{t("landing.pricing.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {t("landing.pricing.title")}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("landing.pricing.subtitle")}
          </p>
        </div>

        {/* Main Pricing Plans */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-6 text-gray-600 text-lg">{t("landing.pricing.loadingPlans")}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
              {subscriptionPlans.map((plan) => {
                const highlighted = isPopular(plan);
                return (
                  <div
                    key={plan.id}
                    className={`group relative bg-white rounded-3xl p-8 md:p-10 ${
                      highlighted
                        ? "border-2 border-primary shadow-2xl shadow-primary/20 scale-105 md:scale-110"
                        : "border border-gray-200 shadow-lg"
                    } transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                  >
                    {/* Gradient overlay for popular plan */}
                    {highlighted && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-3xl -z-10"></div>
                    )}
                    
                    {/* Badge */}
                    {plan.is_popular && (
                      <div className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {t("landing.pricing.agenciesChoice")}
                        </span>
                      </div>
                    )}

                    {/* Plan Name */}
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{getPlanTranslation(plan.name, 'name')}</h3>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        €{formatPrice(plan.price, plan.currency)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500 text-lg">/{getBillingPeriod(plan.billing_period)}</span>
                        <span className="text-gray-500 text-xs">{t("landing.pricing.exclVat")}</span>
                      </div>
                    </div>

                    {/* Description */}
                    {plan.description && (
                      <p className="text-gray-600 mb-8 text-base leading-relaxed">{getPlanTranslation(plan.name, 'description')}</p>
                    )}

                    {/* Limits/Features */}
                    {(() => {
                      const limitItems = plan.limits ? formatLimits(plan.limits) : [];
                      const hasLimits = limitItems.length > 0;
                      const hasFeatures = plan.features && plan.features.length > 0;
                      
                      if (!hasLimits && !hasFeatures) return null;
                      
                      return (
                        <ul className="space-y-4 mb-10">
                          {hasLimits ? (
                            limitItems.map((limit, limitIndex) => (
                              <li key={limitIndex} className="flex items-start group/item">
                                <div className="flex-shrink-0 mt-1 mr-4">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                                    <svg
                                      className="w-4 h-4 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <span className="text-gray-700 text-base font-medium leading-relaxed">{limit}</span>
                              </li>
                            ))
                          ) : (
                            plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start group/item">
                                <div className="flex-shrink-0 mt-1 mr-4">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                                    <svg
                                      className="w-4 h-4 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
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
                        disabled={purchasingPriceId === plan.stripe_price_id && createCheckout.isPending}
                        className={`group/btn relative w-full text-center py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 ${
                          highlighted
                            ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
                            : "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
                        } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                      >
                        <span className="relative z-10">
                          {(purchasingPriceId === plan.stripe_price_id && createCheckout.isPending) ? t("landing.pricing.processing") : t("landing.pricing.startTrial")}
                        </span>
                        {!(purchasingPriceId === plan.stripe_price_id && createCheckout.isPending) && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-600/90 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        )}
                      </button>
                    ) : (
                      <Link
                        href="/signup"
                        className={`group/btn relative block w-full text-center py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 ${
                          highlighted
                            ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
                            : "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
                        }`}
                      >
                        <span className="relative z-10">{t("landing.pricing.startTrial")}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-600/90 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add-ons Section */}
            {addonPlans.length > 0 && (
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t("landing.pricing.needMore")}
                </h3>
                <p className="text-gray-600 mb-12 text-lg">{t("landing.pricing.enhancePlan")}</p>

                {/* Add-ons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                  {addonPlans.map((addon) => {
                    const creditItems = formatCredits(addon.credits);
                    return (
                      <div
                        key={addon.id}
                        className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary/30"
                      >
                        <h4 className="text-xl text-start font-bold text-gray-900 mb-4">{getPlanTranslation(addon.name, 'name')}</h4>
                        <div className="mb-6">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-900">
                            €{formatPrice(addon.price, addon.currency)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-500 text-sm">/{getBillingPeriod(addon.billing_period)}</span>
                            <span className="text-gray-500 text-xs">{t("landing.pricing.exclVat")}</span>
                          </div>
                        </div>
                        
                        {/* Show credits for addons */}
                        {creditItems.length > 0 && (
                          <div className="mb-6">
                            <ul className="space-y-3">
                              {creditItems.map((credit, creditIndex) => (
                                <li key={creditIndex} className="flex items-start">
                                  <div className="flex-shrink-0 mt-0.5 mr-3">
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                                      <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={3}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <span className="text-gray-700 text-sm font-medium">{credit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {user ? (
                          <button
                            onClick={() => handleCheckout(addon.stripe_price_id, addon.name)}
                            disabled={purchasingPriceId === addon.stripe_price_id && createCheckout.isPending}
                            className="w-full text-center py-3 px-6 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                          >
                            {(purchasingPriceId === addon.stripe_price_id && createCheckout.isPending) ? t("landing.pricing.processing") : t("landing.pricing.purchase")}
                          </button>
                        ) : (
                          <Link
                            href="/signup"
                            className="block w-full text-center py-3 px-6 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
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
