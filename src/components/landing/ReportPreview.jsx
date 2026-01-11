"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/i18n/context";

const SLIDES = [
  { src: "/report-pt-1.jpg", altKey: "landing.reportPreview.alt1" },
  { src: "/report-pt-2.jpg", altKey: "landing.reportPreview.alt2" },
  { src: "/report-pt-3.jpg", altKey: "landing.reportPreview.alt3" },
];

const DISPLAY_DURATION_MS = 7000;

export default function ReportPreview() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, DISPLAY_DURATION_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">
              {t("landing.reportPreview.badge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {t("landing.reportPreview.title")}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("landing.reportPreview.subtitle")}
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Text column */}
          <div>
            <p className="text-gray-700 text-base md:text-xl leading-relaxed mt-3 mb-8">
              {t("landing.reportPreview.valueProposition")}
            </p>

            <ul className="space-y-3 md:space-y-4">
              {[1, 2, 3, 4, 5].map((idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 text-xs font-semibold text-white shadow-blue">
                    {idx}
                  </div>
                  <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                    {t(`landing.reportPreview.benefits.${idx}`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Screenshot column */}
          <div className="relative">
            {/* Browser frame */}
            <div className="relative rounded-3xl bg-white shadow-2xl border border-gray-200/80 overflow-hidden">
              {/* Fake browser chrome */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] text-gray-500 max-w-[260px] truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                  <span>{t("landing.reportPreview.urlHint")}</span>
                </div>
                <div className="w-6" />
              </div>

              {/* Carousel container */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                {SLIDES.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={slide.src}
                      className={`absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out ${
                        isActive ? "opacity-100" : ""
                      }`}
                    >
                      <Image
                        src={slide.src}
                        alt={t(slide.altKey)}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 480px, 100vw"
                        priority={index === 0}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slide indicators */}
            <div className="mt-4 flex justify-center gap-2">
              {SLIDES.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={t("landing.reportPreview.indicatorLabel", { index: index + 1 })}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "w-8 bg-primary" : "w-3 bg-gray-300"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


