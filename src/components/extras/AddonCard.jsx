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
    <div className="group bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] sm:hover:scale-105 hover:border-primary/30">
      <h4 className="text-lg sm:text-xl text-start font-bold text-gray-900 mb-3 sm:mb-4 break-words">
        {addon.name}
      </h4>

      {addon.description && (
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 break-words">{addon.description}</p>
      )}

      <div className="mb-4 sm:mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            €{formatPrice(addon.price, addon.currency)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
          <span className="text-gray-500 text-xs sm:text-sm">
            /{getBillingPeriod(addon.billing_period)}
          </span>
          <span className="text-gray-500 text-[10px] sm:text-xs">{t("landing.pricing.exclVat")}</span>
        </div>
      </div>

      {/* Show credits for addons */}
      {creditItems.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <ul className="space-y-2 sm:space-y-3">
            {creditItems.map((credit, creditIndex) => (
              <li key={creditIndex} className="flex items-start">
                <div className="flex-shrink-0 mt-0.5 mr-2 sm:mr-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <HiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  </div>
                </div>
                <span className="text-gray-700 text-xs sm:text-sm font-medium break-words">
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
        className="w-full text-center py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isPurchasing
          ? t("landing.pricing.processing")
          : t("landing.pricing.purchase")}
      </button>
    </div>
  );
}

