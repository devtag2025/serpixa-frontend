"use client";

export default function SERPInfo({ serpInfo }) {
  if (!serpInfo) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">SERP Information</h2>
      </div>
      <div className="px-6 py-4 space-y-4">
        {serpInfo.location && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Location</p>
            <p className="text-sm text-gray-900">{serpInfo.location}</p>
          </div>
        )}
        {serpInfo.language && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Language</p>
            <p className="text-sm text-gray-900">{serpInfo.language}</p>
          </div>
        )}
        {serpInfo.device && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Device</p>
            <p className="text-sm text-gray-900 capitalize">{serpInfo.device}</p>
          </div>
        )}
        {serpInfo.searchInfo?.seResultsCount && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Total Results</p>
            <p className="text-sm text-gray-900">
              {serpInfo.searchInfo.seResultsCount.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

