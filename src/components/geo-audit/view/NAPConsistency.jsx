"use client";
import { HiCheckCircle, HiXCircle, HiExclamationCircle } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function NAPConsistency({ napIssues }) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{t("dashboard.geoAudit.view.napConsistency")}</h2>
      </div>
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3 lg:space-y-4">
        {napIssues ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-gray-900">{t("dashboard.geoAudit.view.nameConsistency")}</span>
              {napIssues.nameConsistency ? (
                <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <HiXCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-gray-900">{t("dashboard.geoAudit.view.addressConsistency")}</span>
              {napIssues.addressConsistency ? (
                <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <HiXCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-medium text-gray-900">{t("dashboard.geoAudit.view.phoneConsistency")}</span>
              {napIssues.phoneConsistency ? (
                <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <HiXCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
              )}
            </div>
            {napIssues.issues && napIssues.issues.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t("dashboard.geoAudit.view.issues")}</p>
                <ul className="space-y-1 max-h-[200px] overflow-y-auto">
                  {napIssues.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                      <HiExclamationCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">{t("dashboard.geoAudit.view.noNapData")}</p>
        )}
      </div>
    </div>
  );
}

