"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useAuth";
import PublicRoute from "@/components/auth/PublicRoute";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useLogin();

  const onSubmit = (data) => {
    console.log("function is calling");
    
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <PublicRoute>
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-2">
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-md shadow-lg border border-blue-100 rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-2 text-primary">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-5 text-xs">
          Login to your account 👋
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full text-gray-600 border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full border text-gray-600 border-gray-300 p-2 pr-10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition disabled:opacity-70"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-right mt-3">
          <a
            href="/forgot-password"
            className="text-xs text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>

        {/* Sign Up Redirect */}
        <p className="text-center text-gray-500 text-xs mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
    </PublicRoute>
  );
}
