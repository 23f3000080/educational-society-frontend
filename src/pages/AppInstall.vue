<template>
  <div v-if="isVisible" class="install-popup-container">
    <!-- Floating Card from Bottom Right -->
    <div class="install-popup-card floating-card">
      <!-- Close Button -->
      <button class="close-btn" @click="closePopup" aria-label="Close installation guide">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Content with QR Code -->
      <div class="card-content">
        <!-- Left: QR Code Section -->
        <div class="qr-section">
          <div class="qr-code-wrapper">
            <img 
              v-if="qrCodeImage" 
              :src="qrCodeImage" 
              alt="QR Code to install app" 
              class="qr-code"
            />
            <div v-else class="qr-placeholder">
              <span class="qr-icon">📱</span>
              <span class="qr-label">Scan to Install</span>
            </div>
          </div>
          <div class="qr-text">
            <span class="badge">📲 Mobile</span>
            <span class="qr-hint">Scan with your phone camera</span>
          </div>
        </div>

        <!-- Right: Content Section -->
        <div class="info-section">
          <div class="popup-header">
            <span class="app-icon">🏫</span>
            <h3>Install Educational Society</h3>
            <p class="subtitle">Get the best experience on your device</p>
          </div>

          <!-- Simplified Steps (Collapsible) -->
          <div class="steps-preview">
            <div class="step-mini">
              <span class="step-dot">1</span>
              <span>Scan QR or click install</span>
            </div>
            <div class="step-mini">
              <span class="step-dot">2</span>
              <span>Confirm installation</span>
            </div>
            <div class="step-mini success">
              <span class="step-dot">✅</span>
              <span>App added to home screen</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="actions">
            <button class="btn btn-secondary" @click="closePopup">Maybe Later</button>
            <button class="btn btn-primary" @click="triggerInstall">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Install Now
            </button>
          </div>
        </div>
      </div>

      <!-- Progress Bar (Shows time before auto-close) -->
      <div class="progress-bar" v-if="autoCloseTimer > 0">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

// Props & Emits
const emit = defineEmits(['close', 'install']);

// Reactive state
const isVisible = ref(false);
const deferredPrompt = null;
const autoCloseTimer = ref(30); // Auto close after 30 seconds
const qrCodeImage = ref(null); // Will be set if QR generation is available

// Progress percentage for auto-close
const progressPercentage = computed(() => {
  return (autoCloseTimer.value / 30) * 100;
});

// Show popup
const showPopup = () => {
  isVisible.value = true;
  document.body.style.overflow = 'hidden';
  startAutoCloseTimer();
};

// Close popup
const closePopup = () => {
  isVisible.value = false;
  document.body.style.overflow = '';
  stopAutoCloseTimer();
  emit('close');
};

// Auto close timer
let timerInterval = null;

const startAutoCloseTimer = () => {
  autoCloseTimer.value = 30;
  timerInterval = setInterval(() => {
    autoCloseTimer.value -= 1;
    if (autoCloseTimer.value <= 0) {
      closePopup();
    }
  }, 1000);
};

const stopAutoCloseTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

// Generate QR Code (using a free API or library)
const generateQRCode = () => {
  const url = 'https://educational-society.vercel.app/install';
  // Using a free QR code API
  qrCodeImage.value = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
};

// Trigger PWA installation
const triggerInstall = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      emit('install');
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
    closePopup();
  } else {
    // If no PWA prompt, show manual installation instructions
    alert('Installation is not available right now.\n\nYou can install manually:\n1. Open in Chrome/Safari\n2. Tap Share/Options\n3. Select "Add to Home Screen"');
    closePopup();
  }
};

// Listen for beforeinstallprompt
const handleBeforeInstallPrompt = (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Show popup after delay if PWA is available
  setTimeout(() => {
    showPopup();
  }, 2000);
};

// Check if device is mobile
const isMobile = () => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Show popup after delay with conditions
const schedulePopup = () => {
  const hasSeenPopup = localStorage.getItem('installPopupSeen');
  const popupShownTime = localStorage.getItem('installPopupShownTime');
  
  // Don't show if seen before
  if (hasSeenPopup === 'true') return;
  
  // Show after 5 seconds delay
  setTimeout(() => {
    // Only show if not already visible
    if (!isVisible.value) {
      showPopup();
    }
  }, 5000);
};

onMounted(() => {
  // Generate QR code
  generateQRCode();
  
  // Listen for PWA install event
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  
  // Schedule popup
  schedulePopup();
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  stopAutoCloseTimer();
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Container - Fixed position */
.install-popup-container {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  pointer-events: none;
  padding: 20px;
}

/* Floating Card */
.install-popup-card {
  pointer-events: auto;
  background: #ffffff;
  border-radius: 20px;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  animation: slideInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

/* Card Content Layout */
.card-content {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
}

/* QR Section */
.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding-right: 1.5rem;
  border-right: 1px solid #e5e7eb;
}

.qr-code-wrapper {
  width: 120px;
  height: 120px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 2px solid #f3f4f6;
  overflow: hidden;
}

.qr-code {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.qr-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #9ca3af;
}

.qr-icon {
  font-size: 2.5rem;
}

.qr-label {
  font-size: 0.7rem;
  font-weight: 500;
}

.qr-text {
  margin-top: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.badge {
  font-size: 0.65rem;
  background: #dbeafe;
  color: #1d4ed8;
  padding: 2px 10px;
  border-radius: 20px;
  font-weight: 600;
  display: inline-block;
}

.qr-hint {
  font-size: 0.65rem;
  color: #6b7280;
}

/* Info Section */
.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* Header */
.popup-header {
  margin-bottom: 0.75rem;
}

.popup-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin: 0.25rem 0 0.1rem;
}

.subtitle {
  color: #6b7280;
  font-size: 0.8rem;
  margin: 0;
}

.app-icon {
  font-size: 1.8rem;
  display: block;
  margin-bottom: 2px;
}

/* Steps Preview */
.steps-preview {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0.5rem 0 1rem;
  background: #f9fafb;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
}

.step-mini {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  color: #374151;
}

.step-mini.success {
  color: #065f46;
}

.step-dot {
  width: 18px;
  height: 18px;
  background: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
  color: #1f2937;
  flex-shrink: 0;
}

.step-mini.success .step-dot {
  background: #d1fae5;
  color: #065f46;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

/* Actions */
.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.btn {
  padding: 0.5rem 1.2rem;
  border-radius: 40px;
  font-weight: 600;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  justify-content: center;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-primary {
  background: #1d4ed8;
  color: white;
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.3);
}

.btn-primary:hover {
  background: #1e40af;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(29, 78, 216, 0.35);
}

.btn-primary svg {
  stroke: white;
}

/* Progress Bar */
.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #f3f4f6;
  border-radius: 0 0 20px 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1d4ed8, #60a5fa);
  transition: width 1s linear;
  border-radius: 0 0 20px 20px;
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .install-popup-container {
    padding: 12px;
    left: 0;
  }

  .install-popup-card {
    max-width: 100%;
    border-radius: 16px;
    padding: 1rem;
  }

  .card-content {
    flex-direction: column;
    gap: 1rem;
  }

  .qr-section {
    flex-direction: row;
    padding-right: 0;
    border-right: none;
    gap: 1rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1rem;
    justify-content: flex-start;
  }

  .qr-code-wrapper {
    width: 80px;
    height: 80px;
  }

  .qr-text {
    text-align: left;
  }

  .popup-header h3 {
    font-size: 1rem;
  }

  .steps-preview {
    padding: 0.5rem;
  }

  .step-mini {
    font-size: 0.7rem;
  }

  .actions {
    flex-direction: column;
  }

  .btn {
    padding: 0.6rem;
    font-size: 0.85rem;
  }

  .close-btn {
    top: 8px;
    right: 10px;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .install-popup-card {
    background: rgba(31, 41, 55, 0.98);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .popup-header h3 {
    color: #f9fafb;
  }

  .subtitle {
    color: #9ca3af;
  }

  .steps-preview {
    background: rgba(55, 65, 81, 0.5);
  }

  .step-mini {
    color: #e5e7eb;
  }

  .step-dot {
    background: #4b5563;
    color: #e5e7eb;
  }

  .qr-section {
    border-right-color: #374151;
  }

  .btn-secondary {
    background: #374151;
    color: #e5e7eb;
  }

  .btn-secondary:hover {
    background: #4b5563;
  }

  .qr-code-wrapper {
    background: #1f2937;
    border-color: #374151;
  }

  .badge {
    background: #1e3a5f;
    color: #60a5fa;
  }

  .qr-hint {
    color: #9ca3af;
  }

  @media (max-width: 640px) {
    .qr-section {
      border-bottom-color: #374151;
    }
  }
}
</style>