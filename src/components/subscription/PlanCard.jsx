"use client";
import { useTranslation } from "@/i18n/context";
import { HiCheck } from "react-icons/hi";

/**
 * PlanCard - Card component for displaying subscription plans
 */
export default function PlanCard({
  plan,
  formatPrice,
  getBillingPeriod,
  onSubscribe,
  isSubscribing,
  isCurrentPlan = false,
  isDisabled = false,
}) {
  const { t } = useTranslation();

  // Map plan names to translation keys
  const getPlanTranslationKey = (planName) => {
    const planNameLower = planName?.toLowerCase() || "";
    if (planNameLower.includes("starter")) {
      return "landing.plans.starterPlan";
    } else if (planNameLower.includes("premium")) {
      return "landing.plans.premiumPlan";
    }
    return null;
  };

  // Get translated description, fallback to backend description
  const getPlanDescription = () => {
    const translationKey = getPlanTranslationKey(plan.name);
    if (translationKey) {
      const translated = t(`${translationKey}.description`);
      // If translation exists and is not the same as the key, use it
      if (translated && !translated.startsWith("landing.plans")) {
        return translated;
      }
    }
    // Fallback to backend description
    return plan.description;
  };

  // Format features/limits for display
  const formatFeatures = (limits) => {
    if (!limits) return [];
    const features = [];

    if (limits.seo_audits) {
      features.push({
        label: t("landing.pricing.seoAudits"),
        value: limits.seo_audits,
      });
    }
    if (limits.geo_audits) {
      features.push({
        label: t("landing.pricing.localSeoAudits"),
        value: limits.geo_audits,
      });
    }
    if (limits.gbp_audits) {
      features.push({
        label: t("landing.pricing.gbpAudits"),
        value: limits.gbp_audits,
      });
    }
    if (limits.ai_generations) {
      features.push({
        label: t("landing.pricing.aiGenerations"),
        value: limits.ai_generations,
      });
    }

    return features;
  };

  const features = formatFeatures(plan.limits);

  return (
    <div
      className={`
        group relative bg-white rounded-lg sm:rounded-2xl p-6 sm:p-8 border-2 transition-all duration-300
        ${
          isCurrentPlan
            ? "border-primary shadow-lg"
            : isDisabled
            ? "border-gray-200 shadow-md opacity-60"
            : "border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] hover:border-primary/30"
        }
        ${plan.is_popular ? "ring-2 ring-primary/20" : ""}
      `}
    >
      {/* Popular Badge */}
      {plan.is_popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {t("landing.pricing.agenciesChoice")}
          </span>
        </div>
      )}

      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute -top-3 right-4">
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {t("dashboard.subscription.current")}
          </span>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        {plan.name}
      </h3>

      {/* Description */}
      {getPlanDescription() && (
        <p className="text-sm text-gray-600 mb-4 sm:mb-6">{getPlanDescription()}</p>
      )}

      {/* Price */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl sm:text-4xl font-bold text-gray-900">
            €{formatPrice(plan.price, plan.currency)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="text-gray-500 text-sm">
            /{getBillingPeriod(plan.billing_period)}
          </span>
          <span className="text-gray-500 text-xs">
            {t("landing.pricing.exclVat")}
          </span>
        </div>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-0.5 mr-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <HiCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {feature.value} {feature.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Subscribe Button */}
      <button
        onClick={() => onSubscribe(plan.stripe_price_id, plan.name)}
        disabled={isSubscribing || isCurrentPlan || isDisabled}
        className={`
          w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300
          ${
            isCurrentPlan || isDisabled
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-primary/90 text-white shadow-md hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          }
        `}
      >
        {isSubscribing
          ? t("landing.pricing.processing")
          : isCurrentPlan
          ? t("dashboard.subscription.currentPlan")
          : isDisabled
          ? t("dashboard.subscription.downgradeNotAllowed") || "Downgrade not allowed"
          : t("dashboard.subscription.subscribe")}
      </button>
    </div>
  );
}


