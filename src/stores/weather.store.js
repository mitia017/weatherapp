import { defineStore } from 'pinia';
import weatherService from '@/services/weather.service';
import { useHistoryStore } from './history.store';
import { normalizeError } from '@/utils/error';

let lastRequestId = 0;

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    currentWeather: null,
    loading: false,
    error: null,
    suggestions: [],
    searchQuery: '',
  }),

  actions: {
    async fetchWeather(city) {
      const requestId = ++lastRequestId;

      this.loading = true;
      this.error = null;

      try {
        const weatherResult = await weatherService.getCurrentWeather(city);

        if (requestId !== lastRequestId) return;

        this.currentWeather = weatherResult.data;
        const historyStore = useHistoryStore();
        historyStore.addToHistory(weatherResult.data.location.name);
      } catch (err) {
        if (requestId !== lastRequestId) return;

        this.error = normalizeError(err).message;
      } finally {
        if (requestId === lastRequestId) {
          this.loading = false;
        }
      }
    },

    async fetchSuggestions(query) {
      this.searchQuery = query;

      if (query.length < 3) {
        this.suggestions = [];
        return;
      }

      const res = await weatherService.searchCities(query);

      if (this.searchQuery !== query) return;

      this.suggestions = res.data;
    },
    async fetchWeatherByLocation() {
      if (!navigator.geolocation) {
        this.locationError = 'Géolocalisation non supportée.';
        return;
      }

      this.locationLoading = true;
      this.locationError = null;

      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;

              const { data } = await weatherService.getWeatherByCoords(
                latitude,
                longitude
              );

              this.currentWeather = data;

              resolve(data);
            } catch (err) {
              this.locationError = 'Erreur météo.';
              reject(err);
            } finally {
              this.locationLoading = false;
            }
          },
          (err) => {
            this.locationLoading = false;
            this.locationError = 'Erreur de géolocalisation.';
            reject(err);
          }
        );
      });
    },
  },
});
