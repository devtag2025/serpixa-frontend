import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalizedRouter } from "@/hooks/useLocalizedRouter";
import { AuthService } from "@/services/authService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";
import { useI18n, useTranslation } from "@/i18n/context";

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
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid unnecessary checks
    refetchOnMount: false, // Don't refetch on mount if data exists in cache
    refetchOnReconnect: false, // Don't refetch on reconnect
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useLocalizedRouter();
  const { locale: currentLocale } = useI18n();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (data) => {
      // Use locale from form data if provided, otherwise use current i18n locale
      // Map to preferred locale (en, fr, nl) if needed
      const mapToPreferredLocale = (locale) => {
        if (!locale) return currentLocale;
        if (locale === 'fr' || locale === 'be-fr') return 'fr';
        if (locale === 'nl' || locale === 'nl-be') return 'nl';
        return locale === 'en' ? 'en' : currentLocale;
      };
      const preferredLocale = mapToPreferredLocale(data.locale || currentLocale);
      return AuthService.register({ ...data, locale: preferredLocale });
    },
    onSuccess: (response) => {
      toast.success(t("dashboard.common.toast.accountCreatedSuccess"));
      // Invalidate auth query to refetch after registration
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.push("/login");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.signupError"));
      console.error("Signup failed:", message);
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useLocalizedRouter();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (response) => {
      const { data } = handleResponse(response);
      
      // Store accessToken in localStorage if provided (for API interceptor)
      if (data?.accessToken && typeof window !== "undefined") {
        localStorage.setItem("token", data.accessToken);
      }
      
      toast.success(t("dashboard.common.toast.loginSuccess"));
      // Invalidate and refetch auth query to get user profile
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.loginError"));
      console.error("Login failed:", message);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useLocalizedRouter();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      // Clear token from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: authKeys.all });
      toast.success(t("dashboard.common.toast.logoutSuccess"));
      router.push("/login");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.logoutError"));
      // Even if logout fails on server, clear local state
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      queryClient.removeQueries({ queryKey: authKeys.all });
      router.push("/login");
    },
  });
}

export function useForgotPassword() {
  const { locale } = useI18n();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (data) => AuthService.forgotPassword({ ...data, locale }),
    onSuccess: (response) => {
      toast.success(t("dashboard.common.toast.passwordResetEmailSent"));
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.passwordResetEmailError"));
      console.error("Forgot password failed:", message);
    },
  });
}

export function useResetPassword() {
  const router = useLocalizedRouter();
  const { locale } = useI18n();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (data) => AuthService.resetPassword({ ...data, locale }),
    onSuccess: (response) => {
      toast.success(t("dashboard.common.toast.passwordResetSuccess"));
      router.push("/login");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.passwordResetError"));
      console.error("Reset password failed:", message);
    },
  });
}

export function useVerifyEmail() {
  const router = useLocalizedRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: AuthService.verifyEmail,
    onSuccess: (response) => {
      toast.success(t("dashboard.common.toast.emailVerifiedSuccess"));
      // Invalidate auth query to refetch user profile
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.emailVerificationError"));
      console.error("Verify email failed:", message);
    },
  });
}

export function useResendVerification() {
  const { locale } = useI18n();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (data) => AuthService.resendVerification({ ...data, locale }),
    onSuccess: (response) => {
      toast.success(t("dashboard.common.toast.verificationEmailSent"));
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.verificationEmailError"));
      console.error("Resend verification failed:", message);
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: AuthService.updateProfile,
    onSuccess: (response) => {
      const { data } = handleResponse(response);
      // Update auth query cache with new user data
      queryClient.setQueryData(authKeys.profile(), data);
      // Note: preferred_locale is only used for emails/notifications, not for dashboard UI language
      // The dashboard UI language should be controlled separately by the user via the language switcher
      toast.success(t("dashboard.common.toast.profileUpdatedSuccess") || "Profile updated successfully");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || t("dashboard.common.toast.profileUpdateError") || "Failed to update profile");
      console.error("Update profile failed:", message);
    },
  });
}