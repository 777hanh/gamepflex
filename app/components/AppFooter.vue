<template>
  <footer class="footer-area">
    <div class="container">
      <div class="footer-top">
        <div class="row">
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="footer-widget">
              <div class="footer-logo">
                <a href="index.html"><img src="/assets/img/logo/logo.png" alt="Logo"></a>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eligendi. Repellendus voluptates a, beatae, hic eum.</p>
              <div class="footer-social">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-discord"></i></a>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="footer-widget">
              <h4 class="fw-title">Useful Links</h4>
              <div class="fw-link">
                <ul>
                  <li><NuxtLink to="/about">About Us</NuxtLink></li>
                  <li><NuxtLink to="/tournaments">Our Tournament</NuxtLink></li>
                  <li><NuxtLink to="/teams">Team Member</NuxtLink></li>
                  <li><NuxtLink to="/games">Latest Games</NuxtLink></li>
                  <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="footer-widget">
              <h4 class="fw-title">Other Links</h4>
              <div class="fw-link">
                <ul>
                  <li><NuxtLink to="/faq">Our FAQ</NuxtLink></li>
                  <li><NuxtLink to="/terms">Terms & Conditions</NuxtLink></li>
                  <li><NuxtLink to="/privacy">Privacy Policy</NuxtLink></li>
                  <li><NuxtLink to="/games">Game List</NuxtLink></li>
                  <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="footer-widget">
              <h4 class="fw-title">Our Newsletter</h4>
              <div class="footer-newsletter">
                <p>Sign up to get updated news about our tournaments and games</p>
                <form action="#" class="newsletter-form">
                  <input type="email" placeholder="Your Email Address">
                  <button type="submit" class="btn">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="copyright-text">
              <p>Copyright © {{ new Date().getFullYear() }} GamePlex. All Rights Reserved.</p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="footer-menu">
              <ul>
                <li><NuxtLink to="/terms">Terms & Conditions</NuxtLink></li>
                <li><NuxtLink to="/privacy">Privacy Policy</NuxtLink></li>
                <li><NuxtLink to="/help">Help</NuxtLink></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component logic
</script>

<style scoped>
.footer-area {
  background-color: #0f0f0f;
  color: #fff;
  padding: 80px 0 30px;
}

.footer-top {
  margin-bottom: 50px;
}

.footer-widget {
  margin-bottom: 30px;
}

.footer-logo {
  margin-bottom: 20px;
}

.footer-logo img {
  max-width: 180px;
}

.footer-social {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.footer-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  transition: all 0.3s ease;
}

.footer-social a:hover {
  background: #ff5ea2;
  color: #fff;
}

.fw-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #fff;
}

.fw-link ul li {
  margin-bottom: 12px;
}

.fw-link ul li a {
  color: #aeaeae;
  font-size: 15px;
  transition: all 0.3s ease;
}

.fw-link ul li a:hover {
  color: #ff5ea2;
  padding-left: 5px;
}

.footer-newsletter p {
  margin-bottom: 20px;
  color: #aeaeae;
}

.newsletter-form {
  position: relative;
}

.newsletter-form input {
  width: 100%;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 30px;
  color: #fff;
}

.newsletter-form button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 20px;
  background: linear-gradient(to right, #ff5ea2, #f072b6);
  border: none;
  border-radius: 30px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
}

.footer-bottom {
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.copyright-text p {
  margin: 0;
  color: #aeaeae;
}

.footer-menu ul {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}

.footer-menu ul li a {
  color: #aeaeae;
  transition: all 0.3s ease;
}

.footer-menu ul li a:hover {
  color: #ff5ea2;
}

@media (max-width: 991px) {
  .footer-menu ul {
    justify-content: flex-start;
    margin-top: 15px;
  }
}
</style>