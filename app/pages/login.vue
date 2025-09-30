<template><template>

  <div>  <div class="auth-page">

    <!-- Preloader -->    <div class="auth-container">

    <div class="preloader">      <div class="row g-0">

      <div class="loader">        <!-- Auth Form -->

        <span />        <div class="col-lg-6 auth-form-col" data-aos="fade-right">

      </div>          <div class="auth-form-wrapper">

    </div>            <div class="auth-header">

              <NuxtLink to="/" class="auth-logo">

    <!-- cursor effect-->                <img src="/assets/img/logo.png" alt="GamePlex">

    <div class="cursor" />              </NuxtLink>

              <h1 class="auth-title">Welcome Back</h1>

    <!-- header-section start -->              <p class="auth-subtitle">Sign in to continue to your account</p>

    <header class="header-section w-100 bgn-4">            </div>

      <div class="py-sm-6 py-3 mx-xxl-20 mx-md-15 mx-3">            

        <div class="d-flex align-items-center justify-content-between gap-xxl-10 gap-lg-8 w-100">            <form @submit.prevent="handleLogin" class="auth-form">

          <nav class="navbar-custom d-flex gap-lg-6 align-items-center flex-column flex-lg-row justify-content-start justify-content-lg-between w-100">              <div class="form-group">

            <div class="top-bar w-100 d-flex align-items-center gap-6">                <label for="email">Email Address</label>

              <button class="navbar-toggle-btn d-block d-lg-none" type="button">                <div class="input-group">

                <span />                  <span class="input-icon"><i class="fas fa-envelope"></i></span>

                <span />                  <input 

                <span />                    type="email" 

                <span />                    id="email" 

              </button>                    v-model="formData.email" 

              <NuxtLink class="navbar-brand d-flex align-items-center gap-4" to="/">                    placeholder="Enter your email"

                <img class="w-100 logo1" src="https://gameplex-final.vercel.app/gameplex-v1/assets/img/favicon.png" alt="favicon">                    required

                <img class="w-100 logo2" src="https://gameplex-final.vercel.app/gameplex-v1/assets/img/logo.png" alt="logo">                  >

              </NuxtLink>                </div>

            </div>                <div class="error-message" v-if="errors.email">{{ errors.email }}</div>

            <div class="navbar-toggle-item w-100 position-lg-relative">              </div>

              <ul class="custom-nav gap-3 gap-lg-7 cursor-scale growDown2 ms-xxl-10" data-lenis-prevent>              

                <li class="menu-link">              <div class="form-group">

                  <NuxtLink to="/">Home</NuxtLink>                <div class="password-label">

                </li>                  <label for="password">Password</label>

                <li class="menu-item">                  <NuxtLink to="/forgot-password" class="forgot-link">Forgot Password?</NuxtLink>

                  <button>Tournament</button>                </div>

                  <ul class="sub-menu">                <div class="input-group">

                    <li class="menu-link">                  <span class="input-icon"><i class="fas fa-lock"></i></span>

                      <NuxtLink to="/tournaments">Tournaments</NuxtLink>                  <input 

                    </li>                    :type="showPassword ? 'text' : 'password'" 

                    <li class="menu-link">                    id="password" 

                      <NuxtLink to="/tournaments/details">Tournaments Details</NuxtLink>                    v-model="formData.password" 

                    </li>                    placeholder="Enter your password"

                  </ul>                    required

                </li>                  >

                <li class="menu-link">                  <button 

                  <NuxtLink to="/games">Game</NuxtLink>                    type="button" 

                </li>                    class="password-toggle" 

                <li class="menu-item">                    @click="showPassword = !showPassword"

                  <button>Teams</button>                  >

                  <ul class="sub-menu">                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>

                    <li class="menu-link">                  </button>

                      <NuxtLink to="/teams">Teams</NuxtLink>                </div>

                    </li>                <div class="error-message" v-if="errors.password">{{ errors.password }}</div>

                    <li class="menu-link">              </div>

                      <NuxtLink to="/teams/details">Teams Details</NuxtLink>              

                    </li>              <div class="form-group remember-group">

                  </ul>                <label class="checkbox-container">

                </li>                  <input type="checkbox" v-model="formData.rememberMe">

                <li class="menu-item">                  <span class="checkmark"></span>

                  <button>pages</button>                  Remember me

                  <ul class="sub-menu">                </label>

                    <li class="menu-link">              </div>

                      <NuxtLink to="/register">Sign Up</NuxtLink>              

                    </li>              <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">

                    <li class="menu-link">                <span v-if="isLoading" class="spinner"></span>

                      <NuxtLink to="/login">Sign In</NuxtLink>                <span v-else>Sign In</span>

                    </li>              </button>

                    <li class="menu-link">              

                      <NuxtLink to="/error">Error</NuxtLink>              <div class="auth-divider">

                    </li>                <span>or continue with</span>

                    <li class="menu-link">              </div>

                      <NuxtLink to="/faq">Faq</NuxtLink>              

                    </li>              <div class="social-login">

                    <li class="menu-link">                <button type="button" class="social-btn google" @click="socialLogin('google')">

                      <NuxtLink to="/terms">Terms Conditions</NuxtLink>                  <i class="fab fa-google"></i>

                    </li>                  <span>Google</span>

                  </ul>                </button>

                </li>                <button type="button" class="social-btn facebook" @click="socialLogin('facebook')">

              </ul>                  <i class="fab fa-facebook-f"></i>

            </div>                  <span>Facebook</span>

          </nav>                </button>

          <div class="header-btn-area d-flex align-items-center gap-sm-6 gap-3">              </div>

            <button class="btn-rounded-cus wallet-btn border-0 d-flex align-items-center gap-3 p-xl-2 p-0 pe-xl-6 rounded-5 position-relative" @click="showWallet = true">              

              <span class="btn-circle fs-2xl">              <div class="wallet-login">

                <i class="ti ti-wallet" />                <button type="button" class="btn btn-outline btn-block" @click="connectWallet">

              </span>                  <i class="fas fa-wallet"></i>

              <span class="text-nowrap d-none d-xl-block">Connect Wallet</span>                  <span>Connect Wallet</span>

            </button>                </button>

            <button class="ntf-btn box-style fs-2xl" @click="showNotifications = !showNotifications">              </div>

              <i class="ti ti-bell-filled" />              

            </button>              <div class="auth-footer">

            <div class="header-profile pointer" @click="showProfile = !showProfile">                Don't have an account? <NuxtLink to="/register">Sign Up</NuxtLink>

              <div class="profile-wrapper d-flex align-items-center gap-3">              </div>

                <div class="img-area overflow-hidden">            </form>

                  <img class="w-100" src="https://gameplex-final.vercel.app/gameplex-v1/assets/img/profile.png" alt="profile">          </div>

                </div>        </div>

                <span class="user-name d-none d-xxl-block text-nowrap">David Malan</span>        

                <i class="ti ti-chevron-down d-none d-xxl-block" />        <!-- Auth Banner -->

              </div>        <div class="col-lg-6 auth-banner-col" data-aos="fade-left">

            </div>          <div class="auth-banner">

          </div>            <div class="banner-content">

        </div>              <h2>Join the Ultimate Gaming Experience</h2>

      </div>              <p>Access exclusive tournaments, connect with gamers worldwide, and earn rewards.</p>

    </header>              <div class="banner-features">

    <!-- header-section end -->                <div class="feature-item">

                  <div class="feature-icon">

    <!-- notification area start -->                    <i class="fas fa-trophy"></i>

    <div class="notification-area p-4" :class="{ 'd-none': !showNotifications }" data-lenis-prevent>                  </div>

      <div class="notification-card d-grid gap-lg-4 gap-2" data-tilt>                  <div class="feature-text">

        <a href="#">                    <h3>Competitive Tournaments</h3>

          <div class="card-item d-flex align-items-center gap-4">                    <p>Participate in tournaments and win exciting prizes</p>

            <div class="card-img-area">                  </div>

              <img class="w-100 rounded-circle" src="https://gameplex-final.vercel.app/gameplex-v1/assets/img/avatar1.png" alt="profile">                </div>

            </div>                <div class="feature-item">

            <div class="card-info">                  <div class="feature-icon">

              <span class="card-title d-block tcn-1"> Cristofer Dorwart</span>                    <i class="fas fa-coins"></i>

              <span class="card-text d-block tcn-1 fs-sm">Winners The Last Game</span>                  </div>

            </div>                  <div class="feature-text">

          </div>                    <h3>Crypto Rewards</h3>

        </a>                    <p>Earn cryptocurrency rewards for your gaming achievements</p>

        <a href="#">                  </div>

          <div class="card-item d-flex align-items-center gap-4">                </div>

            <div class="card-img-area">                <div class="feature-item">

              <img class="w-100 rounded-circle" src="https://gameplex-final.vercel.app/gameplex-v1/assets/img/avatar2.png" alt="profile">                  <div class="feature-icon">

            </div>                    <i class="fas fa-users"></i>

            <div class="card-info">                  </div>

              <span class="card-title d-block tcn-1"> Piter Maio </span>                  <div class="feature-text">

              <span class="card-text d-block tcn-1 fs-sm">Accept your challenge</span>                    <h3>Global Community</h3>

            </div>                    <p>Connect with gamers from around the world</p>

          </div>                  </div>

        </a>                </div>

        <a href="#">              </div>

          <div class="card-item d-flex align-items-center gap-4">            </div>

            <div class="card-info">          </div>

              <span class="card-title d-block tcn-1"> Copa Punto Gamer </span>        </div>

              <span class="card-text d-block tcn-1 fs-sm">Tournament start</span>      </div>

            </div>    </div>

          </div>  </div>

        </a></template>

        <a href="#">

          <div class="card-item d-flex align-items-center gap-4"><script setup lang="ts">

            <div class="card-info">import { ref, reactive } from 'vue';

              <span class="card-title d-block tcn-1"> Daily Bonus </span>import { useAuthStore } from '~/stores/auth';

              <span class="card-text d-block tcn-1 fs-sm">Tournament start</span>import { useAnimation } from '~/composables/useAnimation';

            </div>

          </div>// Animation

        </a>const { initAnimations, cleanupAnimations } = useAnimation();

        <a href="#">

          <div class="card-item d-flex align-items-center gap-4">// Store

            <div class="card-img-area">const authStore = useAuthStore();

              <img class="w-100 rounded-circle" src="https://gameplex-final.vercel.app/gameplex-v1/assets/img/avatar1.png" alt="profile">const router = useRouter();

            </div>

            <div class="card-info">// Form data

              <span class="card-title d-block tcn-1"> Cristofer Dorwart</span>const formData = reactive({

              <span class="card-text d-block tcn-1 fs-sm">Winners The Last Game</span>  email: '',

            </div>  password: '',

          </div>  rememberMe: false

        </a>});

        <a href="#">

          <div class="card-item d-flex align-items-center gap-4">// UI state

            <div class="card-img-area">const isLoading = ref(false);

              <img class="w-100 rounded-circle" src="https://gameplex-final.vercel.app/gameplex-v1/assets/img/avatar2.png" alt="profile">const showPassword = ref(false);

            </div>const errors = reactive({

            <div class="card-info">  email: '',

              <span class="card-title d-block tcn-1"> Piter Maio </span>  password: ''

              <span class="card-text d-block tcn-1 fs-sm">Accept your challenge</span>});

            </div>

          </div>// Login handler

        </a>const handleLogin = async () => {

        <a href="#">  // Reset errors

          <div class="card-item d-flex align-items-center gap-4">  errors.email = '';

            <div class="card-info">  errors.password = '';

              <span class="card-title d-block tcn-1"> Copa Punto Gamer </span>  

              <span class="card-text d-block tcn-1 fs-sm">Tournament start</span>  // Validate form

            </div>  let isValid = true;

          </div>  

        </a>  if (!formData.email) {

        <a href="#">    errors.email = 'Email is required';

          <div class="card-item d-flex align-items-center gap-4">    isValid = false;

            <div class="card-info">  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {

              <span class="card-title d-block tcn-1"> Daily Bonus </span>    errors.email = 'Please enter a valid email address';

              <span class="card-text d-block tcn-1 fs-sm">Tournament start</span>    isValid = false;

            </div>  }

          </div>  

        </a>  if (!formData.password) {

      </div>    errors.password = 'Password is required';

    </div>    isValid = false;

    <!-- notification area end -->  } else if (formData.password.length < 6) {

    errors.password = 'Password must be at least 6 characters';

    <!-- connect your Wallet section start -->    isValid = false;

    <div class="connect-wallet-section position-fixed top-0 start-0 w-100 vh-100" :class="{ 'd-none': !showWallet }">  }

      <div class="connect-wallet-overlay position-absolute top-0 start-0 w-100 h-100" @click="showWallet = false" />  

      <div class="vh-100 wallet-wrapper d-center">  if (!isValid) return;

        <div class="wallet-area pt-lg-8 pt-sm-6 pt-4 pb-lg-20 pb-sm-10 pb-6 px-lg-15 px-sm-8 px-3 bgn-4 rounded-5">  

          <div class="mb-lg-7 mb-sm-5 mb-3 d-flex justify-content-end">  try {

            <i class="ti ti-circle-x display-four fw-normal pointer wallet-close-btn" @click="showWallet = false" />    isLoading.value = true;

          </div>    

          <h3 class="tcn-1 cursor-scale growDown title-anim mb-lg-20 mb-sm-10 mb-6">    // Call login action from auth store

            Connect Your Wallet    await authStore.login({

          </h3>      email: formData.email,

          <div class="wallet-option pb-20">      password: formData.password,

            <ul class="d-grid gap-sm-8 gap-4">      rememberMe: formData.rememberMe

              <li class="wallet-item p-sm-6 p-2 bgn-3 rounded-4">    });

                <a href="#" class="d-between">    

                  <span>Connect with Metamask</span>    // Redirect to home page after successful login

                  <div class="wallet-item-thumb">    router.push('/');

                    <img class="w-100" src="https://gameplex-final.vercel.app/gameplex-v1/assets/img/metamask.png" alt="metamask">  } catch (error: any) {

                  </div>    if (error.message.includes('email')) {

                </a>      errors.email = error.message;

              </li>    } else if (error.message.includes('password')) {

              <li class="wallet-item p-sm-6 p-2 bgn-3 rounded-4">      errors.password = error.message;

                <a href="#" class="d-between">    } else {

                  <span>Connect with Wallet Connect </span>      // Show general error using toast or alert

                  <div class="wallet-item-thumb">      alert(error.message || 'Login failed. Please try again.');

                    <img class="w-100" src="https://gameplex-final.vercel.app/gameplex-v1/assets/img/walletconnect.png" alt="wallet connect">    }

                  </div>  } finally {

                </a>    isLoading.value = false;

              </li>  }

            </ul>};

          </div>

        </div>// Social login handler

      </div>const socialLogin = (provider: string) => {

    </div>  try {

    <!-- connect your Wallet section end -->    isLoading.value = true;

    

    <!-- user account details popup start -->    // In a real app, would integrate with OAuth providers

    <div class="user-account-popup p-4" :class="{ 'd-none': !showProfile }">    console.log(`Logging in with ${provider}`);

      <div class="account-items d-grid gap-1" data-tilt>    

        <div class="user-level-area p-3">    // Simulate API call

          <div class="user-info d-between">    setTimeout(() => {

            <span class="user-name fs-five">David Malan</span>      authStore.setToken('fake-social-token');

            <div class="badge d-flex align-items-center">      authStore.setUser({

              <i class="ti ti-medal fs-three fs-normal tcp-2" />        id: '123',

              <i class="ti ti-medal fs-three fs-normal tcp-2" />        username: 'socialgamer',

              <i class="ti ti-medal fs-three fs-normal tcp-2" />        email: 'social@example.com'

            </div>      });

          </div>      authStore.setAuthenticated(true);

          <div class="user-level">      

            <span class="level-title tcn-6">Level</span>      // Redirect to home page

            <div class="level-bar my-1">      router.push('/');

              <div class="level-progress" style="width: 30%;" />      isLoading.value = false;

            </div>    }, 1000);

          </div>  } catch (error) {

        </div>    console.error(`${provider} login failed:`, error);

        <NuxtLink to="/profile" class="account-item">View Profile</NuxtLink>    isLoading.value = false;

        <NuxtLink to="/chat" class="account-item">Message</NuxtLink>    alert(`${provider} login failed. Please try again.`);

        <button class="bttn account-item">Logout</button>  }

      </div>};

    </div>

    <!-- user account details popup end -->// Connect wallet handler

const connectWallet = async () => {

    <!-- sign in section start -->  try {

    <section class="sign-in-section pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10">    isLoading.value = true;

      <div class="container pt-120">    

        <div class="row justify-content-center">    // In a real app, would integrate with MetaMask or other wallet provider

          <div class="col-lg-6">    console.log('Connecting wallet');

            <div class="form-area">    

              <h1 class="tcn-1 text-center cursor-scale growUp mb-10">SIGN IN</h1>    // Call connect wallet action from auth store

              <form @submit.prevent="handleSubmit" class="sign-in-form">    await authStore.connectWallet();

                <div class="single-input mb-6">    

                  <input v-model="form.email" type="email" placeholder="Enter your email" required>    // Redirect to home page

                </div>    router.push('/');

                <div class="single-input mb-6">  } catch (error: any) {

                  <input v-model="form.password" type="password" placeholder="Enter your password" required>    console.error('Wallet connection failed:', error);

                </div>    alert(error.message || 'Wallet connection failed. Please try again.');

                <div class="text-center">  } finally {

                  <button type="submit" class="bttn py-3 px-6 rounded bgp-1">Sign In</button>    isLoading.value = false;

                </div>  }

              </form>};

              <p class="tcn-4 text-center mt-lg-10 mt-6">Don't have an account? <NuxtLink to="/register" class="text-decoration-underline tcp-1">Sign Up</NuxtLink></p>

            </div>// Lifecycle hooks

          </div>onMounted(() => {

        </div>  initAnimations();

      </div>  

    </section>  // Check if user is already logged in

    <!-- sign in section end -->  if (authStore.isAuthenticated) {

  </div>    router.push('/');

</template>  }

});

<script>

export default {onUnmounted(() => {

  name: 'LoginPage',  cleanupAnimations();

  data() {});

    return {</script>

      form: {

        email: '',<style scoped>

        password: ''.auth-page {

      },  min-height: 100vh;

      showWallet: false,  display: flex;

      showProfile: false,  align-items: center;

      showNotifications: false  justify-content: center;

    }  padding: 40px 0;

  },  background-color: #0a0a0a;

  head() {}

    return {

      title: 'Sign In - GamePlex',.auth-container {

      meta: [  width: 100%;

        {  max-width: 1200px;

          hid: 'description',  margin: 0 auto;

          name: 'description',  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

          content: 'Sign in to your GamePlex account to access tournaments, teams, and competitive gaming features.'  border-radius: 15px;

        }  overflow: hidden;

      ]}

    }

  },/* Auth Form Column */

  methods: {.auth-form-col {

    handleSubmit() {  background-color: #121212;

      alert('Login successful!')  padding: 60px 40px;

      this.$router.push('/profile')}

    }

  }.auth-form-wrapper {

}  max-width: 450px;

</script>  margin: 0 auto;

}

<style>

/* Import cloned GamePlex styles */.auth-header {

@import '~/assets/css/gameplex-bootstrap.css';  text-align: center;

@import '~/assets/css/gameplex-style.css';  margin-bottom: 40px;

}

/* Additional utility classes */

.d-none {.auth-logo {

  display: none !important;  display: inline-block;

}  margin-bottom: 30px;

}

.pointer {

  cursor: pointer;.auth-logo img {

}  height: 40px;

}

/* Hide elements by default */

.connect-wallet-section,.auth-title {

.notification-area,  font-size: 32px;

.user-account-popup {  font-weight: 700;

  display: none;  margin-bottom: 10px;

}  background: linear-gradient(90deg, #ff5ea2, #ff9966);

  -webkit-background-clip: text;

.connect-wallet-section:not(.d-none),  -webkit-text-fill-color: transparent;

.notification-area:not(.d-none),}

.user-account-popup:not(.d-none) {

  display: block;.auth-subtitle {

}  color: #ccc;

</style>  font-size: 16px;
}

/* Form Styles */
.auth-form {
  margin-top: 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #ccc;
  font-weight: 500;
}

.password-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  color: #ff5ea2;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.forgot-link:hover {
  text-decoration: underline;
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.input-group input {
  width: 100%;
  padding: 15px 15px 15px 45px;
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  transition: all 0.3s ease;
}

.input-group input:focus {
  border-color: #ff5ea2;
  box-shadow: 0 0 0 2px rgba(255, 94, 162, 0.2);
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

.remember-group {
  display: flex;
  align-items: center;
}

.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  color: #ccc;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 4px;
}

.checkbox-container:hover input ~ .checkmark {
  border-color: #ff5ea2;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #ff5ea2;
  border-color: #ff5ea2;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.btn-block {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.btn-primary {
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
  border: none;
  color: #fff;
}

.btn-outline {
  background: transparent;
  border: 1px solid #ff5ea2;
  color: #ff5ea2;
}

.btn-outline:hover {
  background: rgba(255, 94, 162, 0.1);
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.auth-divider {
  text-align: center;
  margin: 25px 0;
  position: relative;
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #333;
}

.auth-divider span {
  position: relative;
  background-color: #121212;
  padding: 0 15px;
  color: #999;
  font-size: 14px;
}

.social-login {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn i {
  margin-right: 8px;
}

.social-btn.google {
  background-color: #fff;
  color: #333;
}

.social-btn.google:hover {
  background-color: #f1f1f1;
}

.social-btn.facebook {
  background-color: #3b5998;
  color: #fff;
}

.social-btn.facebook:hover {
  background-color: #344e86;
}

.wallet-login {
  margin-bottom: 20px;
}

.auth-footer {
  text-align: center;
  color: #ccc;
  margin-top: 30px;
}

.auth-footer a {
  color: #ff5ea2;
  font-weight: 600;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

/* Auth Banner Column */
.auth-banner-col {
  display: none;
}

.auth-banner {
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/img/auth-banner.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  padding: 40px;
}

.banner-content {
  color: #fff;
  max-width: 450px;
}

.banner-content h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
}

.banner-content > p {
  font-size: 18px;
  margin-bottom: 40px;
  color: #ccc;
}

.banner-features {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
}

.feature-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(90deg, #ff5ea2, #ff9966);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.feature-icon i {
  font-size: 20px;
  color: #fff;
}

.feature-text h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.feature-text p {
  color: #ccc;
  font-size: 14px;
}

/* Responsive */
@media (min-width: 992px) {
  .auth-banner-col {
    display: block;
  }
}

@media (max-width: 991px) {
  .auth-form-col {
    padding: 40px 20px;
  }
}

@media (max-width: 767px) {
  .auth-title {
    font-size: 28px;
  }
  
  .social-login {
    flex-direction: column;
  }
}
</style>