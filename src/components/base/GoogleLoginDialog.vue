<template>
  <Teleport to="body">
    <transition name="login-dialog">
      <div
        v-if="isVisible"
        class="fixed inset-0 z-100 flex items-end justify-center bg-slate-950/40 px-0 backdrop-blur-md sm:items-center sm:px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="google-login-title"
        aria-describedby="google-login-description"
        @click.self="dismissDialog"
        @touchmove.prevent
      >
        <section
          ref="dialogPanel"
          class="dialog-panel relative w-full max-w-md overflow-y-auto rounded-t-3xl border border-white/30 bg-white/95 text-slate-950 shadow-2xl shadow-slate-950/30 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-950/95 dark:text-white sm:rounded-3xl sm:max-w-[480px]"
          :class="{ 'dialog-dragging': isDragging }"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <!-- Drag handle for mobile -->
          <div class="sticky top-0 z-20 flex justify-center bg-white/95 pb-1 pt-2 backdrop-blur-sm dark:bg-slate-950/95 sm:hidden">
            <div class="h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          </div>

          <!-- Close Button -->
          <button
            ref="closeButton"
            type="button"
            class="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm ring-1 ring-slate-200/50 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-900/90 dark:text-slate-300 dark:ring-slate-700/50 dark:hover:bg-slate-800 dark:hover:text-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
            aria-label="Close login dialog"
            @click="dismissDialog"
          >
            <XMarkIcon class="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </button>

          <!-- Gradient Bar -->
          <div class="sticky top-0 z-10 h-1.5 w-full bg-[linear-gradient(90deg,#4285f4_0_25%,#34a853_25%_50%,#fbbc05_50%_75%,#ea4335_75%_100%)] sm:h-2"></div>

          <!-- Content - Scrollable -->
          <div class="px-4 pb-4 pt-2 sm:px-7 sm:pb-7 sm:pt-5">
            <!-- Header -->
            <div class="flex items-start gap-3 pr-8 sm:gap-4 sm:pr-10">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 shadow-inner dark:bg-slate-900 sm:h-14 sm:w-14">
                <span class="google-mark text-xl sm:text-[1.75rem]" aria-hidden="true">ES</span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-300 sm:text-xs">
                  Student access
                </p>
                <h2 
                  id="google-login-title" 
                  class="mt-0.5 text-lg font-black leading-tight text-slate-950 dark:text-white sm:mt-2 sm:text-3xl"
                >
                  Sign in to continue
                </h2>
              </div>
            </div>

            <!-- Description -->
            <p
              id="google-login-description"
              class="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300 sm:mt-4 sm:text-sm sm:leading-6"
            >
              Use your Google account to access courses, notes, live classes, and your dashboard.
            </p>

            <!-- Quick Stats -->
            <div class="mt-3 grid grid-cols-3 gap-1.5 text-center sm:mt-5 sm:gap-2">
              <div
                v-for="item in highlights"
                :key="item"
                class="rounded-xl border border-slate-200 bg-slate-50/80 px-1.5 py-1.5 text-[10px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 sm:rounded-2xl sm:px-2 sm:py-3 sm:text-xs"
              >
                {{ item }}
              </div>
            </div>

            <!-- Google Sign-in -->
            <div class="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/30 sm:mt-6 sm:rounded-3xl sm:p-5">
              <!-- Script Error -->
              <div v-if="scriptError" class="rounded-xl bg-red-50 p-3 text-xs font-medium leading-5 text-red-700 dark:bg-red-950/50 dark:text-red-200 sm:rounded-2xl sm:p-4 sm:text-sm">
                {{ scriptError }}
              </div>

              <!-- Google Button Container -->
              <div
                v-else
                id="landing-google-signin-button"
                ref="googleButton"
                class="google-button-wrapper"
                :class="{ 'is-loading': !scriptLoaded }"
              >
                <div class="google-button-inner">
                  <span v-if="!scriptLoaded" class="text-xs font-semibold text-slate-500 dark:text-slate-400 sm:text-sm">
                    Loading Google sign-in...
                  </span>
                </div>
              </div>

              <!-- Error Message -->
              <p v-if="errorMessage" class="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700 dark:bg-red-950/50 dark:text-red-200 sm:rounded-2xl sm:text-sm">
                {{ errorMessage }}
              </p>

              <!-- Divider -->
              <div class="my-3 flex items-center gap-3 sm:my-5">
                <div class="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                <span class="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:text-xs">or</span>
                <div class="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
              </div>

              <!-- Action Buttons -->
              <div class="grid gap-2 sm:grid-cols-2 sm:gap-3">
                <router-link
                  to="/login"
                  class="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:bg-sky-950/50 sm:min-h-[44px] sm:rounded-2xl sm:px-4 sm:py-2 sm:text-sm"
                  @click="dismissDialog"
                >
                  Continue with email
                </router-link>
                <router-link
                  to="/signup"
                  class="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-slate-950 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-white dark:text-slate-950 dark:hover:bg-sky-100 sm:min-h-[44px] sm:rounded-2xl sm:px-4 sm:py-2 sm:text-sm"
                  @click="dismissDialog"
                >
                  Create account
                </router-link>
              </div>
            </div>

            <!-- Footer -->
            <div class="mt-3 flex flex-col items-center justify-between gap-2 sm:mt-4 sm:flex-row sm:gap-3">
              <p class="text-center text-[10px] leading-4 text-slate-500 dark:text-slate-400 sm:text-left sm:text-xs sm:leading-5">
                Protected by Google OAuth
              </p>

              <button
                type="button"
                class="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white sm:px-4 sm:py-2"
                @click="dismissDialog"
              >
                Maybe later
              </button>
            </div>
          </div>
        </section>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { getAuth } from "../../utils/auth.js";
import { GOOGLE_CLIENT_ID, handleGoogleSignIn } from "../../utils/googleAuth.js";

const DISMISSED_KEY = "landingGoogleLoginDismissed";
const GOOGLE_SCRIPT_ID = "google-identity-services-script";
const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

const route = useRoute();
const router = useRouter();

// State
const getStoredDismissedState = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(DISMISSED_KEY) === "true";
};

const closeButton = ref(null);
const dialogPanel = ref(null);
const dismissed = ref(getStoredDismissedState());
const googleButton = ref(null);
const errorMessage = ref("");
const scriptError = ref("");
const scriptLoaded = ref(false);
const isSubmitting = ref(false);
const isDragging = ref(false);
const dragStartY = ref(0);
const dragCurrentY = ref(0);
const highlights = ["⚡Smart Learning", "🌟 Grow Skills", "📈 Career Growth"];
let previousBodyOverflow = "";
let resizeObserver = null;

// Computed
const isVisible = computed(() => {
  const { token } = getAuth();
  return route.path === "/" && !token && !dismissed.value;
});

const getDashboardRoute = (role) => {
  if (role === "admin") return "/admin/dashboard";
  if (role === "student") return "/student/dashboard";
  return "/";
};

// Methods
const dismissDialog = () => {
  dismissed.value = true;
  sessionStorage.setItem(DISMISSED_KEY, "true");
  document.body.style.overflow = previousBodyOverflow;
  document.body.style.position = "";
  document.body.style.width = "";
};

const loadGoogleScript = () => {
  scriptError.value = "";

  if (window.google?.accounts?.id) {
    scriptLoaded.value = true;
    return;
  }

  const existingScript =
    document.getElementById(GOOGLE_SCRIPT_ID) ||
    document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);

  if (existingScript) {
    if (existingScript.dataset.loaded === "true") {
      scriptLoaded.value = true;
      return;
    }

    existingScript.addEventListener("load", () => {
      existingScript.dataset.loaded = "true";
      scriptLoaded.value = true;
    }, { once: true });

    existingScript.addEventListener("error", () => {
      scriptError.value = "Google sign-in could not load. Please use email login or try again.";
    }, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.id = GOOGLE_SCRIPT_ID;
  script.src = GOOGLE_SCRIPT_SRC;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    script.dataset.loaded = "true";
    scriptLoaded.value = true;
  };
  script.onerror = () => {
    scriptError.value = "Google sign-in could not load. Please use email login or try again.";
  };
  document.head.appendChild(script);
};

const renderGoogleButton = async () => {
  await nextTick();

  if (!isVisible.value || !scriptLoaded.value || !googleButton.value || !window.google?.accounts?.id) {
    return;
  }

  // Clear the container
  googleButton.value.innerHTML = "";
  
  try {
    // Get the inner container for proper sizing
    const container = googleButton.value.querySelector('.google-button-inner') || googleButton.value;
    
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
      cancel_on_tap_outside: false,
      auto_select: false,
      context: "signin",
    });

    // Calculate optimal width - ensure it fits within container
    const containerWidth = googleButton.value.offsetWidth || 320;
    // Leave some padding for the container
    const buttonWidth = Math.min(containerWidth - 16, 400);
    // Ensure minimum width for mobile
    const finalWidth = Math.max(buttonWidth, 280);

    window.google.accounts.id.renderButton(container, {
      theme: "outline",
      size: "large",
      width: finalWidth,
      locale: "en",
      text: "signin_with",
      shape: "pill",
      logo_alignment: "left",
      type: "standard",
    });

    // Apply additional styling to ensure button fits
    const iframe = container.querySelector('iframe');
    if (iframe) {
      iframe.style.width = '100%';
      iframe.style.maxWidth = '100%';
      iframe.style.minWidth = '200px';
      iframe.style.display = 'block';
    }

  } catch (error) {
    console.error("Google render error:", error);
    scriptError.value = "Failed to render Google button. Please refresh and try again.";
  }
};

// Touch handling for mobile drag-to-dismiss
const handleTouchStart = (e) => {
  const touch = e.touches[0];
  dragStartY.value = touch.clientY;
  dragCurrentY.value = touch.clientY;
  isDragging.value = true;
  
  if (dialogPanel.value) {
    dialogPanel.value.style.transition = 'none';
  }
};

const handleTouchMove = (e) => {
  if (!isDragging.value || !dialogPanel.value) return;
  
  const touch = e.touches[0];
  dragCurrentY.value = touch.clientY;
  const deltaY = dragCurrentY.value - dragStartY.value;
  
  if (deltaY > 0) {
    const translateY = Math.min(deltaY * 0.5, 200);
    dialogPanel.value.style.transform = `translateY(${translateY}px)`;
    dialogPanel.value.style.opacity = 1 - (translateY / 400);
  }
};

const handleTouchEnd = (e) => {
  if (!isDragging.value || !dialogPanel.value) return;
  
  isDragging.value = false;
  const deltaY = dragCurrentY.value - dragStartY.value;
  
  if (deltaY > 100) {
    dialogPanel.value.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    dialogPanel.value.style.transform = 'translateY(400px)';
    dialogPanel.value.style.opacity = '0';
    setTimeout(dismissDialog, 300);
  } else {
    dialogPanel.value.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    dialogPanel.value.style.transform = 'translateY(0)';
    dialogPanel.value.style.opacity = '1';
    setTimeout(() => {
      if (dialogPanel.value) {
        dialogPanel.value.style.transition = '';
      }
    }, 300);
  }
};

const handleKeydown = (event) => {
  if (event.key === "Escape" && isVisible.value) {
    dismissDialog();
  }
};

const handleGoogleLogin = async (response) => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const result = await handleGoogleSignIn(response, false);
    dismissed.value = true;
    sessionStorage.removeItem(DISMISSED_KEY);
    router.replace(getDashboardRoute(result.role));
  } catch (error) {
    errorMessage.value = error.message || "Google login failed. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};

// Handle resize for responsive button
const handleResize = () => {
  if (isVisible.value && scriptLoaded.value) {
    renderGoogleButton();
  }
};

// Lifecycle
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", handleResize);
  loadGoogleScript();

  // Setup resize observer for container changes
  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      if (isVisible.value && scriptLoaded.value) {
        renderGoogleButton();
      }
    });
    
    if (googleButton.value) {
      resizeObserver.observe(googleButton.value);
    }
  }

  // Preload for better mobile performance
  if ('prefetch' in document.createElement('link')) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://accounts.google.com';
    document.head.appendChild(link);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("resize", handleResize);
  
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  
  document.body.style.overflow = previousBodyOverflow;
  document.body.style.position = "";
  document.body.style.width = "";
});

// Watchers
watch([isVisible, scriptLoaded], renderGoogleButton, { immediate: true });

watch(isVisible, async (visible) => {
  if (visible) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    
    await nextTick();
    closeButton.value?.focus();
    
    // Small delay to ensure DOM is ready
    setTimeout(renderGoogleButton, 100);
    return;
  }

  document.body.style.overflow = previousBodyOverflow;
  document.body.style.position = "";
  document.body.style.width = "";
  errorMessage.value = "";
}, { immediate: true });
</script>

<style scoped>
/* ===== TRANSITIONS ===== */
.login-dialog-enter-active,
.login-dialog-leave-active {
  transition: opacity 0.25s ease;
}

.login-dialog-enter-from,
.login-dialog-leave-to {
  opacity: 0;
}

.login-dialog-enter-active section,
.login-dialog-leave-active section {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
}

.login-dialog-enter-from section,
.login-dialog-leave-to section {
  opacity: 0;
  transform: translateY(20px) scale(0.97);
}

/* ===== DIALOG PANEL ===== */
.dialog-panel {
  max-height: 92vh;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.dialog-panel.dialog-dragging {
  transition: none !important;
}

/* ===== SCROLLBAR STYLING ===== */
.dialog-panel::-webkit-scrollbar {
  width: 3px;
}

.dialog-panel::-webkit-scrollbar-track {
  background: transparent;
}

.dialog-panel::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.dialog-panel::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark .dialog-panel::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark .dialog-panel::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* ===== GOOGLE MARK ===== */
.google-mark {
  font-weight: 900;
  line-height: 1;
  background: conic-gradient(from -45deg, #4285f4, #34a853, #fbbc05, #ea4335, #4285f4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ===== GOOGLE BUTTON WRAPPER ===== */
.google-button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  border-radius: 0.875rem;
  overflow: hidden;
  position: relative;
}

.google-button-wrapper.is-loading {
  background:
    linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.15), transparent),
    rgba(248, 250, 252, 0.85);
  background-size: 220% 100%;
  animation: loading-sheen 1.4s ease-in-out infinite;
}

.google-button-inner {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 44px;
}

/* Style the Google iframe to fit properly */
.google-button-inner :deep(iframe) {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 200px !important;
  height: 44px !important;
  border-radius: 12px !important;
  display: block !important;
  margin: 0 auto !important;
}

/* Mobile specific styles */
@media (max-width: 640px) {
  .google-button-inner :deep(iframe) {
    height: 40px !important;
    min-width: 180px !important;
    border-radius: 10px !important;
  }
  
  .google-button-wrapper {
    min-height: 44px;
    padding: 2px 0;
  }
}

@keyframes loading-sheen {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* ===== MOBILE OPTIMIZATIONS ===== */
@media (max-width: 640px) {
  .dialog-panel {
    max-height: 85vh;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  }

  .login-dialog-enter-from section,
  .login-dialog-leave-to section {
    transform: translateY(30px);
  }

  /* Better touch targets */
  button, 
  a,
  [role="button"] {
    touch-action: manipulation;
    min-height: 44px;
    min-width: 44px;
  }

  /* Prevent zoom on input focus */
  input, 
  select, 
  textarea {
    font-size: 16px !important;
  }

  /* Reduce padding on small screens */
  .px-4 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  .pb-4 {
    padding-bottom: 0.75rem;
  }
}

/* ===== TABLET & DESKTOP ===== */
@media (min-width: 641px) {
  .dialog-panel {
    max-height: 85vh;
    border-radius: 2rem !important;
  }
}

/* ===== LARGE SCREENS ===== */
@media (min-width: 1024px) {
  .dialog-panel {
    max-height: 80vh;
  }
}

/* ===== DARK MODE ===== */
@media (prefers-color-scheme: dark) {
  .google-button-wrapper.is-loading {
    background:
      linear-gradient(90deg, transparent, rgba(51, 65, 85, 0.3), transparent),
      rgba(15, 23, 42, 0.9);
  }
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .login-dialog-enter-active section,
  .login-dialog-leave-active section {
    transition: none;
  }
}

/* ===== ACCESSIBILITY ===== */
:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}

/* ===== SAFE AREA SUPPORT ===== */
@supports (padding: max(0px)) {
  .dialog-panel {
    padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
  }
}
</style>