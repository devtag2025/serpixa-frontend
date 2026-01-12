"use client";
import { useTranslation } from "@/i18n/context";

export default function TermsPage() {
  const { t } = useTranslation();

  const articles = [
    "article1",
    "article2",
    "article3",
    "article4",
    "article5",
    "article6",
    "article7",
    "article8",
    "article9",
    "article10",
    "article11",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("legal.terms.title")}
          </h1>
          <p className="text-white/90 text-lg">(Serpixa)</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {articles.map((article) => (
              <article key={article} className="mb-12 pb-8 border-b border-gray-200 last:border-b-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {t(`legal.terms.${article}.title`)}
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {t(`legal.terms.${article}.content`)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
