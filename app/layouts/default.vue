<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { useCustomTheme } from '@/composables/useCustomTheme'

const { isDark, toggle } = useCustomTheme()
</script>

<template>
  <v-app :theme="isDark ? 'dark' : 'light'">
    <v-btn
      text="Toggle Light / Dark"
      append-icon="mdi-theme-light-dark"
      @click="toggle()"
    />
    <SpeedInsights />
    <slot />
  </v-app>
</template>
