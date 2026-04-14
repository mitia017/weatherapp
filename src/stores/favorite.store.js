import { defineStore } from 'pinia';
import { storage } from '@/utils/storage';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: storage.get('weather_favorites'),
  }),

  actions: {
    toggleFavorite(city) {
      if (!city) return;

      const index = this.favorites.indexOf(city);

      if (index === -1) {
        this.favorites.push(city);
      } else {
        this.favorites.splice(index, 1);
      }

      storage.set('weather_favorites', this.favorites);
    },

    isFavorite(city) {
      return this.favorites.includes(city);
    },
  },
});
