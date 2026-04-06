<template>
  <div class="min-h-screen bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_38%)] dark:bg-[linear-gradient(180deg,#0b1220_0%,#020617_40%)] text-slate-900 dark:text-slate-100">
    <section class="relative overflow-hidden border-b border-cyan-100 dark:border-slate-800">
      <div class="absolute -left-20 top-0 h-64 w-64 rounded-full bg-sky-300/35 blur-3xl dark:bg-sky-500/20"></div>
      <div class="absolute right-0 top-10 h-72 w-72 rounded-full bg-emerald-300/35 blur-3xl dark:bg-emerald-500/20"></div>

      <div class="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <span class="inline-flex rounded-full border border-emerald-300 bg-white/85 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-emerald-700 dark:border-emerald-700 dark:bg-slate-900/75 dark:text-emerald-300">
          STUDENT PRIVACY AND SAFETY
        </span>

        <h1 class="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
          Privacy
          <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 via-cyan-600 to-blue-600 dark:from-emerald-300 dark:via-cyan-300 dark:to-blue-300">Policy</span>
        </h1>

        <p class="mt-5 max-w-3xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
          Educational Society is committed to responsible handling of student and parent data across admissions, learning access, tests, assignments, and support communication.
        </p>

        <p class="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Last updated: April 2026</p>
      </div>
    </section>

    <main class="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8">
      <aside class="lg:col-span-4">
        <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900/85">
          <h2 class="text-lg font-bold">Your Data Rights</h2>
          <div class="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>Request profile corrections</p>
            <p>Ask how data is used</p>
            <p>Opt out of promotional updates</p>
            <p>Raise privacy concerns anytime</p>
          </div>

          <div class="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100">
            <p class="font-semibold">Privacy contact</p>
            <a href="mailto:clearupsol015@gmail.com" class="mt-2 inline-block font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
              clearupsol015@gmail.com
            </a>
          </div>
        </div>
      </aside>

      <section class="space-y-5 lg:col-span-8">
        <article
          v-for="(section, index) in sections"
          :key="section.title"
          class="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900/85"
        >
          <p class="text-xs font-semibold tracking-[0.24em] text-emerald-700 dark:text-emerald-300">SECTION {{ index + 1 }}</p>
          <h3 class="mt-2 text-2xl font-bold">{{ section.title }}</h3>
          <p class="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{{ section.content }}</p>
        </article>

        <div class="rounded-3xl border border-blue-200 bg-blue-50 p-6 text-sm text-blue-900 dark:border-blue-700 dark:bg-blue-900/25 dark:text-blue-100">
          We never sell student personal information. Data sharing is limited to service delivery, payment processing, legal compliance, and safety requirements.
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from '../components/base/Footer.vue'

const sections = [
  {
    title: 'Information We Collect',
    content:
      'We collect basic identity and contact details such as student name, email, mobile number, guardian details, and profile data required for enrollment, communication, and academic operations.',
  },
  {
    title: 'Learning and Academic Data',
    content:
      'To support education quality, we store course enrollments, attendance activity, assignment submissions, test attempts, scores, and progress records visible inside the student dashboard.',
  },
  {
    title: 'Payment and Transaction Data',
    content:
      'Course fee payments are processed via secure payment partners. We store only required transaction references and payment status information to activate course access and manage billing support.',
  },
  {
    title: 'How We Use Data',
    content:
      'Data is used to deliver classes, run assessments, send learning updates, issue support responses, verify accounts, improve course quality, and maintain platform safety and reliability.',
  },
  {
    title: 'Data Sharing and Disclosure',
    content:
      'We do not sell personal data. Limited sharing may occur with trusted service providers, payment systems, and legal authorities when lawfully required or to protect student and platform safety.',
  },
  {
    title: 'Retention and Security',
    content:
      'We apply reasonable technical and administrative safeguards. Data is retained as needed for active learning, compliance, dispute handling, and educational records, then removed or minimized where possible.',
  },
  {
    title: 'Student and Parent Rights',
    content:
      'You may request access, correction, or deletion of profile details, ask questions about processing practices, and opt out of marketing communication while still receiving mandatory service updates.',
  },
]
</script>
