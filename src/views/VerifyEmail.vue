<template>
  <section class="VerificationEmail vh-100">
    <NavBarSignup />
    <div class="container" style="height: calc(100% - 62px)">
      <div class="row py-5 align-items-center justify-content-center h-100">
        <div class="col-lg-6 col-xl-5">
          <div class="verifyBox p-3 bg-white rounded border text-center">
            <div class="image">
              <img
                src="/public/verifyEmail.png"
                alt="Verify Email"
                class="img-fluid"
                style="width: 100px"
              />
            </div>
            <div class="header">
              <div class="title">
                <h3 class="m-0 mb-1">Verify your email</h3>
                <p class="text-muted m-0">We've sent a verification code to your email address.</p>
              </div>
            </div>
            <form class="my-3" @submit.prevent="verifyAcc">
              <label
                class="text-muted d-flex gap-2 align-items-center justify-content-center"
                style="display: block"
                v-if="userStore.user"
                ><span><i class="bi bi-envelope"></i></span>
                <span class="mb-1">{{ userStore.user.email }}</span></label
              >
              <div class="inputs row gap-2 justify-content-center align-items-center my-3">
                <input
                  type="text"
                  class="form-control col-md-2"
                  style="box-shadow: none"
                  v-for="(digits, index) of code"
                  :key="index"
                  maxlength="1"
                  v-model="code[index]"
                  ref="inputs"
                  @input="nextInput(index)"
                  @keydown.backspace="prevInput(index)"
                />
              </div>
              <div class="veriftAccount mt-3 mb-1">
                <button class="btn btn-primary w-100" :disabled="verificationCode.length !== 6">
                  Verify account
                </button>
              </div>
              <div class="errMessage text-start m-0 small text-danger">{{ codeError }}</div>
            </form>
            <div class="dontReceive text-muted border-bottom pb-2">
              Didn't receive the code?
              <a
                :class="{ disabled: counter > 0 }"
                class="btn text-decoration-none cursor-pointer"
                @click="resendCode"
                >Resend code</a
              >
              <div class="timeAvaliable my-2">
                Resend Available in 00:{{ String(counter).padStart(2, "0") }}
              </div>
            </div>
            <div class="useDifferentEmail text-start mt-2">
              <router-link class="text-primary btn" :to="{ name: 'signup' }">
                <i class="bi bi-arrow-left"></i> Use a different email
              </router-link>
            </div>
            <div class="message mt-2 text-muted">
              <i class="bi bi-lock"></i> Your account verification helps keep Task Flow secure.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import NavBarSignup from "@/components/NavBar.vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";
import { useRoute, useRouter } from "vue-router";

// Define user and auth store objects
const userStore = useUserStore();
const authStore = useAuthStore();

// Define the route and router
const router = useRouter();
const route = useRoute();

// Get userId
const userId = route.params.userId;

const code = ref(["", "", "", "", "", ""]);
const verificationCode = ref("");
const codeError = ref("");

const inputs = ref([]);

const nextInput = (index) => {
  if (code.value[index] && index < 5) {
    inputs.value[index + 1].focus();
  }
};

const prevInput = (index) => {
  if (!code.value[index] && index > 0) {
    inputs.value[index - 1].focus();
  }
};

watch(
  code,
  (newCode) => {
    verificationCode.value = newCode.join("");

    if (verificationCode.value.length === 6) {
      verifyAcc();
    }
  },
  { deep: true },
);

watch(
  () => verificationCode.value,
  () => {
    codeError.value = "";
  },
);

let counterDownInterval = null; // لنمسحه بعد م ينتهي
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

const resendCode = async () => {
  if (counter.value > 0) return;

  const data = await authStore.resendCode(userId);

  if (data.errors) {
    codeError.value = data.errors.code;
  }

  if (data.success) {
    startCountDown();
  }
};

const verifyAcc = async () => {
  const data = await authStore.verifyAccount(verificationCode.value, userId);

  if (data.errors) {
    codeError.value = data.errors.code;
  }

  if (data.success) {
    router.push({ name: "homePage" });
  }
};

onBeforeUnmount(() => {
  if (counterDownInterval) {
    clearInterval(counterDownInterval);
  }
});

onMounted(async () => {
  await userStore.getUser(userId);
});
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

input {
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 22px;
}

.dontReceive {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 20%;
    transform: translateY(-50%);
    height: 1px;
    width: 20%;
    background-color: #e9ecf1;
  }
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    transform: translateY(-50%);
    height: 1px;
    width: 20%;
    background-color: #e9ecf1;
  }
}

.useDifferentEmail {
  a:focus {
    border: none;
  }
}

.dontReceive {
  a {
    padding: 5px;
    border-radius: 6px;
    background-color: #0d6efd;
    color: white !important;
    transition: 0.3s;
    &:hover {
      background-color: #0966f2;
    }
  }
}

.disabled {
  background-color: #3f3f3f !important;
}
</style>
