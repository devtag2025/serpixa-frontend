"use client";
import { HiLightningBolt, HiExclamationCircle, HiLink, HiDocumentText } from "react-icons/hi";
import { getScoreColor } from "@/utils/colors";

export default function SEOAuditStats({ audit }) {
  const scoreColors = getScoreColor(audit.score);
  const totalIssues = audit.recommendations?.length || 0;
  const totalLinks = (audit.checks?.links?.internal || 0) + (audit.checks?.links?.external || 0);
  const brokenLinks = audit.checks?.links?.broken || 0;
  const competitorsCount = audit.competitors?.length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* SEO Score Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2.5 rounded-lg ${scoreColors.bg}`}>
            <HiLightningBolt className={`w-5 h-5 ${scoreColors.text}`} />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">SEO Score</span>
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className={`text-3xl font-bold ${scoreColors.text}`}>{audit.score}</span>
          <span className="text-lg text-gray-400">/ 100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`${scoreColors.dot} h-1.5 rounded-full transition-all duration-500`}
            style={{ width: `${audit.score}%` }}
          ></div>
        </div>
      </div>

      {/* Total Issues Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-red-50">
            <HiExclamationCircle className="w-5 h-5 text-red-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Issues</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{totalIssues}</span>
        </div>
      </div>

      {/* Total Links Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-blue-50">
            <HiLink className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Links</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{totalLinks}</span>
          {brokenLinks > 0 && (
            <span className="text-sm text-red-600 font-medium">({brokenLinks} broken)</span>
          )}
        </div>
      </div>

      {/* Competitors Found Card */}
      {audit.keyword && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-purple-50">
              <HiDocumentText className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Competitors</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{competitorsCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}

