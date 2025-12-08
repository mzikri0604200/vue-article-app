<script setup>
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/store/themeStore'
import { onMounted } from 'vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <RouterView />
</template>
