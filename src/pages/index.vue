<script setup lang="ts" generic="T extends any, O extends any">
const showSidebar = ref(false);
</script>

<template>
  <div class="p-4">
    <button class="rounded bg-blue-500 px-4 py-2 text-white" @click="showSidebar = true">
      打开侧边栏
    </button>
    <TheSideBar :show="showSidebar" @close="showSidebar = false" />
  </div>
</template>
