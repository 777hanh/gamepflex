<template>
  <div>
    <!-- Tournament details banner section start -->
    <div
      class="tournament-details pb-10 pt-120 mt-lg-0 mt-sm-15 mt-10 overflow-hidden"
    >
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="d-flex align-items-center gap-4 mb-4">
              <button class="back-btn" @click="goBack">
                <i class="ti ti-arrow-narrow-left fs-2xl" />
              </button>
              <h3 class="tcn-1 cursor-scale growDown title-anim">
                {{ tournament.title }}
              </h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div
              class="parallax-banner-area parallax-container position-relative rounded-5 overflow-hidden"
            >
              <img
                class="w-100 h-100 parallax-img"
                :src="tournament.banner"
                :alt="tournament.title"
              />
              <!-- running tournament content here -->
              <div
                class="running-tournament d-flex flex-lg-row flex-column position-absolute top-50 start-50 translate-middle w-100"
              >
                <div class="running-tournament-thumb w-100">
                  <img
                    class="w-100 h-100"
                    :src="tournament.gameImage"
                    :alt="tournament.title"
                  />
                </div>
                <div
                  class="running-tour-info py-sm-6 py-4 px-xl-15 px-lg-10 px-sm-6 px-2 w-100"
                >
                  <h3 class="tcn-1 mb-lg-6 mb-4">{{ tournament.subtitle }}</h3>
                  <span class="tcn-1 d-block fs-five fw-semibold mb-4"
                    >Tournament ending in</span
                  >
                  <div
                    class="ending-date d-flex align-items-center gap-sm-5 gap-2 mb-lg-8 mb-6"
                  >
                    <div class="date-box-area">
                      <div class="date-box mb-4">
                        <h3 class="tcn-1 title-anim cursor-scale growDown">
                          {{ countdown.days }}
                        </h3>
                      </div>
                      <span class="tcn-1 text-center d-block">Days</span>
                    </div>
                    <div class="date-box-area">
                      <div class="date-box mb-4">
                        <h3 class="tcn-1 title-anim cursor-scale growDown">
                          {{ countdown.hours }}
                        </h3>
                      </div>
                      <span class="tcn-1 text-center d-block">Hours</span>
                    </div>
                    <div class="date-box-area">
                      <div class="date-box mb-4">
                        <h3 class="tcn-1 title-anim cursor-scale growDown">
                          {{ countdown.minutes }}
                        </h3>
                      </div>
                      <span class="tcn-1 text-center d-block">Minutes</span>
                    </div>
                    <div class="date-box-area">
                      <div class="date-box mb-4">
                        <h3 class="tcn-1 title-anim cursor-scale growDown">
                          {{ countdown.seconds }}
                        </h3>
                      </div>
                      <span class="tcn-1 text-center d-block">Seconds</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center gap-md-6 gap-3">
                    <NuxtLink
                      to="/tournaments"
                      class="btn-half-border position-relative d-inline-block py-2 bgp-1 px-sm-6 px-4 rounded-pill"
                    >
                      View More
                    </NuxtLink>
                    <div
                      class="d-flex align-items-center flex-wrap gap-md-6 gap-3 w-50"
                    >
                      <div class="end-date">
                        <span class="tcn-6">{{ tournament.endDate }}</span>
                      </div>
                      <div class="players">
                        <i class="ti ti-users-group tcn-1" />
                        <span class="tcn-6"
                          >{{ tournament.currentPlayers }}/{{
                            tournament.maxPlayers
                          }}
                          Players</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Tournament details banner section end -->

    <!-- Tournament details prize section start -->
    <section class="tournament-prize-section mb-10">
      <div class="container bgn-4 p-lg-10 p-sm-6 p-4">
        <div class="d-flex align-items-center gap-xxl-20 gap-6 flex-wrap">
          <div class="tour-prize-card">
            <div class="icon-area mb-6">
              <i class="ti ti-coin-bitcoin display-five fw-normal tcp-2" />
            </div>
            <h4 class="tcn-1 cursor-scale growDown title-anim mb-1">
              Prize Pool
            </h4>
            <p class="tcn-1 title-anim">${{ tournament.prizePool }}</p>
          </div>
          <div class="tour-prize-card">
            <div class="icon-area mb-6">
              <i class="ti ti-wallet display-five fw-normal tcp-2" />
            </div>
            <h4 class="tcn-1 cursor-scale growDown title-anim mb-1">
              Entry Fee
            </h4>
            <p class="tcn-1 title-anim">${{ tournament.entryFee }}</p>
          </div>
          <div class="tour-prize-card">
            <div class="icon-area mb-6">
              <i class="ti ti-users-group display-five fw-normal tcp-2" />
            </div>
            <h4 class="tcn-1 cursor-scale growDown title-anim mb-1">Mode</h4>
            <p class="tcn-1 title-anim">{{ tournament.mode }}</p>
          </div>
          <div class="tour-prize-card">
            <div class="icon-area mb-6">
              <i class="ti ti-sitemap display-five fw-normal tcp-2" />
            </div>
            <h4 class="tcn-1 cursor-scale growDown title-anim mb-1">Format</h4>
            <p class="tcn-1 title-anim">{{ tournament.format }}</p>
          </div>
          <div class="tour-prize-card">
            <div class="icon-area mb-6">
              <i class="ti ti-trophy display-five fw-normal tcp-2" />
            </div>
            <h4 class="tcn-1 cursor-scale growDown title-anim mb-1">Type</h4>
            <p class="tcn-1 title-anim">{{ tournament.type }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Tournament details prize section end -->

    <!-- Tournament registration section start -->
    <section class="tour-reg-process-section mb-10">
      <div class="container bgn-4 p-lg-10 p-sm-6 px-4 py-8">
        <div class="row">
          <div class="col-12">
            <h4 class="tcn-1 mb-8">Tournament Registration</h4>
            <div class="text-center">
              <button
                v-if="!isRegistered"
                class="btn-half-border position-relative d-inline-block py-3 px-8 bgp-1 rounded-pill"
                @click="registerForTournament"
              >
                Register Now
              </button>
              <button
                v-else
                class="btn-half-border position-relative d-inline-block py-3 px-8 bgn-3 rounded-pill"
                disabled
              >
                Already Registered
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Tournament registration section end -->

    <!-- Tournament participants section start -->
    <section class="tournament-participants-section">
      <div class="container bgn-4 p-lg-10 p-sm-6 p-4">
        <div class="row">
          <div class="col-12">
            <h4 class="tcn-1 mb-8">
              Participants ({{ tournament.currentPlayers }})
            </h4>
            <div class="row g-4">
              <div
                v-for="participant in participants"
                :key="participant.id"
                class="col-lg-3 col-md-4 col-sm-6"
              >
                <div class="participant-card p-4 bgn-3 rounded">
                  <div class="d-flex align-items-center gap-3">
                    <img
                      class="rounded-circle"
                      :src="participant.avatar"
                      :alt="participant.name"
                      style="width: 50px; height: 50px"
                    />
                    <div>
                      <h6 class="tcn-1 mb-1">{{ participant.name }}</h6>
                      <span class="tcn-6 fs-sm">{{ participant.rank }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Tournament participants section end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const _route = useRoute();
const router = useRouter();

// Tournament data
const tournament = ref({
  title: "TDL SEA Pro Series 11",
  subtitle: "Torneo Individual",
  banner: "/assets/img/tour-details-banner.png",
  gameImage: "/assets/img/running-game.png",
  endDate: "OCT 07, 5:10 AM",
  currentPlayers: 115,
  maxPlayers: 115,
  prizePool: "50.00",
  entryFee: "50.00",
  mode: "Solo",
  format: "Single Elimination",
  type: "Ranked",
  endTime: new Date("2024-12-31T23:59:59").getTime(),
});

// Countdown state
const countdown = ref({
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
});

// Registration state
const isRegistered = ref(false);

// Participants data
const participants = ref([
  {
    id: 1,
    name: "Player One",
    avatar: "/assets/img/avatar1.png",
    rank: "Diamond",
  },
  {
    id: 2,
    name: "Player Two",
    avatar: "/assets/img/avatar2.png",
    rank: "Platinum",
  },
  {
    id: 3,
    name: "Player Three",
    avatar: "/assets/img/avatar3.png",
    rank: "Gold",
  },
  {
    id: 4,
    name: "Player Four",
    avatar: "/assets/img/avatar1.png",
    rank: "Silver",
  },
]);

let countdownInterval: NodeJS.Timeout;

// Functions
const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = tournament.value.endTime - now;

  if (distance < 0) {
    countdown.value = { days: "00", hours: "00", minutes: "00", seconds: "00" };
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.value = {
    days: days.toString().padStart(2, "0"),
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

const registerForTournament = () => {
  isRegistered.value = true;
  tournament.value.currentPlayers += 1;
  console.log("Registered for tournament");
};

const goBack = () => {
  router.back();
};

// Lifecycle
onMounted(() => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

// SEO
useHead({
  title: `${tournament.value.title} - GamePlex`,
  meta: [
    {
      name: "description",
      content: `Join ${tournament.value.title} tournament with $${tournament.value.prizePool} prize pool`,
    },
  ],
});
</script>
