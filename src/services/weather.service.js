import { WeatherApi } from './weather.api';
import { mapForecast } from './weather.mapper';

async function geocode(city) {
  const res = await WeatherApi.searchCity(city);

  if (!res.data.results?.length) {
    throw new Error(`Ville introuvable : ${city}`);
  }

  return res.data.results;
}

async function reverseGeocode(lat, lon) {
  const res = await WeatherApi.reverseGeocode(lat, lon);

  const addr = res.data.address;

  const city =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.county ||
    addr.state ||
    'Ma position';

  return {
    city,
    country: addr.country ?? '',
  };
}

async function fetchForecast(lat, lon, name, country) {
  const res = await WeatherApi.getForecast({
    latitude: lat,
    longitude: lon,
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
    hourly: 'temperature_2m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: 7,
  });

  return mapForecast(res.data, name, country);
}

export default {
  async getCurrentWeather(city) {
    const results = await geocode(city);
    const { latitude, longitude, name, country } = results[0];

    const data = await fetchForecast(latitude, longitude, name, country);

    return { data };
  },

  async getWeatherByCoords(lat, lon) {
    const { city, country } = await reverseGeocode(lat, lon);
    const data = await fetchForecast(lat, lon, city, country);

    return { data };
  },

  async searchCities(query) {
    const res = await WeatherApi.searchCity(query);

    const results = (res.data.results ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      region: r.admin1 ?? '',
      country: r.country ?? '',
    }));

    return { data: results };
  },
};
