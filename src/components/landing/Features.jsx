"use client";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      titleKey: "landing.features.countryDatabases",
    },
    {
      titleKey: "landing.features.keywordDatabase",
    },
    {
      titleKey: "landing.features.domainProfiles",
    },
    {
      titleKey: "landing.features.accurateRankings",
    },
    {
      titleKey: "landing.features.aiAlgorithms",
    },
  ];

  return (
    <section id="features" className="relative py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main Headline */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">{t("landing.features.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {t("landing.features.title")}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("landing.features.subtitle")}
          </p>
        </div>

        {/* Statistics Grid - 2 rows × 3 columns (exact match to design) */}
        <div className="grid grid-cols-3 gap-0 mb-24 bg-gradient-to-r from-transparent from-40% via-blue-100 via-50% to-transparent to-60%">
          {features.map((feature, index) => {
            const value = t(`${feature.titleKey}.value`);
            const description = t(`${feature.titleKey}.description`);
            
            // Calculate row and column position (0-based)
            const row = Math.floor(index / 3);
            const col = index % 3;
            const totalRows = Math.ceil(features.length / 3);
            const isLastRow = row === totalRows - 1;
            const isLastCol = col === 2; // Always 3 columns
            
            return (
              <div
                key={index}
                className={`p-8 text-center border-r border-b border-gray-200 ${
                  isLastCol ? 'border-r-0' : ''
                } ${
                  isLastRow ? 'border-b-0' : ''
                }`}
              >
                {/* Value - Dark blue/slate color (matching image) */}
                <div className="text-5xl md:text-6xl font-bold text-slate-800 mb-3">
                  {value}
                </div>
                
                {/* Description - Light gray (matching image) */}
                <p className="text-base text-gray-500 leading-tight">
                  {description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Audience Section */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden">
          {/* Background Pattern - Plus signs */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Badge with star icon */}
            <div className="inline-flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-gray-300 font-medium text-sm uppercase tracking-wide">
                {t("landing.features.trustedBadge")}
              </span>
            </div>

            {/* Main heading */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              {t("landing.features.trustedTitle")}
            </h3>

            {/* Audience list - Vertical, centered, one per line */}
            <div className="flex flex-col items-center gap-4 mb-8">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="text-lg text-white">
                  {t(`landing.features.trustedAudience.${index}`)}
                </div>
              ))}
            </div>

            {/* Final statement */}
            <p className="text-3xl  text-white font-normal">
              {t("landing.features.finalStatement")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


