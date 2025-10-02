<template>
  <div>
    <!-- Profile banner section start -->
    <section
      class="profile-banner-section pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10"
    >
      <div class="container position-relative">
        <div class="row">
          <div class="col-12 mb-lg-0 mb-10">
            <div class="parallax-banner-area parallax-container">
              <div
                class="change-banner-btn position-absolute py-1 px-2 rounded bgn-4 top-0 end-0 mt-sm-10 mt-15 me-10 z-2"
              >
                <i class="ti ti-camera fs-2xl" />
              </div>
              <div class="parallax-img profile-banner position-relative">
                <img
                  class="w-100 h-100 tbi rounded-5"
                  src="/assets/img/team-banner.png"
                  alt="profile banner"
                />
                <div
                  class="user-profile d-between position-absolute z-1 w-100 px-xxl-15 px-md-10 px-sm-6"
                >
                  <div class="d-flex align-items-center gap-sm-6 gap-3">
                    <div class="profile-thumb">
                      <img
                        class="w-100 rounded-circle"
                        src="/assets/img/avatar1.png"
                        alt="user profile"
                      />
                    </div>
                    <div class="user-details mb-3">
                      <div class="d-flex align-items-center gap-3">
                        <h3 class="user-name">{{ profileData.name }}</h3>
                        <div class="edit-btn">
                          <i class="ti ti-edit-circle fs-2xl" />
                        </div>
                      </div>
                      <ul
                        class="user-social d-flex align-items-center gap-sm-3 gap-1"
                      >
                        <li class="box-style">
                          <a href="#"
                            ><i class="ti ti-brand-facebook fs-2xl"
                          /></a>
                        </li>
                        <li class="box-style">
                          <a href="#"
                            ><i class="ti ti-brand-twitter fs-2xl"
                          /></a>
                        </li>
                        <li class="box-style">
                          <a href="#"
                            ><i class="ti ti-brand-instagram fs-2xl"
                          /></a>
                        </li>
                        <li class="box-style">
                          <a href="#"
                            ><i class="ti ti-brand-discord fs-2xl"
                          /></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Profile banner section end -->

    <!-- User earning section start -->
    <section class="user-earning-section pb-120">
      <div class="container">
        <div class="row g-6">
          <div class="col-lg-4">
            <div class="user-earning-area py-8 px-4 bgn-4 rounded">
              <div class="d-between mb-8">
                <h5 class="tcn-1">Your Earnings</h5>
                <button class="claim-btn tcn-1" @click="claimEarnings">
                  Claim
                </button>
              </div>
              <span class="tcn-1 d-block mb-2">Your Balance</span>
              <span class="tcn-1 fs-three">${{ profileData.balance }}</span>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="user-earning-chart py-8 px-4 bgn-4 rounded">
              <div id="earning-chart" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- User earning section end -->

    <!-- Gaming accounts section start -->
    <section class="gaming-accounts-section pb-120">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2
              class="display-three tcn-1 cursor-scale growUp title-anim mb-lg-15 mb-sm-10 mb-6"
            >
              Gaming Accounts
            </h2>
          </div>
        </div>
        <div class="row g-6">
          <div
            v-for="account in gamingAccounts"
            :key="account.id"
            class="col-lg-4 col-md-6"
          >
            <div
              class="gaming-account-card p-xl-8 p-sm-4 p-2 bgn-4 rounded card-tilt"
            >
              <div class="d-between mb-10">
                <div class="gaming-account-thumb">
                  <img class="w-100" :src="account.logo" :alt="account.name" />
                </div>
                <span
                  :class="account.connected ? 'bgp-1' : 'bgn-3'"
                  class="py-2 px-3 rounded-pill tcn-1"
                >
                  {{ account.connected ? "Connected" : "Not Connected" }}
                </span>
              </div>
              <span class="tcn-1 fs-four title mb-3 title-anim">{{
                account.name
              }}</span>
              <a href="#" class="tcn-1 d-block mb-8 text-decoration-underline">
                How to setup account <i class="ti ti-external-link" />
              </a>
              <div class="d-flex align-items-center gap-5 mb-15">
                <div class="single-input py-3">
                  <input
                    v-model="account.username"
                    type="text"
                    placeholder="User1234"
                  />
                </div>
                <i class="ti ti-edit fs-2xl edit-id" />
              </div>
              <div class="text-center">
                <button
                  class="claim-btn tcn-1"
                  @click="toggleConnection(account)"
                >
                  {{ account.connected ? "Disconnect" : "Connect" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Gaming accounts section end -->

    <!-- Profile stats section start -->
    <section class="profile-stats-section pb-120">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2
              class="display-three tcn-1 cursor-scale growUp title-anim mb-lg-15 mb-sm-10 mb-6"
            >
              Your Statistics
            </h2>
          </div>
        </div>
        <div class="row g-6">
          <div class="col-lg-3 col-md-6">
            <div class="stats-card p-6 bgn-4 rounded text-center">
              <div class="stats-icon mb-4">
                <i class="ti ti-trophy fs-1 tcp-1" />
              </div>
              <h4 class="tcn-1 mb-2">{{ profileData.stats.wins }}</h4>
              <span class="tcn-6">Total Wins</span>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="stats-card p-6 bgn-4 rounded text-center">
              <div class="stats-icon mb-4">
                <i class="ti ti-target fs-1 tcp-1" />
              </div>
              <h4 class="tcn-1 mb-2">{{ profileData.stats.gamesPlayed }}</h4>
              <span class="tcn-6">Games Played</span>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="stats-card p-6 bgn-4 rounded text-center">
              <div class="stats-icon mb-4">
                <i class="ti ti-medal fs-1 tcp-1" />
              </div>
              <h4 class="tcn-1 mb-2">{{ profileData.stats.tournaments }}</h4>
              <span class="tcn-6">Tournaments</span>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="stats-card p-6 bgn-4 rounded text-center">
              <div class="stats-icon mb-4">
                <i class="ti ti-star fs-1 tcp-1" />
              </div>
              <h4 class="tcn-1 mb-2">{{ profileData.stats.ranking }}</h4>
              <span class="tcn-6">Global Ranking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Profile stats section end -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Profile data
const profileData = ref({
  name: "Mohammad Rony",
  balance: "150.00",
  stats: {
    wins: 127,
    gamesPlayed: 342,
    tournaments: 23,
    ranking: "#47",
  },
});

// Gaming accounts data
const gamingAccounts = ref([
  {
    id: 1,
    name: "Axie Origin",
    logo: "/assets/img/game-x1.png",
    connected: false,
    username: "User1234",
  },
  {
    id: 2,
    name: "Rocket League",
    logo: "/assets/img/game-x2.png",
    connected: true,
    username: "RocketMaster99",
  },
  {
    id: 3,
    name: "Valorant",
    logo: "/assets/img/game-x3.png",
    connected: false,
    username: "User1234",
  },
  {
    id: 4,
    name: "Battlegrounds",
    logo: "/assets/img/game-x4.png",
    connected: false,
    username: "User1234",
  },
  {
    id: 5,
    name: "Hollow Knight",
    logo: "/assets/img/game-x5.png",
    connected: true,
    username: "KnightSlayer",
  },
  {
    id: 6,
    name: "Rocket League",
    logo: "/assets/img/game-x6.png",
    connected: false,
    username: "User1234",
  },
  {
    id: 7,
    name: "Apex Legends",
    logo: "/assets/img/game-x7.png",
    connected: false,
    username: "User1234",
  },
]);

// Functions
const claimEarnings = () => {
  console.log("Claiming earnings...");
  // Add claim logic here
};

const toggleConnection = (account: {
  id: number;
  name: string;
  logo: string;
  connected: boolean;
  username: string;
}) => {
  account.connected = !account.connected;
  console.log(`${account.name} connection toggled: ${account.connected}`);
};

// SEO
useHead({
  title: "Profile - GamePlex",
  meta: [
    {
      name: "description",
      content:
        "GamePlex Profile - View your gaming stats, earnings and connected accounts",
    },
  ],
});
</script>
