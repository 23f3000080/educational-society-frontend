<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 transition-colors duration-200">
    <div class="flex flex-col lg:flex-row lg:items-center gap-3">
      <div class="flex-1">
        <div class="relative">
          <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
          <input
            v-model="query"
            type="text"
            placeholder="Search by name or email..."
            class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            @input="$emit('search', query)"
          />
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <select
          v-model="status"
          class="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          @change="$emit('status-change', status)"
        >
          <option value="all">All Status</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>

        <select
          v-model="sort"
          class="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          @change="$emit('sort-change', sort)"
        >
          <option value="name">Sort by Name</option>
          <option value="score_high">Score: High to Low</option>
          <option value="score_low">Score: Low to High</option>
          <option value="date_new">Date: Newest First</option>
          <option value="date_old">Date: Oldest First</option>
        </select>

        <span class="inline-flex items-center px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-lg">
          {{ count }} submissions
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
  filterStatus: {
    type: String,
    default: 'all',
  },
  sortBy: {
    type: String,
    default: 'name',
  },
  count: {
    type: Number,
    required: true,
  },
})

defineEmits(['search', 'status-change', 'sort-change'])

const query = ref(props.searchQuery)
const status = ref(props.filterStatus)
const sort = ref(props.sortBy)

watch(() => props.searchQuery, value => { query.value = value })
watch(() => props.filterStatus, value => { status.value = value })
watch(() => props.sortBy, value => { sort.value = value })
</script>