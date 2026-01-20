"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ContentHeader from "@/components/ai-content/view/ContentHeader";
import SEOStats from "@/components/ai-content/view/SEOStats";
import MetaInfo from "@/components/ai-content/view/MetaInfo";
import HeadingsSection from "@/components/ai-content/view/HeadingsSection";
import ListsSection from "@/components/ai-content/view/ListsSection";
import ParagraphsSection from "@/components/ai-content/view/ParagraphsSection";
import ContentPreview from "@/components/ai-content/view/ContentPreview";
import FAQSection from "@/components/ai-content/view/FAQSection";
import CTASection from "@/components/ai-content/view/CTASection";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import RouteLoader from "@/components/common/RouteLoader";
import { handleError } from "@/utils/handleError";
import { useTranslation } from "@/i18n/context";
import { toast } from "react-hot-toast";
import { useAIContent, useDeleteAIContent } from "@/hooks/aiContentHooks";
import { formatEuropeanDateTime } from "@/utils/dateFormatter";

export default function AIContentViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fetch content by ID
  const { data: content, isLoading, error } = useAIContent(id);

  // Delete mutation
  const { mutate: deleteContent, isPending: isDeleting } = useDeleteAIContent();

  const handleExportHTML = () => {
    if (!content) return;

    const html = `
<!DOCTYPE html>
<html lang="${content.locale || 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.metaTitle}</title>
  <meta name="description" content="${content.metaDescription}">
</head>
<body>
  ${content.htmlContent.replace(/\\n/g, "\n")}
</body>
</html>
    `.trim();

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${content.keyword.replace(/\s+/g, "-")}-content.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("HTML exported successfully!");
  };

  const handleRegenerate = () => {
    router.push("/dashboard/ai-content/new");
  };

  const handleCopyAllHTML = async () => {
    if (!content || !content.htmlContent) return;

    try {
      await navigator.clipboard.writeText(content.htmlContent);
      toast.success(t("dashboard.aiContent.view.copied"));
    } catch (err) {
      console.error("Failed to copy HTML:", err);
      toast.error("Failed to copy HTML");
    }
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteContent(id, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        router.push("/dashboard/ai-content");
      },
    });
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <RouteLoader />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    const message = handleError(error);
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{message || "Failed to load content"}</p>
            <button
              onClick={() => router.push("/dashboard/ai-content")}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Back to Content List
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="min-h-full">
          {/* SEO Disclaimer Banner */}
          <div className="bg-primary border-b border-primary/20 opacity-0 animate-fadeInSlideDown animation-delay-2000">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-3">
            <p className="text-xs sm:text-sm text-white text-start font-medium break-words">
              {t("dashboard.aiContent.view.seoDisclaimer")}
            </p>
          </div>
        </div>

        <ContentHeader
          content={content}
          onRegenerate={handleRegenerate}
          onExportHTML={handleExportHTML}
          onExportPDF={() => toast.info("PDF export coming soon!")}
          onCopyAllHTML={handleCopyAllHTML}
          onDelete={handleDelete}
          isExporting={false}
          isDeleting={isDeleting}
        />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
            {/* SEO Stats */}
            <SEOStats content={content} />

            {/* Meta Info */}
            <div className="mb-4 sm:mb-6">
              <MetaInfo content={content} />
            </div>

            {/* Headings Section (H1-H6) */}
            <div className="mb-4 sm:mb-6">
              <HeadingsSection htmlContent={content.htmlContent} />
            </div>

            {/* Lists Section */}
            <div className="mb-4 sm:mb-6">
              <ListsSection htmlContent={content.htmlContent} />
            </div>

            {/* Paragraphs Section */}
            <div className="mb-4 sm:mb-6">
              <ParagraphsSection htmlContent={content.htmlContent} />
            </div>

            {/* Content Preview */}
            {/* <div className="mb-6">
              <ContentPreview content={content} />
            </div> */}

            {/* FAQ Section */}
            {content.faq && content.faq.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <FAQSection faq={content.faq} />
              </div>
            )}

            {/* CTA Section */}
            {content.cta && (
              <div className="mb-4 sm:mb-6">
                <CTASection cta={content.cta} />
              </div>
            )}

            {/* Generated Info */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 text-center text-xs sm:text-sm text-gray-500">
              {t("dashboard.aiContent.view.generatedAt")}: {formatEuropeanDateTime(content.createdAt || Date.now())}
            </div>
          </div>
        </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        itemName={content ? `${content.keyword || "Content"}` : null}
        isDeleting={isDeleting}
        type="content"
      />
    </DashboardLayout>
  );
}

