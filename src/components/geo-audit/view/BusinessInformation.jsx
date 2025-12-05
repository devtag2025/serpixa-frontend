"use client";
import { HiLocationMarker, HiPhone, HiGlobe, HiStar, HiOfficeBuilding, HiClipboardCopy, HiExternalLink } from "react-icons/hi";

export default function BusinessInformation({ businessInfo, onCopyToClipboard }) {
  if (!businessInfo) return null;

  return (
    <div className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
      </div>
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessInfo.name && (
            <div className="flex items-start gap-3">
              <HiOfficeBuilding className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Name</p>
                <p className="text-sm text-gray-900">{businessInfo.name}</p>
              </div>
            </div>
          )}
          {businessInfo.address && (
            <div className="flex items-start gap-3">
              <HiLocationMarker className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Address</p>
                <p className="text-sm text-gray-900">{businessInfo.address}</p>
              </div>
            </div>
          )}
          {businessInfo.phone && (
            <div className="flex items-start gap-3">
              <HiPhone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-900">{businessInfo.phone}</p>
                  <button
                    onClick={() => onCopyToClipboard(businessInfo.phone, "Phone")}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy phone"
                  >
                    <HiClipboardCopy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {businessInfo.website && (
            <div className="flex items-start gap-3">
              <HiGlobe className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Website</p>
                <a
                  href={businessInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
                >
                  {businessInfo.website}
                  <HiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
          {(businessInfo.rating || businessInfo.reviews) && (
            <div className="flex items-start gap-3">
              <HiStar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Rating & Reviews</p>
                <div className="flex items-center gap-2">
                  {businessInfo.rating && (
                    <span className="text-sm font-semibold text-gray-900">
                      {businessInfo.rating.toFixed(1)} / 5.0
                    </span>
                  )}
                  {businessInfo.reviews && (
                    <span className="text-sm text-gray-600">
                      ({businessInfo.reviews} reviews)
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          {businessInfo.category && (
            <div className="flex items-start gap-3">
              <HiOfficeBuilding className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category</p>
                <p className="text-sm text-gray-900">{businessInfo.category}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

