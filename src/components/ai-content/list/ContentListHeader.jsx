"use client";
import { HiPlus } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/context";

export default function ContentListHeader() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className=" border-b border-gray-200 sticky top-0 z-40 ">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="bg-white/90 backdrop-blur-sm shadow-sm rounded-xl py-4 p-2 border border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {t("dashboard.sidebar.aiContent")}
            </h1>
            <p className="text-sm text-gray-600">
              {t("dashboard.aiContent.list.subtitle")}
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/ai-content/new")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm"
          >
            <HiPlus className="w-4 h-4" />
            <span>{t("dashboard.common.newAudit")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

