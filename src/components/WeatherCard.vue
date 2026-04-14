<script setup>
import { MapPin, Star, Droplets, Wind } from 'lucide-vue-next';
import { useWeatherCard } from '../composables/useWeatherCard';

const props = defineProps({
  weather: { type: Object, required: true },
  isFavorite: { type: Boolean, default: false },
  isDark: { type: Boolean, default: true },
});

const emit = defineEmits(['toggleFavorite']);

/* composable météo */
const { forecast } = useWeatherCard(props.weather);

const formatDate = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });

const toggleFavorite = () => {
  emit('toggleFavorite', props.weather?.location?.name);
};
</script>

<template>
  <div
    class="rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500"
    :class="
      isDark
        ? 'bg-white/10 backdrop-blur-xl border-white/15'
        : 'bg-white/60 backdrop-blur-xl border-slate-400 shadow-lg'
    "
  >
    <div class="p-6 md:p-8">
      <!-- HEADER -->
      <div class="flex items-start justify-between mb-6 md:mb-8">
        <div>
          <div class="flex items-center gap-1.5 mb-1">
            <MapPin
              class="w-4 h-4"
              :class="isDark ? 'text-white/70' : 'text-blue-500'"
            />
            <h2
              class="font-bold text-xl md:text-3xl tracking-tight"
              :class="isDark ? 'text-white' : 'text-slate-800'"
            >
              {{ weather?.location?.name }}
            </h2>
          </div>

          <p
            class="text-xs md:text-sm ml-5"
            :class="isDark ? 'text-white/45' : 'text-slate-700'"
          >
            {{ weather?.location?.country }} · {{ formatDate() }}
          </p>
        </div>

        <button
          @click="toggleFavorite"
          class="p-2 rounded-full transition-all active:scale-90"
          :class="[
            isFavorite
              ? 'text-yellow-400'
              : isDark
                ? 'text-white/25'
                : 'text-slate-600',
            isDark ? 'hover:bg-white/10' : 'hover:bg-slate-300',
          ]"
        >
          <Star
            class="w-5 h-5 md:w-6 md:h-6"
            :class="{ 'fill-current': isFavorite }"
          />
        </button>
      </div>

      <!-- CURRENT WEATHER -->
      <div class="flex items-center justify-between mb-6 md:mb-10">
        <div class="relative group">
          <div
            class="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity"
          />

          <img
            v-if="weather?.current?.condition?.icon"
            :src="`https:${weather.current.condition.icon.replace('64x64', '128x128')}`"
            :alt="weather?.current?.condition?.text"
            class="w-28 h-28 md:w-40 md:h-40 object-contain relative drop-shadow-2xl animate-bounce-slow"
          />
        </div>

        <div class="text-right">
          <div
            class="font-black tracking-tighter leading-none text-6xl md:text-8xl"
            :class="isDark ? 'text-white' : 'text-slate-800'"
          >
            {{ Math.round(weather?.current?.temp_c ?? 0) }}°
            <span class="text-3xl md:text-5xl">C</span>
          </div>

          <p
            class="text-base md:text-xl mt-2 capitalize"
            :class="isDark ? 'text-white/55' : 'text-slate-800'"
          >
            {{ weather?.current?.condition?.text }}
          </p>

          <p
            class="hidden md:block text-sm mt-1"
            :class="isDark ? 'text-white/30' : 'text-slate-700'"
          >
            Ressenti {{ Math.round(weather?.current?.feelslike_c ?? 0) }}°C
          </p>
        </div>
      </div>

      <!-- STATS -->
      <div
        class="flex items-center gap-4 md:gap-8 mb-6 md:mb-8 p-4 md:p-5 rounded-2xl border transition-colors duration-500"
        :class="
          isDark ? 'bg-white/5 border-white/8' : 'bg-slate-200 border-slate-400'
        "
      >
        <div class="flex items-center gap-2.5 flex-1">
          <Droplets
            class="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            :class="isDark ? 'text-blue-400/80' : 'text-blue-500'"
          />
          <div>
            <p
              class="text-[10px] md:text-xs uppercase tracking-widest mb-1"
              :class="isDark ? 'text-white/40' : 'text-slate-700'"
            >
              Humidity
            </p>
            <p
              class="font-bold text-sm md:text-base"
              :class="isDark ? 'text-white' : 'text-slate-800'"
            >
              {{ weather?.current?.humidity }}%
            </p>
          </div>
        </div>

        <div
          class="w-px h-10"
          :class="isDark ? 'bg-white/10' : 'bg-slate-300'"
        />

        <div class="flex items-center gap-2.5 flex-1">
          <Wind
            class="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
            :class="isDark ? 'text-teal-400/80' : 'text-teal-500'"
          />
          <div>
            <p
              class="text-[10px] md:text-xs uppercase tracking-widest mb-1"
              :class="isDark ? 'text-white/40' : 'text-slate-700'"
            >
              Wind Speed
            </p>
            <p
              class="font-bold text-sm md:text-base"
              :class="isDark ? 'text-white' : 'text-slate-800'"
            >
              {{ weather?.current?.wind_kph }} km/h
            </p>
          </div>
        </div>
      </div>

      <!-- FORECAST -->
      <div v-if="forecast.length">
        <p
          class="text-[11px] uppercase tracking-widest mb-3 font-medium"
          :class="isDark ? 'text-white/35' : 'text-slate-400'"
        >
          Prévisions
        </p>

        <div
          class="flex gap-2 md:gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none"
        >
          <div
            v-for="(day, i) in forecast"
            :key="i"
            class="flex-shrink-0 flex flex-col items-center gap-1.5 md:gap-2 rounded-2xl px-3 md:px-5 py-3 md:py-4 border min-w-[68px] md:min-w-[88px] transition-colors duration-300"
            :class="
              isDark
                ? 'bg-white/8 hover:bg-white/15 border-white/8'
                : 'bg-slate-200 hover:bg-slate-300 border-slate-200'
            "
          >
            <p
              class="text-[11px] md:text-xs font-medium"
              :class="isDark ? 'text-white/45' : 'text-slate-700'"
            >
              {{ day.date }}
            </p>

            <img
              :src="day.icon"
              :alt="day.condition"
              class="w-8 h-8 md:w-10 md:h-10 object-contain"
            />

            <p
              class="font-bold text-sm md:text-base"
              :class="isDark ? 'text-white' : 'text-slate-700'"
            >
              {{ day.temp }}°C
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
