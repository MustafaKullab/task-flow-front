<template>
  <section class="SignUp">
    <NavBarSignup />
    <div class="container">
      <div class="row py-4 justify-content-center align-items-center m-2 m-lg-0">
        <div class="col-lg-5 text-center text-lg-start mb-5 mb-lg-0">
          <div class="title">
            <h2>Organize your work. <br />Achieve more.</h2>
          </div>
          <div class="description mb-4">
            <p class="text-muted">
              Taskly helps you and your team stay organized. <br />manage tasks, and get things done
              efficiently. <br />All in one beautiful workspace.
            </p>
          </div>
          <div class="features">
            <div
              class="feat d-flex gap-2 mb-4 flex-column flex-lg-row align-items-center align-items-lg-start"
            >
              <div class="icon"><i class="bi bi-check-circle"></i></div>
              <div class="details">
                <div class="main fw-bold">Stay organized</div>
                <div class="secondary text-muted">
                  Keep all your tasks and projects in one place.
                </div>
              </div>
            </div>
            <div
              class="feat d-flex gap-2 mb-4 flex-column flex-lg-row align-items-center align-items-lg-start"
            >
              <div class="icon"><i class="bi bi-people"></i></div>
              <div class="details">
                <div class="main fw-bold">Collaborate easily</div>
                <div class="secondary text-muted">Work with your team in real-time.</div>
              </div>
            </div>
            <div
              class="feat d-flex gap-2 mb-4 flex-column flex-lg-row align-items-center align-items-lg-start"
            >
              <div class="icon"><i class="bi bi-shield-check"></i></div>
              <div class="details">
                <div class="main fw-bold">Secure & reliable</div>
                <div class="secondary text-muted">Your data is protected and always safe.</div>
              </div>
            </div>
          </div>
          <div class="image">
            <img
              src="/public/taskSignup.png"
              alt="task dashboard"
              class="img-fluid"
              style="width: 385px"
            />
          </div>
        </div>
        <div class="col-lg-5 bg-white p-3 rounded shadow-sm border">
          <div class="header text-center">
            <div class="mx-auto icon">
              <i class="bi bi-person-add"></i>
            </div>
            <div class="title">
              <h2 class="m-0 mb-1">Create your account</h2>
              <p class="text-muted m-0">Join Taskly and start your journey</p>
            </div>
          </div>
          <form @submit.prevent="signup">
            <label for="fullName" class="form-label">Full Name</label>
            <div class="input-group mb-3">
              <span
                class="input-group-text text-muted"
                style="background-color: transparent"
                id="basic-addon1"
                ><i class="bi bi-person"></i
              ></span>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your full name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="fullName"
                v-model="user.username"
                :class="{ 'is-invalid': usernameError }"
                style="box-shadow: none"
              />
              <div :class="{ 'invalid-feedback': usernameError }">{{ usernameError }}</div>
            </div>
            <label for="emaillAddress" class="form-label">Email Address</label>
            <div class="input-group mb-3">
              <span
                class="input-group-text text-muted"
                style="background-color: transparent"
                id="basic-addon2"
                ><i class="bi bi-envelope"></i
              ></span>
              <input
                type="text"
                class="form-control"
                placeholder="Enter your email"
                aria-label="Username"
                aria-describedby="basic-addon2"
                id="emaillAddress"
                v-model="user.email"
                :class="{ 'is-invalid': emailError }"
                style="box-shadow: none"
              />
              <div :class="{ 'invalid-feedback': emailError }">{{ emailError }}</div>
            </div>
            <label for="password" class="form-label">Password</label>
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
                placeholder="Enter your password"
                aria-label="Username"
                aria-describedby="basic-addon3"
                id="password"
                v-model="user.password"
                :class="{ 'is-invalid': passwordError }"
                style="box-shadow: none"
              />
              <span class="btn input-group-text border" @click="toggleHide1">
                <i class="bi" :class="hidePass1 ? 'bi-eye' : 'bi-eye-slash'"></i>
              </span>
              <div :class="{ 'invalid-feedback': passwordError }">{{ passwordError }}</div>
            </div>
            <label for="confirmPassword" class="form-label">Confirm Password</label>
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
                placeholder="Confirm your password"
                aria-label="Username"
                aria-describedby="basic-addon4"
                id="confirmPassword"
                v-model="user.confirmPassword"
                :class="{ 'is-invalid': confirmPasswordError }"
                style="box-shadow: none"
              />
              <span class="btn input-group-text border" @click="toggleHide2">
                <i class="bi" :class="hidePass2 ? 'bi-eye' : 'bi-eye-slash'"></i>
              </span>
              <div :class="{ 'invalid-feedback': confirmPasswordError }">
                {{ confirmPasswordError }}
              </div>
            </div>
            <div class="input-group justify-content-center">
              <label for="emaillAddress" class="form-label me-auto"
                >Profile Picture(Optional)</label
              >
              <input
                type="file"
                style="display: none"
                ref="uploadImage"
                :class="{ 'is-invalid': imageError }"
              />
              <div
                class="uploadPict w-100 d-flex gap-3 align-items-center justify-content-center p-2 rounded cursor-pointer"
                @click="actionUpload"
                style="background-color: #f9f9f9 !important; border: 2px solid #ebedf4"
              >
                <div class="icon"><i class="bi bi-cloud-arrow-up fs-3 text-primary"></i></div>
                <div class="details">
                  <div class="title fw-bold">Click to upload a profile picture</div>
                  <div class="text-muted">PNG,JPG or WEBP (Max. 2MB)</div>
                </div>
              </div>
              <div class="invalid-feedback">{{ imageError }}</div>
            </div>

            <div class="createAccount my-3">
              <button class="btn btn-primary w-100" type="submit">Create account</button>
            </div>

            <div class="alreadyHaveAnAccount mt-2 pt-2 border-top text-center">
              Already have an account?
              <router-link class="text-primary text-decoration-none" :to="{ name: 'signin' }"
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
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

//Define auth store
const authStore = useAuthStore();

// Define the router
const router = useRouter();

// Define the upload element
const uploadImage = ref(null);

const actionUpload = () => {
  uploadImage.value.click();
};

const user = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const hidePass1 = ref(true);

const hidePass2 = ref(true);

const toggleHide1 = () => {
  hidePass1.value = !hidePass1.value;
};

const toggleHide2 = () => {
  hidePass2.value = !hidePass2.value;
};

const usernameError = ref(null);
const emailError = ref(null);
const passwordError = ref(null);
const confirmPasswordError = ref(null);
const imageError = ref(null);

watch(
  () => user.value.username,
  () => {
    usernameError.value = "";
  },
  { deep: true },
);

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

watch(
  () => user.value.confirmPassword,
  () => {
    confirmPasswordError.value = "";
  },
  { deep: true },
);

const signup = async () => {
  const data = await authStore.signupUser(user, uploadImage);
  console.log(data);

  if (data.errors) {
    usernameError.value = data.errors.username;
    emailError.value = data.errors.email;
    passwordError.value = data.errors.password;
    confirmPasswordError.value = data.errors.confirmPassword;
  }

  if (data.message === "File too large") {
    imageError.value = "Image is grather than 2 MB";
  }

  if (data.success) {
    router.push({ name: "verifyEmail", params: { userId: data.userId } });
  }
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

.feat {
  @media (max-width: 991px) {
    background-color: white !important;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 10px;
    width: 350px;
    margin: 0 auto;
  }
  .icon {
    width: 45px;
    height: 45px;
    border-radius: 10px;
    background-color: #f0f5fe;
    color: #0d50e6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
}

.header {
  .icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f0f5fe;
    color: #0d50e6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
}

form {
  input:focus {
    border-color: #dee2e6 !important;
  }
}
</style>
