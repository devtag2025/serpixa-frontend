"use client";
import { useTranslation } from "@/i18n/context";
import { HiCheckCircle, HiCalendar } from "react-icons/hi";
import { formatEuropeanDate } from "@/utils/dateFormatter";

/**
 * PurchaseHistory - Dummy purchase history component
 * Shows mock data of addon purchases
 */
export default function PurchaseHistory({ extras }) {
  const { t } = useTranslation();

  // Generate dummy purchase history based on current credits
  const generateDummyHistory = () => {
    const history = [];
    const now = new Date();

    extras.forEach((extra) => {
      if (extra.credits > 0) {
        // Create 1-3 dummy purchases per credit type
        const purchaseCount = Math.min(Math.ceil(extra.credits / 30), 3);
        const creditsPerPurchase = Math.floor(extra.credits / purchaseCount);

        for (let i = 0; i < purchaseCount; i++) {
          const purchaseDate = new Date(now);
          purchaseDate.setDate(purchaseDate.getDate() - (i * 30 + Math.floor(Math.random() * 15)));

          history.push({
            id: `${extra.key}-${i}`,
            type: extra.label,
            packName: `${extra.label} Extra Pack`,
            credits: creditsPerPurchase + (i === 0 ? extra.credits % purchaseCount : 0),
            date: purchaseDate,
            price: (creditsPerPurchase * 0.5).toFixed(2), // Dummy price calculation
            color: extra.color,
          });
        }
      }
    });

    // Sort by date (newest first)
    return history.sort((a, b) => b.date - a.date);
  };

  const purchaseHistory = generateDummyHistory();

  if (purchaseHistory.length === 0) {
    return null;
  }

  const formatDate = (date) => {
    return formatEuropeanDate(date, { shortMonth: true });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("dashboard.extras.purchaseHistory")}
      </h3>

      <div className="space-y-3">
        {purchaseHistory.map((purchase) => (
          <div
            key={purchase.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${purchase.color}15` }}
              >
                <HiCheckCircle
                  className="w-5 h-5"
                  style={{ color: purchase.color }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-gray-900">
                    {purchase.packName}
                  </p>
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${purchase.color}15`,
                      color: purchase.color,
                    }}
                  >
                    {purchase.credits} {t("dashboard.extras.credits")}
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <HiCalendar className="w-4 h-4" />
                    <span>{formatDate(purchase.date)}</span>
                  </div>
                  <span>€{purchase.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center italic">
        {t("dashboard.extras.historyNote")}
      </p>
    </div>
  );
}

