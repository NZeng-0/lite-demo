<script setup lang="ts" generic="T extends any, O extends any">
import { Icon } from '@iconify/vue'

defineProps({
  show: Boolean,
})

const emit = defineEmits(['close'])
</script>

<template>
  <div
    class="fixed right-0 top-0 h-full w-130 flex flex-col transform bg-white shadow-lg transition-transform duration-300"
    :class="show ? 'translate-x-0' : 'translate-x-full'"
  >
    <!-- 关闭按钮 -->
    <div class="p-4 text-right">
      <button class="text-lg text-gray-700 font-bold" @click="emit('close')">
        <Icon icon="heroicons-outline:x" />
      </button>
    </div>

    <!-- 聊天窗口主体，占满剩余高度 -->
    <div class="flex-1 overflow-hidden">
      <TheChat class="h-full flex flex-col" />
    </div>
  </div>
</template>
