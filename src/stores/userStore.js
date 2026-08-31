import { defineStore } from "pinia";
import { useFetchWithRefresh } from "@/composables/useFetchWithRefresh";

const { fetchWithRefresh } = useFetchWithRefresh();

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),

  getters: {},

  actions: {
    async getUser(userId) {
      console.log(userId);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
        method: "GET",
      });

      const data = await response.json();

      console.log(data);
      this.user = data.user;
    },

    async getUserAfterSignIn() {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/user`, {
        method: "GET",
      });

      const data = await response.json();

      this.user = data.user;

      return response;
    },

    async updateAccount(user) {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/Profile`, {
        method: "PATCH",
        body: JSON.stringify({
          newUsername: user.username,
          newEmail: user.email,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      console.log(data);

      return data;
    },

    async changePassword(password) {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/Profile/password`, {
        method: "PATCH",
        body: JSON.stringify({
          currentPassword: password.currentPassword,
          newPassword: password.newPassword,
          confirmNewPassword: password.confirmNewPassword,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      console.log("change");

      console.log(data);

      return data;
    },

    async changeImage(formData) {
      console.log(formData.get("newAvatar"));

      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/Profile/avatar`, {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      return data;
    },
  },
});
