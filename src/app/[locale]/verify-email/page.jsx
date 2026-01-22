"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { useVerifyEmail } from "@/hooks/useAuth";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useLocalizedRouter();
  const token = searchParams.get("token");
  const { mutate: verifyEmail, isPending, isSuccess, isError } = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      // If no token, redirect to login after showing error
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-indigo-100 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <HiXCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Invalid Verification Link
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            The verification link is invalid or missing. Please check your email for a valid verification link.
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Redirecting to login page...
          </p>
          <a
            href="/login"
            className="text-primary hover:underline font-medium text-sm"
          >
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-indigo-100 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
            <HiCheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Email Verified Successfully!
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Your email address has been verified. You can now log in to your account.
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Redirecting to login page...
          </p>
          <a
            href="/login"
            className="text-primary hover:underline font-medium text-sm"
          >
            Go to Login
          </a>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-indigo-100 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <HiXCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Verification Failed
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            The verification link is invalid or has expired. Please request a new verification email.
          </p>
          <div className="space-y-3">
            <a
              href="/login"
              className="block text-primary hover:underline font-medium text-sm"
            >
              Go to Login
            </a>
            <a
              href="/signup"
              className="block text-gray-600 hover:underline text-sm"
            >
              Create New Account
            </a>
          </div>
        </div>
      </main>
    );
  }

  // Loading state
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-indigo-100 p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Verifying Email
        </h1>
        <p className="text-gray-500 text-sm">
          Please wait while we verify your email address...
        </p>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-3">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-indigo-100 p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
