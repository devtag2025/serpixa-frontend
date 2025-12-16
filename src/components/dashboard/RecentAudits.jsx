"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiSearch, HiLocationMarker, HiOfficeBuilding } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

/**
 * RecentAudits - Displays list of recent audits
 */
export default function RecentAudits({ audits = [], viewAllLink = "/dashboard/reports" }) {
  const { t } = useTranslation();
  const router = useRouter();

  const getAuditIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "seo":
        return HiSearch;
      case "geo":
        return HiLocationMarker;
      case "gbp":
        return HiOfficeBuilding;
      default:
        return HiSearch;
    }
  };

  const getAuditLink = (audit) => {
    const type = audit.type?.toLowerCase();
    switch (type) {
      case "seo":
        return `/dashboard/seo-audit/${audit.id}`;
      case "geo":
        return `/dashboard/geo-audit/${audit.id}`;
      case "gbp":
        return `/dashboard/gbp-audit/${audit.id}`;
      default:
        return "#";
    }
  };

  const displayAudits = audits.length > 0 ? audits : [];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">{t("dashboard.page.recentAudits")}</h2>
        {/* <Link
          href={viewAllLink}
          className="text-sm text-primary hover:underline font-medium"
        >
          {t("dashboard.page.viewAll")} →
        </Link> */}
      </div>
      <div className="space-y-4">
        {displayAudits.length > 0 ? (
          displayAudits.map((audit) => {
            const Icon = getAuditIcon(audit.type);
            const auditLink = getAuditLink(audit);
            return (
          <div
            key={audit.id}
                onClick={() => auditLink !== "#" && router.push(auditLink)}
                className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group ${
                  auditLink !== "#" ? "cursor-pointer" : ""
                }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{audit.name}</p>
                <p className="text-sm text-gray-500">{audit.time}</p>
              </div>
            </div>
            <div
              className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                audit.status
              )}`}
            >
              {audit.status}
            </div>
          </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>{t("dashboard.page.noRecentAudits") || "No recent audits"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

