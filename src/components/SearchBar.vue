<script setup>
import { ref, watch } from 'vue';
import { Search, MapPin, Loader2 } from 'lucide-vue-next';

defineProps({
  isDark: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  suggestions: { type: Array, default: () => [] },
});

const emit = defineEmits(['search', 'suggest-request', 'clear-suggestions']);

const searchQuery = ref('');
let debounceTimer = null;

/* debounce input → demande suggestions au parent */
watch(searchQuery, (newQuery) => {
  clearTimeout(debounceTimer);

  if (newQuery.length < 3) {
    emit('clear-suggestions');
    return;
  }

  debounceTimer = setTimeout(() => {
    emit('suggest-request', newQuery);
  }, 300);
});

/* search action */
const handleSearch = (city = searchQuery.value) => {
  if (!city) return;

  emit('search', city);
  searchQuery.value = '';
  emit('clear-suggestions');
};
</script>

<template>
  <div class="relative">
    <!-- INPUT -->
    <div
      class="flex items-center gap-3 px-5 py-3 rounded-full border transition-all duration-300"
      :class="
        isDark
          ? 'bg-white/10 backdrop-blur-md border-white/15 focus-within:border-white/40 focus-within:bg-white/15'
          : 'bg-white/70 backdrop-blur-md border-slate-200 shadow-sm focus-within:border-blue-300 focus-within:shadow-md'
      "
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search City"
        class="flex-1 bg-transparent border-none outline-none text-sm font-medium"
        :class="
          isDark
            ? 'text-white placeholder-white/40'
            : 'text-slate-700 placeholder-slate-400'
        "
        @keyup.enter="handleSearch()"
      />

      <button
        @click="handleSearch()"
        :disabled="loading"
        class="transition-colors disabled:opacity-40"
        :class="
          isDark
            ? 'text-white/60 hover:text-white'
            : 'text-slate-400 hover:text-blue-500'
        "
      >
        <Loader2 v-if="loading" class="w-5 h-5 animate-spin" />
        <Search v-else class="w-5 h-5" />
      </button>
    </div>

    <!-- AUTOCOMPLETE -->
    <div
      v-if="suggestions.length > 0"
      class="absolute z-20 w-full mt-2 overflow-hidden rounded-2xl border shadow-2xl"
      :class="
        isDark
          ? 'bg-[#1a2744]/95 backdrop-blur-xl border-white/10'
          : 'bg-white border-slate-200'
      "
    >
      <button
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        @click="handleSearch(suggestion.name)"
        class="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors border-b last:border-0"
        :class="
          isDark
            ? 'hover:bg-white/10 border-white/5'
            : 'hover:bg-slate-50 border-slate-100'
        "
      >
        <MapPin
          class="w-4 h-4 flex-shrink-0"
          :class="isDark ? 'text-blue-400' : 'text-blue-500'"
        />

        <span
          class="text-sm font-medium"
          :class="isDark ? 'text-white' : 'text-slate-800'"
        >
          {{ suggestion.name }}
        </span>

        <span
          class="text-xs ml-auto"
          :class="isDark ? 'text-white/40' : 'text-slate-400'"
        >
          {{ suggestion.region }}, {{ suggestion.country }}
        </span>
      </button>
    </div>
  </div>
</template>
