"use client";
import { getPriorityColor } from "@/utils/colors";

export default function RecommendationsTable({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recommendations</h2>
          <p className="text-sm text-gray-500 mt-1">{recommendations.length} issues found</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Severity</span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Issue</span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recommendations.map((rec, index) => {
                const priorityColors = getPriorityColor(rec.priority);
                return (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50 hover:bg-gray-50 transition-colors"}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${priorityColors.dot}`}></span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors.badge}`}>
                          {priorityColors.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{rec.issue}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 line-clamp-2">{rec.action}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                        Learn More →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

