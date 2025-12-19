"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useAuth";
import PublicRoute from "@/components/auth/PublicRoute";
import Link from "next/link";
import { HiUser, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { useTranslation } from "@/i18n/context";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useLogin();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <PublicRoute>
      <main className="h-[calc(100vh-4rem)] flex">
        {/* Left Panel - Branding Section */}
        <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-gradient-to-br from-[hsl(217,90%,55%)] via-[hsl(217,100%,60%)] to-[hsl(220,95%,50%)]">
          {/* Background Pattern - Grid */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
          
          {/* Wave Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,300 Q300,200 600,300 T1200,300 L1200,600 L0,600 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Geometric Shapes - Network Nodes */}
          <div className="absolute inset-0">
            {/* Large sphere */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
            <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-md"></div>
            <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-white/15 rounded-full blur-md"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between p-12 text-white">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold">Serpixa</span>
            </div>

            {/* Welcome Content */}
            <div className="space-y-6">
              <div>
                <p className="text-white/80 text-sm mb-2">{t("login.greeting")}</p>
                <h1 className="text-5xl font-bold mb-4 tracking-tight">{t("login.title")}</h1>
                <div className="w-16 h-1 bg-white/30 mb-6"></div>
                <p className="text-white/70 text-base leading-relaxed max-w-md">
                  {t("login.description")}
                </p>
              </div>
            </div>

            {/* Bottom decorative element */}
            <div className="mt-8">
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                <span>{t("login.trustedBy")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo - Only visible on small screens */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-xl font-semibold text-gray-900">Serpixa</span>
              </Link>
            </div>

            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("login.formTitle")}</h2>
              <p className="text-gray-600 text-sm">
                {t("login.formSubtitle")}
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("login.emailLabel")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder={t("login.emailPlaceholder")}
                    {...register("email", {
                      required: t("login.emailRequired"),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t("login.emailInvalid"),
                      },
                    })}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("login.passwordLabel")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.passwordPlaceholder")}
                    {...register("password", {
                      required: t("login.passwordRequired"),
                    })}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                    aria-label={showPassword ? t("login.hidePassword") : t("login.showPassword")}
                  >
                    {showPassword ? (
                      <HiEyeOff className="h-5 w-5" />
                    ) : (
                      <HiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  {/* <input
                    type="checkbox"
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">{t("login.rememberMe")}</span> */}
                </label>
                <a
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {t("login.forgotPassword")}
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("login.loggingIn")}
                  </span>
                ) : (
                  t("login.loginButton")
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 text-sm mt-6">
              {t("login.noAccount")}{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                {t("login.signUp")}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </PublicRoute>
  );
}
