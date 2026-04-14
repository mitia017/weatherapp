import { getCondition } from './weather.constants';

export function mapForecast(data, locationName, country) {
  const currentCondition = getCondition(data.current.weather_code);

  const todayStr = data.current.time.split('T')[0];
  const currentHour = new Date(data.current.time).getHours();

  const hourly = data.hourly.time
    .map((time, i) => ({
      time,
      temp_c: data.hourly.temperature_2m[i],
      weather_code: data.hourly.weather_code[i],
    }))
    .filter(
      (h) =>
        h.time.startsWith(todayStr) &&
        new Date(h.time).getHours() >= currentHour
    )
    .slice(0, 12)
    .map((h) => ({
      time: h.time,
      temp_c: Math.round(h.temp_c),
      condition: getCondition(h.weather_code),
    }));

  const forecastday = data.daily.time.map((date, i) => ({
    date,
    day: {
      avgtemp_c: Math.round(
        (data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) /
          2
      ),
      maxtemp_c: Math.round(data.daily.temperature_2m_max[i]),
      mintemp_c: Math.round(data.daily.temperature_2m_min[i]),
      condition: getCondition(data.daily.weather_code[i]),
    },
    hour: i === 0 ? hourly : [],
  }));

  return {
    location: { name: locationName, country },
    current: {
      temp_c: Math.round(data.current.temperature_2m),
      feelslike_c: Math.round(data.current.apparent_temperature),
      humidity: data.current.relative_humidity_2m,
      wind_kph: Math.round(data.current.wind_speed_10m),
      condition: {
        text: currentCondition.text,
        icon: currentCondition.icon,
      },
    },
    forecast: { forecastday },
  };
}
