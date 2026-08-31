import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "homePage" },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignUp.vue"),
      meta: {
        title: "Sign Up",
      },
    },
    {
      path: "/verifyEmail/:userId",
      name: "verifyEmail",
      component: () => import("@/views/VerifyEmail.vue"),
      meta: {
        title: "Verify",
        hiddenLinks: true,
      },
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("@/views/SignIn.vue"),
      meta: {
        title: "Sign In",
        hiddenLinks: true,
      },
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: () => import("@/views/ForgotPassword.vue"),
      meta: {
        title: "Forgot Password",
        hiddenLinks: true,
      },
    },
    {
      path: "/resetPassword/:userId",
      name: "resetPassword",
      component: () => import("@/views/ResetPassword.vue"),
      meta: {
        title: "Reset Password",
        hiddenLinks: true,
      },
    },
    {
      path: "/homePage",
      name: "homePage",
      component: () => import("@/views/DashboardPage.vue"),
      meta: {
        title: "Dashboard",
        requiresAuth: true,
      },
    },
    {
      path: "/myTasks",
      name: "myTasks",
      component: () => import("@/views/MyTasks.vue"),
      meta: {
        title: "My Tasks",
        requiresAuth: true,
      },
    },
    {
      path: "/createTask",
      name: "createTask",
      component: () => import("@/views/CreateTask.vue"),
      meta: {
        title: "Create Task",
        requiresAuth: true,
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfilePage.vue"),
      meta: {
        title: "Profile",
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to) => {
  document.title = to.meta.title;

  if (!to.meta.requiresAuth) return true;

  const userStore = useUserStore();

  try {
    const response = await userStore.getUserAfterSignIn();

    if (response.ok) {
      return true;
    }

    return { name: "signin" };
  } catch {
    return { name: "signin" };
  }
});

export default router;
