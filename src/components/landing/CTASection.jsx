"use client";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { HiSparkles, HiCheckCircle } from "react-icons/hi";

export default function CTASection() {
  const { t } = useTranslation();

  const benefits = [
    "landing.cta.benefit1",
    "landing.cta.benefit2",
    "landing.cta.benefit3",
    "landing.cta.benefit4",
  ];

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto text-center z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
          <HiSparkles className="w-8 h-8 text-primary" />
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            {t("landing.cta.title")}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          {t("landing.cta.subtitle")}
        </p>

        {/* Benefits List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-3xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 text-left">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <HiCheckCircle className="w-4 h-4 text-primary" />
              </div>
              <span className="text-gray-700 text-lg font-medium">
                {t(benefit)}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90"
          >
            {t("landing.cta.startTrial")}
          </Link>
          <Link
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
            {t("landing.cta.viewPricing")}
          </Link>
        </div>

        {/* Trust Text */}
        <p className="mt-8 text-gray-500 text-sm">
          {t("landing.cta.trustText")}
        </p>
      </div>
    </section>
  );
}

