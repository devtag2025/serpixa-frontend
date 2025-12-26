"use client";
import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { HiStar } from "react-icons/hi";

export default function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "SEO Director",
      company: "TechCorp",
      rating: 5,
      text: "landing.testimonials.testimonial1",
      avatar: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "Digital Agency",
      rating: 5,
      text: "landing.testimonials.testimonial2",
      avatar: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      name: "Emma Williams",
      role: "Content Strategist",
      company: "Growth Labs",
      rating: 5,
      text: "landing.testimonials.testimonial3",
      avatar: "bg-gradient-to-br from-pink-400 to-pink-600",
    },
    {
      name: "David Martinez",
      role: "Founder",
      company: "StartupXYZ",
      rating: 5,
      text: "landing.testimonials.testimonial4",
      avatar: "bg-gradient-to-br from-green-400 to-green-600",
    },
  ];

  return (
    <section id="testimonials" className="relative py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">
              {t("landing.testimonials.badge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {t("landing.testimonials.title")}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("landing.testimonials.subtitle")}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                "{t(testimonial.text)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${testimonial.avatar} flex items-center justify-center text-white font-bold text-lg`}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t("landing.testimonials.trustText")}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
            <div className="text-gray-700 font-semibold">4.8/5 Rating</div>
            <div className="text-gray-700 font-semibold">10,000+ Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}

