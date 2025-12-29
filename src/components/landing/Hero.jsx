"use client";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { HiSearch, HiChartBar, HiSparkles, HiCheckCircle } from "react-icons/hi";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Base Gradient Background - Blue with more contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-300 to-blue-600" />
      
      {/* Wave Pattern Overlay - Layer 1 */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Wave Pattern Overlay - Layer 2 (subtle) */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,400 Q400,300 800,400 T1200,400 L1200,600 L0,600 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Wave Pattern Overlay - Layer 3 (top waves) */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,200 Q200,100 400,200 T800,200 T1200,200 L1200,0 L0,0 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dot Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* White-to-transparent Gradient Overlay - Top to Bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
      
      {/* White-to-transparent Gradient Overlay - Sides */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20" />

      {/* Floating Cards - Subtle and Tinted */}
      
   

      {/* Bottom Left Card - Feature */}
      <div className="absolute bottom-40 left-4 md:left-32 lg:left-50 hidden md:block">
        <div className="bg-blue-50/70 backdrop-blur-sm border border-blue-200/50 rounded-xl p-4 shadow-lg max-w-[200px] transform rotate-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <HiCheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">{t("landing.hero.aiPowered")}</div>
              <div className="text-xs text-gray-600">{t("landing.hero.contentGeneration")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Card - Quick Action */}
      <div className="absolute bottom-50 right-4 md:right-8 lg:right-50 hidden md:block">
        <div className="bg-white/60 backdrop-blur-sm border border-blue-200/50 rounded-xl p-4 shadow-lg max-w-[200px] transform ">
          <div className="flex items-center gap-2 mb-2">
            <HiSparkles className="w-5 h-5 text-purple-600" />
            <div className="text-xs font-semibold text-gray-700">{t("landing.hero.quickStart")}</div>
          </div>
          <p className="text-xs text-gray-700">{t("landing.hero.quickStartDescription")}</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">
          {t("landing.hero.title")}
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto drop-shadow-sm">
          {t("landing.hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 text-sm md:text-base hover:scale-105 transition-all duration-300"
          >
            {t("landing.hero.startTrial")}
          </Link>
          <Link
            href="/features"
            className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105 text-sm md:text-base"
          >
            {t("landing.hero.seeFeatures")}
          </Link>
        </div>

        {/* Trust Section */}
        <div className="flex flex-col items-center gap-6">
          {/* Trust Statement with Avatars */}
          <div className="flex items-center gap-3">
            {/* Avatars */}
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
            </div>
            <p className="text-gray-800 text-sm md:text-base font-medium drop-shadow-sm py-8">
              {t("landing.hero.trustedBy")} <span className="font-semibold">1.5M+</span> {t("landing.hero.professionals")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}








