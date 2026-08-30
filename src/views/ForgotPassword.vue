<template>
  <section class="ForgotPassword vh-100">
    <NavBarSignup />
    <div class="container" style="height: calc(100% - 62px)">
      <div
        class="SignInBox row justify-content-center align-items-center mx-2 mx-md-0"
        style="height: 100%"
      >
        <div class="col-md-6 col-xl-5 p-3 bg-white border rounded">
          <div
            class="icon p-2 my-3 rounded-pill d-flex justify-content-center align-items-center mx-auto"
            style="width: 80px; height: 80px; color: #0054f7; background-color: #e2f2fe"
          >
            <i class="bi bi-lock fs-1"></i>
          </div>
          <div class="header text-center">
            <h2 class="title m-0 mb-1">Forgot your password?</h2>
            <p class="text-muted">
              Enter your email address and we'll send you <br />a verification code to reset your
              password.
            </p>
          </div>
          <form @submit.prevent="sendVerificationCode">
            <div class="mb-3">
              <label for="Email" class="form-label">Email address</label>
              <div class="input-group has-validation">
                <span class="input-group-text text-muted" id="inputGroupPrepend"
                  ><i class="bi bi-envelope"></i
                ></span>
                <input
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': emailError }"
                  id="Email"
                  placeholder="Enter your email"
                  aria-describedby="inputGroupPrepend"
                  style="box-shadow: none"
                  v-model="email"
                />
                <div class="invalid-feedback">{{ emailError }}</div>
              </div>
            </div>

            <div class="signIn mt-3">
              <button type="submit" class="btn btn-primary w-100">Send verification code</button>
            </div>
            <div class="or text-muted text-center mt-3">or</div>
            <div
              class="dontHaveAccount d-flex align-items-center justify-content-center gap-2 my-2"
            >
              <span class="text-muted">Remember your password?</span>
              <router-link
                style="font-weight: 500"
                class="text-decoration-none"
                :to="{ name: 'signin' }"
                >Sign in</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import NavBarSignup from "@/components/NavBar.vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

// Define the auth store
const authStore = useAuthStore();

// Define the router object
const router = useRouter();

const email = ref("");

const emailError = ref("");

watch(
  () => email.value,
  () => {
    emailError.value = "";
  },
);

const sendVerificationCode = async () => {
  const data = await authStore.sendVerificationCode(email.value);

  console.log(data);

  if (data.success) {
    router.push({ name: "resetPassword", params: { userId: data.userId } });
  } else if (data.errors) {
    emailError.value = data.errors.email || "";
  }
};
</script>

<style lang="scss" scoped>
.or {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 52%;
    transform: translateY(-50%);
    width: 45%;
    height: 1px;
    background-color: #e2e6ec;
  }
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 52%;
    transform: translateY(-50%);
    width: 45%;
    height: 1px;
    background-color: #e2e6ec;
  }
}
</style>
