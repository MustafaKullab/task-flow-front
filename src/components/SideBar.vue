<template>
  <div
    class="SideBar p-2 d-flex flex-column justify-content-between position-sticky top-0"
    :class="{ collapsed: hide }"
    style="background-color: white"
  >
    <div
      class="arrow position-absolute border rounded d-flex justify-content-center align-items-center cursor-pointer"
      style="right: 0; top: 26px; width: 25px; height: 25px; z-index: 200 !important"
      v-if="!isMobile"
      @click.prevent="SlideSideBar"
    >
      <i :class="hide ? 'bi bi-chevron-right' : 'bi bi-chevron-left'"></i>
    </div>
    <div class="logo d-flex gap-3 justify-content-center py-3 mb-2">
      <span>
        <img src="/public/logo.png" alt="logo" class="img-fluid" style="width: 40px" />
      </span>
      <div v-if="!hide">
        <span class="fw-bold fs-4">Task</span> <span class="fw-bold fs-4 text-primary">Flow</span>
      </div>
    </div>

    <div class="links flex-grow-1">
      <router-link
        class="dashboard d-flex align-items-center gap-2 p-2 my-2 mx-2"
        :class="{ 'justify-content-center': hide }"
        active-class="active"
        :to="{ name: 'homePage' }"
      >
        <div class="icon">
          <i class="bi bi-grid"></i>
        </div>
        <span v-if="!hide"> Dashboard </span>
      </router-link>

      <router-link
        class="myTasks d-flex align-items-center gap-2 p-2 my-2 mx-2"
        :class="{ 'justify-content-center': hide }"
        active-class="active"
        :to="{ name: 'myTasks' }"
      >
        <div class="icon">
          <i class="bi bi-list-task"></i>
        </div>
        <span v-if="!hide"> My Tasks </span>
      </router-link>
      <router-link
        class="createTask d-flex align-items-center gap-2 p-2 my-2 mx-2"
        :class="{ 'justify-content-center': hide }"
        active-class="active"
        :to="{ name: 'createTask' }"
      >
        <div class="icon">
          <i class="bi bi-plus-square"></i>
        </div>
        <span v-if="!hide">Create Task</span>
      </router-link>
      <router-link
        class="profile d-flex align-items-center gap-2 p-2 my-2 mx-2"
        :class="{ 'justify-content-center': hide }"
        active-class="active"
        :to="{ name: 'profile' }"
      >
        <div class="icon">
          <i class="bi bi-person"></i>
        </div>
        <span v-if="!hide"> Profile </span>
      </router-link>
    </div>

    <div
      class="logout d-flex align-items-center gap-2 p-2 my-2 mx-2 cursor-pointer"
      :class="{ 'justify-content-center': hide }"
      @click.prevent="logout"
    >
      <div class="icon">
        <i class="bi bi-box-arrow-right"></i>
      </div>
      <a v-if="!hide">Logout</a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

// Define auth store
const authStore = useAuthStore();

// Define router obj
const router = useRouter();

const isMobile = ref(false);
const hide = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 767;

  if (isMobile.value) {
    hide.value = true;
  }
};

const SlideSideBar = () => {
  hide.value = !hide.value;
};

// func to logout
const logout = async () => {
  const data = await authStore.logout();

  if (data.success) {
    router.push({ name: "signin" });
  }
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

.SideBar {
  width: 260px;
  height: calc(100dvh - 1px) !important;
  box-shadow: 1px 1px 7px 2px #00000011;
  transition: 0.4s;
  @media (max-width: 767px) {
    width: 70px !important;
  }
  &.collapsed {
    width: 70px;
    .arrow {
      right: -25px !important;
    }
  }
  .links {
    a {
      text-decoration: none !important;
      color: #71778a;
      border-radius: 5px;
      position: relative;
      &.active,
      &:hover {
        background-color: #f1f6fe !important;
        color: #0e69f4;
        transition: 0.3s;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 100%;
          width: 2px;
          background-color: #0e69f4 !important;
        }
      }
    }
  }
  .logout {
    text-decoration: none !important;
    color: #71778a;
    border-radius: 5px;
    transition: 0.3s;
    &.active,
    &:hover {
      background-color: rgba(255, 169, 175, 0.6470588235) !important;
      color: #ee2c32;
    }
  }
}
</style>
