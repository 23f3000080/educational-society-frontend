<template>
    <div class="about-page bg-[#fff8ef] text-[#1b2b34] dark:bg-[#09111a] dark:text-[#dbeaf2]">
        <!-- Hero (Distinct from Home) -->
        <section class="relative overflow-hidden border-b border-slate-300/50 dark:border-slate-700/60">
            <div class="absolute inset-0 about-hero-bg"></div>
            <div class="absolute inset-0 about-noise opacity-40"></div>

            <div class="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
                <div class="grid gap-8 lg:grid-cols-12">
                    <div class="lg:col-span-8">
                        <div class="rounded-3xl border border-slate-300/70 bg-white/80 p-6 shadow-xl backdrop-blur-sm sm:p-8 dark:border-slate-700 dark:bg-[#0f1a27]/85">
                            <span class="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-amber-800 dark:border-amber-300/25 dark:bg-amber-400/10 dark:text-amber-200">
                                Our Identity
                            </span>

                            <h1 class="mt-4 text-4xl font-black leading-tight text-[#1f2937] sm:text-5xl lg:text-6xl dark:text-slate-100">
                                Not Just a Coaching Institute,
                                <span class="text-transparent bg-clip-text bg-linear-to-r from-[#ea580c] via-[#fb923c] to-[#f59e0b]">A Learning Movement</span>
                            </h1>

                            <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                                Educational Society is built around mentorship, discipline, and outcome-focused learning. We help students transform potential into performance with structured support at every step.
                            </p>

                            <div class="mt-7 flex flex-col gap-3 sm:flex-row">
                                <router-link to="/courses" class="inline-flex items-center justify-center rounded-xl bg-[#1f2937] px-6 py-3 font-bold text-white transition hover:bg-[#111827] dark:bg-amber-500 dark:text-[#1b1308] dark:hover:bg-amber-400">
                                    View Courses
                                </router-link>
                                <router-link to="/contact" class="inline-flex items-center justify-center rounded-xl border border-slate-400/50 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                                    Talk to Mentor
                                </router-link>
                            </div>

                            <div class="mt-7 grid gap-3 sm:grid-cols-3">
                                <div class="rounded-2xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                                    <p class="text-3xl font-black text-slate-900 dark:text-slate-100">2019</p>
                                    <p class="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">Founded</p>
                                </div>
                                <div class="rounded-2xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                                    <p class="text-3xl font-black text-slate-900 dark:text-slate-100">10K+</p>
                                    <p class="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">Hours Taught</p>
                                </div>
                                <div class="rounded-2xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                                    <p class="text-3xl font-black text-slate-900 dark:text-slate-100">3 Pillars</p>
                                    <p class="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">Concepts, Practice, Mentoring</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-4">
                        <div class="relative h-full min-h-96 overflow-hidden rounded-3xl border border-slate-300 bg-[#111827] p-4 shadow-2xl dark:border-slate-700">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=60"
                                alt="Mentor teaching students"
                                class="h-full w-full rounded-2xl object-cover opacity-90"
                            />
                            <div class="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-black/50 p-4 backdrop-blur-sm">
                                <p class="text-xs uppercase tracking-wide text-amber-200">What makes us different</p>
                                <p class="mt-1 text-sm font-semibold text-white">Small-batch guidance with measurable weekly progress.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Story + Values -->
        <section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div class="grid gap-8 lg:grid-cols-12">
                <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg lg:col-span-7 dark:border-slate-700 dark:bg-slate-900">
                    <h2 class="text-3xl font-black text-[#143541] dark:text-[#e4f7ff]">Our Story</h2>
                    <p class="mt-4 text-slate-600 dark:text-slate-300">
                        Educational Society began with one belief: quality education should not depend on location or background. We built a learning ecosystem where students can access clear concepts, regular guidance, and confidence-building practice.
                    </p>
                    <p class="mt-3 text-slate-600 dark:text-slate-300">
                        Today, we continue to blend foundational teaching with modern tools to make every class more engaging, measurable, and impactful.
                    </p>
                </article>

                <article class="rounded-3xl border border-amber-200 bg-linear-to-br from-amber-100 to-orange-100 p-6 shadow-lg lg:col-span-5 dark:border-amber-400/30 dark:from-amber-600/20 dark:to-orange-500/10">
                    <h3 class="text-2xl font-black text-[#5e3e12] dark:text-amber-200">Our Core Values</h3>
                    <ul class="mt-4 space-y-3">
                        <li v-for="value in values" :key="value.title" class="rounded-xl bg-white/65 p-3 dark:bg-black/15">
                            <p class="font-bold text-[#4c3415] dark:text-amber-100">{{ value.title }}</p>
                            <p class="text-sm text-[#6a4a24] dark:text-amber-100/80">{{ value.desc }}</p>
                        </li>
                    </ul>
                </article>
            </div>
        </section>

        <!-- Team -->
        <section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
            <div class="mb-8 text-center">
                <h2 class="text-3xl font-black text-[#143541] dark:text-[#e4f7ff]">People Behind The Vision</h2>
                <p class="mt-2 text-slate-600 dark:text-slate-300">Meet the mentors shaping meaningful student outcomes.</p>
            </div>

            <div
                class="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
                @mouseenter="pauseTeamAutoSlide"
                @mouseleave="startTeamAutoSlide"
            >
                <div
                    class="flex transition-transform duration-500 ease-out"
                    :style="{ transform: `translateX(-${currentTeamIndex * 100}%)` }"
                >
                    <article
                        v-for="member in team"
                        :key="member.name"
                        class="w-full shrink-0 p-7 sm:p-10"
                    >
                        <span class="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">
                            {{ member.role }}
                        </span>
                        <h3 class="mt-4 text-3xl font-black text-[#0d4e63] dark:text-cyan-200">{{ member.name }}</h3>
                        <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{{ member.quote }}</p>

                        <div class="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
                            <p class="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Join Teachers On</p>
                            <div class="mt-3 flex items-center gap-3">
                                <a
                                    v-for="social in member.socials"
                                    :key="social.label"
                                    :href="social.url"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                                    :aria-label="`${member.name} ${social.label}`"
                                >
                                    <i :class="social.icon"></i>
                                </a>
                            </div>
                        </div>
                    </article>
                </div>

                <button
                    @click="prevTeamMember"
                    class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-white dark:bg-slate-800 dark:text-slate-200"
                    aria-label="Previous member"
                >
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button
                    @click="nextTeamMember"
                    class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow-md transition hover:bg-white dark:bg-slate-800 dark:text-slate-200"
                    aria-label="Next member"
                >
                    <i class="fa-solid fa-chevron-right"></i>
                </button>

                <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    <button
                        v-for="(member, index) in team"
                        :key="member.name + '-dot'"
                        @click="goToTeamMember(index)"
                        class="h-2.5 rounded-full transition-all"
                        :class="index === currentTeamIndex ? 'w-7 bg-amber-500' : 'w-2.5 bg-slate-300 dark:bg-slate-600'"
                        :aria-label="`Go to ${member.name}`"
                    ></button>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="mx-4 mb-10 rounded-3xl bg-linear-to-r from-[#0d4e63] via-[#0f6b7b] to-[#ff8b5e] px-6 py-12 text-center text-white shadow-2xl sm:mx-6 lg:mx-8">
            <h2 class="text-3xl font-black">Let’s Build Your Success Story</h2>
            <p class="mx-auto mt-3 max-w-2xl text-white/90">Start your journey with a learning experience built around guidance, consistency, and growth.</p>
            <router-link to="/signup" class="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-[#0d4e63] transition hover:bg-slate-100">
                Get Started Today
            </router-link>
        </section>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const values = [
    {
        title: "Student First",
        desc: "Every decision starts with what helps students learn better.",
    },
    {
        title: "Clarity Over Complexity",
        desc: "We simplify difficult concepts without compromising depth.",
    },
    {
        title: "Consistency Wins",
        desc: "Regular practice and feedback drive long-term success.",
    },
];

const team = [
    {
        name: "Ankit Kumar",
        role: "Director",
        quote: "We are committed to making quality education practical, accessible, and future-ready.",
        socials: [
            { label: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com" },
            { label: "YouTube", icon: "fa-brands fa-youtube", url: "https://www.youtube.com" },
            { label: "Instagram", icon: "fa-brands fa-instagram", url: "https://www.instagram.com" },
        ],
    },
    {
        name: "Priya Jha",
        role: "Senior Teacher",
        quote: "Mentorship is not only about teaching concepts, but building confidence every day.",
        socials: [
            { label: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com" },
            { label: "YouTube", icon: "fa-brands fa-youtube", url: "https://www.youtube.com" },
            { label: "Instagram", icon: "fa-brands fa-instagram", url: "https://www.instagram.com" },
        ],
    },
    {
        name: "Prince Raj",
        role: "Mentor",
        quote: "A growth mindset and disciplined routine can transform every learner’s journey.",
        socials: [
            { label: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com" },
            { label: "YouTube", icon: "fa-brands fa-youtube", url: "https://www.youtube.com" },
            { label: "Instagram", icon: "fa-brands fa-instagram", url: "https://www.instagram.com" },
        ],
    },
];

const currentTeamIndex = ref(0);
let teamAutoSlideInterval = null;

const nextTeamMember = () => {
    currentTeamIndex.value = (currentTeamIndex.value + 1) % team.length;
};

const prevTeamMember = () => {
    currentTeamIndex.value = (currentTeamIndex.value - 1 + team.length) % team.length;
};

const goToTeamMember = (index) => {
    currentTeamIndex.value = index;
    restartTeamAutoSlide();
};

const startTeamAutoSlide = () => {
    pauseTeamAutoSlide();
    teamAutoSlideInterval = setInterval(nextTeamMember, 5000);
};

const pauseTeamAutoSlide = () => {
    if (teamAutoSlideInterval) {
        clearInterval(teamAutoSlideInterval);
        teamAutoSlideInterval = null;
    }
};

const restartTeamAutoSlide = () => {
    pauseTeamAutoSlide();
    startTeamAutoSlide();
};

onMounted(() => {
    startTeamAutoSlide();
});

onBeforeUnmount(() => {
    pauseTeamAutoSlide();
});
</script>

<style scoped>
.about-hero-bg {
    background: linear-gradient(135deg, #fff6e5 0%, #ffe7c2 38%, #f3f4f6 70%, #dbeafe 100%);
}

.about-noise {
    background-image: radial-gradient(rgba(17, 24, 39, 0.08) 1px, transparent 1px);
    background-size: 14px 14px;
}
</style>
