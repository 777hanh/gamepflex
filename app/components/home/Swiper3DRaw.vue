<template>
    <!-- 3D swiper section start -->
    <section class="swiper-3d-section position-relative z-1" id="swiper-3d">
        <div class="container">
            <div class="swiper swiper-3d-container">
                <div class="swiper-wrapper">
                    <!-- Slides (static clone from original index_source.html) -->
                    <div
                        v-for="(slide, i) in slides"
                        :key="i"
                        class="swiper-slide"
                    >
                        <div class="card-3d d-grid justify-content-center p-3">
                            <div class="img-area position-relative mb-8 w-100">
                                <span
                                    class="card-date position-absolute tcn-1 d-flex align-items-center fs-sm end-0 top-0 me-5 mt-4 gap-1 px-3 py-2"
                                >
                                    <i class="ti ti-calendar-due"></i>
                                    15.02.2022
                                </span>
                                <img
                                    class="w-100"
                                    :src="slide.img"
                                    alt="game"
                                />
                                <span
                                    class="card-status position-absolute tcn-1 fs-sm start-0 px-6 py-2"
                                >
                                    <span class="dot-icon alt-icon ps-3"
                                        >Playing</span
                                    >
                                </span>
                            </div>
                            <h5
                                class="card-title tcn-1 title-anim mb-4 text-center"
                            >
                                {{ slide.title }}
                            </h5>
                            <div class="d-center">
                                <div class="card-info d-center gap-3 px-3 py-1">
                                    <div
                                        class="d-flex align-items-center gap-2"
                                    >
                                        <img
                                            class="w-100"
                                            src="assets/img/bitcoin.png"
                                            alt="bitcoin"
                                        />
                                        <span class="tcn-1 fs-xs">75</span>
                                    </div>
                                    <div class="v-line"></div>
                                    <div
                                        class="d-flex align-items-center gap-2"
                                    >
                                        <img
                                            class="w-100"
                                            src="assets/img/tether.png"
                                            alt="tether"
                                        />
                                        <span class="tcn-1 fs-xs">$49.97</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-btn-area d-center gap-6">
                <div class="swiper-btn swiper-3d-button-prev box-style">
                    <i class="ti ti-chevron-left fs-xl"></i>
                </div>
                <div class="swiper-btn swiper-3d-button-next box-style">
                    <i class="ti ti-chevron-right fs-xl"></i>
                </div>
            </div>
        </div>
    </section>
    <!-- 3D swiper section end -->
</template>

<script setup lang="ts">
    // Static slide list replicating repeated pattern; duplicate sequence to maintain loop density
    const slides = [
        { img: 'assets/img/slide-3d-1.png', title: 'Apex Legends' },
        { img: 'assets/img/slide-3d-2.png', title: 'Super Mario Odyssey' },
        { img: 'assets/img/slide-3d-3.png', title: 'Ghost of Tsushima' },
        { img: 'assets/img/slide-3d-4.png', title: 'Copa Punto Gamer - A' },
        { img: 'assets/img/slide-3d-5.png', title: 'Ghost of Tsushima' },
        { img: 'assets/img/slide-3d-6.png', title: 'Super Mario Odyssey' },
        { img: 'assets/img/slide-3d-7.png', title: 'Apex Legends' },
        // Repeat to mimic original extended list
        { img: 'assets/img/slide-3d-1.png', title: 'Apex Legends' },
        { img: 'assets/img/slide-3d-2.png', title: 'Super Mario Odyssey' },
        { img: 'assets/img/slide-3d-3.png', title: 'Ghost of Tsushima' },
        { img: 'assets/img/slide-3d-4.png', title: 'Copa Punto Gamer - A' },
        { img: 'assets/img/slide-3d-5.png', title: 'Ghost of Tsushima' },
        { img: 'assets/img/slide-3d-6.png', title: 'Super Mario Odyssey' },
        { img: 'assets/img/slide-3d-7.png', title: 'Apex Legends' }
    ];
</script>

<style scoped>
    /* Scoped can stay empty: all styling comes from global CSS/theme */
</style>
