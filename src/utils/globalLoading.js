import { computed, ref } from 'vue'

const activeRequestCount = ref(0)

export function startGlobalLoading() {
  activeRequestCount.value += 1
}

export function stopGlobalLoading() {
  activeRequestCount.value = Math.max(0, activeRequestCount.value - 1)
}

export const isGlobalLoading = computed(() => activeRequestCount.value > 0)
