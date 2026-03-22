import { defineStore } from 'pinia'
import weatherService from '../services/weatherService'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    currentWeather: null,
    loading: false,
    error: null,
    searchQuery: '',
    suggestions: []
  }),
  actions: {
    async fetchWeather(city) {
      this.loading = true
      this.error = null
      try {
        const response = await weatherService.getCurrentWeather(city)
        this.currentWeather = response.data
        this.addToHistory(response.data.location.name)
      } catch (err) {
        this.error = 'Ville non trouvée.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async fetchSuggestions(query) {
      if (query.length < 3) {
        this.suggestions = []
        return
      }
      try {
        const response = await weatherService.searchCities(query)
        this.suggestions = response.data
      } catch (err) {
        console.error(err)
      }
    },
    addToHistory(city) {
      const historyStore = useHistoryStore()
      historyStore.addEntry(city)
    }
  }
})

export const useHistoryStore = defineStore('history', {
  state: () => ({
    history: JSON.parse(localStorage.getItem('weather_history') || '[]')
  }),
  actions: {
    addEntry(city) {
      // Ensure city is stored consistently
      if (!this.history.includes(city)) {
        this.history.unshift(city)
        if (this.history.length > 5) {
          this.history.pop()
        }
        localStorage.setItem('weather_history', JSON.stringify(this.history))
      } else {
        // Move to top
        this.history = [city, ...this.history.filter(c => c !== city)]
        localStorage.setItem('weather_history', JSON.stringify(this.history))
      }
    },
    clearHistory() {
      this.history = []
      localStorage.removeItem('weather_history')
    }
  }
})

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('weather_favorites') || '[]')
  }),
  actions: {
    toggleFavorite(city) {
      const index = this.favorites.indexOf(city)
      if (index === -1) {
        this.favorites.push(city)
      } else {
        this.favorites.splice(index, 1)
      }
      localStorage.setItem('weather_favorites', JSON.stringify(this.favorites))
    },
    isFavorite(city) {
      return this.favorites.includes(city)
    }
  }
})
