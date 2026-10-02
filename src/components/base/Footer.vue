<template>
  <footer class="relative overflow-hidden bg-gradient-to-br from-[#0a0417] via-[#0f061f] to-[#0a0417] text-gray-200">
    <!-- Ambient background decorations -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/5 blur-[120px]"></div>
      <div class="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cyan-500/10 to-teal-500/5 blur-[120px]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-[140px]"></div>
      <!-- Subtle grid pattern -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%); -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);"
      ></div>
    </div>

    <!-- Main Content -->
    <div class="relative max-w-7xl mx-auto px-6 py-14 lg:py-16">

      <!-- ================= TOP: Brand + Newsletter Strip ================= -->
      <div class="mb-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <!-- Brand block -->
        <div class="flex items-center gap-4">
          <div class="relative flex-shrink-0">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 blur-md opacity-40"></div>
            <img
              src="/ES_ICON.png"
              alt="Educational Society Logo"
              class="relative w-16 h-16 rounded-2xl ring-1 ring-white/10 shadow-lg"
            />
          </div>
          <div>
            <h2 class="text-2xl font-black tracking-tight text-white">
              Educational <span class="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Society</span>
            </h2>
            <p class="text-sm text-gray-400 mt-1">
              Empowering students with quality education and skills for a brighter future.
            </p>
          </div>
        </div>

        <!-- Newsletter / CTA block -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
          <div class="flex-1">
            <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">Stay Updated</p>
            <p class="text-sm text-gray-300 mt-0.5">Get new course alerts & free resources.</p>
          </div>
          <router-link
            to="/signup"
            class="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-[#1b1308] shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/30"
          >
            Join Free
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </router-link>
        </div>
      </div>

      <!-- ================= LINKS GRID ================= -->
      <div class="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-5">

        <!-- Quick Links -->
        <div class="footer-col">
          <h3 class="footer-heading">
            <span class="footer-dot bg-cyan-400"></span>
            Quick Links
          </h3>
          <ul class="space-y-2.5 text-sm">
            <li><router-link class="footer-link" to="/">Home</router-link></li>
            <li><router-link class="footer-link" to="/about">About</router-link></li>
            <li><router-link class="footer-link" to="/courses">Courses</router-link></li>
            <li><router-link class="footer-link" to="/contact">Contact</router-link></li>
            <li><router-link class="footer-link" to="/website-map">Website Map</router-link></li>
            <li><router-link class="footer-link" to="/grade-calculator">Grade Calculator</router-link></li>
            <li><router-link class="footer-link" to="/schedule-maker">Schedule Maker</router-link></li>
          </ul>
        </div>

        <!-- Learn -->
        <div class="footer-col">
          <h3 class="footer-heading">
            <span class="footer-dot bg-emerald-400"></span>
            Learn
          </h3>
          <ul class="space-y-2.5 text-sm">
            <li><a href="/courses" class="footer-link">Courses</a></li>
            <li><a href="/resource/notes" class="footer-link">Notes</a></li>
            <li><a href="/resource/youtube" class="footer-link">Videos</a></li>
            <li><a href="/game-zone" class="footer-link">GameZone</a></li>
            <li><a href="/python-compiler" class="footer-link">Python Compiler</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="footer-col">
          <h3 class="footer-heading">
            <span class="footer-dot bg-purple-400"></span>
            Legal
          </h3>
          <ul class="space-y-2.5 text-sm">
            <li><router-link class="footer-link" to="/terms">Terms & Conditions</router-link></li>
            <li><router-link class="footer-link" to="/privacy">Privacy Policy</router-link></li>
            <li><router-link class="footer-link" to="/refund">Refund Policy</router-link></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-span-2 lg:col-span-2 footer-col">
          <h3 class="footer-heading">
            <span class="footer-dot bg-amber-400"></span>
            Contact Us
          </h3>

          <ul class="space-y-3 text-sm">
            <li class="contact-item">
              <span class="contact-icon">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </span>
              <span class="text-gray-400">Patna, Bihar, India</span>
            </li>
            <li>
              <a href="tel:+919142125921" class="contact-item group">
                <span class="contact-icon group-hover:bg-emerald-500/20 group-hover:text-emerald-400">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </span>
                <span class="text-gray-400 group-hover:text-emerald-400 transition-colors">+91 9142125921</span>
              </a>
            </li>
            <li>
              <a href="mailto:support.educationalsociety@gmail.com" class="contact-item group">
                <span class="contact-icon group-hover:bg-amber-500/20 group-hover:text-amber-400">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <span class="text-gray-400 group-hover:text-amber-400 transition-colors break-all">support.educationalsociety@gmail.com</span>
              </a>
            </li>
          </ul>

          <!-- Social Media -->
          <div class="mt-6">
            <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">Follow Us</p>
            <div class="flex flex-wrap gap-2.5">
              <a
                href="https://www.facebook.com/share/1FzMrozcbm/"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn hover:bg-[#1877f2]"
                aria-label="Facebook"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/growwith_educational_society"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#dc2743]"
                aria-label="Instagram"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/@educational_society_class"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn hover:bg-[#ff0000]"
                aria-label="YouTube"
              >
                <i class="fab fa-youtube"></i>
              </a>
              <a
                href="https://t.me/educational_society"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn hover:bg-[#0088cc]"
                aria-label="Telegram"
              >
                <i class="fab fa-telegram-plane"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= BOTTOM ================= -->
      <div class="relative mt-14 pt-8 border-t border-white/10">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-500 order-2 sm:order-1">
            Made with <span class="text-rose-500 animate-pulse inline-block">❤️</span> by
            <span class="font-semibold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Educational Society</span>
          </p>

          <p class="text-xs text-gray-600 order-1 sm:order-2">
            © {{ currentYear }} Educational Society. All rights reserved.
          </p>
        </div>

        <!-- Back to top floating button -->
        <button
          @click="scrollToTop"
          class="group absolute -top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-[#1b1308] shadow-xl shadow-amber-500/30 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/50"
          aria-label="Back to top"
        >
          <svg class="w-5 h-5 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
          </svg>
          <!-- Pulse ring -->
          <span class="absolute inset-0 rounded-full bg-amber-500/40 animate-ping-slow"></span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
// dynamic copyright year
const currentYear = new Date().getFullYear();

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
/* ================= Footer headings ================= */
.footer-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 1.25rem;
  letter-spacing: 0.02em;
}

.footer-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  box-shadow: 0 0 12px currentColor;
}

/* ================= Footer links ================= */
.footer-link {
  display: inline-block;
  color: #9ca3af;
  transition: color 0.25s ease, transform 0.25s ease;
  position: relative;
}

.footer-link::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  background: #fbbf24;
  opacity: 0;
  transition: opacity 0.25s ease, left 0.25s ease;
}

.footer-link:hover {
  color: #fbbf24;
  transform: translateX(6px);
}

.footer-link:hover::before {
  opacity: 1;
  left: -2px;
}

/* ================= Contact items ================= */
.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.25s ease;
}

.contact-item:hover {
  transform: translateX(3px);
}

.contact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  color: #9ca3af;
  transition: all 0.3s ease;
}

/* ================= Social buttons ================= */
.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #d1d5db;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

.social-btn:hover {
  color: #fff;
  transform: translate3d(0, -4px, 0) scale(1.08);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.5);
  border-color: transparent;
}

/* ================= Animations ================= */
@keyframes ping-slow {
  0% { transform: scale(1); opacity: 0.5; }
  70% { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1.5); opacity: 0; }
}

.animate-ping-slow {
  animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  will-change: transform, opacity;
}

/* ================= Reduced motion ================= */
@media (prefers-reduced-motion: reduce) {
  .footer-link,
  .contact-item,
  .social-btn,
  .animate-ping-slow {
    transition: none !important;
    animation: none !important;
  }
  .footer-link:hover,
  .contact-item:hover,
  .social-btn:hover {
    transform: none !important;
  }
}
</style>