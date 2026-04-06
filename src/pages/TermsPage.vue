<template>
  <div class="min-h-screen bg-[radial-gradient(circle_at_top,#e0f2fe_0%,#f8fafc_42%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_55%,#020617_100%)] text-slate-900 dark:text-slate-100">
    <section class="relative overflow-hidden border-b border-cyan-100/70 dark:border-slate-800">
      <div class="absolute -top-12 -left-16 h-56 w-56 rounded-full bg-cyan-300/40 blur-3xl dark:bg-cyan-500/20"></div>
      <div class="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-500/20"></div>

      <div class="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div class="inline-flex items-center gap-2 rounded-full border border-cyan-300/70 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-cyan-700 shadow-sm dark:border-cyan-700 dark:bg-slate-900/70 dark:text-cyan-300">
          EDUCATIONAL SOCIETY
        </div>

        <h1 class="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
          Terms and
          <span class="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300">Conditions</span>
        </h1>

        <p class="mt-5 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
          These terms explain how students, parents, and guardians can use our learning platform, classes, tests, assignments, and support services safely and fairly.
        </p>

        <div class="mt-8 flex flex-wrap gap-3 text-sm">
          <span class="rounded-full bg-cyan-100 px-3 py-1.5 font-medium text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-200">Classes 6 to 12</span>
          <span class="rounded-full bg-blue-100 px-3 py-1.5 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">Coding Programs</span>
          <span class="rounded-full bg-indigo-100 px-3 py-1.5 font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">Tests and Assignments</span>
        </div>
      </div>
    </section>

    <main class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-12">
        <aside class="lg:col-span-4">
          <div class="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900/85">
            <h2 class="text-lg font-bold">Quick Overview</h2>
            <ul class="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li>Enrollment means agreement with these terms.</li>
              <li>Student account credentials must remain private.</li>
              <li>Course materials are for personal learning use only.</li>
              <li>Discipline and respectful behavior are mandatory.</li>
              <li>Policy updates may be posted periodically.</li>
            </ul>

            <div class="mt-6 rounded-2xl bg-slate-100 p-4 text-sm dark:bg-slate-800">
              <p class="font-semibold text-slate-800 dark:text-slate-100">Need help understanding any clause?</p>
              <a href="mailto:clearupsol015@gmail.com" class="mt-2 inline-block font-semibold text-cyan-700 hover:underline dark:text-cyan-300">
                clearupsol015@gmail.com
              </a>
            </div>
          </div>
        </aside>

        <section class="lg:col-span-8">
          <div class="space-y-5">
            <article
              v-for="(section, index) in sections"
              :key="section.title"
              class="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg transition-shadow hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/85"
            >
              <p class="text-xs font-semibold tracking-[0.24em] text-cyan-700 dark:text-cyan-300">CLAUSE {{ index + 1 }}</p>
              <h3 class="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{{ section.title }}</h3>
              <p class="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{{ section.content }}</p>
            </article>
          </div>

          <div class="mt-8 rounded-3xl border border-indigo-200 bg-indigo-50 p-6 text-sm text-indigo-900 dark:border-indigo-700 dark:bg-indigo-900/25 dark:text-indigo-100">
            <p class="font-semibold">Policy Effective Date</p>
            <p class="mt-1">These terms apply to all users accessing Educational Society learning services from April 2026 onward.</p>
          </div>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from '../components/base/Footer.vue'

const sections = [
  {
    title: 'Enrollment and Eligibility',
    content:
      'Students enrolling in school or skill courses must provide accurate details. For minors, a parent or guardian is expected to supervise account usage and communication with our team.',
  },
  {
    title: 'Student Account and Login Security',
    content:
      'Each account is for one learner only. You must keep your password, OTP, and login credentials private. Any activity done through your account will be considered your responsibility.',
  },
  {
    title: 'Classroom and Platform Conduct',
    content:
      'Respectful behavior is required in live classes, doubt sessions, assignments, and discussions. Abuse, cheating, harassment, or disruptive conduct can lead to suspension of access.',
  },
  {
    title: 'Content Usage and Copyright',
    content:
      'Videos, notes, tests, assignments, and downloadable materials are for personal educational use. Re-sharing, selling, recording, or publishing our content without written permission is prohibited.',
  },
  {
    title: 'Fees, Payments, and Access',
    content:
      'Course access is activated after successful payment confirmation. Fee terms, validity, and any applicable offers are displayed at enrollment. Refund terms follow the separate refund policy page.',
  },
  {
    title: 'Assessments and Results',
    content:
      'Tests and assignments may include schedule windows, due dates, and attempt limits. Students are responsible for timely submissions. Results and progress data are published based on platform rules.',
  },
  {
    title: 'Support and Policy Updates',
    content:
      'Students may raise support queries from the platform. We may revise terms to improve compliance, safety, or academic operations. Continued use after updates means acceptance of revised terms.',
  },
]
</script>
