"use client";
import { useForm } from "react-hook-form";
import { useRegister } from "@/hooks/useAuth";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useRegister();
  const password = watch("password");

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
   <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-2">
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-md shadow-lg border border-blue-100 rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-2 text-primary">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-5 text-xs">
          Join us today 🚀
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

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
                minLength: { value: 8, message: "At least 8 characters" },
              })}
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition disabled:opacity-70"
          >
            {isPending ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
