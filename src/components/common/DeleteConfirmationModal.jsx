"use client";
import { useEffect } from "react";
import { HiX, HiExclamation } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

/**
 * DeleteConfirmationModal - A reusable modal for confirming delete actions
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback to close the modal
 * @param {Function} props.onConfirm - Callback when user confirms deletion
 * @param {string} props.title - Modal title (optional, uses translation if not provided)
 * @param {string} props.message - Modal message (optional, uses translation if not provided)
 * @param {string} props.itemName - Name of the item being deleted (optional, for context)
 * @param {boolean} props.isDeleting - Whether deletion is in progress
 * @param {string} props.type - Type of item: 'audit' | 'content' (default: 'audit')
 */
export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  isDeleting = false,
  type = "audit",
}) {
  const { t } = useTranslation();

  // Close modal on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape" && !isDeleting) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isDeleting, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const defaultTitle = title || t(`dashboard.common.delete${type === "content" ? "Content" : "Audit"}Title`);
  const defaultMessage = message || t(`dashboard.common.delete${type === "content" ? "Content" : "Audit"}Message`);

  const handleConfirm = () => {
    onConfirm();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-md mx-3 sm:mx-4 transform transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        {/* Close button */}
        {!isDeleting && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label={t("dashboard.common.close")}
          >
            <HiX className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Icon and Title */}
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                <HiExclamation className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2
                id="delete-modal-title"
                className="text-lg sm:text-xl font-bold text-gray-900 mb-2"
              >
                {defaultTitle}
              </h2>
              <p
                id="delete-modal-description"
                className="text-sm sm:text-base text-gray-600"
              >
                {defaultMessage}
                {itemName && (
                  <span className="font-semibold text-gray-900 block mt-1">
                    "{itemName}"
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Warning message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-5">
            <p className="text-xs sm:text-sm text-red-800">
              {t("dashboard.common.deleteWarning")}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("dashboard.common.cancel")}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 text-sm sm:text-base bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t("dashboard.common.deleting")}</span>
                </>
              ) : (
                <span>{t("dashboard.common.delete")}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

