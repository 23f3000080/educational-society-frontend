<!-- idCardGenerator.vue -->
<template>
  <div class="id-page dark:bg-[#070b14] bg-slate-50">
    <!-- Ambient blobs -->
    <div class="bg-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- ================= HEADER ================= -->
    <header class="page-header dark:bg-slate-900/70 bg-white/70 dark:border-white/5 border-slate-200">
      <div class="header-inner">
        <div class="header-left">
          <div class="logo-icon">🪪</div>
          <div>
            <h1 class="page-title dark:text-white text-slate-900">
              <span class="grad-amber">ID Card</span>
              <span class="grad-emerald">Generator</span>
            </h1>
            <p class="page-sub dark:text-slate-400 text-slate-500">
              Admin tool · Create · Download · Print student IDs
            </p>
          </div>
        </div>

        <div class="header-actions">
          <button
            class="btn-icon dark:text-slate-200 text-slate-700 dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200"
            @click="toggleSound"
            :title="soundEnabled ? 'Mute' : 'Unmute'"
          >
            {{ soundEnabled ? '🔊' : '🔇' }}
          </button>
        </div>
      </div>
    </header>

    <!-- ================= TABS ================= -->
    <div class="tabs-bar dark:bg-slate-900/40 bg-white/60 dark:border-white/5 border-slate-200">
      <div class="tabs-inner">
        <button class="tab-btn" :class="{ active: activeTab === 'single' }" @click="activeTab = 'single'; SFX.click()">
          👤 Single Card
        </button>
        <button class="tab-btn" :class="{ active: activeTab === 'bulk' }" @click="activeTab = 'bulk'; SFX.click()">
          📚 Bulk Generate
        </button>
        <button class="tab-btn" :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'; SFX.click()">
          🎨 School Settings
        </button>
      </div>
    </div>

    <!-- ================= MAIN ================= -->
    <main class="main-grid">
      <!-- ============ LEFT: FORM ============ -->
      <section class="form-panel dark:bg-slate-900/70 bg-white dark:border-white/10 border-slate-200">
        <!-- ===== SINGLE TAB ===== -->
        <template v-if="activeTab === 'single'">
          <div class="panel-head dark:border-white/5 border-slate-200">
            <span class="panel-icon">📝</span>
            <span class="panel-title dark:text-white text-slate-900">Student Details</span>
            <button class="panel-action dark:text-slate-400 text-slate-500" @click="fillDemo">🎲 Demo</button>
          </div>

          <div class="panel-body">
            <!-- PHOTO -->
            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">Photo</label>
              <div class="photo-uploader">
                <div class="photo-preview dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200">
                  <img v-if="form.photo" :src="form.photo" alt="Student" />
                  <div v-else class="photo-empty dark:text-slate-500 text-slate-400">
                    <span>📷</span><span>No photo</span>
                  </div>
                </div>
                <div class="photo-buttons">
                  <button class="mini-btn dark:bg-white/5 bg-white dark:text-slate-300 text-slate-700 dark:border-white/10 border-slate-200" @click="triggerPhotoUpload">⬆️ Upload</button>
                  <button v-if="form.photo" class="mini-btn dark:bg-white/5 bg-white dark:text-slate-300 text-slate-700 dark:border-white/10 border-slate-200" @click="form.photo = ''">✕ Remove</button>
                  <input ref="photoInput" type="file" accept="image/*" hidden @change="onPhotoUpload" />
                </div>
              </div>
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">Full Name *</label>
              <input v-model="form.name" maxlength="30" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" placeholder="e.g. Ankit Kumar" />
            </div>

            <div class="form-row">
              <div class="control-group">
                <label class="ctrl-label dark:text-slate-300 text-slate-700">Class *</label>
                <input v-model="form.grade" maxlength="10" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" placeholder="e.g. 12" />
              </div>
              <div class="control-group">
                <label class="ctrl-label dark:text-slate-300 text-slate-700">Section</label>
                <input v-model="form.section" maxlength="5" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" placeholder="A" />
              </div>
            </div>

            <div class="form-row">
              <div class="control-group">
                <label class="ctrl-label dark:text-slate-300 text-slate-700">Roll No. *</label>
                <input v-model="form.roll" maxlength="15" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" placeholder="e.g. 23F3000080" />
              </div>
              <div class="control-group">
                <label class="ctrl-label dark:text-slate-300 text-slate-700">Date of Birth</label>
                <input v-model="form.dob" type="date" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" />
              </div>
            </div>

            <div class="form-row">
              <div class="control-group">
                <label class="ctrl-label dark:text-slate-300 text-slate-700">Blood Group</label>
                <select v-model="form.blood" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200">
                  <option value="">—</option>
                  <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div class="control-group">
                <label class="ctrl-label dark:text-slate-300 text-slate-700">Gender</label>
                <select v-model="form.gender" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200">
                  <option value="">—</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">Phone</label>
              <input v-model="form.phone" maxlength="15" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" placeholder="+91 98765 43210" />
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">Address</label>
              <textarea v-model="form.address" maxlength="80" rows="2" class="ctrl-input ctrl-textarea dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" placeholder="e.g. 12, MG Road, Delhi"></textarea>
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">Guardian Name</label>
              <input v-model="form.guardian" maxlength="30" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" placeholder="Parent's name" />
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">Valid Until</label>
              <input v-model="form.validUntil" type="month" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" />
            </div>
          </div>
        </template>

        <!-- ===== BULK TAB ===== -->
        <template v-else-if="activeTab === 'bulk'">
          <div class="panel-head dark:border-white/5 border-slate-200">
            <span class="panel-icon">📚</span>
            <span class="panel-title dark:text-white text-slate-900">Bulk Students</span>
            <button class="panel-action dark:text-slate-400 text-slate-500" @click="downloadCsvTemplate">📄 CSV</button>
          </div>

          <div class="panel-body">
            <div class="bulk-info dark:bg-amber-400/10 bg-amber-50 dark:border-amber-400/30 border-amber-200">
              <div class="bulk-info-title dark:text-amber-300 text-amber-700">📋 How it works</div>
              <ol class="bulk-info-list dark:text-slate-300 text-slate-600">
                <li>Paste CSV: <code>name, class, section, roll, dob, blood, phone</code></li>
                <li>One student per line</li>
                <li>Generate → all cards as ZIP (each card has unique QR)</li>
              </ol>
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">
                Paste CSV Data
                <span class="ctrl-hint dark:text-slate-500 text-slate-400">({{ bulkCount }} students)</span>
              </label>
              <textarea v-model="bulkCsv" rows="14" class="ctrl-input ctrl-textarea bulk-textarea dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" placeholder="Ankit Kumar, 12, A, 23F3000080, 2005-12-19, B+, 9006516636"></textarea>
            </div>

            <div class="bulk-actions">
              <button class="btn-secondary dark:bg-white/5 bg-white dark:text-slate-200 text-slate-700 dark:border-white/10 border-slate-200" @click="loadBulkDemo">🎲 Load Demo</button>
              <button class="btn-secondary dark:bg-white/5 bg-white dark:text-slate-200 text-slate-700 dark:border-white/10 border-slate-200" @click="bulkCsv = ''">🗑️ Clear</button>
              <button class="btn-primary" @click="generateBulk" :disabled="!bulkCount">
                <span>⬇️</span> Download All ({{ bulkCount }})
              </button>
            </div>
          </div>
        </template>

        <!-- ===== SETTINGS TAB ===== -->
        <template v-else>
          <div class="panel-head dark:border-white/5 border-slate-200">
            <span class="panel-icon">🎨</span>
            <span class="panel-title dark:text-white text-slate-900">School Settings</span>
            <button class="panel-action dark:text-slate-400 text-slate-500" @click="resetSchool">🔄</button>
          </div>

          <div class="panel-body">
            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">School Logo</label>
              <div class="photo-uploader">
                <div class="photo-preview logo-preview dark:bg-white/5 bg-slate-100 dark:border-white/10 border-slate-200">
                  <img v-if="school.logo" :src="school.logo" alt="Logo" />
                  <div v-else class="photo-empty dark:text-slate-500 text-slate-400">
                    <span>🏫</span><span>No logo</span>
                  </div>
                </div>
                <div class="photo-buttons">
                  <button class="mini-btn dark:bg-white/5 bg-white dark:text-slate-300 text-slate-700 dark:border-white/10 border-slate-200" @click="triggerLogoUpload">⬆️ Upload</button>
                  <button v-if="school.logo" class="mini-btn dark:bg-white/5 bg-white dark:text-slate-300 text-slate-700 dark:border-white/10 border-slate-200" @click="school.logo = ''">✕</button>
                  <input ref="logoInput" type="file" accept="image/*" hidden @change="onLogoUpload" />
                </div>
              </div>
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">School Name</label>
              <input v-model="school.name" maxlength="40" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" />
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">Tagline / Address</label>
              <input v-model="school.tagline" maxlength="60" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" />
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">Director & Founder Name</label>
              <input v-model="school.director" maxlength="30" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" />
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">School Contact</label>
              <input v-model="school.contact" maxlength="40" class="ctrl-input dark:bg-white/5 bg-slate-50 dark:text-slate-200 text-slate-800 dark:border-white/10 border-slate-200" />
            </div>

            <div class="control-group">
              <label class="ctrl-label dark:text-slate-300 text-slate-700">Card Theme</label>
              <div class="theme-grid">
                <button
                  v-for="th in cardThemes"
                  :key="th.id"
                  class="theme-swatch"
                  :class="{ active: school.theme === th.id }"
                  :style="{ background: `linear-gradient(135deg, ${th.from}, ${th.to})` }"
                  @click="school.theme = th.id; SFX.click()"
                  :title="th.name"
                ></button>
              </div>
            </div>

            <div class="control-group toggle-group">
              <div>
                <div class="ctrl-label dark:text-slate-300 text-slate-700">Show QR Code (Back)</div>
                <div class="ctrl-hint dark:text-slate-500 text-slate-400">Scannable · full student info</div>
              </div>
              <button class="toggle" :class="{ on: school.showQr }" @click="school.showQr = !school.showQr; SFX.click()">
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="control-group toggle-group">
              <div>
                <div class="ctrl-label dark:text-slate-300 text-slate-700">Show Barcode (Front)</div>
                <div class="ctrl-hint dark:text-slate-500 text-slate-400">Code128 · roll number</div>
              </div>
              <button class="toggle" :class="{ on: school.showBarcode }" @click="school.showBarcode = !school.showBarcode; SFX.click()">
                <span class="toggle-knob"></span>
              </button>
            </div>

            <div class="control-group toggle-group">
              <div>
                <div class="ctrl-label dark:text-slate-300 text-slate-700">Show Signature</div>
                <div class="ctrl-hint dark:text-slate-500 text-slate-400">Director & Founder signature line</div>
              </div>
              <button class="toggle" :class="{ on: school.showSignature }" @click="school.showSignature = !school.showSignature; SFX.click()">
                <span class="toggle-knob"></span>
              </button>
            </div>
          </div>
        </template>
      </section>

      <!-- ============ RIGHT: PREVIEW ============ -->
      <section class="preview-panel">
        <!-- SINGLE PREVIEW -->
        <template v-if="activeTab === 'single'">
          <div class="preview-head">
            <div class="preview-label dark:text-slate-300 text-slate-700">
              <span>👁️ Live Preview</span>
              <span class="preview-hint dark:text-slate-500 text-slate-400">Front + Back</span>
            </div>
            <div class="preview-actions">
              <button class="mini-btn dark:bg-white/5 bg-white dark:text-slate-300 text-slate-700 dark:border-white/10 border-slate-200" @click="downloadCard('png')">⬇️ PNG</button>
              <button class="mini-btn dark:bg-white/5 bg-white dark:text-slate-300 text-slate-700 dark:border-white/10 border-slate-200" @click="downloadCard('pdf')">📄 PDF</button>
              <button class="mini-btn dark:bg-white/5 bg-white dark:text-slate-300 text-slate-700 dark:border-white/10 border-slate-200" @click="printCard">🖨️ Print</button>
              <button class="mini-btn primary-btn" @click="shareCard">📤 Share</button>
            </div>
          </div>

          <div class="cards-stage">
            <!-- FRONT -->
            <div class="id-card-wrap">
              <div ref="frontRef" class="id-card front" :style="cardThemeStyle">
                <div class="card-pattern" :class="`pattern-${school.theme.includes('gold') ? 'rays' : 'dots'}`"></div>
                <div class="card-shine"></div>

                <div class="card-header">
                  <div class="card-logo">
                    <img v-if="school.logo" :src="school.logo" alt="Logo" />
                    <div v-else class="logo-placeholder">ES</div>
                  </div>
                  <div class="card-school">
                    <div class="card-school-name">{{ school.name || 'Your School Name' }}</div>
                    <div class="card-school-tag">{{ school.tagline || 'Excellence in Education' }}</div>
                  </div>
                </div>

                <div class="card-divider"></div>

                <div class="card-body">
                  <div class="card-photo">
                    <img v-if="form.photo" :src="form.photo" alt="Student" />
                    <div v-else class="photo-fallback">
                      <span>{{ (form.name || 'Student').charAt(0).toUpperCase() }}</span>
                    </div>
                  </div>

                  <div class="card-info">
                    <div class="card-name">{{ form.name || 'Student Name' }}</div>
                    <div class="card-meta-row">
                      <span class="meta-chip">Class {{ form.grade || '—' }}{{ form.section ? '-' + form.section : '' }}</span>
                      <span v-if="form.blood" class="meta-chip blood-chip">🩸 {{ form.blood }}</span>
                    </div>

                    <div class="card-details">
                      <div class="detail-row">
                        <span class="detail-label">Roll No.</span>
                        <span class="detail-value">{{ form.roll || '—' }}</span>
                      </div>
                      <div v-if="form.dob" class="detail-row">
                        <span class="detail-label">DOB</span>
                        <span class="detail-value">{{ formatDate(form.dob) }}</span>
                      </div>
                      <div v-if="form.phone" class="detail-row">
                        <span class="detail-label">Phone</span>
                        <span class="detail-value">{{ form.phone }}</span>
                      </div>
                      <div v-if="form.validUntil" class="detail-row">
                        <span class="detail-label">Valid</span>
                        <span class="detail-value">{{ formatMonth(form.validUntil) }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-footer">
                  <div v-if="school.showBarcode" class="card-barcode">
                    <img v-if="barcodeDataUrl" :src="barcodeDataUrl" alt="barcode" class="barcode-img" />
                    <div class="barcode-text">{{ form.roll || '0000000' }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- BACK -->
            <div class="id-card-wrap">
              <div ref="backRef" class="id-card back" :style="cardThemeStyle">
                <div class="card-pattern" :class="`pattern-${school.theme.includes('gold') ? 'rays' : 'grid'}`"></div>

                <div class="back-header">
                  <div class="back-title">STUDENT IDENTITY CARD</div>
                </div>

                <div class="back-body">
                  <div v-if="form.guardian" class="back-row">
                    <span class="back-label">Guardian</span>
                    <span class="back-value">{{ form.guardian }}</span>
                  </div>
                  <div v-if="form.address" class="back-row back-row-full">
                    <span class="back-label">Address</span>
                    <span class="back-value">{{ form.address }}</span>
                  </div>
                  <div v-if="school.contact" class="back-row">
                    <span class="back-label">Contact</span>
                    <span class="back-value">{{ school.contact }}</span>
                  </div>
                </div>

                <!-- QR CODE — central on back -->
                <div v-if="school.showQr" class="back-qr-section">
                  <div class="back-qr-frame">
                    <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR" class="back-qr-img" />
                  </div>
                  <div class="back-qr-hint">Scan for details</div>
                </div>

                <div v-if="school.showSignature" class="back-signature">
                  <div class="sig-line"></div>
                  <div class="sig-name">{{ school.director || 'Director' }}</div>
                  <div class="sig-title">Director & Founder</div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- BULK PREVIEW -->
        <template v-else-if="activeTab === 'bulk'">
          <div class="preview-head">
            <div class="preview-label dark:text-slate-300 text-slate-700">
              <span>👁️ Preview</span>
              <span class="preview-hint dark:text-slate-500 text-slate-400">
                {{ bulkStudents.length }} card{{ bulkStudents.length === 1 ? '' : 's' }}
              </span>
            </div>
          </div>

          <div v-if="!bulkStudents.length" class="bulk-empty dark:text-slate-500 text-slate-400">
            <div class="empty-icon">📚</div>
            <p>Paste CSV on the left to preview</p>
          </div>

          <div v-else class="bulk-grid">
            <div
              v-for="(s, i) in bulkStudents.slice(0, 12)"
              :key="i"
              class="mini-card"
              :style="cardThemeStyle"
            >
              <div class="mini-photo">
                <span>{{ (s.name || 'S').charAt(0).toUpperCase() }}</span>
              </div>
              <div class="mini-info">
                <div class="mini-name">{{ s.name }}</div>
                <div class="mini-meta">{{ s.grade }}-{{ s.section }} · {{ s.roll }}</div>
              </div>
            </div>
            <div v-if="bulkStudents.length > 12" class="bulk-more dark:text-slate-400 text-slate-500">
              +{{ bulkStudents.length - 12 }} more
            </div>
          </div>
        </template>

        <!-- SETTINGS PREVIEW -->
        <template v-else>
          <div class="preview-head">
            <div class="preview-label dark:text-slate-300 text-slate-700">
              <span>👁️ Card Theme Preview</span>
            </div>
          </div>

          <div class="theme-previews">
            <div
              v-for="th in cardThemes"
              :key="th.id"
              class="theme-preview-card"
              :class="{ active: school.theme === th.id }"
              :style="{ background: `linear-gradient(135deg, ${th.from}, ${th.to})` }"
              @click="school.theme = th.id; SFX.click()"
            >
              <div class="tp-sample-logo">{{ school.logo ? '🏫' : 'ES' }}</div>
              <div class="tp-sample-name">{{ school.name || 'School Name' }}</div>
              <div class="tp-check" v-if="school.theme === th.id">✓</div>
            </div>
          </div>

          <div class="settings-tips dark:bg-white/5 bg-white dark:border-white/10 border-slate-200">
            <div class="tips-title dark:text-white text-slate-900">💡 Pro Tips</div>
            <ul class="tips-list dark:text-slate-400 text-slate-600">
              <li><strong>White background</strong> — clean, printable, professional</li>
              <li>QR code on back contains full student JSON — any phone scans it</li>
              <li>Barcode (front) uses Code128 — works with standard scanners</li>
              <li>PDF is CR80 size (54 × 86 mm) — real ID card dimensions</li>
            </ul>
          </div>
        </template>
      </section>
    </main>

    <!-- ================= FOOTER ================= -->
    <footer class="page-footer dark:border-white/5 border-slate-200">
      <p class="credit dark:text-slate-500 text-slate-500">
        Made with 💛 by <strong>Educational Society</strong> · Secure ID card generation
      </p>
    </footer>

    <!-- ================= TOAST ================= -->
    <transition name="toast-fade">
      <div v-if="toast" class="toast">
        <span class="toast-icon">{{ toast.icon }}</span>
        <span class="toast-text">{{ toast.message }}</span>
      </div>
    </transition>

    <!-- ================= LOADING OVERLAY ================= -->
    <transition name="toast-fade">
      <div v-if="generating" class="loading-overlay">
        <div class="loading-box dark:bg-slate-900 bg-white dark:border-white/10 border-slate-200">
          <div class="big-spinner"></div>
          <div class="loading-title dark:text-white text-slate-900">{{ loadingText }}</div>
          <div class="loading-bar dark:bg-white/10 bg-slate-200">
            <div class="loading-fill" :style="{ width: loadingProgress + '%' }"></div>
          </div>
          <div class="loading-pct dark:text-amber-400 text-amber-500">{{ loadingProgress }}%</div>
        </div>
      </div>
    </transition>

    <!-- ================= HIDDEN EXPORT STAGING ================= -->
    <div class="export-staging" aria-hidden="true">
      <!-- EXPORT FRONT -->
      <div ref="exportFrontRef" class="id-card export-card front" :style="cardThemeStyle">
        <div class="card-pattern" :class="`pattern-${school.theme.includes('gold') ? 'rays' : 'dots'}`"></div>

        <div class="card-header">
          <div class="card-logo">
            <img v-if="school.logo" :src="school.logo" alt="Logo" />
            <div v-else class="logo-placeholder">ES</div>
          </div>
          <div class="card-school">
            <div class="card-school-name">{{ school.name || 'Your School Name' }}</div>
            <div class="card-school-tag">{{ school.tagline || 'Excellence in Education' }}</div>
          </div>
        </div>

        <div class="card-divider"></div>

        <div class="card-body">
          <div class="card-photo">
            <img v-if="form.photo" :src="form.photo" alt="Student" />
            <div v-else class="photo-fallback">
              <span>{{ (form.name || 'Student').charAt(0).toUpperCase() }}</span>
            </div>
          </div>

          <div class="card-info">
            <div class="card-name">{{ form.name || 'Student Name' }}</div>
            <div class="card-meta-row">
              <span class="meta-chip">Class {{ form.grade || '—' }}{{ form.section ? '-' + form.section : '' }}</span>
              <span v-if="form.blood" class="meta-chip blood-chip">🩸 {{ form.blood }}</span>
            </div>

            <div class="card-details">
              <div class="detail-row">
                <span class="detail-label">Roll No.</span>
                <span class="detail-value">{{ form.roll || '—' }}</span>
              </div>
              <div v-if="form.dob" class="detail-row">
                <span class="detail-label">DOB</span>
                <span class="detail-value">{{ formatDate(form.dob) }}</span>
              </div>
              <div v-if="form.phone" class="detail-row">
                <span class="detail-label">Phone</span>
                <span class="detail-value">{{ form.phone }}</span>
              </div>
              <div v-if="form.validUntil" class="detail-row">
                <span class="detail-label">Valid</span>
                <span class="detail-value">{{ formatMonth(form.validUntil) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <div v-if="school.showBarcode" class="card-barcode">
            <img v-if="barcodeDataUrl" :src="barcodeDataUrl" alt="barcode" class="barcode-img" />
            <div class="barcode-text">{{ form.roll || '0000000' }}</div>
          </div>
        </div>
      </div>

      <!-- EXPORT BACK -->
      <div ref="exportBackRef" class="id-card export-card back" :style="cardThemeStyle">
        <div class="card-pattern" :class="`pattern-${school.theme.includes('gold') ? 'rays' : 'grid'}`"></div>

        <div class="back-header">
          <div class="back-title">STUDENT IDENTITY CARD</div>
        </div>

        <div class="back-body">
          <div v-if="form.guardian" class="back-row">
            <span class="back-label">Guardian</span>
            <span class="back-value">{{ form.guardian }}</span>
          </div>
          <div v-if="form.address" class="back-row back-row-full">
            <span class="back-label">Address</span>
            <span class="back-value">{{ form.address }}</span>
          </div>
          <div v-if="school.contact" class="back-row">
            <span class="back-label">Contact</span>
            <span class="back-value">{{ school.contact }}</span>
          </div>
        </div>

        <div v-if="school.showQr" class="back-qr-section">
          <div class="back-qr-frame">
            <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR" class="back-qr-img" />
          </div>
          <div class="back-qr-hint">Scan for details</div>
        </div>

        <div v-if="school.showSignature" class="back-signature">
          <div class="sig-line"></div>
          <div class="sig-name">{{ school.director || 'Director' }}</div>
          <div class="sig-title">Director & Founder</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'

/* =========================================================
   🔊 SOUND ENGINE
   ========================================================= */
const soundEnabled = ref(true)
let audioCtx = null

function initAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)() } catch (e) {}
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume()
}

function playTone(freq, dur = 0.1, type = 'sine', vol = 0.12, delay = 0) {
  if (!soundEnabled.value) return
  initAudio()
  if (!audioCtx) return
  const start = audioCtx.currentTime + delay
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(vol, start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur)
  osc.connect(gain); gain.connect(audioCtx.destination)
  osc.start(start); osc.stop(start + dur + 0.02)
}

const SFX = {
  click:     () => playTone(600, 0.05, 'sine', 0.08),
  success:   () => { playTone(660, 0.1, 'sine', 0.14); playTone(880, 0.15, 'sine', 0.14, 0.09) },
  download:  () => { playTone(523, 0.1, 'triangle', 0.13); playTone(784, 0.14, 'triangle', 0.13, 0.09) },
  share:     () => { playTone(659, 0.1, 'sine', 0.13); playTone(880, 0.13, 'sine', 0.13, 0.08); playTone(1046, 0.16, 'sine', 0.13, 0.16) },
  upload:    () => { playTone(500, 0.06, 'sine', 0.1); playTone(800, 0.08, 'sine', 0.1, 0.05) },
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) { initAudio(); SFX.click() }
  localStorage.setItem('id_sound', soundEnabled.value ? '1' : '0')
}

/* =========================================================
   STATE
   ========================================================= */
const activeTab = ref('single')
const photoInput = ref(null)
const logoInput = ref(null)
const frontRef = ref(null)
const backRef = ref(null)
const exportFrontRef = ref(null)
const exportBackRef = ref(null)

const form = ref({
  photo: '',
  name: '',
  grade: '',
  section: '',
  roll: '',
  dob: '',
  blood: '',
  gender: '',
  phone: '',
  address: '',
  guardian: '',
  validUntil: '',
})

const school = ref({
  logo: '',
  name: 'Educational Society',
  tagline: 'Excellence in Education · Est. 2019',
  director: 'Dr. Ankit Verma',
  contact: '+91 98765 43210 · info@edusociety.in',
  theme: 'royal-blue',
  showQr: true,
  showBarcode: true,
  showSignature: true,
})

const bulkCsv = ref('')

const cardThemes = [
  { id: 'royal-blue', name: 'Royal Blue', from: '#1e40af', to: '#0f172a' },
  { id: 'emerald',    name: 'Emerald',    from: '#047857', to: '#064e3b' },
  { id: 'gold',       name: 'Gold',       from: '#b45309', to: '#78350f' },
  { id: 'crimson',    name: 'Crimson',    from: '#991b1b', to: '#450a0a' },
  { id: 'purple',     name: 'Purple',     from: '#6b21a8', to: '#3b0764' },
  { id: 'midnight',   name: 'Midnight',   from: '#0f172a', to: '#020617' },
  { id: 'teal',       name: 'Teal',       from: '#0f766e', to: '#134e4a' },
  { id: 'maroon',     name: 'Maroon',     from: '#7f1d1d', to: '#450a0a' },
]

const currentTheme = computed(() =>
  cardThemes.find(t => t.id === school.value.theme) || cardThemes[0]
)

const cardThemeStyle = computed(() => {
  const th = currentTheme.value
  // White base + subtle accent gradient overlay
  return {
    background: `linear-gradient(135deg, ${th.from} 0%, ${th.to} 100%)`,
  }
})

/* =========================================================
   REAL QR CODE
   ========================================================= */
const qrDataUrl = ref('')

async function generateQrCode() {
  if (!school.value.showQr) { qrDataUrl.value = ''; return }
  await ensureQrLib()
  if (!window.QRCode) return

  const payload = JSON.stringify({
    name: form.value.name || '',
    roll: form.value.roll || '',
    grade: form.value.grade || '',
    section: form.value.section || '',
    dob: form.value.dob || '',
    blood: form.value.blood || '',
    phone: form.value.phone || '',
    school: school.value.name || '',
  })

  try {
    const canvas = document.createElement('canvas')
    await window.QRCode.toCanvas(canvas, payload, {
      width: 256,
      margin: 1,
      color: { dark: '#0b1220', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    })
    qrDataUrl.value = canvas.toDataURL('image/png')
  } catch (err) {
    console.warn('QR generation failed:', err)
    qrDataUrl.value = ''
  }
}

function ensureQrLib() {
  if (window.QRCode) return Promise.resolve()
  return new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js'
    s.onload = resolve
    s.onerror = resolve
    document.head.appendChild(s)
  })
}

/* =========================================================
   REAL BARCODE
   ========================================================= */
const barcodeDataUrl = ref('')

async function generateBarcode() {
  if (!school.value.showBarcode) { barcodeDataUrl.value = ''; return }
  await ensureBarcodeLib()
  if (!window.JsBarcode) return

  const roll = (form.value.roll || '0000000').replace(/\s+/g, '')
  try {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    window.JsBarcode(svg, roll, {
      format: 'CODE128',
      width: 2,
      height: 60,
      displayValue: false,
      margin: 0,
      background: '#ffffff',
      lineColor: '#000000',
    })
    const svgStr = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width * 2 || 600
      c.height = img.height * 2 || 120
      const ctx = c.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, c.width, c.height)
      ctx.drawImage(img, 0, 0, c.width, c.height)
      barcodeDataUrl.value = c.toDataURL('image/png')
      URL.revokeObjectURL(url)
    }
    img.onerror = () => URL.revokeObjectURL(url)
    img.src = url
  } catch (err) {
    console.warn('Barcode generation failed:', err)
  }
}

function ensureBarcodeLib() {
  if (window.JsBarcode) return Promise.resolve()
  return new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js'
    s.onload = resolve
    s.onerror = resolve
    document.head.appendChild(s)
  })
}

watch(
  () => [form.value.name, form.value.roll, form.value.grade, form.value.section,
         form.value.dob, form.value.blood, form.value.phone, school.value.name, school.value.showQr],
  async () => { await nextTick(); generateQrCode() }
)

watch(
  () => [form.value.roll, school.value.showBarcode],
  async () => { await nextTick(); generateBarcode() }
)

/* =========================================================
   BULK PARSING
   ========================================================= */
const bulkStudents = computed(() => {
  const lines = bulkCsv.value.split('\n').map(l => l.trim()).filter(Boolean)
  return lines.map((line, i) => {
    const p = line.split(',').map(s => s.trim())
    return {
      id: i,
      name: p[0] || '',
      grade: p[1] || '',
      section: p[2] || '',
      roll: p[3] || '',
      dob: p[4] || '',
      blood: p[5] || '',
      phone: p[6] || '',
    }
  }).filter(s => s.name)
})

const bulkCount = computed(() => bulkStudents.value.length)

/* =========================================================
   TOAST & LOADING
   ========================================================= */
const toast = ref(null)
let toastTimer = null
function showToast(message, icon = '✨') {
  toast.value = { message, icon }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = null), 2500)
}

const generating = ref(false)
const loadingProgress = ref(0)
const loadingText = ref('Generating…')

/* =========================================================
   PERSISTENCE
   ========================================================= */
const STORAGE_KEY = 'esch_idcard_v3'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.school) school.value = { ...school.value, ...parsed.school }
      if (parsed.form) form.value = { ...form.value, ...parsed.form }
    }
  } catch (e) {}
}

watch([school, form], () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ school: school.value, form: form.value }))
  } catch (e) {}
}, { deep: true })

/* =========================================================
   HELPERS
   ========================================================= */
function formatDate(iso) {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch { return iso }
}

function formatMonth(ym) {
  if (!ym) return '—'
  try {
    const [y, m] = ym.split('-')
    const d = new Date(y, parseInt(m) - 1)
    return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
  } catch { return ym }
}

/* =========================================================
   FILE UPLOADS
   ========================================================= */
function triggerPhotoUpload() { SFX.click(); photoInput.value?.click() }
function triggerLogoUpload() { SFX.click(); logoInput.value?.click() }

function onPhotoUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  readAsDataUrl(file, (url) => { form.value.photo = url; SFX.upload() })
  e.target.value = ''
}
function onLogoUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  readAsDataUrl(file, (url) => { school.value.logo = url; SFX.upload() })
  e.target.value = ''
}
function readAsDataUrl(file, cb) {
  const reader = new FileReader()
  reader.onload = (ev) => cb(ev.target.result)
  reader.readAsDataURL(file)
}

/* =========================================================
   DEMO / RESET
   ========================================================= */
function fillDemo() {
  SFX.click()
  form.value = {
    ...form.value,
    name: 'Ankit Kumar',
    grade: '12',
    section: 'A',
    roll: '23F3000080',
    dob: '2005-12-19',
    blood: 'B+',
    gender: 'Male',
    phone: '9006516636',
    address: '12, MG Road, New Delhi - 110001',
    guardian: 'Rohit Kumar',
    validUntil: '2028-03',
  }
  showToast('Demo loaded', '🎲')
}

function loadBulkDemo() {
  SFX.click()
  bulkCsv.value = `Ankit Kumar, 12, A, 23F3000080, 2005-12-19, B+, 9006516636
Diya Patel, 12, A, 23F3000081, 2005-08-22, B+, 9006516637
Kabir Singh, 12, B, 23F3000082, 2005-03-10, A+, 9006516638
Meera Iyer, 12, B, 23F3000083, 2005-11-02, AB+, 9006516639
Rohan Verma, 11, A, 23F3000084, 2006-01-19, O-, 9006516640
Ananya Reddy, 11, A, 23F3000085, 2006-06-25, B-, 9006516641
Vivaan Joshi, 11, B, 23F3000086, 2006-09-08, A-, 9006516642
Ishita Nair, 11, B, 23F3000087, 2006-02-14, O+, 9006516643`
  showToast('Demo CSV loaded', '📚')
}

function downloadCsvTemplate() {
  SFX.click()
  const csv = `name, class, section, roll, dob, blood, phone
Ankit Kumar, 12, A, 23F3000080, 2005-12-19, B+, 9006516636
Diya Patel, 12, A, 23F3000081, 2005-08-22, B+, 9006516637`
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'student-template.csv'
  a.click()
  URL.revokeObjectURL(url)
  showToast('CSV template downloaded', '📄')
}

function resetSchool() {
  SFX.click()
  school.value = {
    logo: '',
    name: 'Educational Society',
    tagline: 'Excellence in Education · Est. 2019',
    director: 'Dr. Ankit Verma',
    contact: '+91 98765 43210 · info@edusociety.in',
    theme: 'royal-blue',
    showQr: true,
    showBarcode: true,
    showSignature: true,
  }
  showToast('School settings reset', '🔄')
}

/* =========================================================
   EXPORT: PNG + PDF + PRINT + SHARE
   ========================================================= */
async function ensureHtml2Canvas() {
  if (typeof window.html2canvas === 'undefined') {
    await new Promise(resolve => {
      const s = document.createElement('script')
      s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'
      s.onload = resolve
      s.onerror = resolve
      document.head.appendChild(s)
    })
  }
}

async function captureNode(node) {
  await ensureHtml2Canvas()
  if (typeof window.html2canvas !== 'function') throw new Error('html2canvas unavailable')
  await nextTick()

  const rect = node.getBoundingClientRect()
  const width = Math.round(rect.width) || 340
  const height = Math.round(rect.height) || 540

  // Wait for all images
  const imgs = node.querySelectorAll('img')
  await Promise.all(Array.from(imgs).map(img => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve()
    return new Promise(res => { img.onload = res; img.onerror = res })
  }))

  return await window.html2canvas(node, {
    backgroundColor: '#ffffff',
    scale: 4,
    useCORS: true,
    allowTaint: true,
    logging: false,
    width,
    height,
    windowWidth: width,
    windowHeight: height,
    scrollX: 0,
    scrollY: 0,
    onclone: (clonedDoc) => {
      const style = clonedDoc.createElement('style')
      style.textContent = `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        .card-shine { display: none !important; }
      `
      clonedDoc.head.appendChild(style)
    },
  })
}

async function downloadCard(type = 'png') {
  SFX.download()
  try {
    const front = await captureNode(exportFrontRef.value)
    const back = await captureNode(exportBackRef.value)

    if (type === 'png') {
      triggerDownload(front.toDataURL('image/png'), `${safeName()}-front.png`)
      setTimeout(() => triggerDownload(back.toDataURL('image/png'), `${safeName()}-back.png`), 250)
      showToast('Downloaded front + back! 🎉', '⬇️')
      SFX.success()
    } else if (type === 'pdf') {
      await ensureJsPdf()
      const { jsPDF } = window.jspdf
      // CR80 portrait: 54 x 86 mm
      const W = 54, H = 86
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [W, H] })

      pdf.addImage(front.toDataURL('image/png'), 'PNG', 0, 0, W, H)
      pdf.addPage([W, H], 'portrait')
      pdf.addImage(back.toDataURL('image/png'), 'PNG', 0, 0, W, H)

      pdf.save(`${safeName()}-id-card.pdf`)
      showToast('PDF downloaded! 📄', '📄')
      SFX.success()
    }
  } catch (err) {
    console.error('Export error:', err)
    showToast('Export failed. Try again.', '⚠️')
  }
}

function safeName() {
  return (form.value.name || 'student').replace(/\s+/g, '-').toLowerCase()
}

function triggerDownload(dataUrl, filename) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

async function ensureJsPdf() {
  if (typeof window.jspdf === 'undefined') {
    await new Promise(resolve => {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
      s.onload = resolve
      s.onerror = resolve
      document.head.appendChild(s)
    })
  }
}

async function printCard() {
  SFX.click()
  try {
    const front = await captureNode(exportFrontRef.value)
    const back = await captureNode(exportBackRef.value)

    const win = window.open('', '_blank')
    win.document.write(`
      <html><head><title>Print ID Card</title>
      <style>
        @page { size: auto; margin: 8mm; }
        body { margin: 0; padding: 0; background: #f5f5f5; font-family: sans-serif; text-align: center; }
        .card { display: block; margin: 12px auto; width: 2.125in; height: 3.375in;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2); border-radius: 8px; overflow: hidden; page-break-after: always; }
        @media print {
          body { background: white; }
          .card { box-shadow: none; margin: 0 auto; page-break-after: always; }
        }
      </style></head>
      <body>
        <img class="card" src="${front.toDataURL('image/png')}" />
        <img class="card" src="${back.toDataURL('image/png')}" />
        <script>window.onload = () => setTimeout(() => window.print(), 500)<\/script>
      </body></html>
    `)
    win.document.close()
  } catch (err) {
    showToast('Print failed', '⚠️')
  }
}

async function shareCard() {
  SFX.share()
  const text = `🪪 ID Card for ${form.value.name || 'Student'} · Class ${form.value.grade}-${form.value.section} · Roll ${form.value.roll} — Educational Society`

  try {
    const front = await captureNode(exportFrontRef.value)
    const blob = await new Promise(res => front.toBlob(res, 'image/png'))
    const file = new File([blob], `${safeName()}-id.png`, { type: 'image/png' })

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ title: 'Student ID Card', text, files: [file] })
      showToast('Shared! 🎉', '📤')
      return
    }

    if (navigator.share) {
      await navigator.share({ title: 'Student ID Card', text })
      showToast('Shared! 🎉', '📤')
      return
    }

    await navigator.clipboard.writeText(text)
    triggerDownload(front.toDataURL('image/png'), `${safeName()}-id.png`)
    showToast('Copied + downloaded 📋', '📋')
  } catch (err) {
    showToast('Sharing not supported', '⚠️')
  }
}

/* =========================================================
   BULK GENERATE
   ========================================================= */
async function generateBulk() {
  if (!bulkCount.value) return
  SFX.click()
  generating.value = true
  loadingProgress.value = 0
  loadingText.value = 'Preparing cards…'

  try {
    await ensureHtml2Canvas()
    await ensureJsZip()
    await ensureQrLib()
    await ensureBarcodeLib()

    const originalForm = { ...form.value }
    const zip = new window.JSZip()
    const total = bulkStudents.value.length

    for (let i = 0; i < total; i++) {
      const s = bulkStudents.value[i]
      loadingText.value = `Rendering ${i + 1} of ${total}…`
      loadingProgress.value = Math.round(((i + 1) / total) * 100)

      form.value = {
        ...form.value,
        name: s.name, grade: s.grade, section: s.section, roll: s.roll,
        dob: s.dob, blood: s.blood, phone: s.phone, photo: '',
      }
      await nextTick()

      // QR
      try {
        const payload = JSON.stringify({
          name: s.name || '', roll: s.roll || '', grade: s.grade || '',
          section: s.section || '', dob: s.dob || '', blood: s.blood || '',
          phone: s.phone || '', school: school.value.name || '',
        })
        const c = document.createElement('canvas')
        await window.QRCode.toCanvas(c, payload, {
          width: 256, margin: 1,
          color: { dark: '#0b1220', light: '#ffffff' },
          errorCorrectionLevel: 'M',
        })
        qrDataUrl.value = c.toDataURL('image/png')
      } catch (e) { qrDataUrl.value = '' }

      // Barcode
      if (school.value.showBarcode) {
        try {
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          window.JsBarcode(svg, (s.roll || '0000000').replace(/\s+/g, ''), {
            format: 'CODE128', width: 2, height: 60,
            displayValue: false, margin: 0,
            background: '#ffffff', lineColor: '#000000',
          })
          const svgStr = new XMLSerializer().serializeToString(svg)
          const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
          const url = URL.createObjectURL(blob)
          const img = new Image()
          await new Promise(res => {
            img.onload = () => {
              const cc = document.createElement('canvas')
              cc.width = img.width * 2 || 600
              cc.height = img.height * 2 || 120
              const ctx = cc.getContext('2d')
              ctx.fillStyle = '#ffffff'
              ctx.fillRect(0, 0, cc.width, cc.height)
              ctx.drawImage(img, 0, 0, cc.width, cc.height)
              barcodeDataUrl.value = cc.toDataURL('image/png')
              URL.revokeObjectURL(url)
              res()
            }
            img.onerror = () => { URL.revokeObjectURL(url); res() }
            img.src = url
          })
        } catch (e) { barcodeDataUrl.value = '' }
      }

      await nextTick()
      await new Promise(r => setTimeout(r, 100))

      // Capture FRONT + BACK
      const frontCanvas = await captureNode(exportFrontRef.value)
      const backCanvas = await captureNode(exportBackRef.value)
      const frontBlob = await new Promise(res => frontCanvas.toBlob(res, 'image/png'))
      const backBlob = await new Promise(res => backCanvas.toBlob(res, 'image/png'))
      const base = `${String(i + 1).padStart(3, '0')}-${(s.roll || s.name).replace(/\s+/g, '-')}`
      zip.file(`${base}-front.png`, frontBlob)
      zip.file(`${base}-back.png`, backBlob)
    }

    form.value = originalForm
    await nextTick()

    loadingText.value = 'Zipping…'
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(zipBlob)
    triggerDownload(url, `id-cards-${Date.now()}.zip`)
    URL.revokeObjectURL(url)

    showToast(`${total} cards downloaded! 🎉`, '📦')
    SFX.success()
  } catch (err) {
    console.error(err)
    showToast('Bulk generation failed', '⚠️')
  } finally {
    generating.value = false
    loadingProgress.value = 0
  }
}

async function ensureJsZip() {
  if (typeof window.JSZip === 'undefined') {
    await new Promise(resolve => {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
      s.onload = resolve
      s.onerror = resolve
      document.head.appendChild(s)
    })
  }
}

/* =========================================================
   LIFECYCLE
   ========================================================= */
onMounted(async () => {
  const savedSound = localStorage.getItem('id_sound')
  if (savedSound !== null) soundEnabled.value = savedSound === '1'

  loadFromStorage()

  if (!form.value.validUntil) {
    const d = new Date()
    d.setFullYear(d.getFullYear() + 2)
    form.value.validUntil = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  await ensureQrLib()
  await ensureBarcodeLib()
  await nextTick()
  await generateQrCode()
  await generateBarcode()
})
</script>

<style scoped>
/* =========================================================
   BASE
   ========================================================= */
.id-page {
  position: relative;
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
}

.bg-blobs { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.blob { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.22; }
.blob-1 { width: 500px; height: 500px; background: #f59e0b; top: -160px; left: -140px; animation: float1 16s ease-in-out infinite; }
.blob-2 { width: 460px; height: 460px; background: #10b981; bottom: -140px; right: -120px; animation: float2 18s ease-in-out infinite; }
.blob-3 { width: 380px; height: 380px; background: #1e40af; top: 40%; left: 50%; animation: float1 20s ease-in-out infinite reverse; }
@keyframes float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.1); } }
@keyframes float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,30px) scale(1.15); } }

/* HEADER */
.page-header {
  position: relative; z-index: 3;
  padding: 1.2rem 1.5rem;
  border-bottom-width: 1px;
  backdrop-filter: blur(12px);
}
.header-inner {
  max-width: 1500px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
  gap: 1rem;
}
.header-left { display: flex; align-items: center; gap: 14px; }
.logo-icon {
  font-size: 2rem; line-height: 1;
  filter: drop-shadow(0 0 16px rgba(251,191,36,0.5));
  animation: bob 3s ease-in-out infinite;
}
@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

.page-title {
  font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em;
  margin: 0; line-height: 1.2;
}
.grad-amber   { background: linear-gradient(120deg,#fbbf24,#f59e0b,#fcd34d); -webkit-background-clip: text; background-clip: text; color: transparent; }
.grad-emerald { background: linear-gradient(120deg,#10b981,#34d399,#059669); -webkit-background-clip: text; background-clip: text; color: transparent; }
.page-sub { font-size: 0.78rem; margin-top: 2px; }

.btn-icon {
  width: 40px; height: 40px; border-radius: 10px;
  border-width: 1px;
  cursor: pointer; font-size: 1.1rem;
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.btn-icon:hover { transform: scale(1.06); border-color: rgba(251,191,36,0.4); }

/* TABS */
.tabs-bar {
  position: relative; z-index: 2;
  padding: 0.7rem 1.5rem;
  border-bottom-width: 1px;
  backdrop-filter: blur(10px);
}
.tabs-inner {
  max-width: 1500px; margin: 0 auto;
  display: flex; gap: 6px;
  overflow-x: auto;
}
.tabs-inner::-webkit-scrollbar { display: none; }

.tab-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  background: transparent;
  border: none;
  color: inherit;
  font-weight: 600;
  font-size: 0.86rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  font-family: inherit;
  opacity: 0.7;
}
.tab-btn:hover { opacity: 1; background: rgba(251,191,36,0.08); }
.tab-btn.active {
  opacity: 1;
  background: linear-gradient(120deg,#fbbf24,#f59e0b);
  color: #0b1220;
}

/* MAIN GRID */
.main-grid {
  position: relative; z-index: 1;
  flex: 1;
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* FORM PANEL */
.form-panel {
  border-radius: 20px;
  border-width: 1px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 1.5rem;
  max-height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
}
.panel-head {
  display: flex; align-items: center; gap: 10px;
  padding: 1rem 1.2rem;
  border-bottom-width: 1px;
}
.panel-icon { font-size: 1.2rem; }
.panel-title { font-weight: 700; font-size: 1rem; flex: 1; }
.panel-action {
  background: transparent;
  border: none;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.2s;
}
.panel-action:hover { background: rgba(251,191,36,0.15); color: #fbbf24; }

.panel-body {
  padding: 1.2rem;
  overflow-y: auto;
  display: flex; flex-direction: column;
  gap: 1rem;
}
.panel-body::-webkit-scrollbar { width: 6px; }
.panel-body::-webkit-scrollbar-track { background: transparent; }
.panel-body::-webkit-scrollbar-thumb { background: rgba(120,120,120,0.25); border-radius: 3px; }

.control-group { display: flex; flex-direction: column; gap: 6px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.ctrl-label {
  font-size: 0.82rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: space-between;
}
.ctrl-hint { font-weight: 500; font-size: 0.72rem; }

.ctrl-input {
  padding: 0.7rem 0.9rem;
  border-radius: 10px;
  border-width: 1px;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
}
.ctrl-input:focus {
  border-color: #fbbf24;
  box-shadow: 0 0 0 3px rgba(251,191,36,0.2);
}
.ctrl-textarea { resize: vertical; min-height: 60px; font-family: inherit; }
.bulk-textarea { font-family: 'Monaco', 'Menlo', monospace; font-size: 0.78rem; line-height: 1.6; }

.photo-uploader { display: flex; gap: 12px; align-items: flex-start; }
.photo-preview {
  width: 90px; height: 110px;
  border-radius: 12px;
  border-width: 1px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.photo-preview img { width: 100%; height: 100%; object-fit: cover; }
.logo-preview { width: 80px; height: 80px; border-radius: 50%; }
.photo-empty {
  display: flex; flex-direction: column;
  align-items: center; gap: 4px;
  font-size: 0.7rem; text-align: center;
}
.photo-empty span:first-child { font-size: 1.4rem; }

.photo-buttons { display: flex; flex-direction: column; gap: 6px; }
.mini-btn {
  padding: 6px 12px;
  border-radius: 8px;
  border-width: 1px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}
.mini-btn:hover { transform: translateY(-1px); border-color: rgba(251,191,36,0.4); }
.primary-btn {
  background: linear-gradient(120deg,#fbbf24,#f59e0b);
  color: #0b1220;
  border: none;
  font-weight: 700;
}

.bulk-info { padding: 12px 14px; border-radius: 12px; border-width: 1px; }
.bulk-info-title { font-size: 0.85rem; font-weight: 700; margin-bottom: 6px; }
.bulk-info-list { margin: 0; padding-left: 18px; font-size: 0.78rem; line-height: 1.6; }
.bulk-info-list code {
  background: rgba(120,120,120,0.15);
  padding: 1px 5px; border-radius: 4px; font-size: 0.72rem;
}

.bulk-actions { display: flex; gap: 8px; flex-wrap: wrap; }

.toggle-group {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(120,120,120,0.06);
}
.toggle {
  width: 46px; height: 26px;
  border-radius: 999px;
  background: rgba(120,120,120,0.3);
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 0.25s;
  flex-shrink: 0;
}
.toggle.on { background: linear-gradient(120deg,#fbbf24,#f59e0b); }
.toggle-knob {
  position: absolute;
  top: 3px; left: 3px;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.25s cubic-bezier(0.3,1.4,0.5,1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.toggle.on .toggle-knob { transform: translateX(20px); }

.theme-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 6px; }
.theme-swatch {
  aspect-ratio: 1;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.theme-swatch:hover { transform: scale(1.12); }
.theme-swatch.active {
  border-color: #fbbf24;
  box-shadow: 0 0 0 2px rgba(251,191,36,0.5), 0 4px 14px rgba(251,191,36,0.4);
  transform: scale(1.12);
}

/* PREVIEW PANEL */
.preview-panel { display: flex; flex-direction: column; gap: 1.2rem; }
.preview-head {
  display: flex; justify-content: space-between; align-items: center;
  gap: 1rem; flex-wrap: wrap;
}
.preview-label { display: flex; flex-direction: column; gap: 2px; font-weight: 700; font-size: 0.95rem; }
.preview-hint { font-size: 0.72rem; font-weight: 500; }
.preview-actions { display: flex; gap: 6px; flex-wrap: wrap; }

.cards-stage {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
.id-card-wrap { display: flex; justify-content: center; }

/* =========================================================
   ID CARD — WHITE PROFESSIONAL
   ========================================================= */
.id-card {
  position: relative;
  width: 340px;
  height: 540px;
  border-radius: 20px;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 30px 60px -20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  padding: 18px 20px;
  font-family: 'Inter', system-ui, sans-serif;
  transition: transform 0.3s;
  background-color: #1e40af;
  box-sizing: border-box;
}
.id-card:hover { transform: translateY(-4px); }

.card-pattern {
  position: absolute; inset: 0;
  pointer-events: none;
  z-index: 0;
}
.pattern-dots {
  background-image: radial-gradient(rgba(255,255,255,0.15) 1.2px, transparent 1.2px);
  background-size: 18px 18px;
}
.pattern-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
  background-size: 20px 20px;
}
.pattern-rays {
  background: conic-gradient(from 0deg at 50% 0%,
    rgba(255,255,255,0.09) 0deg 15deg,
    transparent 15deg 30deg);
  opacity: 0.7;
}

.card-shine {
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(
    115deg, transparent 42%,
    rgba(255,255,255,0.12) 48%,
    rgba(255,255,255,0.2) 50%,
    rgba(255,255,255,0.12) 52%,
    transparent 58%
  );
  animation: shine 7s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}
@keyframes shine {
  0%, 100% { transform: translateX(-40%) rotate(0deg); opacity: 0; }
  50%      { transform: translateX(40%) rotate(0deg); opacity: 1; }
}

/* HEADER */
.card-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
}
.card-logo {
  width: 42px; height: 42px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  overflow: hidden;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.card-logo img { width: 100%; height: 100%; object-fit: cover; }
.logo-placeholder {
  font-size: 0.75rem;
  font-weight: 900;
  color: #fbbf24;
  letter-spacing: -0.03em;
}

.card-school { flex: 1; min-width: 0; overflow: hidden; }
.card-school-name {
  font-size: 0.85rem;
  font-weight: 800;
  line-height: 1.15;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.card-school-tag {
  font-size: 0.58rem;
  opacity: 0.85;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.card-divider {
  position: relative;
  z-index: 2;
  height: 2px;
  margin: 10px 0 12px;
  background: linear-gradient(90deg, transparent, rgba(251,191,36,0.7), rgba(255,255,255,0.5), rgba(16,185,129,0.7), transparent);
  border-radius: 2px;
}

/* BODY */
.card-body {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-height: 0;
}

.card-photo {
  width: 118px;
  height: 118px;
  border-radius: 14px;
  overflow: hidden;
  border: 3px solid rgba(255,255,255,0.6);
  background: rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 24px rgba(0,0,0,0.25);
  flex-shrink: 0;
}
.card-photo img { width: 100%; height: 100%; object-fit: cover; }
.photo-fallback {
  font-size: 3rem;
  font-weight: 900;
  color: rgba(255,255,255,0.65);
}

.card-info { width: 100%; text-align: center; }
.card-name {
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 4px;
}

.card-meta-row {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.meta-chip {
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.28);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
}
.blood-chip {
  background: rgba(239,68,68,0.35);
  border-color: rgba(239,68,68,0.6);
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.14);
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.72rem;
  gap: 10px;
  line-height: 1.3;
}
.detail-label {
  opacity: 0.75;
  font-weight: 500;
  flex-shrink: 0;
}
.detail-value {
  font-weight: 700;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.68rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  flex: 1;
  min-width: 0;
}

/* FRONT FOOTER (Barcode) */
.card-footer {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed rgba(255,255,255,0.22);
}
.card-barcode { flex: 1; min-width: 0; }
.barcode-img {
  width: 100%;
  height: 42px;
  object-fit: fill;
  background: #fff;
  border-radius: 4px;
  padding: 2px;
  display: block;
  box-sizing: border-box;
}
.barcode-text {
  font-size: 0.62rem;
  font-family: 'Monaco', monospace;
  text-align: center;
  opacity: 0.9;
  letter-spacing: 0.12em;
  margin-top: 3px;
}

/* BACK CARD */
.back-header {
  position: relative;
  z-index: 2;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.22);
  margin-bottom: 12px;
}
.back-title {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #fbbf24;
}

.back-body {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}
.back-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.12);
}
.back-label {
  font-size: 0.6rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}
.back-value {
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
  overflow-wrap: anywhere;
  word-break: break-word;
}

/* QR SECTION (BACK) */
.back-qr-section {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin: auto 0 12px;
  padding: 10px 0;
}
.back-qr-frame {
  width: 140px;
  height: 140px;
  background: #fff;
  border-radius: 12px;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}
.back-qr-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.back-qr-hint {
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.75;
  font-weight: 600;
}

/* SIGNATURE */
.back-signature {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-top: auto;
  padding-top: 8px;
}
.sig-line {
  height: 1px;
  background: rgba(255,255,255,0.45);
  width: 140px;
  margin: 0 auto 5px;
}
.sig-name {
  font-size: 0.78rem;
  font-weight: 700;
  font-style: italic;
}
.sig-title {
  font-size: 0.6rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-top: 1px;
}

/* =========================================================
   HIDDEN EXPORT STAGING
   ========================================================= */
.export-staging {
  position: fixed;
  left: -99999px;
  top: 0;
  width: 340px;
  z-index: -1;
  pointer-events: none;
}
.export-staging .id-card {
  box-shadow: none;
  transform: none;
  margin: 0 0 20px 0;
  border-radius: 20px;
}
.export-staging .card-shine { display: none !important; }
.export-staging .export-card { color: #fff; }

/* =========================================================
   BULK MINI PREVIEW
   ========================================================= */
.bulk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}
.mini-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 6px 16px -4px rgba(0,0,0,0.3);
  transition: transform 0.2s;
}
.mini-card:hover { transform: translateY(-2px); }
.mini-photo {
  width: 40px; height: 40px;
  border-radius: 8px;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.35);
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 1.1rem; flex-shrink: 0;
}
.mini-info { flex: 1; min-width: 0; }
.mini-name {
  font-size: 0.82rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mini-meta {
  font-size: 0.68rem;
  opacity: 0.8;
  font-family: 'Monaco', monospace;
}
.bulk-more {
  grid-column: 1/-1;
  text-align: center;
  padding: 10px;
  font-size: 0.82rem;
  font-weight: 600;
  font-style: italic;
}
.bulk-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 4rem 1rem;
  text-align: center;
}
.empty-icon {
  font-size: 3.5rem;
  filter: drop-shadow(0 0 20px rgba(251,191,36,0.4));
  animation: bob 2.5s ease-in-out infinite;
}

/* THEME PREVIEWS */
.theme-previews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}
.theme-preview-card {
  position: relative;
  padding: 20px 14px;
  border-radius: 16px;
  color: #fff;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: 0 10px 24px -8px rgba(0,0,0,0.4);
  border: 2px solid transparent;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
}
.theme-preview-card:hover { transform: translateY(-3px); }
.theme-preview-card.active {
  border-color: #fbbf24;
  box-shadow: 0 0 0 2px rgba(251,191,36,0.4), 0 10px 24px -8px rgba(0,0,0,0.4);
}
.tp-sample-logo { font-size: 1.5rem; font-weight: 900; color: #fbbf24; }
.tp-sample-name { font-size: 0.8rem; font-weight: 700; opacity: 0.95; }
.tp-check {
  position: absolute;
  top: 8px; right: 8px;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: #fbbf24;
  color: #0b1220;
  font-weight: 900;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem;
}

.settings-tips { padding: 14px 16px; border-radius: 14px; border-width: 1px; }
.tips-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 8px; }
.tips-list { margin: 0; padding-left: 18px; font-size: 0.8rem; line-height: 1.65; }

/* FOOTER */
.page-footer {
  position: relative; z-index: 1;
  padding: 1.2rem 1.5rem 1.5rem;
  border-top-width: 1px;
  text-align: center;
}
.credit { font-size: 0.78rem; }
.credit strong { color: #fbbf24; }

/* TOAST */
.toast {
  position: fixed;
  bottom: 2rem; left: 50%;
  transform: translateX(-50%);
  display: flex; align-items: center; gap: 10px;
  padding: 0.85rem 1.4rem;
  border-radius: 14px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border: 1px solid rgba(251,191,36,0.4);
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.88rem;
  z-index: 200;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6), 0 0 30px rgba(251,191,36,0.2);
}
.toast-icon { font-size: 1.2rem; }
.toast-fade-enter-active, .toast-fade-leave-active { transition: all 0.3s cubic-bezier(0.2,0.9,0.4,1.1); }
.toast-fade-enter-from, .toast-fade-leave-to { opacity: 0; transform: translate(-50%, 20px); }

/* LOADING OVERLAY */
.loading-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(2,6,23,0.75);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
}
.loading-box {
  padding: 2rem 2.5rem;
  border-radius: 20px;
  border-width: 1px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  min-width: 280px;
  box-shadow: 0 40px 80px -20px rgba(0,0,0,0.7);
}
.big-spinner {
  width: 48px; height: 48px;
  border: 3px solid rgba(251,191,36,0.15);
  border-top-color: #fbbf24;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.loading-title { font-weight: 700; font-size: 0.95rem; }
.loading-bar { width: 240px; height: 6px; border-radius: 999px; overflow: hidden; }
.loading-fill {
  height: 100%;
  background: linear-gradient(90deg,#fbbf24,#10b981);
  transition: width 0.3s ease;
}
.loading-pct { font-weight: 700; font-size: 0.85rem; }

/* RESPONSIVE */
@media (max-width: 1100px) { .main-grid { grid-template-columns: 380px 1fr; } }
@media (max-width: 960px) {
  .main-grid { grid-template-columns: 1fr; padding: 1rem; }
  .form-panel { position: static; max-height: none; }
  .cards-stage { flex-direction: column; align-items: center; }
  .id-card { width: 320px; height: 510px; }
}
@media (max-width: 640px) {
  .page-title { font-size: 1.15rem; }
  .page-sub { display: none; }
  .theme-grid { grid-template-columns: repeat(4, 1fr); }
  .form-row { grid-template-columns: 1fr; }
  .id-card { width: 290px; height: 470px; padding: 14px 16px; }
  .card-photo { width: 100px; height: 100px; }
  .card-name { font-size: 0.95rem; }
  .tab-btn { padding: 0.5rem 0.9rem; font-size: 0.78rem; }
}

/* PRINT */
@media print {
  .page-header, .tabs-bar, .form-panel, .page-footer,
  .bg-blobs, .preview-head, .preview-actions, .toast,
  .export-staging {
    display: none !important;
  }
  .main-grid { grid-template-columns: 1fr; padding: 0; }
  .cards-stage { gap: 10px; }
  .id-card { box-shadow: none; page-break-inside: avoid; }
}
</style>