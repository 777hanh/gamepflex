// GamePlex JavaScript Effects

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Magnetic Effect
  function initMagneticEffect() {
    const magneticElements = document.querySelectorAll(".magnetic");

    magneticElements.forEach((element) => {
      element.addEventListener("mousemove", function (e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = x * 0.15;
        const moveY = y * 0.15;

        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      });

      element.addEventListener("mouseleave", function () {
        element.style.transform = "translate(0px, 0px) scale(1)";
      });
    });
  }

  // Card Tilt Effect
  function initCardTilt() {
    const cards = document.querySelectorAll(".card-tilt");

    cards.forEach((card) => {
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    });
  }

  // Parallax Mouse Effect
  function initParallaxMouse() {
    document.addEventListener("mousemove", function (e) {
      const parallaxElements = document.querySelectorAll(".parallax-mouse");

      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.1;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    });
  }

  // Smooth Scroll Animation
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in, .slide-up").forEach((element) => {
      observer.observe(element);
    });
  }

  // Counter Animation
  function initCounterAnimation() {
    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
          }, 16);

          counterObserver.unobserve(counter);
        }
      });
    });

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  // Typing Animation
  function initTypingAnimation() {
    const typingElements = document.querySelectorAll(".typing-text");

    typingElements.forEach((element) => {
      const text = element.textContent;
      element.textContent = "";
      element.style.borderRight = "2px solid #00d4ff";

      let i = 0;
      const typeTimer = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeTimer);
          // Blinking cursor effect
          setInterval(() => {
            element.style.borderRight =
              element.style.borderRight === "none"
                ? "2px solid #00d4ff"
                : "none";
          }, 500);
        }
      }, 100);
    });
  }

  // Navbar Scroll Effect
  function initNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    });
  }

  // Particle Background
  function initParticleBackground() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // Button Ripple Effect
  function initButtonRipple() {
    const buttons = document.querySelectorAll(".btn-ripple");

    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  // Image Hover Effects
  function initImageHoverEffects() {
    const images = document.querySelectorAll(".hover-zoom");

    images.forEach((image) => {
      image.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1)";
        this.style.transition = "transform 0.3s ease";
      });

      image.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
      });
    });
  }

  // Initialize all effects
  initMagneticEffect();
  initCardTilt();
  initParallaxMouse();
  initScrollAnimations();
  initCounterAnimation();
  initTypingAnimation();
  initNavbarScroll();
  initParticleBackground();
  initButtonRipple();
  initImageHoverEffects();

  // Add ripple animation CSS
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
});

// Smooth scrolling for anchor links
document.addEventListener("click", function (e) {
  if (
    e.target.tagName === "A" &&
    e.target.getAttribute("href").startsWith("#")
  ) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});
