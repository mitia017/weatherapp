<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased transition-colors duration-300">
    <RouterView />
  </div>
</template>

<style>
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
</style>
