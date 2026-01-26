"use client";
import ContentCard from "./ContentCard";
import { useTranslation } from "@/i18n/context";

/**
 * ContentCardList - Container component for mobile/tablet card view
 * Renders a list of ContentCard components
 * 
 * @param {Array} contents - Array of content objects to display
 * @param {Function} onDelete - Callback function for delete action
 */
export default function ContentCardList({ contents, onDelete }) {
  const { t } = useTranslation();

  if (!contents || contents.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <p className="text-sm text-gray-500">{t("dashboard.common.noResults")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contents.map((content) => (
        <ContentCard
          key={content._id}
          content={content}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
