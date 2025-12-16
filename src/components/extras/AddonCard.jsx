"use client";
import { useTranslation } from "@/i18n/context";
import { HiCheck } from "react-icons/hi";

/**
 * AddonCard - Card component for displaying addon plans
 */
export default function AddonCard({
  addon,
  creditItems,
  formatPrice,
  getBillingPeriod,
  onPurchase,
  isPurchasing,
}) {
  const { t } = useTranslation();

  return (
    <div className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary/30">
      <h4 className="text-xl text-start font-bold text-gray-900 mb-4">
        {addon.name}
      </h4>

      {addon.description && (
        <p className="text-sm text-gray-600 mb-4">{addon.description}</p>
      )}

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-900">
            €{formatPrice(addon.price, addon.currency)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-500 text-sm">
            /{getBillingPeriod(addon.billing_period)}
          </span>
          <span className="text-gray-500 text-xs">HTVA</span>
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
                    <HiCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
                <span className="text-gray-700 text-sm font-medium">
                  {credit.value} {credit.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => onPurchase(addon.stripe_price_id, addon.name)}
        disabled={isPurchasing}
        className="w-full text-center py-3 px-6 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isPurchasing
          ? t("landing.pricing.processing")
          : t("landing.pricing.purchase")}
      </button>
    </div>
  );
}

