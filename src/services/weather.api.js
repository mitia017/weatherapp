import axios from 'axios';

const geoApi = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1',
  timeout: 8000,
});

const forecastApi = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 8000,
});

const reverseApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  timeout: 8000,
});

export const WeatherApi = {
  searchCity(city) {
    return geoApi.get('/search', {
      params: {
        name: city,
        count: 5,
        language: 'fr',
        format: 'json',
      },
    });
  },

  getForecast(params) {
    return forecastApi.get('/forecast', { params });
  },

  reverseGeocode(lat, lon) {
    return reverseApi.get('/reverse', {
      params: {
        lat,
        lon,
        format: 'json',
      },
      headers: {
        'Accept-Language': 'fr',
      },
    });
  },
};
