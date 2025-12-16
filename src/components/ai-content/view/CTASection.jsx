"use client";
import { useTranslation } from "@/i18n/context";

export default function CTASection({ cta }) {
  const { t } = useTranslation();

  if (!cta) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-sm border border-primary/20 p-6 text-white">
      <h2 className="text-lg font-semibold mb-2">
        {t("dashboard.aiContent.view.cta")}
      </h2>
      <div 
        className="text-white/90"
        dangerouslySetInnerHTML={{ __html: cta }}
      />
    </div>
  );
}

