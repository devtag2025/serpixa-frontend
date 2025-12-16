"use client";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function FAQSection({ faq }) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  if (!faq || faq.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {t("dashboard.aiContent.view.faq")}
      </h2>
      
      <div className="space-y-3">
        {faq.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 pr-4">
                {item.question}
              </span>
              {openIndex === index ? (
                <HiChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
              ) : (
                <HiChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-700 prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: item.answer?.replace(/\\n/g, "\n") || item.answer }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

