import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";

export default defineNuxtPlugin(() => {
  if (process.client) {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize AOS
    AOS.init({
      duration: 800,
      delay: 0,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
      offset: 120,
    });

    // Global GSAP timeline for page transitions
    const tl = gsap.timeline();

    // Page transition animations
    const pageTransitionIn = () => {
      return gsap.fromTo(
        ".page-transition",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    };

    const pageTransitionOut = () => {
      return gsap.to(".page-transition", {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
      });
    };

    // Card hover animations
    const setupCardAnimations = () => {
      const cards = gsap.utils.toArray(
        ".game-card, .tournament-card, .team-card"
      );

      cards.forEach((card: any) => {
        const cardElement = card as HTMLElement;
        const image = cardElement.querySelector(".card-image");
        const content = cardElement.querySelector(".card-content");

        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });

          if (image) {
            gsap.to(image, {
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out",
            });
          }

          if (content) {
            gsap.to(content, {
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });

          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          }

          if (content) {
            gsap.to(content, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });
    };

    // Button hover animations
    const setupButtonAnimations = () => {
      const buttons = gsap.utils.toArray(".btn-animated");

      buttons.forEach((button: any) => {
        const buttonElement = button as HTMLElement;

        buttonElement.addEventListener("mouseenter", () => {
          gsap.to(buttonElement, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        buttonElement.addEventListener("mouseleave", () => {
          gsap.to(buttonElement, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });
    };

    // Scroll animations
    const setupScrollAnimations = () => {
      // Fade in elements on scroll
      gsap.utils.toArray(".fade-in-up").forEach((element: any) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Stagger animation for lists
      gsap.utils.toArray(".stagger-item").forEach((container: any) => {
        const items = container.querySelectorAll(".stagger-child");

        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Parallax effects
      gsap.utils.toArray(".parallax").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    };

    // Hero section animations
    const setupHeroAnimations = () => {
      const heroTitle = document.querySelector(".hero-title");
      const heroSubtitle = document.querySelector(".hero-subtitle");
      const heroButton = document.querySelector(".hero-button");
      const heroImage = document.querySelector(".hero-image");

      const heroTl = gsap.timeline();

      if (heroTitle) {
        heroTl.fromTo(
          heroTitle,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }

      if (heroSubtitle) {
        heroTl.fromTo(
          heroSubtitle,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      if (heroButton) {
        heroTl.fromTo(
          heroButton,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
      }

      if (heroImage) {
        heroTl.fromTo(
          heroImage,
          {
            opacity: 0,
            x: 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }
    };

    // Setup all animations after DOM is ready
    const initAnimations = () => {
      setupCardAnimations();
      setupButtonAnimations();
      setupScrollAnimations();
      setupHeroAnimations();
    };

    // Provide animation utilities
    return {
      provide: {
        gsap,
        ScrollTrigger,
        AOS,
        animations: {
          pageTransitionIn,
          pageTransitionOut,
          initAnimations,
          setupCardAnimations,
          setupButtonAnimations,
          setupScrollAnimations,
          setupHeroAnimations,
        },
      },
    };
  }
});
