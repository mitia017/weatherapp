<script setup>
import { ref, watch } from 'vue'
import { Search, MapPin, Loader2 } from 'lucide-vue-next'
import { useWeatherStore } from '../stores/weather'

const weatherStore = useWeatherStore()
const searchQuery = ref('')
let debounceTimer = null

watch(searchQuery, (newQuery) => {
  clearTimeout(debounceTimer)
  if (newQuery.length < 3) {
    weatherStore.suggestions = []
    return
  }
  debounceTimer = setTimeout(() => {
    weatherStore.fetchSuggestions(newQuery)
  }, 300)
})

const emit = defineEmits(['search'])

const handleSearch = (city) => {
  emit('search', city || searchQuery.value)
  searchQuery.value = ''
  weatherStore.suggestions = []
}
</script>

<template>
  <div class="relative mb-8">
    <div class="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-xl focus-within:border-blue-500 transition-all">
      <Search class="w-6 h-6 text-slate-400 ml-2" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher une ville..."
        class="flex-1 bg-transparent border-none outline-none py-2 text-lg text-slate-900 dark:text-slate-100"
        @keyup.enter="handleSearch()"
      />
      <button
        @click="handleSearch()"
        class="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
        :disabled="weatherStore.loading"
      >
        <Loader2 v-if="weatherStore.loading" class="w-5 h-5 animate-spin" />
        <span v-else>Rechercher</span>
      </button>
    </div>

    <!-- Autocomplete Suggestions -->
    <div
      v-if="weatherStore.suggestions.length > 0"
      class="absolute z-10 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
    >
      <button
        v-for="suggestion in weatherStore.suggestions"
        :key="suggestion.id"
        @click="handleSearch(suggestion.name)"
        class="w-full px-4 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 last:border-0"
      >
        <MapPin class="w-4 h-4 text-blue-500" />
        <span class="font-medium text-slate-900 dark:text-slate-100">{{ suggestion.name }}</span>
        <span class="text-sm text-slate-500">{{ suggestion.region }}, {{ suggestion.country }}</span>
      </button>
    </div>
  </div>
</template>
