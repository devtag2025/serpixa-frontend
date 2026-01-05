"use client";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { 
  HiSparkles,
  HiLightBulb,
  HiShieldCheck,
  HiChartBar,
  HiHeart,
  HiCheckCircle
} from "react-icons/hi";
import Contact from "@/components/landing/Contact";

export default function AboutUsPage() {
  const { t } = useTranslation();

  const values = [
    {
      icon: HiLightBulb,
      titleKey: "landing.aboutUs.values.innovation.title",
      descriptionKey: "landing.aboutUs.values.innovation.description",
      color: "blue"
    },
    {
      icon: HiShieldCheck,
      titleKey: "landing.aboutUs.values.trust.title",
      descriptionKey: "landing.aboutUs.values.trust.description",
      color: "green"
    },
    {
      icon: HiChartBar,
      titleKey: "landing.aboutUs.values.excellence.title",
      descriptionKey: "landing.aboutUs.values.excellence.description",
      color: "purple"
    },
    {
      icon: HiHeart,
      titleKey: "landing.aboutUs.values.customerFirst.title",
      descriptionKey: "landing.aboutUs.values.customerFirst.description",
      color: "pink"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      pink: "bg-pink-100 text-pink-600",
      orange: "bg-orange-100 text-orange-600"
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
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <span className="text-white font-semibold text-sm uppercase tracking-wide">
              {t("landing.aboutUs.hero.badge")}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
            {t("landing.aboutUs.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto drop-shadow-sm">
            {t("landing.aboutUs.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t("landing.aboutUs.ourStory.title")}
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>{t("landing.aboutUs.ourStory.paragraph1")}</p>
                <p>{t("landing.aboutUs.ourStory.paragraph2")}</p>
                <p>{t("landing.aboutUs.ourStory.paragraph3")}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                <HiSparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t("landing.aboutUs.ourStory.mission.title")}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t("landing.aboutUs.ourStory.mission.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.aboutUs.values.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing.aboutUs.values.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-14 h-14 rounded-lg ${getColorClasses(value.color)} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {t(value.descriptionKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why We Do What We Do Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("landing.aboutUs.whyWeDo.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("landing.aboutUs.whyWeDo.subtitle")}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("landing.aboutUs.whyWeDo.problem.title")}
                </h3>
                <ul className="space-y-4">
                  {[
                    "landing.aboutUs.whyWeDo.problem.item1",
                    "landing.aboutUs.whyWeDo.problem.item2",
                    "landing.aboutUs.whyWeDo.problem.item3"
                  ].map((key, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-gray-700 text-lg">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("landing.aboutUs.whyWeDo.solution.title")}
                </h3>
                <ul className="space-y-4">
                  {[
                    "landing.aboutUs.whyWeDo.solution.item1",
                    "landing.aboutUs.whyWeDo.solution.item2",
                    "landing.aboutUs.whyWeDo.solution.item3"
                  ].map((key, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <HiCheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-700 text-lg">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="w-full max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <HiSparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t("landing.aboutUs.cta.title")}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t("landing.aboutUs.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              {t("landing.aboutUs.cta.startTrial")}
            </Link>
            <Link
              href="/features"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
            >
              {t("landing.aboutUs.cta.exploreFeatures")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
