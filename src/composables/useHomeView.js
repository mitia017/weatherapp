import { computed, onMounted } from 'vue';

export function useHomeView({ weatherStore, historyStore, favoritesStore }) {
  /* ───────────────── computed ───────────────── */
  const currentWeather = computed(() => weatherStore.currentWeather);

  const currentCity = computed(
    () => weatherStore.currentWeather?.location?.name || null
  );

  const isFavorite = computed(() => {
    const city = currentCity.value;
    if (!city) return false;
    return favoritesStore.isFavorite(city);
  });

  /* ───────────────── actions ───────────────── */
  const handleSearch = (city) => {
    weatherStore.fetchWeather(city);
  };

  const handleLocate = async () => {
    try {
      const data = await weatherStore.fetchWeatherByLocation();

      if (data?.location?.name) {
        historyStore.addEntry(data.location.name);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const clearLocationError = () => {
    weatherStore.locationError = null;
  };

  const toggleFavorite = (city) => {
    favoritesStore.toggleFavorite(city);
  };

  /* ───────────────── init ───────────────── */
  onMounted(() => {
    if (navigator.geolocation) {
      weatherStore.fetchWeatherByLocation();
    } else if (historyStore.history.length > 0) {
      weatherStore.fetchWeather(historyStore.history[0]);
    } else {
      weatherStore.fetchWeather('Tokyo');
    }
  });

  return {
    currentWeather,
    isFavorite,

    handleSearch,
    handleLocate,
    clearLocationError,
    toggleFavorite,
  };
}
