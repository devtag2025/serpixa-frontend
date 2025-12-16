"use client";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { 
  HiCheckCircle, 
  HiClock, 
  HiChartBar, 
  HiSparkles, 
  HiDocumentText,
  HiLightBulb,
  HiShieldCheck,
  HiUserGroup,
  HiOfficeBuilding,
  HiBriefcase,
  HiUser
} from "react-icons/hi";

export default function WhySerpixaPage() {
  const { t } = useTranslation();

  const coreBenefits = [
    {
      icon: HiClock,
      titleKey: "landing.whySerpixa.benefits.timeSaving.title",
      descriptionKey: "landing.whySerpixa.benefits.timeSaving.description",
      color: "blue"
    },
    {
      icon: HiChartBar,
      titleKey: "landing.whySerpixa.benefits.allInOne.title",
      descriptionKey: "landing.whySerpixa.benefits.allInOne.description",
      color: "purple"
    },
    {
      icon: HiDocumentText,
      titleKey: "landing.whySerpixa.benefits.professionalReports.title",
      descriptionKey: "landing.whySerpixa.benefits.professionalReports.description",
      color: "green"
    },
    {
      icon: HiLightBulb,
      titleKey: "landing.whySerpixa.benefits.actionableInsights.title",
      descriptionKey: "landing.whySerpixa.benefits.actionableInsights.description",
      color: "orange"
    },
    {
      icon: HiSparkles,
      titleKey: "landing.whySerpixa.benefits.easyToUse.title",
      descriptionKey: "landing.whySerpixa.benefits.easyToUse.description",
      color: "pink"
    },
    {
      icon: HiShieldCheck,
      titleKey: "landing.whySerpixa.benefits.trusted.title",
      descriptionKey: "landing.whySerpixa.benefits.trusted.description",
      color: "indigo"
    }
  ];

  const whatYouGet = [
    {
      icon: HiChartBar,
      titleKey: "landing.whySerpixa.whatYouGet.seoAudit.title",
      descriptionKey: "landing.whySerpixa.whatYouGet.seoAudit.description",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: HiOfficeBuilding,
      titleKey: "landing.whySerpixa.whatYouGet.geoAudit.title",
      descriptionKey: "landing.whySerpixa.whatYouGet.geoAudit.description",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: HiBriefcase,
      titleKey: "landing.whySerpixa.whatYouGet.gbpAudit.title",
      descriptionKey: "landing.whySerpixa.whatYouGet.gbpAudit.description",
      color: "from-green-500 to-green-600"
    },
    {
      icon: HiSparkles,
      titleKey: "landing.whySerpixa.whatYouGet.aiContent.title",
      descriptionKey: "landing.whySerpixa.whatYouGet.aiContent.description",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const results = [
    "landing.whySerpixa.results.improveRankings",
    "landing.whySerpixa.results.increaseVisibility",
    "landing.whySerpixa.results.saveTime",
    "landing.whySerpixa.results.impressClients",
    "landing.whySerpixa.results.dataDriven"
  ];

  const perfectFor = [
    {
      icon: HiBriefcase,
      titleKey: "landing.whySerpixa.perfectFor.agencies.title",
      descriptionKey: "landing.whySerpixa.perfectFor.agencies.description",
      color: "blue"
    },
    {
      icon: HiOfficeBuilding,
      titleKey: "landing.whySerpixa.perfectFor.businesses.title",
      descriptionKey: "landing.whySerpixa.perfectFor.businesses.description",
      color: "purple"
    },
    {
      icon: HiUserGroup,
      titleKey: "landing.whySerpixa.perfectFor.marketingTeams.title",
      descriptionKey: "landing.whySerpixa.perfectFor.marketingTeams.description",
      color: "green"
    },
    {
      icon: HiUser,
      titleKey: "landing.whySerpixa.perfectFor.freelancers.title",
      descriptionKey: "landing.whySerpixa.perfectFor.freelancers.description",
      color: "orange"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      green: "bg-green-100 text-green-600",
      orange: "bg-orange-100 text-orange-600",
      pink: "bg-pink-100 text-pink-600",
      indigo: "bg-indigo-100 text-indigo-600"
    };
    return colors[color] || colors.blue;
  };

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            {t("landing.whySerpixa.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto drop-shadow-sm">
            {t("landing.whySerpixa.hero.subtitle")}
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90"
          >
            {t("landing.whySerpixa.hero.startTrial")}
          </Link>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.whySerpixa.problemSolution.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Problems */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-red-500">✗</span>
                {t("landing.whySerpixa.problemSolution.problems.title")}
              </h3>
              <ul className="space-y-4">
                {[
                  "landing.whySerpixa.problemSolution.problems.item1",
                  "landing.whySerpixa.problemSolution.problems.item2",
                  "landing.whySerpixa.problemSolution.problems.item3",
                  "landing.whySerpixa.problemSolution.problems.item4"
                ].map((key, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <HiCheckCircle className="w-8 h-8 text-green-600" />
                {t("landing.whySerpixa.problemSolution.solution.title")}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t("landing.whySerpixa.problemSolution.solution.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                {t("landing.whySerpixa.benefits.badge")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.whySerpixa.benefits.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing.whySerpixa.benefits.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-lg ${getColorClasses(benefit.color)} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t(benefit.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(benefit.descriptionKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.whySerpixa.whatYouGet.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing.whySerpixa.whatYouGet.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whatYouGet.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-4 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.whySerpixa.results.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing.whySerpixa.results.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((resultKey, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <HiCheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-800 font-medium text-lg">
                    {t(resultKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.whySerpixa.perfectFor.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing.whySerpixa.perfectFor.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {perfectFor.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-14 h-14 rounded-lg ${getColorClasses(item.color)} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("landing.whySerpixa.whyChoose.title")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("landing.whySerpixa.whyChoose.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              "landing.whySerpixa.whyChoose.trusted",
              "landing.whySerpixa.whyChoose.accurate",
              "landing.whySerpixa.whyChoose.bilingual",
              "landing.whySerpixa.whyChoose.gdpr",
              "landing.whySerpixa.whyChoose.updates",
              "landing.whySerpixa.whyChoose.support"
            ].map((key, index) => (
              <div key={index} className="flex items-start gap-4">
                <HiCheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <p className="text-gray-200 text-lg">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="w-full max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <HiSparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t("landing.whySerpixa.cta.title")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t("landing.whySerpixa.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              {t("landing.whySerpixa.cta.startTrial")}
            </Link>
            <Link
              href="/#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              {t("landing.whySerpixa.cta.viewPricing")}
            </Link>
          </div>
          <p className="mt-8 text-gray-500 text-sm">
            {t("landing.whySerpixa.cta.trustText")}
          </p>
        </div>
      </section>
    </div>
  );
}
