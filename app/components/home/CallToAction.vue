<template>
  <section class="cta-section text-center position-relative overflow-hidden">
    <div class="cta-bg" />
    <div class="container position-relative" style="z-index: 2">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="display-5 fw-bold text-white mb-4">
            Sẵn sàng thống trị đấu trường?
          </h2>
          <p class="lead text-muted mb-5">
            Tham gia cộng đồng GamePlex và bắt đầu hành trình vươn tới đẳng cấp
            chuyên nghiệp ngay hôm nay.
          </p>
          <div class="d-flex flex-wrap justify-content-center gap-3">
            <NuxtLink
              to="/signup"
              class="btn btn-primary btn-lg px-4 d-flex align-items-center gap-2 magnetic"
            >
              <i class="fas fa-user-plus" />
              Tạo tài khoản
            </NuxtLink>
            <NuxtLink
              to="/tournaments"
              class="btn btn-outline-light btn-lg px-4 d-flex align-items-center gap-2 magnetic"
            >
              <i class="fas fa-trophy" />
              Xem giải đấu
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.cta-section {
  padding: 110px 0;
  background: linear-gradient(145deg, #111826 0%, #0c1016 55%, #080a0d 100%);
}
.cta-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 40%,
    rgba(0, 200, 255, 0.12),
    transparent 70%
  );
  opacity: 0.9;
}
</style>
