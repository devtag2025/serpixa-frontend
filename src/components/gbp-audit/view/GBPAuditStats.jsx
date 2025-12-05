"use client";
import { HiLightningBolt, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { getScoreColor } from "@/utils/colors";

export default function GBPAuditStats({ audit }) {
  const scoreColors = getScoreColor(audit.score || 0);
  const totalRecommendations = audit.recommendations?.length || 0;
  const completedItems = audit.checklist?.filter((item) => item.completed).length || 0;
  const totalItems = audit.checklist?.length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Optimization Score Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2.5 rounded-lg ${scoreColors.bg}`}>
            <HiLightningBolt className={`w-5 h-5 ${scoreColors.text}`} />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Optimization Score</span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className={`text-3xl font-bold ${scoreColors.text}`}>{audit.score || 0}</span>
          <span className="text-lg text-gray-400">/ 100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`${scoreColors.dot} h-1.5 rounded-full transition-all duration-500`}
            style={{ width: `${audit.score || 0}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist Progress Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-blue-50">
            <HiCheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Checklist</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{completedItems}</span>
          <span className="text-lg text-gray-400">/ {totalItems}</span>
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-red-50">
            <HiExclamationCircle className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recommendations</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{totalRecommendations}</span>
        </div>
      </div>

      {/* Rating Card */}
      {audit.businessInfo?.rating && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-amber-50">
              <HiCheckCircle className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Google Rating</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{audit.businessInfo.rating.toFixed(1)}</span>
            <span className="text-lg text-gray-400">/ 5.0</span>
          </div>
        </div>
      )}
    </div>
  );
}

