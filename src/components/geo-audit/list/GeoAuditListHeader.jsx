"use client";
import { HiPlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import GeoAuditListStats from "./GeoAuditListStats";
import { useTranslation } from "@/i18n/context";

export default function GeoAuditListHeader({ audits }) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">{t("dashboard.geoAudit.list.title")}</h1>
            <p className="text-sm text-gray-600">{t("dashboard.geoAudit.list.subtitle")}</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/geo-audit/new")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm"
          >
            <HiPlus className="w-4 h-4" />
            <span>{t("dashboard.common.newAudit")}</span>
          </button>
        </div>

        <GeoAuditListStats audits={audits} />
      </div>
    </div>
  );
}

