"use client";
import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Starter Plan",
      price: "52.00",
      period: "mo",
      description: "For individual SEO professionals",
      features: [
        "Website audit & rank tracking essentials",
        "Domain & keyword research tools",
        "Backlink checking & monitoring features",
      ],
      highlighted: false,
    },
    {
      name: "Premium Plan",
      price: "95.20",
      period: "mo",
      description: "For agencies and small teams",
      features: [
        "Access to the AI Search Toolkit",
        "AI-powered tools and data insights",
        "Looker Studio integration",
      ],
      highlighted: true,
      badge: "Agencies' Choice",
    },
  ];

  const addOns = [
    {
      name: "Extra 10 SEO Audit",
      price: "50.00",
      period: "mo",
    },
    {
      name: "Extra 10 GEO Audit",
      price: "23.20",
      period: "mo",
    },
    {
      name: "Extra 5 GBPAudit",
      price: "7.20",
      period: "mo",
    },
    {
      name: "Extra 50 AI Generations",
      price: "15.00",
      period: "mo",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Fair and flexible pricing that scales with you
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose a plan that grows with your goals. Packed with more than you&apos;d expect.
          </p>
        </div>

        {/* Main Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-sm ${
                plan.highlighted
                  ? "border-2 border-primary ring-2 ring-primary/20"
                  : "border border-gray-200"
              } transition-all hover:shadow-lg`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-primary text-xs font-semibold rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-gray-600 text-sm">From </span>
                <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600 text-lg">/{plan.period}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/signup"
                className={`block w-full text-center py-3 px-6 rounded-md font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                Start free trial
              </Link>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Need more? Upgrade with add-ons!
          </h3>

          {/* Add-ons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6 mt-12">
            {addOns.map((addOn, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm transition-all hover:shadow-lg"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-4">{addOn.name}</h4>
                <div className="mb-6">
                  <span className="text-gray-600 text-sm">From </span>
                  <span className="text-2xl font-bold text-gray-900">${addOn.price}</span>
                  <span className="text-gray-600 text-lg">/{addOn.period}</span>
                </div>
                <Link
                  href="/signup"
                  className="block w-full text-center py-3 px-6 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Start free trial
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

