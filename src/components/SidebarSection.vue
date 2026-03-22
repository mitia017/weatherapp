<script setup>
import { MapPin } from 'lucide-vue-next';

defineProps({
  title: String,
  items: Array,
  icon: [Object, Function],
  iconClass: String,
  emptyMessage: String,
});

defineEmits(['itemClick']);
</script>

<template>
  <div
    class="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm"
  >
    <h3
      class="font-black text-xl mb-6 flex items-center gap-3 text-slate-900 dark:text-slate-100"
    >
      <component :is="icon" class="w-6 h-6" :class="iconClass" />
      {{ title }}
    </h3>
    <div
      v-if="items.length === 0"
      class="text-slate-400 text-sm italic py-4 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl"
    >
      {{ emptyMessage }}
    </div>
    <div class="space-y-3">
      <button
        v-for="item in items"
        :key="item"
        @click="$emit('itemClick', item)"
        class="w-full text-left p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
      >
        <span class="font-bold text-slate-700 dark:text-slate-300">{{
          item
        }}</span>
        <MapPin
          class="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </button>
    </div>
  </div>
</template>
