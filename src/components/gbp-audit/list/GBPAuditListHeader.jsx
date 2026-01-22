"use client";
import { HiPlus } from "react-icons/hi";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";
import GBPAuditListStats from "./GBPAuditListStats";
import { useTranslation } from "@/i18n/context";

export default function GBPAuditListHeader({ audits }) {
  const router = useLocalizedRouter();
  const { t } = useTranslation();

  return (
    <div className=" border-gray-200 sticky top-0 z-40 ">
      <div className=" max-w-7xl mx-auto px-6 py-2">
        <div className="bg-white/90 backdrop-blur-sm shadow-sm rounded-xl py-4 p-2 border border-gray-100 flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">{t("dashboard.gbpAudit.list.title")}</h1>
            <p className="text-sm text-gray-600">{t("dashboard.gbpAudit.list.subtitle")}</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/gbp-audit/new")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm"
          >
            <HiPlus className="w-4 h-4" />
            <span>{t("dashboard.common.newAudit")}</span>
          </button>
        </div>

        <GBPAuditListStats audits={audits} />
      </div>
    </div>
  );
}

