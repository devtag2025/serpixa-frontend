"use client";
import { useState } from "react";
import { useTranslation } from "@/i18n/context";
import { HiChevronDown } from "react-icons/hi";

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

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
    {
      question: "landing.faq.question7",
      answer: "landing.faq.answer7",
    },
    {
      question: "landing.faq.question8",
      answer: "landing.faq.answer8",
    },
    {
      question: "landing.faq.question9",
      answer: "landing.faq.answer9",
    },
    {
      question: "landing.faq.question10",
      answer: "landing.faq.answer10",
    },
  ];

  // Split FAQs into left (first 5) and right (last 5)
  const leftFAQs = faqs.slice(0, 5);
  const rightFAQs = faqs.slice(5, 10);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderFAQItem = (faq, index) => {
    const isOpen = openIndex === index;
    return (
      <div
        key={index}
        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <button
          onClick={() => toggleFAQ(index)}
          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 rounded-xl transition-colors duration-200"
        >
          <span className="text-lg font-semibold text-gray-900 pr-8">
            {t(faq.question)}
          </span>
          <div className={`flex-shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <HiChevronDown className="w-6 h-6 text-gray-500" />
          </div>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-5 pt-0">
            <p className="text-gray-600 leading-relaxed">
              {t(faq.answer)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="faq" className="relative py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-7xl mx-auto">
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

        {/* FAQ Items - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column - Questions 1-5 */}
          <div className="space-y-4">
            {leftFAQs.map((faq, index) => renderFAQItem(faq, index))}
          </div>

          {/* Right Column - Questions 6-10 */}
          <div className="space-y-4">
            {rightFAQs.map((faq, index) => renderFAQItem(faq, index + 5))}
          </div>
        </div>
      </div>
    </section>
  );
}

