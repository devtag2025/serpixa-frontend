"use client";
import { getPriorityColor } from "@/utils/colors";

export default function RecommendationsTable({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h2 className="text-lg font-semibold text-gray-900">Recommendations</h2>
        <p className="text-sm text-gray-500 mt-1">{recommendations.length} recommendations found</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Issue</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recommendations.map((rec, index) => {
              const priorityColors = getPriorityColor(rec.priority);
              return (
                <tr
                  key={index}
                  className={`transition-colors ${
                    index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${priorityColors.badge}`}>
                      {priorityColors.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{rec.issue || "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{rec.action || "—"}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

