<template>
  <div class="auth-page">
    <div class="container-fluid">
      <div class="row min-vh-100">
        <!-- Left side - Background -->
        <div class="col-lg-6 d-none d-lg-block auth-bg">
          <div class="auth-bg-overlay">
            <div class="auth-bg-content">
              <h2 class="text-white mb-4">Welcome to GamePlex</h2>
              <p class="text-white-50">
                Join the ultimate gaming platform for tournaments and
                competitions
              </p>
            </div>
          </div>
        </div>

        <!-- Right side - Form -->
        <div class="col-lg-6">
          <div class="auth-form-container">
            <div class="auth-form-wrapper">
              <div class="auth-header text-center mb-4">
                <NuxtLink to="/" class="auth-logo mb-4 d-inline-block">
                  <h3 class="text-primary fw-bold">GamePlex</h3>
                </NuxtLink>
                <h1 class="auth-title mb-2">Welcome Back</h1>
                <p class="auth-subtitle text-muted">
                  Sign in to continue to your account
                </p>
              </div>

              <form class="auth-form" @submit.prevent="handleLogin">
                <div class="form-group mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                  />
                  <div v-if="errors.email" class="invalid-feedback d-block">
                    {{ errors.email }}
                  </div>
                </div>

                <div class="form-group mb-3">
                  <div
                    class="d-flex justify-content-between align-items-center mb-2"
                  >
                    <label for="password" class="form-label mb-0"
                      >Password</label
                    >
                    <NuxtLink
                      to="/forgot-password"
                      class="text-primary text-decoration-none small"
                    >
                      Forgot Password?
                    </NuxtLink>
                  </div>
                  <div class="input-group">
                    <input
                      id="password"
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="showPassword = !showPassword"
                    >
                      <i
                        :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                      ></i>
                    </button>
                  </div>
                  <div v-if="errors.password" class="invalid-feedback d-block">
                    {{ errors.password }}
                  </div>
                </div>

                <div class="form-check mb-4">
                  <input
                    type="checkbox"
                    v-model="form.rememberMe"
                    class="form-check-input"
                    id="rememberMe"
                  />
                  <label class="form-check-label" for="rememberMe">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary w-100 mb-3"
                  :disabled="isLoading"
                >
                  <span
                    v-if="isLoading"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  {{ isLoading ? "Signing In..." : "Sign In" }}
                </button>
              </form>

              <div class="auth-divider mb-3">
                <span class="auth-divider-text">or continue with</span>
              </div>

              <div class="social-login mb-4">
                <button
                  type="button"
                  class="btn btn-outline-danger w-100 mb-2"
                  @click="socialLogin('google')"
                >
                  <i class="fab fa-google me-2"></i> Continue with Google
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary w-100"
                  @click="socialLogin('facebook')"
                >
                  <i class="fab fa-facebook-f me-2"></i> Continue with Facebook
                </button>
              </div>

              <div class="auth-footer text-center">
                <p class="mb-0">
                  Don't have an account?
                  <NuxtLink
                    to="/signup"
                    class="text-primary text-decoration-none fw-semibold"
                    >Sign Up</NuxtLink
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

// Form data
const form = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

const errors = reactive({
  email: "",
  password: "",
});

const isLoading = ref(false);
const showPassword = ref(false);

// Functions
const handleLogin = async () => {
  // Clear previous errors
  errors.email = "";
  errors.password = "";

  // Basic validation
  if (!form.email) {
    errors.email = "Email is required";
    return;
  }
  if (!form.password) {
    errors.password = "Password is required";
    return;
  }

  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to profile or dashboard
    await navigateTo("/profile");
  } catch (error) {
    console.error("Login failed:", error);
    errors.email = "Invalid credentials";
  } finally {
    isLoading.value = false;
  }
};

const socialLogin = (provider: string) => {
  console.log(`Logging in with ${provider}`);
  // Implement social login here
};

// SEO
useHead({
  title: "Sign In - GamePlex",
  meta: [
    {
      name: "description",
      content:
        "Sign in to your GamePlex account to access tournaments and gaming features",
    },
  ],
});
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.auth-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.auth-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-bg-content {
  text-align: center;
  max-width: 400px;
  padding: 2rem;
}

.auth-form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.auth-form-wrapper {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.auth-title {
  font-size: 2rem;
  font-weight: bold;
  color: #212529;
}

.auth-subtitle {
  font-size: 1rem;
}

.form-control {
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.auth-divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.auth-divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #dee2e6;
}

.auth-divider-text {
  background: white;
  padding: 0 1rem;
  color: #6c757d;
  font-size: 0.875rem;
}

.btn {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
}

.btn-primary {
  background: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background: #0b5ed7;
  border-color: #0a58ca;
}

.btn-outline-danger:hover {
  background: #dc3545;
  border-color: #dc3545;
  color: white;
}

.btn-outline-primary:hover {
  background: #0d6efd;
  border-color: #0d6efd;
  color: white;
}
</style>
