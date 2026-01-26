"use client";
import GeoAuditCard from "./GeoAuditCard";
import { useTranslation } from "@/i18n/context";

/**
 * GeoAuditCardList - Container component for mobile/tablet card view
 * Renders a list of GeoAuditCard components
 * 
 * @param {Array} audits - Array of audit objects to display
 * @param {Function} onDelete - Callback function for delete action
 */
export default function GeoAuditCardList({ audits, onDelete }) {
  const { t } = useTranslation();

  if (!audits || audits.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <p className="text-sm text-gray-500">{t("dashboard.common.noResults")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {audits.map((audit) => (
        <GeoAuditCard
          key={audit._id}
          audit={audit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
