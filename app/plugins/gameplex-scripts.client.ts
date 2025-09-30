// plugins/gameplex-scripts.client.ts
export default defineNuxtPlugin(() => {
  // Load jQuery first
  const jquery = document.createElement("script");
  jquery.src = "/app/assets/js/jquery.min.js";
  jquery.onload = () => {
    // Load GSAP after jQuery
    const gsap = document.createElement("script");
    gsap.src = "/app/assets/js/gsap.min.js";
    document.head.appendChild(gsap);

    gsap.onload = () => {
      // Load ScrollTrigger
      const scrollTrigger = document.createElement("script");
      scrollTrigger.src = "/app/assets/js/ScrollTrigger.min.js";
      document.head.appendChild(scrollTrigger);

      // Load Lenis
      const lenis = document.createElement("script");
      lenis.src = "/app/assets/js/lenis.min.js";
      document.head.appendChild(lenis);

      // Load SplitText
      const splitText = document.createElement("script");
      splitText.src = "/app/assets/js/SplitText.min.js";
      document.head.appendChild(splitText);

      // Load Vanilla Tilt
      const tilt = document.createElement("script");
      tilt.src = "/app/assets/js/vanilla-tilt.js";
      document.head.appendChild(tilt);

      // Load ScrollMagic
      const scrollMagic = document.createElement("script");
      scrollMagic.src = "/app/assets/js/ScrollMagic.min.js";
      document.head.appendChild(scrollMagic);

      // Load animation.gsap
      const animationGsap = document.createElement("script");
      animationGsap.src = "/app/assets/js/animation.gsap.min.js";
      document.head.appendChild(animationGsap);

      // Load GSAP customization
      const gsapCustom = document.createElement("script");
      gsapCustom.src = "/app/assets/js/gsap-customization.js";
      document.head.appendChild(gsapCustom);

      // Load Swiper
      const swiper = document.createElement("script");
      swiper.src = "/app/assets/js/swiper-bundle.min.js";
      document.head.appendChild(swiper);

      // Load Magnific Popup
      const magnific = document.createElement("script");
      magnific.src = "/app/assets/js/magnific-popup.min.js";
      document.head.appendChild(magnific);

      // Load ApexCharts
      const apex = document.createElement("script");
      apex.src = "/app/assets/js/apexcharts.js";
      document.head.appendChild(apex);

      // Load main GamePlex script last
      const main = document.createElement("script");
      main.src = "/app/assets/js/gameplex-main.js";
      document.head.appendChild(main);
    };
  };
  document.head.appendChild(jquery);

  // Load Bootstrap JS independently
  const bootstrap = document.createElement("script");
  bootstrap.src = "/app/assets/js/bootstrap.bundle.min.js";
  document.head.appendChild(bootstrap);
});
