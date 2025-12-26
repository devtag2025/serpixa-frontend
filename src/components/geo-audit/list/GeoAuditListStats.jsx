"use client";
import { HiLocationMarker, HiLightningBolt, HiUsers, HiClock } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function GeoAuditListStats({ audits }) {
  const { t } = useTranslation();
  const totalAudits = audits.length;
  const avgScore = audits.length > 0
    ? Math.round(audits.reduce((sum, a) => sum + (a.localVisibilityScore || 0), 0) / audits.length)
    : 0;
  const totalCompetitors = audits.reduce((sum, a) => sum + (a.competitors?.length || 0), 0);
  const completedAudits = audits.filter((a) => a.status === "completed").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-blue-50">
            <HiLocationMarker className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.geoAudit.list.totalAudits")}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{totalAudits}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-emerald-50">
            <HiLightningBolt className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.geoAudit.list.avgVisibility")}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{avgScore}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-purple-50">
            <HiUsers className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.geoAudit.list.totalCompetitors")}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{totalCompetitors}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-amber-50">
            <HiClock className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t("dashboard.geoAudit.list.completed")}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{completedAudits}</p>
      </div>
    </div>
  );
}

