<script setup>
import { MapPin } from 'lucide-vue-next';

defineProps({
  title: { type: String, required: true },

  items: {
    type: Array,
    default: () => [],
  },

  icon: {
    type: [Object, Function],
    default: null,
  },

  iconClass: {
    type: String,
    default: '',
  },

  emptyMessage: {
    type: String,
    default: 'Aucune donnée',
  },

  isDark: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['item-click']);
</script>
<template>
  <div>
    <!-- HEADER -->
    <h3
      class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 px-1"
      :class="isDark ? 'text-white/40' : 'text-slate-400'"
    >
      <component
        v-if="icon"
        :is="icon"
        class="w-3.5 h-3.5"
        :class="iconClass"
      />
      {{ title }}
    </h3>

    <!-- EMPTY -->
    <p
      v-if="!items?.length"
      class="text-xs italic text-center py-3"
      :class="isDark ? 'text-white/25' : 'text-slate-300'"
    >
      {{ emptyMessage }}
    </p>

    <!-- LIST -->
    <div v-else class="space-y-1">
      <button
        v-for="item in items"
        :key="item"
        @click="$emit('item-click', item)"
        class="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between group"
        :class="
          isDark
            ? 'text-white/70 hover:text-white hover:bg-white/10'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        "
      >
        <span>{{ item }}</span>

        <MapPin
          class="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </button>
    </div>
  </div>
</template>
