import { defineStore } from 'pinia';
import { storage } from '@/utils/storage';

export const useHistoryStore = defineStore('history', {
  state: () => ({
    history: storage.get('weather_history'),
  }),

  actions: {
    addToHistory(city) {
      if (!city) return;

      if (!this.history.includes(city)) {
        this.history.unshift(city);
        if (this.history.length > 5) this.history.pop();
      } else {
        this.history = [city, ...this.history.filter((c) => c !== city)];
      }

      storage.set('weather_history', this.history);
    },

    clearHistory() {
      this.history = [];
      storage.remove('weather_history');
    },
  },
});
