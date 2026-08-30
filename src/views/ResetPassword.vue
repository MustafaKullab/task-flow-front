<template>
  <section class="ResetPassword">
    <NavBarSignup />
    <div class="container" style="height: calc(100% - 62px)">
      <div
        class="ResetPassBox row justify-content-center align-items-center mx-2 mx-md-0 py-4"
        style="height: 100%"
      >
        <div class="col-md-8 col-lg-6 col-xl-5 p-3 bg-white border rounded">
          <div
            class="icon p-2 my-3 rounded-pill d-flex justify-content-center align-items-center mx-auto"
            style="width: 80px; height: 80px; color: #0054f7; background-color: #e2f2fe"
          >
            <i class="bi bi-shield-lock fs-1"></i>
          </div>
          <div class="header text-center">
            <h2 class="title m-0 mb-1">Reset your password</h2>
            <p class="text-muted">
              Enter the verification code we sent to your email, <br />then create a new password
              for your account.
            </p>
          </div>
          <form @submit.prevent="resetPassword">
            <div class="code mb-3 pb-3 border-bottom">
              <div class="title"><h6 class="m-0 mb-1">Enter verification code</h6></div>
              <div class="message text-muted small" style="margin-left: 35px">
                We've send a 6-digit code to your email address .
              </div>
              <div class="inpCode d-flex flex-wrap gap-2 my-3" style="margin: 0 35px">
                <input
                  type="text"
                  maxlength="1"
                  style="width: 65px; height: 60px; font-size: 25px"
                  class="form-control text-center"
                  v-for="(digit, index) of codeArray"
                  :key="index"
                  v-model="codeArray[index]"
                  ref="inputs"
                  @input="nextInput(index)"
                  @keydown.backspace="prevInput(index)"
                />
                <div class="codeError m-0 text-danger">{{ codeError }}</div>
              </div>

              <div
                class="codeExpired d-flex align-items-center justify-content-between"
                style="margin: 0 35px"
              >
                <div class="msg d-flex align-items-center gap-2">
                  <span><i class="bi bi-clock text-muted"></i></span>
                  <span class="text-muted"
                    >Resend Code after 00:{{ String(counter).padStart(2, "0") }}</span
                  >
                </div>
                <div class="resendBtn">
                  <button
                    class="resend btn btn-sm btn-primary"
                    :disabled="counter > 0"
                    @click.prevent="redendCode"
                  >
                    Resend code
                  </button>
                </div>
              </div>
            </div>
            <div class="passwords">
              <div class="title"><h6>Create new password</h6></div>
              <label for="password" class="form-label">New password</label>
              <div class="input-group mb-3">
                <span
                  class="input-group-text text-muted"
                  style="background-color: transparent"
                  id="basic-addon3"
                  ><i class="bi bi-lock"></i
                ></span>
                <input
                  :type="hidePass1 ? 'password' : 'text'"
                  class="form-control"
                  placeholder="Enter your new password"
                  aria-label="Username"
                  aria-describedby="basic-addon3"
                  id="password"
                  v-model="newPassword"
                  :class="{ 'is-invalid': newPasswordError }"
                  style="box-shadow: none"
                />
                <span class="btn input-group-text border" @click="toggleHide1">
                  <i class="bi" :class="hidePass1 ? 'bi-eye' : 'bi-eye-slash'"></i>
                </span>
                <div class="invalid-feedback">{{ newPasswordError }}</div>
              </div>
              <label for="confirmPassword" class="form-label">Confirm new password</label>
              <div class="input-group mb-3">
                <span
                  class="input-group-text text-muted"
                  style="background-color: transparent"
                  id="basic-addon4"
                  ><i class="bi bi-lock"></i
                ></span>
                <input
                  :type="hidePass2 ? 'password' : 'text'"
                  class="form-control"
                  placeholder="Confirm your new password"
                  aria-label="Username"
                  aria-describedby="basic-addon4"
                  id="confirmPassword"
                  v-model="confirmNewPassword"
                  :class="{ 'is-invalid': confirmNewPasswordError }"
                  style="box-shadow: none"
                />
                <span class="btn input-group-text border" @click="toggleHide2">
                  <i class="bi" :class="hidePass2 ? 'bi-eye' : 'bi-eye-slash'"></i>
                </span>
                <div class="invalid-feedback">
                  {{ confirmNewPasswordError }}
                </div>
              </div>
            </div>

            <div class="resetPass mt-3">
              <button type="submit" class="btn btn-primary w-100">Reset password</button>
            </div>
            <div class="or text-muted text-center mt-3">or</div>
            <div class="RememberPass d-flex align-items-center justify-content-center gap-2 my-2">
              <span class="text-muted">Remember your password?</span>
              <router-link class="text-decoration-none" :to="{ name: 'signin' }"
                >Sign in</router-link
              >
            </div>
          </form>

          <div
            class="message d-flex gap-2 justify-content-center align-items-center small text-muted mt-3"
          >
            <span><i class="bi bi-shield"></i></span>
            <span>Your password is securely encrypted and protected.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import NavBarSignup from "@/components/NavBar.vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";

// Define the auth store
const authStore = useAuthStore();

// Define the router and route object
const router = useRouter();
const route = useRoute();

// Define the userId
const userId = route.params.userId;

const newPassword = ref("");
const confirmNewPassword = ref("");

const newPasswordError = ref("");
const confirmNewPasswordError = ref("");
const codeError = ref("");

const hidePass1 = ref(true);

const hidePass2 = ref(true);

const toggleHide1 = () => {
  hidePass1.value = !hidePass1.value;
};

const toggleHide2 = () => {
  hidePass2.value = !hidePass2.value;
};

watch(
  () => newPassword.value,
  () => {
    newPasswordError.value = "";
  },
  { deep: true },
);

watch(
  () => confirmNewPassword.value,
  () => {
    confirmNewPasswordError.value = "";
  },
  { deep: true },
);

// To Create Code form of verification code
const codeArray = ref(["", "", "", "", "", ""]);
const code = ref("");
const inputs = ref([]);

const nextInput = (index) => {
  if (codeArray.value[index] && index < 5) {
    inputs.value[index + 1].focus();
  }
};

const prevInput = (index) => {
  if (!codeArray.value[index] && index > 0) {
    inputs.value[index - 1].focus();
  }
};

watch(
  () => codeArray.value,
  (newCode) => {
    code.value = newCode.join("");
    console.log(code.value);
  },
  { deep: true },
);

let counterDownInterval = null;
const counter = ref(0);

const startCountDown = () => {
  counter.value = 60;

  counterDownInterval = setInterval(() => {
    if (counter.value > 0) {
      counter.value--;
    } else {
      clearInterval(counterDownInterval);
      counterDownInterval = null;
    }
  }, 1000);
};

const redendCode = async () => {
  const data = await authStore.resendResetCode(userId);

  if (data.success) {
    startCountDown();
  }
};

const resetPassword = async () => {
  const data = await authStore.resetPassword(
    code.value,
    newPassword.value,
    confirmNewPassword.value,
    userId,
  );

  if (data.success) {
    router.push({ name: "homePage" });
  } else if (data.errors) {
    codeError.value = data.errors.code || "";
    newPasswordError.value = data.errors?.password?.message || "";
    confirmNewPasswordError.value = data.errors.confirmNewPassword || "";
  }

  console.log(data);
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

.passwords,
.code {
  .title {
    position: relative;
    transition: 0.3s;
    margin-left: 35px;
    &::before {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      top: 50%;
      left: -35px;
      transform: translateY(-50%);
      background-color: #147cfe;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
  }
}

.code {
  .title::before {
    content: "1";
  }
}

.passwords {
  .title::before {
    content: "2";
  }
}

.inpCode {
  input {
    box-shadow: none;
    @media (max-width: 1300px) {
      width: 50px !important;
      height: 50px !important;
    }
    @media (max-width: 576px) {
      width: 40px !important;
      height: 40px !important;
    }
  }
}
</style>
