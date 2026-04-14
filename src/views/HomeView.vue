<script setup>
import { useWeatherStore } from '../stores/weather.store';
import { useHistoryStore } from '../stores/history.store';
import { useFavoritesStore } from '../stores/favorite.store';

import { useDarkMode } from '../composables/useDarkMode';
import { useHomeView } from '../composables/useHomeView';

import SearchBar from '../components/SearchBar.vue';
import WeatherCard from '../components/WeatherCard.vue';
import SidebarSection from '../components/SidebarSection.vue';
import AppBackground from '../components/AppBackground.vue';

import {
  Loader2,
  Cloud,
  Sun,
  Moon,
  Star,
  History,
  LocateFixed,
} from 'lucide-vue-next';

/* stores */
const weatherStore = useWeatherStore();
const historyStore = useHistoryStore();
const favoritesStore = useFavoritesStore();

/* ui */
const { isDark, toggleDarkMode } = useDarkMode();

/* logic */
const {
  currentWeather,
  isFavorite,
  handleSearch,
  handleLocate,
  clearLocationError,
  toggleFavorite,
} = useHomeView({
  weatherStore,
  historyStore,
  favoritesStore,
});
</script>

<template>
  <div
    class="min-h-screen w-full relative overflow-x-hidden transition-colors duration-500"
  >
    <AppBackground :is-dark="isDark" />

    <!-- CONTENT -->
    <div class="relative z-10 min-h-screen flex flex-col">
      <!-- HEADER -->
      <header class="w-full px-4 md:px-8 lg:px-12 pt-6 pb-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Cloud
              class="w-5 h-5"
              :class="isDark ? 'text-blue-400' : 'text-blue-600'"
            />
            <span
              class="font-bold text-base tracking-tight"
              :class="isDark ? 'text-white' : 'text-slate-800'"
            >
              WeatherApp
            </span>
          </div>

          <div class="flex items-center gap-2">
            <!-- GEO -->
            <button
              @click="handleLocate"
              :disabled="weatherStore.locationLoading"
              class="p-2 rounded-full transition-all relative"
              :class="
                isDark
                  ? 'bg-white/10 hover:bg-white/20'
                  : 'bg-white/40 hover:bg-white/60 border border-white/50'
              "
            >
              <Loader2
                v-if="weatherStore.locationLoading"
                class="w-4 h-4 animate-spin"
                :class="isDark ? 'text-blue-400' : 'text-blue-600'"
              />
              <LocateFixed
                v-else
                class="w-4 h-4"
                :class="isDark ? 'text-white/80' : 'text-slate-700'"
              />
            </button>

            <!-- DARK MODE -->
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-full transition-colors"
              :class="
                isDark
                  ? 'bg-white/10 hover:bg-white/20'
                  : 'bg-white/40 hover:bg-white/60 border border-white/50'
              "
            >
              <Sun v-if="isDark" class="w-4 h-4 text-yellow-400" />
              <Moon v-else class="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>

        <!-- ERROR -->
        <Transition name="fade">
          <div
            v-if="weatherStore.locationError"
            class="max-w-7xl mx-auto mt-3 px-4 py-2.5 rounded-xl text-sm flex items-center justify-between gap-3"
            :class="
              isDark
                ? 'bg-orange-500/15 border border-orange-500/25 text-orange-300'
                : 'bg-orange-100/70 border border-orange-300/50 text-orange-700'
            "
          >
            <span>{{ weatherStore.locationError }}</span>
            <button
              @click="clearLocationError"
              class="opacity-60 hover:opacity-100 transition-opacity font-bold text-base"
            >
              ✕
            </button>
          </div>
        </Transition>
      </header>

      <!-- MAIN -->
      <main class="flex-1 w-full px-4 md:px-8 lg:px-12 pb-10">
        <div class="max-w-7xl mx-auto">
          <!-- SEARCH -->
          <div class="max-w-xl mx-auto mb-8">
            <SearchBar
              :is-dark="isDark"
              :loading="weatherStore.loading"
              :suggestions="weatherStore.suggestions"
              @search="handleSearch"
              @suggest-request="weatherStore.fetchSuggestions"
              @clear-suggestions="weatherStore.suggestions = []"
            />
          </div>

          <!-- GRID -->
          <div
            class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start"
          >
            <!-- WEATHER -->
            <div class="md:col-span-2 lg:col-span-3">
              <!-- LOADING -->
              <div
                v-if="
                  (weatherStore.loading || weatherStore.locationLoading) &&
                  !currentWeather
                "
                class="flex flex-col items-center justify-center h-64 rounded-3xl border"
                :class="
                  isDark
                    ? 'bg-white/8 backdrop-blur-xl border-white/10'
                    : 'bg-white/40 backdrop-blur-xl border-white/50'
                "
              >
                <Loader2
                  class="w-10 h-10 animate-spin mb-3"
                  :class="isDark ? 'text-blue-400' : 'text-blue-600'"
                />
                <p
                  class="text-sm"
                  :class="isDark ? 'text-white/40' : 'text-slate-600'"
                >
                  {{
                    weatherStore.locationLoading
                      ? 'Détection de votre position...'
                      : 'Chargement...'
                  }}
                </p>
              </div>

              <!-- ERROR -->
              <div
                v-else-if="weatherStore.error"
                class="rounded-2xl border p-5 text-center"
                :class="
                  isDark
                    ? 'bg-red-500/10 border-red-500/20'
                    : 'bg-red-400/20 border-red-400/30'
                "
              >
                <p
                  class="text-sm font-medium"
                  :class="isDark ? 'text-red-400' : 'text-red-700'"
                >
                  {{ weatherStore.error }}
                </p>
              </div>

              <!-- CARD -->
              <WeatherCard
                v-else-if="currentWeather"
                :weather="currentWeather"
                :is-favorite="isFavorite"
                :is-dark="isDark"
                @toggle-favorite="toggleFavorite"
              />
            </div>

            <!-- SIDEBAR -->
            <div class="md:col-span-1">
              <div
                class="rounded-3xl border p-5 space-y-2 transition-all duration-500"
                :class="
                  isDark
                    ? 'bg-white/8 backdrop-blur-xl border-white/10'
                    : 'bg-white/30 backdrop-blur-xl border-white/40'
                "
              >
                <SidebarSection
                  title="Favoris"
                  :items="favoritesStore.favorites"
                  :icon="Star"
                  icon-class="text-yellow-400 fill-current"
                  empty-message="Aucun favori."
                  :is-dark="isDark"
                  @item-click="handleSearch"
                />

                <div
                  class="h-px my-3"
                  :class="isDark ? 'bg-white/8' : 'bg-white/40'"
                />

                <SidebarSection
                  title="Récents"
                  :items="historyStore.history"
                  :icon="History"
                  icon-class="text-blue-400"
                  empty-message="Aucun historique."
                  :is-dark="isDark"
                  @item-click="handleSearch"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
