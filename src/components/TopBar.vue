<template>
  <div
    class="TopBar d-flex justify-content-end align-items-center gap-3 p-2 border-bottom"
    style="background-color: white"
  >
    <div class="user dropdown">
      <button
        class="btn dropdown-toggle d-flex align-items-center gap-2 cursor-pointer"
        style="border: none"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div class="avatar" v-if="userStore.user">
          <img
            :src="`${url}/${userStore.user.avatar}`"
            alt="avatar"
            class="rounded-pill"
            style="width: 30px; height: 30px; object-fit: cover"
          />
        </div>
        <div class="username" v-if="userStore.user">{{ userStore.user.username }}</div>
        <div class="arrow"><i class="bi bi-chevron-down"></i></div>
      </button>
      <ul class="dropdown-menu" style="top: 30px !important">
        <li class="p-2 border-bottom username">
          <div class="avatar d-flex align-items-center gap-2" v-if="userStore.user">
            <img
              :src="`${url}/${userStore.user.avatar}`"
              alt="avatar"
              class="rounded-pill"
              style="width: 30px; height: 30px; object-fit: cover"
            />
            <div class="username small" v-if="userStore.user">{{ userStore.user.username }}</div>
          </div>
        </li>
        <li class="border-bottom">
          <router-link :to="{ name: 'profile' }" class="btn d-flex align-items-center gap-2 m-1">
            <div class="icon"><i class="bi bi-person"></i></div>
            <div class="name">My Profile</div>
          </router-link>
        </li>
        <li>
          <a class="btn d-flex align-items-center gap-2 text-danger m-1" @click.prevent="logout">
            <div class="icon"><i class="bi bi-box-arrow-right"></i></div>
            <div class="name">Logout</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

// Define auth store
const authStore = useAuthStore();

// Define user store
const userStore = useUserStore();

// Define router obj
const router = useRouter();

const url = import.meta.env.VITE_API_URL;

// func to logout
const logout = async () => {
  const data = await authStore.logout();

  if (data.success) {
    router.push({ name: "signin" });
  }
};

onMounted(async () => {
  await userStore.getUserAfterSignIn();
});
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

.user {
  button {
    transition: 0.3s;
    padding: 6px;
    border-radius: 4px;
    &:hover {
      background-color: #eee;
    }
  }
}

.dropdown-toggle::after {
  display: none;
}

ul.dropdown-menu {
  transition: 0.3s !important;
  transform: translate(0, 55px) !important;
  width: 95% !important;
}

.dropdown-menu {
  li {
    a {
      transition: 0.3s !important;
      &:hover {
        background-color: #eee !important;
      }
    }
  }
}
</style>
