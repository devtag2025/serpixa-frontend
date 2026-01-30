"use client";
import { HiOfficeBuilding, HiLocationMarker, HiPhone, HiGlobe, HiStar, HiClipboardCopy, HiExternalLink, HiClock } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

// Helper function to format time from { hour, minute } to "HH:MM"
const formatTime = (time) => {
  if (!time) return "";
  const hour = time.hour?.toString().padStart(2, "0") || "00";
  const minute = time.minute?.toString().padStart(2, "0") || "00";
  return `${hour}:${minute}`;
};

// Helper function to format a day's hours
const formatDayHours = (daySchedule) => {
  if (!daySchedule || daySchedule.length === 0) return null;
  return daySchedule.map((slot, idx) => (
    `${formatTime(slot.open)} - ${formatTime(slot.close)}`
  )).join(", ");
};

// Day name translations (will use i18n later if needed)
const dayNames = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

// Extract timetable from various hours formats
const extractTimetable = (hours) => {
  if (!hours) return null;
  // Format: { work_hours: { timetable: {...} } }
  if (hours.work_hours?.timetable) return hours.work_hours.timetable;
  // Format: { timetable: {...} }
  if (hours.timetable) return hours.timetable;
  // Format: direct day keys { monday: [...], tuesday: [...] }
  if (hours.monday || hours.tuesday || hours.sunday) return hours;
  return null;
};

export default function BusinessInfo({ businessInfo, onCopyToClipboard }) {
  const { t } = useTranslation();
  if (!businessInfo) return null;
  
  // Extract timetable from hours
  const timetable = extractTimetable(businessInfo.hours);

  return (
    <div className="mb-4 sm:mb-6 bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">{t("dashboard.gbpAudit.view.businessInfo")}</h2>
      </div>
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {businessInfo.name && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiOfficeBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.gbpAudit.view.name")}</p>
                <p className="text-xs sm:text-sm text-gray-900 break-words">{businessInfo.name}</p>
              </div>
            </div>
          )}
          {businessInfo.address && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiLocationMarker className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.gbpAudit.view.address")}</p>
                <p className="text-xs sm:text-sm text-gray-900 break-words">{businessInfo.address}</p>
              </div>
            </div>
          )}
          {businessInfo.phone && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.gbpAudit.view.phone")}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm text-gray-900">{businessInfo.phone}</p>
                  <button
                    onClick={() => onCopyToClipboard(businessInfo.phone, "Phone")}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title={t("dashboard.localSeoAudit.view.copyPhone")}
                  >
                    <HiClipboardCopy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {businessInfo.website && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiGlobe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.gbpAudit.view.website")}</p>
                <a
                  href={businessInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 break-all"
                >
                  <span className="truncate">{businessInfo.website}</span>
                  <HiExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                </a>
              </div>
            </div>
          )}
          {businessInfo.category && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiOfficeBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.gbpAudit.view.primaryCategory")}</p>
                <p className="text-xs sm:text-sm text-gray-900">{businessInfo.category}</p>
              </div>
            </div>
          )}
          {businessInfo.additionalCategories && businessInfo.additionalCategories.length > 0 && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiOfficeBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.gbpAudit.view.additionalCategories")}</p>
                <div className="flex flex-wrap gap-1">
                  {businessInfo.additionalCategories.map((cat, idx) => (
                    <span key={idx} className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-md">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {(businessInfo.rating || businessInfo.reviewCount) && (
            <div className="flex items-start gap-2 sm:gap-3">
              <HiStar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.gbpAudit.view.ratingAndReviews")}</p>
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  {businessInfo.rating && (
                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                      {businessInfo.rating.toFixed(1)} / 5.0
                    </span>
                  )}
                  {businessInfo.reviewCount !== undefined && (
                    <span className="text-xs sm:text-sm text-gray-600">
                      ({businessInfo.reviewCount} {t("dashboard.localSeoAudit.view.reviews")})
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          {timetable && (
            <div className="flex items-start gap-2 sm:gap-3 sm:col-span-2 lg:col-span-3">
              <HiClock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.gbpAudit.view.businessHours")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2">
                  {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => {
                    const dayHours = formatDayHours(timetable[day]);
                    return (
                      <div key={day} className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="font-medium text-gray-700 w-8 sm:w-10">{dayNames[day]}</span>
                        <span className={dayHours ? "text-gray-900" : "text-gray-400"}>
                          {dayHours || t("dashboard.gbpAudit.view.closed") || "Closed"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {businessInfo.description && (
            <div className="flex items-start gap-2 sm:gap-3 sm:col-span-2 lg:col-span-3">
              <HiOfficeBuilding className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5 sm:mb-1">{t("dashboard.gbpAudit.view.description")}</p>
                <p className="text-xs sm:text-sm text-gray-900 break-words">{businessInfo.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

