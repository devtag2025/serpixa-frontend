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
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
        {t("dashboard.aiContent.view.faq")}
      </h2>
      
      <div className="space-y-2 sm:space-y-3">
        {faq.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors gap-3"
            >
              <span className="text-sm sm:text-base font-medium text-gray-900 pr-2 break-words flex-1 text-left">
                {item.question}
              </span>
              {openIndex === index ? (
                <HiChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              ) : (
                <HiChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-700 prose prose-sm max-w-none break-words">
                <div dangerouslySetInnerHTML={{ __html: item.answer?.replace(/\\n/g, "\n") || item.answer }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

