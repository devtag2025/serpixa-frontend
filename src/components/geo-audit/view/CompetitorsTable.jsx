"use client";
import { HiStar, HiExternalLink } from "react-icons/hi";

export default function CompetitorsTable({ competitors }) {
  if (!competitors || competitors.length === 0) return null;

  return (
    <div className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Nearby Competitors</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Reviews</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Distance</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Address</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Website</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {competitors.map((competitor, index) => (
              <tr
                key={index}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-50"
                } ${index < 3 ? "bg-emerald-50/30" : ""}`}
              >
                <td className="px-6 py-4">
                  <span className={`text-sm font-semibold ${
                    index === 0 ? "text-emerald-600" :
                    index === 1 ? "text-amber-600" :
                    index === 2 ? "text-blue-600" :
                    "text-gray-600"
                  }`}>
                    #{competitor.position || index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{competitor.name || "—"}</span>
                </td>
                <td className="px-6 py-4">
                  {competitor.rating ? (
                    <div className="flex items-center gap-1">
                      <HiStar className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-900">{competitor.rating.toFixed(1)}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{competitor.reviews || 0}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{competitor.distance || "—"}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{competitor.address || "—"}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{competitor.phone || "—"}</span>
                </td>
                <td className="px-6 py-4">
                  {competitor.website ? (
                    <a
                      href={competitor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit
                      <HiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

