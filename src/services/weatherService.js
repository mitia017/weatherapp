import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.weatherapi.com/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY
  }
})

// MOCK DATA for local testing/verification if API is unavailable
const MOCK_WEATHER = {
  location: { name: 'Paris', country: 'France' },
  current: {
    temp_c: 22,
    condition: { text: 'Sunny' },
    humidity: 45,
    wind_kph: 15
  }
}

export default {
  async getCurrentWeather(city) {
    try {
      return await apiClient.get('/current.json', {
        params: { q: city }
      })
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('API Error, using mock data for development')
        return { data: MOCK_WEATHER }
      }
      throw err
    }
  },
  async searchCities(query) {
    try {
      return await apiClient.get('/search.json', {
        params: { q: query }
      })
    } catch (err) {
      if (import.meta.env.DEV) {
        return { data: [{ id: 1, name: 'Paris', region: 'Ile-de-France', country: 'France' }] }
      }
      throw err
    }
  }
}
