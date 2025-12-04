"use client";
import Link from "next/link";
import { HiSearch } from "react-icons/hi";

/**
 * RecentAudits - Displays list of recent audits
 */
export default function RecentAudits({ audits = [], viewAllLink = "/dashboard/reports" }) {
  // Default mock data if no audits provided
  const defaultAudits = [
    { id: 1, type: "SEO", name: "SEO Audit #1", time: "1 hour ago", status: "Completed" },
    { id: 2, type: "SEO", name: "SEO Audit #2", time: "2 hours ago", status: "Completed" },
    { id: 3, type: "SEO", name: "SEO Audit #3", time: "3 hours ago", status: "Completed" },
  ];

  const displayAudits = audits.length > 0 ? audits : defaultAudits;

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
        <h2 className="text-lg font-bold text-gray-900">Recent Audits</h2>
        <Link
          href={viewAllLink}
          className="text-sm text-primary hover:underline font-medium"
        >
          View all →
        </Link>
      </div>
      <div className="space-y-4">
        {displayAudits.map((audit) => (
          <div
            key={audit.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <HiSearch className="w-5 h-5 text-primary" />
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
        ))}
      </div>
    </div>
  );
}

