<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  text: string
  time: string
  sender: string
  speakText: (text: string) => void
}>()
</script>

<template>
  <div class="group relative mt-3 flex flex-col" :class="sender === 'user' ? 'items-end' : 'items-start'">
    <div
      class="relative max-w-1/2 break-words rounded-lg px-4 py-2 text-start shadow"
      :class="sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'"
    >
      {{ text }}
      <button
        class="absolute top-5 opacity-0 transition-opacity duration-300 -translate-y-1/2 group-hover:opacity-100"
        :class="sender === 'user' ? '-left-8' : '-right-8'"
        @click="speakText(text)"
      >
        <Icon icon="heroicons-outline:speaker-wave" class="text-lg text-gray-500 hover:text-gray-700" />
      </button>
    </div>

    <div class="text-xs text-gray-500">
      {{ time }}
    </div>
  </div>
</template>
