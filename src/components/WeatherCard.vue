<script setup>
import { MapPin, Star, Droplets, Wind, Cloud, Sun, CloudRain, Snowflake } from 'lucide-vue-next'

const props = defineProps({
  weather: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggleFavorite'])

const getWeatherIcon = (condition) => {
  const text = condition.toLowerCase()
  if (text.includes('sun') || text.includes('clear')) return Sun
  if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) return CloudRain
  if (text.includes('snow') || text.includes('ice') || text.includes('blizzard')) return Snowflake
  return Cloud
}
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-2xl">
    <div class="p-10">
      <div class="flex justify-between items-start mb-10">
        <div>
          <h2 class="text-4xl font-black flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <MapPin class="w-8 h-8 text-blue-600" />
            {{ weather.location.name }}
          </h2>
          <p class="text-slate-500 text-lg ml-10">{{ weather.location.country }}</p>
        </div>
        <button
          @click="emit('toggleFavorite', weather.location.name)"
          class="p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
          :class="isFavorite ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-700'"
        >
          <Star class="w-8 h-8" :class="{ 'fill-current': isFavorite }" />
        </button>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-around gap-12 py-6">
        <div class="relative group">
          <div class="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <component :is="getWeatherIcon(weather.current.condition.text)" class="w-40 h-40 text-blue-600 relative drop-shadow-2xl animate-bounce-slow" />
        </div>
        <div class="text-center md:text-left">
          <span class="text-8xl font-black tracking-tighter text-slate-900 dark:text-slate-100">{{ Math.round(weather.current.temp_c) }}°C</span>
          <p class="text-2xl font-bold mt-2 text-slate-500 capitalize">{{ weather.current.condition.text }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
        <div class="flex items-center gap-5 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem]">
          <div class="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
            <Droplets class="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Humidité</p>
            <p class="font-black text-2xl text-slate-900 dark:text-slate-100">{{ weather.current.humidity }}%</p>
          </div>
        </div>
        <div class="flex items-center gap-5 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem]">
          <div class="p-4 bg-teal-100 dark:bg-teal-900/30 rounded-2xl">
            <Wind class="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Vent</p>
            <p class="font-black text-2xl text-slate-900 dark:text-slate-100">{{ weather.current.wind_kph }} km/h</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}
</style>
