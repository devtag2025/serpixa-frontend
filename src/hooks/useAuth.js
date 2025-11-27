import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/authService";
import { handleError } from "@/utils/handleError";
import { handleResponse } from "@/utils/handleResponse";
import { toast } from "react-hot-toast";

export function useRegister() {
  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Account created successfully!");
    },
    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Signup failed.");
      console.error("Signup failed:", message);
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Account created successfully!");
    },

    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Signup failed.");
      console.error("Signup failed:", message);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Account created successfully!");
    },

    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Signup failed.");
      console.error("Signup failed:", message);
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: (response) => {
      const { message } = handleResponse(response);
      toast.success(message || "Account created successfully!");
    },

    onError: (error) => {
      const message = handleError(error);
      toast.error(message || "Signup failed.");
      console.error("Signup failed:", message);
    },
  });
}
