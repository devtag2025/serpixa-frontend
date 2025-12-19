"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useResetPassword } from "@/hooks/useAuth";
import { useTranslation } from "@/i18n/context";

function ResetPasswordContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useResetPassword();

  const onSubmit = (data) => {
    if (!token) {
      toast.error(t("resetPassword.invalidToken"));
      return;
    }

    mutate(
      { ...data, token }
    );
  };

  const password = watch("password");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-indigo-100 p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {t("resetPassword.title")}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {t("resetPassword.subtitle")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              {t("resetPassword.newPasswordLabel")}
            </label>
            <input
              type="password"
              placeholder={t("resetPassword.newPasswordPlaceholder")}
              {...register("password", {
                required: t("resetPassword.passwordRequired"),
                minLength: { value: 6, message: t("resetPassword.passwordMinLength") },
              })}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              {t("resetPassword.confirmPasswordLabel")}
            </label>
            <input
              type="password"
              placeholder={t("resetPassword.confirmPasswordPlaceholder")}
              {...register("confirmPassword", {
                required: t("resetPassword.confirmPasswordRequired"),
                validate: (value) =>
                  value === password || t("resetPassword.passwordsDoNotMatch"),
              })}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {isPending ? t("resetPassword.resetting") : t("resetPassword.resetButton")}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <a
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            {t("resetPassword.returnToSignIn")}
          </a>
        </div>
      </div>
    </main>
  );
}

function ResetPasswordLoading() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-indigo-100 p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">{t("resetPassword.loading")}</p>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
 