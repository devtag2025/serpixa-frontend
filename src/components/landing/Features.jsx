"use client";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      titleKey: "landing.features.countryDatabases",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M9 11V9a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-1a2 2 0 00-2-2h-2.945M15 13v2a2 2 0 01-2 2H11a2 2 0 01-2-2v-2m6-4V9a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
        </svg>
      ),
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      titleKey: "landing.features.aiAlgorithms",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      titleKey: "landing.features.keywordDatabase",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      titleKey: "landing.features.domainProfiles",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      ),
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
    },
    {
      titleKey: "landing.features.accurateRankings",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="w-full max-w-6xl mx-auto">
        {/* Main Headline */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("landing.features.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t("landing.features.subtitle")}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} rounded-2xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105`}
            >
              <div className={`${feature.iconColor} mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
                {t(feature.titleKey)}
              </h3>
            </div>
          ))}
        </div>

        {/* G2 Awards Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {t("landing.features.awardsTitle")}
          </h3>
          <p className="text-gray-600 mb-8">
            {t("landing.features.awardsSubtitle")}
          </p>

          {/* CTA Button */}
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors text-sm md:text-base"
          >
            {t("landing.features.startTrial")}
          </Link>
        </div>
      </div>
    </section>
  );
}


