"use client";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { 
  HiSearch, 
  HiLocationMarker, 
  HiOfficeBuilding, 
  HiSparkles,
  HiGlobeAlt,
  HiCheckCircle,
  HiChartBar,
  HiDocumentText,
  HiLightBulb,
  HiClock,
  HiShieldCheck
} from "react-icons/hi";

export default function FeaturesPage() {
  const { t } = useTranslation();

  const mainFeatures = [
    {
      icon: HiSearch,
      titleKey: "landing.featuresPage.seoAudit.title",
      descriptionKey: "landing.featuresPage.seoAudit.description",
      features: [
        "landing.featuresPage.seoAudit.feature1",
        "landing.featuresPage.seoAudit.feature2",
        "landing.featuresPage.seoAudit.feature3",
        "landing.featuresPage.seoAudit.feature4"
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: HiLocationMarker,
      titleKey: "landing.featuresPage.geoAudit.title",
      descriptionKey: "landing.featuresPage.geoAudit.description",
      features: [
        "landing.featuresPage.geoAudit.feature1",
        "landing.featuresPage.geoAudit.feature2",
        "landing.featuresPage.geoAudit.feature3",
        "landing.featuresPage.geoAudit.feature4"
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: HiOfficeBuilding,
      titleKey: "landing.featuresPage.gbpAudit.title",
      descriptionKey: "landing.featuresPage.gbpAudit.description",
      features: [
        "landing.featuresPage.gbpAudit.feature1",
        "landing.featuresPage.gbpAudit.feature2",
        "landing.featuresPage.gbpAudit.feature3",
        "landing.featuresPage.gbpAudit.feature4"
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: HiSparkles,
      titleKey: "landing.featuresPage.aiContent.title",
      descriptionKey: "landing.featuresPage.aiContent.description",
      features: [
        "landing.featuresPage.aiContent.feature1",
        "landing.featuresPage.aiContent.feature2",
        "landing.featuresPage.aiContent.feature3",
        "landing.featuresPage.aiContent.feature4"
      ],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const languageFeatures = [
    "landing.featuresPage.languageSupport.feature1",
    "landing.featuresPage.languageSupport.feature2",
    "landing.featuresPage.languageSupport.feature3",
    "landing.featuresPage.languageSupport.feature4"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-300 to-blue-600" />
        
        {/* Wave Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Dot Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <span className="text-white font-semibold text-sm uppercase tracking-wide">
              {t("landing.featuresPage.hero.badge")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            {t("landing.featuresPage.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto drop-shadow-sm">
            {t("landing.featuresPage.hero.subtitle")}
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90"
          >
            {t("landing.featuresPage.hero.startTrial")}
          </Link>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.featuresPage.mainFeatures.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing.featuresPage.mainFeatures.subtitle")}
            </p>
          </div>

          <div className="space-y-16">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                >
                  {/* Icon/Visual Section */}
                  <div className={`flex-1 ${feature.bgColor} rounded-2xl p-8 md:p-12`}>
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 mx-auto md:mx-0`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center md:text-left">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed text-center md:text-left">
                      {t(feature.descriptionKey)}
                    </p>
                  </div>

                  {/* Features List Section */}
                  <div className="flex-1">
                    <ul className="space-y-4">
                      {feature.features.map((featureKey, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                            <HiCheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {t(featureKey)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Language Support Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <HiGlobeAlt className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.featuresPage.languageSupport.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing.featuresPage.languageSupport.subtitle")}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("landing.featuresPage.languageSupport.supportedLanguages.title")}
                </h3>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                    English
                  </span>
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium">
                    Français
                  </span>
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                    Nederlands
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("landing.featuresPage.languageSupport.benefits.title")}
                </h3>
                <ul className="space-y-4">
                  {languageFeatures.map((featureKey, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <HiCheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {t(featureKey)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.featuresPage.additionalFeatures.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing.featuresPage.additionalFeatures.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: HiDocumentText,
                titleKey: "landing.featuresPage.additionalFeatures.professionalReports.title",
                descriptionKey: "landing.featuresPage.additionalFeatures.professionalReports.description",
                color: "blue"
              },
              {
                icon: HiChartBar,
                titleKey: "landing.featuresPage.additionalFeatures.dataVisualization.title",
                descriptionKey: "landing.featuresPage.additionalFeatures.dataVisualization.description",
                color: "purple"
              },
              {
                icon: HiClock,
                titleKey: "landing.featuresPage.additionalFeatures.fastResults.title",
                descriptionKey: "landing.featuresPage.additionalFeatures.fastResults.description",
                color: "green"
              },
              {
                icon: HiShieldCheck,
                titleKey: "landing.featuresPage.additionalFeatures.secure.title",
                descriptionKey: "landing.featuresPage.additionalFeatures.secure.description",
                color: "orange"
              },
              {
                icon: HiLightBulb,
                titleKey: "landing.featuresPage.additionalFeatures.actionableInsights.title",
                descriptionKey: "landing.featuresPage.additionalFeatures.actionableInsights.description",
                color: "pink"
              },
              {
                icon: HiSparkles,
                titleKey: "landing.featuresPage.additionalFeatures.easyToUse.title",
                descriptionKey: "landing.featuresPage.additionalFeatures.easyToUse.description",
                color: "indigo"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                blue: "bg-blue-100 text-blue-600",
                purple: "bg-purple-100 text-purple-600",
                green: "bg-green-100 text-green-600",
                orange: "bg-orange-100 text-orange-600",
                pink: "bg-pink-100 text-pink-600",
                indigo: "bg-indigo-100 text-indigo-600"
              };
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color]} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(feature.descriptionKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="w-full max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <HiSparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t("landing.featuresPage.cta.title")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t("landing.featuresPage.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              {t("landing.featuresPage.cta.startTrial")}
            </Link>
            <Link
              href="/#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              {t("landing.featuresPage.cta.viewPricing")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
