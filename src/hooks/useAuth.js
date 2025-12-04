import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/authService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";

// Query keys
export const authKeys = {
  all: ["auth"],
  profile: () => [...authKeys.all, "profile"],
};

/**
 * Query hook to check authentication status
 * Uses the /auth/profile endpoint which requires authentication
 * If it succeeds → user is authenticated
 * If it fails with 401 → user is not authenticated
 */
export function useAuth() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await AuthService.getProfile();
      const { data } = handleResponse(response);
      return data.user;
    },
    retry: (failureCount, error) => {
      // Don't retry on 401 (unauthorized) - user is simply not logged in
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: 5 * 60 * 1000, // 
    refetchOnWindowFocus: false, // Don't refetch on window focuConsider data fresh for 5 minutess to avoid unnecessary checks
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Account created successfully!");
      // Invalidate auth query to refetch after registration
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.push("/login");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Signup failed.");
      console.error("Signup failed:", message);
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Login successful!");
      // Invalidate and refetch auth query to get user profile
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Login failed.");
      console.error("Login failed:", message);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: authKeys.all });
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Logout failed.");
      // Even if logout fails on server, clear local state
      queryClient.removeQueries({ queryKey: authKeys.all });
      router.push("/login");
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Password reset email sent!");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Failed to send reset email.");
      console.error("Forgot password failed:", message);
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Password reset successful!");
      router.push("/login");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Password reset failed.");
      console.error("Reset password failed:", message);
    },
  });
}
