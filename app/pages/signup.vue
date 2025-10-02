<template>
  <div class="auth-page min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card bg-dark text-white shadow">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <h2 class="card-title">Join GamePlex</h2>
                <p class="text-muted">Create your gaming account</p>
              </div>

              <form @submit.prevent="handleSignup">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">First Name</label>
                    <input
                      v-model="form.firstName"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Last Name</label>
                    <input
                      v-model="form.lastName"
                      type="text"
                      class="form-control"
                      required
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Username</label>
                  <input
                    v-model="form.username"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Confirm Password</label>
                  <input
                    v-model="form.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="form-control"
                    required
                  />
                </div>

                <div class="mb-3 form-check">
                  <input
                    v-model="form.agreeToTerms"
                    type="checkbox"
                    class="form-check-input"
                    required
                  />
                  <label class="form-check-label">
                    I agree to the Terms and Conditions
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
                  Create Account
                </button>
              </form>

              <div class="text-center">
                <p class="mb-3">Already have an account?</p>
                <NuxtLink to="/signin" class="btn btn-outline-light">
                  Sign In
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: "Sign Up - GamePlex",
  meta: [
    {
      name: "description",
      content:
        "Create your GamePlex account and join the ultimate gaming platform.",
    },
  ],
});

// Form data
const form = reactive({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
});

const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Functions
const handleSignup = async () => {
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Account created:", form);

    // Navigate to signin
    await navigateTo("/signin");
  } catch (error) {
    console.error("Signup error:", error);
    alert("Failed to create account");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
}

.card {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-control {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.form-control:focus {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: #00d4ff;
  color: white;
  box-shadow: 0 0 0 0.2rem rgba(0, 212, 255, 0.25);
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>
