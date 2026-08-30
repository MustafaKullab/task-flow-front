import { useFetchWithRefresh } from "@/composables/useFetchWithRefresh";
import { defineStore } from "pinia";

const { fetchWithRefresh } = useFetchWithRefresh();

export const useAuthStore = defineStore("auth", {
  state: () => ({}),
  getters: {},
  actions: {
    async signupUser(user, uploadImage) {
      const formData = new FormData();
      formData.append("username", user.value.username);
      formData.append("email", user.value.email);
      formData.append("password", user.value.password);
      formData.append("confirmPassword", user.value.confirmPassword);
      if (uploadImage.value?.files?.[0]) {
        formData.append("avatar", uploadImage.value.files[0]);
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      return data;
    },

    async resendCode(userId) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/resend-verification/${userId}`,
        {
          method: "POST",
        },
      );

      const data = await response.json();

      return data;
    },

    async resendResetCode(userId) {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/resend-PasswordReset/${userId}`,
        {
          method: "POST",
        },
      );

      const data = await response.json();

      return data;
    },

    async verifyAccount(code, userId) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verify/${userId}`, {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      return data;
    },

    async signIn(user) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ email: user.email, password: user.password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // "اسمح لهذا الطلب بالتعامل
        // مع الـ cookies
        //  المرتبطة بالـ API."
      });

      const data = await response.json();

      return data;
    },

    async sendVerificationCode(email) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/forgot-password`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      return data;
    },

    async resetPassword(code, newPassword, confirmNewPassword, userId) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reset-password/${userId}`, {
        method: "POST",
        body: JSON.stringify({ code, newPassword, confirmNewPassword }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      return data;
    },

    async logout() {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "POST",
      });

      const data = await response.json();

      return data;
    },
  },
});
