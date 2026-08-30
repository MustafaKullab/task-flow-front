import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      },
    },
    {
      path: "/myTasks",
      name: "myTasks",
      component: () => import("@/views/MyTasks.vue"),
      meta: {
        title: "My Tasks",
      },
    },
    {
      path: "/createTask",
      name: "createTask",
      component: () => import("@/views/CreateTask.vue"),
      meta: {
        title: "Create Task",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfilePage.vue"),
      meta: {
        title: "Profile",
      },
    },
  ],
});

router.beforeEach((to) => {
  document.title = to.meta.title;
});

export default router;
