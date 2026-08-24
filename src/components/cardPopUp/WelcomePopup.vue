<!-- components/popups/WelcomePopup.vue -->
<template>
  <div v-if="isVisible" class="popup-container">
    <div class="welcome-card flying-card">
      <!-- Close Button -->
      <button class="close-btn" @click="closePopup">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <!-- Content -->
      <div class="welcome-content">
        <!-- Animated Hand Wave -->
        <div class="wave-container">
          <span class="wave-emoji">👋</span>
          <span class="wave-hand">✋</span>
        </div>

        <!-- Welcome Message -->
        <div class="message-container">
          <h2>
            Hello, <span class="highlight">{{ studentName }}</span>! 
            <span class="wave-emoji-small">👋</span>
          </h2>
          <p class="welcome-text">
            Welcome back to <strong>Educational Society</strong>! 🎓
          </p>
          <p class="sub-message">
            We're so happy to see you again. Ready to learn something new today? 🚀
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-secondary" @click="closePopup">Maybe Later</button>
          <button class="btn-primary" @click="closePopup">
            Let's Go! 🚀
          </button>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="sparkle sparkle-1">✨</div>
      <div class="sparkle sparkle-2">🌟</div>
      <div class="sparkle sparkle-3">⭐</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['close']);
const isVisible = ref(false);

// const user = ref(null);

// get student nam efrom localStorage
const storedUser =
  localStorage.getItem('user') ||
  sessionStorage.getItem('user');

const student = ref(
  storedUser ? JSON.parse(storedUser).first_name : 'Student'
);

const studentName = student.value || 'Student';

const showPopup = () => {
  isVisible.value = true;
  document.body.style.overflow = 'hidden';
};

const closePopup = () => {
  isVisible.value = false;
  document.body.style.overflow = '';
  localStorage.setItem('welcomePopupSeen', 'true');
  emit('close');
};

const checkAndShow = () => {
  const hasSeen = localStorage.getItem('welcomePopupSeen');
  if (!hasSeen) {
    setTimeout(() => {
      showPopup();
    }, 1500);
  }
};

onMounted(() => {
  checkAndShow();
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Container - Fixed bottom right */
.popup-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  max-width: 420px;
  width: 100%;
  pointer-events: none;
}

/* Flying Card Animation */
.welcome-card {
  pointer-events: auto;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 24px;
  padding: 1.75rem 1.75rem 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  animation: flyIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.95);
  overflow: hidden;
  transform-origin: bottom right;
}

/* Animated background gradient */
.welcome-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 70% 30%, rgba(29, 78, 216, 0.03), transparent 70%);
  pointer-events: none;
  animation: shimmer 6s ease-in-out infinite;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 12px;
  right: 14px;
  background: rgba(243, 244, 246, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.3s;
  z-index: 10;
  backdrop-filter: blur(4px);
}

.close-btn:hover {
  background: #f3f4f6;
  color: #111827;
  transform: rotate(90deg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Content */
.welcome-content {
  position: relative;
  z-index: 1;
}

/* Wave Animation Container */
.wave-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.wave-emoji {
  font-size: 2.8rem;
  animation: wave 2s ease-in-out infinite;
  display: inline-block;
  transform-origin: 70% 70%;
}

.wave-hand {
  font-size: 2.5rem;
  animation: waveHand 1.5s ease-in-out infinite;
  display: inline-block;
  transform-origin: 70% 70%;
  opacity: 0.7;
}

/* Message Container */
.message-container h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.25rem;
  line-height: 1.3;
}

.highlight {
  background: linear-gradient(135deg, #1d4ed8, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.wave-emoji-small {
  font-size: 1.5rem;
  display: inline-block;
  animation: wave 2.5s ease-in-out infinite;
  -webkit-text-fill-color: initial;
}

.welcome-text {
  font-size: 1rem;
  color: #374151;
  margin: 0.25rem 0 0.5rem;
}

.welcome-text strong {
  color: #1d4ed8;
}

.sub-message {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0 0 1.25rem;
  line-height: 1.5;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn-secondary,
.btn-primary {
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 40px;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.btn-primary {
  background: linear-gradient(135deg, #1d4ed8, #3b82f6);
  color: white;
  box-shadow: 0 4px 16px rgba(29, 78, 216, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(29, 78, 216, 0.35);
}

/* Sparkles */
.sparkle {
  position: absolute;
  font-size: 1.2rem;
  animation: float 3s ease-in-out infinite;
  pointer-events: none;
  opacity: 0.6;
}

.sparkle-1 {
  top: 10px;
  left: 20px;
  animation-delay: 0s;
}

.sparkle-2 {
  top: 50px;
  right: 30px;
  animation-delay: 1s;
  font-size: 1rem;
}

.sparkle-3 {
  bottom: 40px;
  left: 40px;
  animation-delay: 2s;
  font-size: 0.9rem;
}

/* Keyframe Animations */
@keyframes flyIn {
  0% {
    opacity: 0;
    transform: translate(40px, 40px) scale(0.7) rotate(2deg);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
}

@keyframes wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(20deg);
  }
}

@keyframes waveHand {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  30% {
    transform: rotate(15deg) scale(1.1);
  }
  60% {
    transform: rotate(-5deg) scale(1);
  }
  80% {
    transform: rotate(10deg) scale(1.05);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px) rotate(20deg);
    opacity: 1;
  }
}

@keyframes shimmer {
  0%, 100% {
    transform: translate(-10%, -10%) scale(1);
  }
  50% {
    transform: translate(10%, 10%) scale(1.1);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .popup-container {
    bottom: 15px;
    right: 15px;
    left: 15px;
    max-width: 100%;
  }

  .welcome-card {
    padding: 1.5rem 1.25rem 1.25rem;
    border-radius: 20px;
  }

  .wave-emoji {
    font-size: 2.2rem;
  }

  .wave-hand {
    font-size: 2rem;
  }

  .message-container h2 {
    font-size: 1.25rem;
  }

  .welcome-text {
    font-size: 0.9rem;
  }

  .sub-message {
    font-size: 0.8rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn-secondary,
  .btn-primary {
    padding: 0.7rem;
  }

  .sparkle {
    display: none;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .welcome-card {
    background: rgba(31, 41, 55, 0.98);
    border-color: rgba(255, 255, 255, 0.05);
  }

  .message-container h2 {
    color: #f9fafb;
  }

  .welcome-text {
    color: #e5e7eb;
  }

  .sub-message {
    color: #9ca3af;
  }

  .btn-secondary {
    background: #374151;
    color: #e5e7eb;
    border-color: #4b5563;
  }

  .btn-secondary:hover {
    background: #4b5563;
  }

  .close-btn {
    background: rgba(55, 65, 81, 0.8);
    color: #9ca3af;
  }

  .close-btn:hover {
    background: #4b5563;
    color: #f9fafb;
  }

  .highlight {
    background: linear-gradient(135deg, #60a5fa, #93c5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
</style>