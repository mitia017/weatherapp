import { computed, toRef } from 'vue';

export function useWeatherCard(weatherProp) {
  const weather = toRef(weatherProp);

  const forecast = computed(() => {
    const list = weather.value?.forecast?.forecastday;
    if (!list) return [];

    return list.slice(0, 6).map((day) => ({
      date: new Date(day.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
      }),
      icon: day?.day?.condition?.icon
        ? `https:${day.day.condition.icon.replace('64x64', '128x128')}`
        : '',
      temp: Math.round(day?.day?.avgtemp_c ?? 0),
      condition: day?.day?.condition?.text ?? '',
    }));
  });

  return { forecast };
}
