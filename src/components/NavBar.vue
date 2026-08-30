<template>
  <div class="NavBar" style="background-color: #fefefe; border-bottom: 2px solid #edf1f8">
    <div class="container">
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold" style="color: #3d77fe" href=""
            ><img src="/public/logo.png" alt="Logo" class="img-fluid" style="width: 30px" />
            Taskly</a
          >
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            v-if="!route.meta.hiddenLinks"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <div
              class="haveAnAccount d-flex align-items-center gap-3"
              v-if="!route.meta.hiddenLinks"
            >
              <span class="text-muted">Have an account?</span>
              <div class="signinButton">
                <router-link class="btn text-primary" :to="{ name: 'signin' }">Sign in</router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

// Define route object
const route = useRoute();
</script>

<style lang="scss" scoped>
.signinButton {
  a {
    border: 2px solid #e5e8ef;
    transition: 0.3s ease;
    &:hover {
      background: #e5e8ef;
      border: 2px solid #d8d8d8;
    }
  }
}

.navbar-nav {
  .nav-item {
    a.active {
      color: #3d77fe;
    }
  }
}
</style>
