"use client";
import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "landing.faq.question1",
      answer: "landing.faq.answer1",
    },
    {
      question: "landing.faq.question2",
      answer: "landing.faq.answer2",
    },
    {
      question: "landing.faq.question3",
      answer: "landing.faq.answer3",
    },
    {
      question: "landing.faq.question4",
      answer: "landing.faq.answer4",
    },
    {
      question: "landing.faq.question5",
      answer: "landing.faq.answer5",
    },
    {
      question: "landing.faq.question6",
      answer: "landing.faq.answer6",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">
              {t("landing.faq.badge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {t("landing.faq.title")}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("landing.faq.subtitle")}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-8">
                    {t(faq.question)}
                  </span>
                  {isOpen ? (
                    <HiChevronUp className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  ) : (
                    <HiChevronDown className="w-6 h-6 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">
                      {t(faq.answer)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

