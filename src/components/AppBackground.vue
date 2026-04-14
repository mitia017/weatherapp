<script setup>
defineProps({
  isDark: Boolean,
});
</script>

<template>
  <!-- IMPORTANT : z-0 pour rester sous le contenu -->
  <div class="fixed inset-0 z-0 pointer-events-none">
    <!-- DARK MODE -->
    <template v-if="isDark">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
        alt="horizon"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div
        class="absolute inset-0"
        style="
          background: linear-gradient(
            to bottom,
            rgba(5, 15, 40, 0.55) 0%,
            rgba(5, 15, 40, 0.75) 60%,
            rgba(5, 15, 40, 0.92) 100%
          );
        "
      />

      <div
        class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
        style="
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.12) 0%,
            transparent 65%
          );
        "
      />
    </template>

    <!-- LIGHT MODE -->
    <template v-else>
      <div
        class="absolute inset-0 bg-gradient-to-br from-sky-300 via-blue-200 to-indigo-300"
      />

      <div
        class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-80"
        style="
          background: radial-gradient(
            circle,
            rgba(96, 165, 250, 0.5) 0%,
            transparent 65%
          );
        "
      />
    </template>
  </div>
</template>
