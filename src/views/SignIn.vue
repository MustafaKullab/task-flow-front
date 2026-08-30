<template>
  <section class="SignIn vh-100">
    <NavBarSignup />
    <div class="container" style="height: calc(100% - 62px)">
      <div
        class="SignInBox row justify-content-center align-items-center mx-2 mx-md-0"
        style="height: 100%"
      >
        <div class="col-md-6 col-xl-5 p-3 bg-white border rounded">
          <div class="header text-center">
            <h2 class="title m-0 mb-1">Welcome back</h2>
            <p class="text-muted">Sign in to your Task Flow account</p>
          </div>
          <form @submit.prevent="signIn">
            <div class="mb-3">
              <label for="Email" class="form-label">Email address</label>
              <div class="input-group has-validation">
                <span class="input-group-text text-muted" id="inputGroupPrepend"
                  ><i class="bi bi-envelope"></i
                ></span>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': emailError }"
                  id="Email"
                  placeholder="Enter your email"
                  aria-describedby="inputGroupPrepend"
                  style="box-shadow: none"
                  v-model="user.email"
                />
                <div class="invalid-feedback">{{ emailError }}</div>
              </div>
            </div>
            <div class="mb-0">
              <label for="Password" class="form-label">Password</label>
              <div class="input-group has-validation">
                <span class="input-group-text text-muted" id="inputGroupPrepend"
                  ><i class="bi bi-lock"></i
                ></span>
                <input
                  :type="hidePass1 ? 'password' : 'text'"
                  class="form-control"
                  :class="{ 'is-invalid': passwordError }"
                  id="Password"
                  placeholder="Enter your password"
                  aria-describedby="inputGroupPrepend"
                  style="box-shadow: none"
                  v-model="user.password"
                />
                <span class="btn input-group-text border" @click="toggleHide1">
                  <i class="bi" :class="hidePass1 ? 'bi-eye' : 'bi-eye-slash'"></i>
                </span>
                <div class="invalid-feedback">{{ passwordError }}</div>
              </div>
            </div>
            <div class="forgotPassword text-end my-2">
              <router-link
                class="text-decoration-none"
                style="color: #0061ee; font-weight: 500"
                :to="{ name: 'forgotPassword' }"
                >Forgot password?</router-link
              >
            </div>

            <div class="signIn mt-3">
              <button type="submit" class="btn btn-primary w-100">Sign in</button>
            </div>
            <div class="or text-muted text-center mt-3">or</div>
            <div
              class="dontHaveAccount d-flex align-items-center justify-content-center gap-2 my-2"
            >
              <span class="text-muted">Don't have an accout?</span>
              <router-link class="text-decoration-none" :to="{ name: 'signup' }"
                >Create account</router-link
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

const hidePass1 = ref(true);

const user = ref({
  email: "",
  password: "",
});

const emailError = ref("");
const passwordError = ref("");

watch(
  () => user.value.email,
  () => {
    emailError.value = "";
  },
  { deep: true },
);

watch(
  () => user.value.password,
  () => {
    passwordError.value = "";
  },
  { deep: true },
);

const signIn = async () => {
  const data = await authStore.signIn(user.value);

  if (data.success) {
    router.push({ name: "homePage" });
  } else if (data.errors) {
    emailError.value = data.errors.email || "";
    passwordError.value = data.errors.password || "";
  } else if (data.message === "User not found!") {
    emailError.value = "User not found!";
  } else if (data.message === "Password is not correct!") {
    passwordError.value = "Password is not correct!";
  }

  console.log(data);
};

const toggleHide1 = () => {
  hidePass1.value = !hidePass1.value;
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

.input-group {
  transition: 0.3s;
  &:hover {
    transform: scale(1.01);
  }
}
</style>
