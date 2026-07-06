<!-- CodeSlicer.vue -->
<template>
  <div class="code-slicer-wrapper" :class="{ 'dark-mode': isDark }">
    <pre><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  isDark: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
    default: 'javascript'
  }
});

const highlightedCode = computed(() => {
  // If code contains literal \n, replace with actual newlines
  let processedCode = props.code;
  
  // Replace literal \n with actual newlines
  if (processedCode.includes('\\n')) {
    processedCode = processedCode.replace(/\\n/g, '\n');
  }
  
  // Basic syntax highlighting (you can expand this)
  return processedCode
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
    .replace(/ {2}/g, '&nbsp;&nbsp;')
    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
});
</script>

<style scoped>
.code-slicer-wrapper {
  background: #1e1e1e;
  border-radius: 6px;
  margin: 0.5rem 0;
  overflow: hidden;
}

.code-slicer-wrapper.dark-mode {
  background: #0a0a0a;
}

.code-slicer-wrapper pre {
  margin: 0;
  padding: 0.75rem 1rem;
  overflow-x: auto;
}

.code-slicer-wrapper code {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1.8;
  color: #d4d4d4;
  white-space: pre-wrap;
  word-break: break-word;
}

.code-slicer-wrapper.dark-mode code {
  color: #e2e8f0;
}

/* Optional: Add syntax highlighting colors */
.code-slicer-wrapper code .keyword {
  color: #569cd6;
}

.code-slicer-wrapper code .string {
  color: #ce9178;
}

.code-slicer-wrapper code .comment {
  color: #6a9955;
}

.code-slicer-wrapper code .function {
  color: #dcdcaa;
}

.code-slicer-wrapper code .number {
  color: #b5cea8;
}
</style>