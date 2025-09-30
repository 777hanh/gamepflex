import { onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';

// Đăng ký plugin ScrollTrigger cho GSAP
if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export const useAnimation = () => {
  // Khởi tạo AOS
  const initAOS = () => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      delay: 100
    });
  };

  // Khởi tạo GSAP animations
  const initGSAP = () => {
    // Cấu hình GSAP
    gsap.config({
      nullTargetWarn: false
    });

    // Animation mặc định cho các phần tử khi trang được tải
    gsap.fromTo('.fade-in', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
    );

    // Hero section animation
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    
    gsap.fromTo('.hero-text', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out' }
    );
    
    gsap.fromTo('.hero-btn', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'back.out' }
    );

    // Scroll animations
    ScrollTrigger.batch('.scroll-fade-up', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out'
        });
      },
      start: 'top 85%',
    });

    // Card hover effects
    const cards = document.querySelectorAll('.game-card, .tournament-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          duration: 0.3
        });
      });
    });
  };

  // Refresh animations khi component được mount
  const refreshAnimations = () => {
    if (process.client) {
      AOS.refresh();
      ScrollTrigger.refresh();
    }
  };

  // Cleanup khi component unmount
  const cleanupAnimations = () => {
    if (process.client) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  };

  // Các animation tùy chỉnh
  const animateCounter = (element: string, end: number, duration: number = 2) => {
    const el = document.querySelector(element);
    if (!el) return;
    
    let startValue = 0;
    const increment = end / (duration * 60); // 60fps
    
    const updateCounter = () => {
      startValue += increment;
      if (startValue < end) {
        el.textContent = Math.ceil(startValue).toString();
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = end.toString();
      }
    };
    
    updateCounter();
  };

  // Hiệu ứng parallax
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
      
      gsap.to(element, {
        y: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: element.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  };

  // Khởi tạo tất cả animations khi component được mount
  onMounted(() => {
    if (process.client) {
      initAOS();
      initGSAP();
      initParallax();
    }
  });

  // Cleanup khi component unmount
  onUnmounted(() => {
    if (process.client) {
      cleanupAnimations();
    }
  });

  return {
    initAOS,
    initGSAP,
    refreshAnimations,
    cleanupAnimations,
    animateCounter,
    initParallax
  };
};