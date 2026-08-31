<template>
  <section class="ProfilePage position-relative">
    <div class="container-fluid p-0">
      <div class="d-flex align-items-start">
        <!-- <div class="SideBar"> -->
        <SideBar />
        <!-- </div> -->
        <div class="contentSide flex-grow-1" style="min-width: 0">
          <TopBar />
          <div class="content p-4">
            <div
              class="header d-flex align-items-center justify-content-center justify-content-md-between flex-column flex-md-row text-center text-md-start"
            >
              <div class="title">
                <h3 class="m-0 mb-1">Profile</h3>
                <p class="describe text-muted">Manage your account information and preferences</p>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 mb-3 mb-lg-0" v-if="userStore.user">
                <div class="informationSide bg-white rounded shadow-sm border p-4">
                  <div class="avatar text-center">
                    <div class="image mx-auto position-relative" style="width: fit-content">
                      <img
                        :src="`${url}/${userStore.user.avatar}`"
                        alt="avatar"
                        class="img-fluid rounded-pill"
                        style="width: 150px; height: 150px; object-fit: cover; cursor: pointer"
                        @click.self="showImageFunc"
                      />
                      <div
                        class="icon position-absolute p-2 bg-white rounded-pill shadow-sm d-flex justify-content-center align-items-center"
                        style="
                          right: -18px;
                          bottom: 20px;
                          width: 40px;
                          height: 40px;
                          cursor: pointer;
                          color: #0040db;
                        "
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#changeImage"
                      >
                        <i class="bi bi-pencil"></i>
                      </div>
                    </div>
                  </div>
                  <div class="userNameAndEmail text-center my-2 border-bottom pb-4">
                    <div class="username">
                      <h4 class="m-0 mb-1">
                        {{ userStore.user.username }}
                      </h4>
                    </div>
                    <div class="email">{{ userStore.user.email }}</div>
                  </div>
                  <div class="details d-flex align-items-center justify-content-between my-3">
                    <ul class="list-unstyled">
                      <li class="mb-2">
                        <div class="joindAt">
                          <div class="title d-flex align-items-center gap-2 text-muted">
                            <div class="icon"><i class="bi bi-calendar3"></i></div>
                            <div class="text">Joined</div>
                          </div>
                        </div>
                      </li>
                      <li class="mb-2">
                        <div class="email">
                          <div class="title d-flex align-items-center gap-2 text-muted">
                            <div class="icon"><i class="bi bi-envelope"></i></div>
                            <div class="text">Email</div>
                          </div>
                        </div>
                      </li>
                      <li class="mb-2">
                        <div class="role">
                          <div class="title d-flex align-items-center gap-2 text-muted">
                            <div class="icon"><i class="bi bi-shield-check"></i></div>
                            <div class="text">Role</div>
                          </div>
                        </div>
                      </li>
                      <li class="mb-2">
                        <div class="verified">
                          <div class="title d-flex align-items-center gap-2 text-muted">
                            <div class="icon"><i class="bi bi-check-circle"></i></div>
                            <div class="text">Verified</div>
                          </div>
                        </div>
                      </li>
                      <li class="mb-2">
                        <div class="localTime">
                          <div class="title d-flex align-items-center gap-2 text-muted">
                            <div class="icon"><i class="bi bi-clock"></i></div>
                            <div class="text">Local Time</div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <ul class="list-unstyled">
                      <li class="mb-2">
                        <div class="value">
                          {{ new Date(userStore.user.createdAt).toLocaleDateString("en-GB") }}
                        </div>
                      </li>
                      <li class="mb-2">
                        <div class="value">
                          {{ userStore.user.email }}
                        </div>
                      </li>
                      <li class="mb-2">
                        <div class="value">
                          {{ userStore.user.role }}
                        </div>
                      </li>
                      <li class="mb-2">
                        <div class="value">
                          {{ userStore.user.isVerified ? "Yes" : "No" }}
                        </div>
                      </li>
                      <li class="mb-2">
                        <div class="value">
                          {{ `${localTime} (GMT+3)` }}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="logoutButton" @click="logoutAccount">
                    <button
                      class="btn d-flex align-items-center justify-content-center gap-2 border w-100"
                      style="color: #f43c45; border-color: #ffc4c7 !important"
                    >
                      <div class="icon"><i class="bi bi-box-arrow-right"></i></div>
                      <div class="text">Logout</div>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-lg-8" v-if="userStore.user">
                <div class="editSide">
                  <div class="accountInformation bg-white rounded shadow-sm border p-4 mb-3">
                    <div class="header d-flex align-items-center gap-3">
                      <div
                        class="icon d-flex justify-content-center align-items-center rounded mb-2"
                        style="width: 50px; height: 50px; background-color: #eef4fe; color: #2b6ff8"
                      >
                        <i class="bi bi-person fs-3"></i>
                      </div>
                      <div class="title">
                        <div class="fw-bold">Account information</div>
                        <p class="text-muted">Update your account information</p>
                      </div>
                    </div>

                    <form class="row mt-3" @submit.prevent="updateProfile">
                      <div class="col-lg-6 mb-3 mb-lg-0">
                        <label for="username" class="form-label">Username</label>

                        <input
                          type="text"
                          class="form-control"
                          :class="{ 'is-invalid': userError.username }"
                          id="username"
                          placeholder="Username"
                          style="box-shadow: none"
                          v-model="user.username"
                        />
                        <div class="invalid-feedback">{{ userError.username }}</div>
                      </div>
                      <div class="col-lg-6">
                        <label for="email" class="form-label">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          placeholder="Email"
                          style="box-shadow: none"
                          v-model="user.email"
                        />
                      </div>
                      <div class="saveChangeBtn mt-3 text-end">
                        <button class="btn btn-primary">Save Changes</button>
                      </div>
                    </form>
                  </div>

                  <div class="changePassword bg-white rounded shadow-sm border p-4">
                    <div class="header d-flex align-items-center gap-3 mb-3">
                      <div
                        class="icon d-flex justify-content-center align-items-center rounded mb-2"
                        style="width: 50px; height: 50px; background-color: #eef4fe; color: #2b6ff8"
                      >
                        <i class="bi bi-lock fs-4"></i>
                      </div>
                      <div class="title">
                        <div class="fw-bold">Change Password</div>
                        <p class="text-muted">Update your password</p>
                      </div>
                    </div>

                    <form @submit.prevent="changePassword">
                      <div class="mb-3">
                        <label for="currentPassword" class="form-label">Current Password</label>
                        <input
                          type="text"
                          class="form-control"
                          :class="{ 'is-invalid': userError.currentPassword }"
                          id="currentPassword"
                          placeholder="Enter Current Password"
                          v-model="password.currentPassword"
                          style="box-shadow: none"
                        />
                        <div class="invalid-feedback">{{ userError.currentPassword }}</div>
                      </div>

                      <label for="newPassword" class="form-label">Password</label>
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
                          placeholder="Enter new password"
                          aria-label="Username"
                          aria-describedby="basic-addon3"
                          id="newPassword"
                          v-model="password.newPassword"
                          :class="{ 'is-invalid': userError.newPassword }"
                          style="box-shadow: none"
                        />
                        <span class="btn input-group-text border" @click="toggleHide1">
                          <i class="bi" :class="hidePass1 ? 'bi-eye' : 'bi-eye-slash'"></i>
                        </span>
                        <div :class="{ 'invalid-feedback': userError.newPassword }">
                          {{ userError.newPassword }}
                        </div>
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
                          v-model="password.confirmNewPassword"
                          :class="{ 'is-invalid': userError.confirmNewPassword }"
                          style="box-shadow: none"
                        />
                        <span class="btn input-group-text border" @click="toggleHide2">
                          <i class="bi" :class="hidePass2 ? 'bi-eye' : 'bi-eye-slash'"></i>
                        </span>
                        <div :class="{ 'invalid-feedback': userError.confirmNewPassword }">
                          {{ userError.confirmNewPassword }}
                        </div>
                      </div>

                      <div class="updateButton text-end">
                        <button class="btn btn-primary">Update Password</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="overlay" v-if="showImage" @click.self="showImage = false">
        <div class="Image">
          <img
            :src="`${url}/${userStore.user.avatar}`"
            alt="avatar"
            class="img-fluid rounded-pill"
          />
        </div>
      </div>
    </transition>
    <!-- Modal -->
    <div
      class="modal fade"
      id="changeImage"
      tabindex="-1"
      aria-labelledby="changeImageId"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="border-bottom: none">
            <h1 class="modal-title fs-5" id="changeImageId">Update Profile Picture</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div
              class="currentImage mx-auto rounded-pill position-relative"
              style="width: fit-content"
            >
              <img
                :src="`${url}/${userStore.user.avatar}`"
                alt="avatar"
                class="rounded-pill p-1"
                style="width: 150px; height: 150px; object-fit: cover; border: 2px dashed #1457f3"
              />
              <div
                class="iconCamera position-absolute bg-white rounded-pill shadow-sm d-flex align-items-center justify-content-center"
                style="bottom: 20px; right: -18px; width: 40px; height: 40px"
                @click="openChooseImage"
              >
                <i class="bi bi-camera-fill fs-5" style="color: #0855e1; cursor: pointer"></i>
              </div>
            </div>

            <div
              class="description d-flex align-items-center gap-2 p-2 rounded my-3 mx-auto"
              style="background-color: #f0f6fe; color: #0647f2"
            >
              <div class="icon"><i class="bi bi-exclamation-circle"></i></div>
              <div class="text">JPG, PNG, or WEBP, Max size 2MB.</div>
            </div>

            <form>
              <input type="file" style="display: none" ref="chooseImage" />

              <div
                class="uploadFile text-center p-3 rounded"
                style="border: 2px dashed #d0d0d0; cursor: pointer; background-color: #f8f8f8"
                @click="openChooseImage"
              >
                <div class="icon" style="color: #0048f2">
                  <i class="bi bi-cloud-arrow-up fs-2"></i>
                </div>
                <div class="describe">
                  <div class="topText">Drag and drop your image here</div>
                  <div class="buttomText">
                    or <span style="color: #0048f2">click to browse</span>
                  </div>
                </div>
              </div>
              <div class="errorMsg text-danger mt-2 small">{{ imageError }}</div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-light border"
              data-bs-dismiss="modal"
              @click="clearImage"
            >
              Cancle
            </button>
            <button type="button" class="btn btn-primary" @click.prevent="changeImage">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import { useUserStore } from "@/stores/userStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Define stories
const userStore = useUserStore();
const authStore = useAuthStore();

// Define router obj
const router = useRouter();

const url = import.meta.env.VITE_API_URL;

const localTime = new Date().toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

// Var to display a profile image
const showImage = ref(false);

const showImageFunc = () => {
  showImage.value = true;
};

const hidePass1 = ref(true);

const hidePass2 = ref(true);

const toggleHide1 = () => {
  hidePass1.value = !hidePass1.value;
};

const toggleHide2 = () => {
  hidePass2.value = !hidePass2.value;
};

const user = reactive({
  username: "",
  email: "",
});

const password = reactive({
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const userError = ref({
  username: "",
  email: "",
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

watch(
  () => [user.username, user.email],
  () => {
    userError.value.username = "";
  },
);

watch(
  () => [password.currentPassword, password.newPassword, password.confirmNewPassword],
  () => {
    userError.value.currentPassword = "";
    userError.value.newPassword = "";
    userError.value.confirmNewPassword = "";
  },
);

const updateProfile = async () => {
  const data = await userStore.updateAccount(user);

  if (data.success) {
    toast.success("Account information updated successfully.");
    await userStore.getUserAfterSignIn();
  } else {
    toast.error("Unable to complete the request. Please try again.");
    if (data.errors.email) userError.value.username = data.errors.email;
  }
};

const changePassword = async () => {
  const data = await userStore.changePassword(password);

  if (data.success) {
    toast.success("Password changed successfully.");
    password.currentPassword = "";
    password.newPassword = "";
    password.confirmNewPassword = "";
    await userStore.getUserAfterSignIn();
  } else {
    toast.error("Something went wrong. Please try again.");
    if (data.errors?.currentPassword) userError.value.currentPassword = data.errors.currentPassword;
    else if (data.errors?.confirmNewPassword)
      userError.value.confirmNewPassword = data.errors.confirmNewPassword;
    else if (data.errors?.newPassword) userError.value.newPassword = data.errors.newPassword;
    else if (data.message === "Current password is not correct!")
      userError.value.currentPassword = "Current password is incorrect.";
    else if (data.errors.password)
      userError.value.confirmNewPassword = "Password must be at least 6 characters long.";
  }
};

// Var to get chooseImage element
const chooseImage = ref(null);

// Var to Store the Error of Image
const imageError = ref("");

const openChooseImage = () => {
  chooseImage.value.click();
};

// Function to chaneg image
const changeImage = async () => {
  const formData = new FormData();
  formData.append("newAvatar", chooseImage.value.files[0]);

  const data = await userStore.changeImage(formData);

  console.log(data);

  if (data.success) {
    await userStore.getUserAfterSignIn();
    toast.success("Profile picture updated successfully.");
  } else if (data.errors) {
    imageError.value = data.errors.image;
    toast.error("Unable to update your profile picture. Please try again.");
  } else {
    imageError.value = "Profile picture must be 2MB or smaller.";
    toast.error("Unable to update your profile picture. Please try again.");
  }
};

const clearImage = async () => {
  if (chooseImage.value) {
    chooseImage.value.value = "";
  }
};

// Logout
const logoutAccount = async () => {
  const data = await authStore.logout();

  if (data.success) {
    router.push({ name: "signin" });
  }
};

onMounted(async () => {
  await userStore.getUserAfterSignIn();
  user.username = userStore.user.username;
  user.email = userStore.user.email;
});
</script>

<style lang="scss" scoped>
.avatar {
  .image {
    .icon {
      transition: 0.4s;
      &:hover {
        transform: scale(1.05) translateX(5px);
      }
    }
  }
}

.logoutButton {
  button {
    transition: 0.3s;
    &:hover {
      background-color: #f43c45 !important;
      color: white !important;
    }
  }
}

.overlay {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.401);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .Image {
    cursor: auto;
    img {
      width: 400px;
      height: 400px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}

.uploadFile {
  transition: 0.3s;
  &:hover {
    border-color: #055ceb !important;
    transform: scale(1.02);
  }
}
.iconCamera {
  transition: 0.4s;
  &:hover {
    transform: scale(1.05) translateX(5px);
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}
</style>
