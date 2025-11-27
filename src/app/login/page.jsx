"use client";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

export default function LoginPage() {
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
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
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
  );
}
