"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-20">
      <div className="w-full max-w-5xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          All the tools you need to perfect your SEO and AI visibility
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Own traditional and AI search with a powerful platform, trusted data, and exceptional UX
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors text-sm md:text-base"
          >
            Start free trial
          </Link>
          <Link
            href="#tour"
            className="w-full sm:w-auto px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors text-sm md:text-base"
          >
            See product tour
          </Link>
        </div>

        {/* Small Text */}
        <p className="text-xs text-gray-500 mb-16">
          No credit card required
        </p>

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
            <p className="text-gray-700 text-sm md:text-base">
              Trusted by <span className="font-semibold">1.5M+</span> SEO professionals since 2013
            </p>
          </div>

          {/* Company Logos */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 opacity-60">
            <div className="text-gray-600 font-semibold text-sm">recruitee</div>
            <div className="text-gray-600 font-semibold text-sm">_zapier</div>
            <div className="text-gray-600 font-semibold text-sm">mynewsdesk</div>
            <div className="text-gray-600 font-semibold text-sm">MIZUNO</div>
            <div className="text-gray-600 font-semibold text-sm">TAILOR BRANDS</div>
            <div className="text-gray-600 font-semibold text-xs">YAMAHA Revs your Heart</div>
            <div className="text-gray-600 font-semibold text-sm">trii</div>
            <div className="text-gray-600 font-semibold text-sm">WISER IT SEO COMPANY</div>
          </div>
        </div>
      </div>
    </section>
  );
}








