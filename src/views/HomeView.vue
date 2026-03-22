<script setup>
import { onMounted } from 'vue'
import { useWeatherStore, useHistoryStore, useFavoritesStore } from '../stores/weather'
import { Loader2, Cloud, Sun, Moon, Star, History } from 'lucide-vue-next'
import { useDarkMode } from '../composables/useDarkMode'
import SearchBar from '../components/SearchBar.vue'
import WeatherCard from '../components/WeatherCard.vue'
import SidebarSection from '../components/SidebarSection.vue'

const weatherStore = useWeatherStore()
const historyStore = useHistoryStore()
const favoritesStore = useFavoritesStore()
const { isDark, toggleDarkMode } = useDarkMode()

const handleSearch = (city) => {
  weatherStore.fetchWeather(city)
}

const toggleFavorite = (city) => {
  favoritesStore.toggleFavorite(city)
}

onMounted(() => {
  if (historyStore.history.length > 0) {
    weatherStore.fetchWeather(historyStore.history[0])
  } else {
    weatherStore.fetchWeather('Paris')
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400 flex items-center gap-3">
        <Cloud class="w-10 h-10" /> WeatherApp
      </h1>
      <button @click="toggleDarkMode" class="p-2 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors">
        <Sun v-if="isDark" class="w-6 h-6 text-yellow-500" />
        <Moon v-else class="w-6 h-6 text-slate-700" />
      </button>
    </div>

    <!-- Search Section -->
    <SearchBar @search="handleSearch" />

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

      <!-- Current Weather Card -->
      <div class="md:col-span-2">
        <div v-if="weatherStore.loading && !weatherStore.currentWeather" class="flex flex-col items-center justify-center h-80 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
           <Loader2 class="w-12 h-12 text-blue-600 animate-spin mb-4" />
           <p class="text-slate-500">Chargement des données...</p>
        </div>

        <div v-else-if="weatherStore.error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-6 rounded-2xl text-center">
          <p class="font-bold text-slate-900 dark:text-slate-100">Erreur</p>
          <p>{{ weatherStore.error }}</p>
        </div>

        <WeatherCard
          v-else-if="weatherStore.currentWeather"
          :weather="weatherStore.currentWeather"
          :is-favorite="favoritesStore.isFavorite(weatherStore.currentWeather.location.name)"
          @toggle-favorite="toggleFavorite"
        />
      </div>

      <!-- Sidebar -->
      <div class="space-y-8">
        <SidebarSection
          title="Favoris"
          :items="favoritesStore.favorites"
          :icon="Star"
          icon-class="text-yellow-400 fill-current"
          empty-message="Aucun favori pour le moment."
          @item-click="handleSearch"
        />

        <SidebarSection
          title="Récents"
          :items="historyStore.history"
          :icon="History"
          icon-class="text-blue-600"
          empty-message="Aucun historique."
          @item-click="handleSearch"
        />
      </div>
    </div>
  </div>
</template>
