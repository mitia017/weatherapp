export const WMO_CODES = {
  0: {
    text: 'Clear Sky',
    icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
  },
  1: {
    text: 'Mainly Clear',
    icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
  },
  2: {
    text: 'Partly Cloudy',
    icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
  },
  3: {
    text: 'Overcast',
    icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
  },
  45: { text: 'Fog', icon: '//cdn.weatherapi.com/weather/64x64/day/248.png' },
  48: {
    text: 'Icy Fog',
    icon: '//cdn.weatherapi.com/weather/64x64/day/260.png',
  },
  51: {
    text: 'Light Drizzle',
    icon: '//cdn.weatherapi.com/weather/64x64/day/266.png',
  },
  61: {
    text: 'Light Rain',
    icon: '//cdn.weatherapi.com/weather/64x64/day/296.png',
  },
  63: { text: 'Rain', icon: '//cdn.weatherapi.com/weather/64x64/day/296.png' },
  65: {
    text: 'Heavy Rain',
    icon: '//cdn.weatherapi.com/weather/64x64/day/308.png',
  },
  71: {
    text: 'Light Snow',
    icon: '//cdn.weatherapi.com/weather/64x64/day/326.png',
  },
  73: { text: 'Snow', icon: '//cdn.weatherapi.com/weather/64x64/day/329.png' },
  75: {
    text: 'Heavy Snow',
    icon: '//cdn.weatherapi.com/weather/64x64/day/338.png',
  },
  95: {
    text: 'Thunderstorm',
    icon: '//cdn.weatherapi.com/weather/64x64/day/389.png',
  },
};

export function getCondition(code) {
  return (
    WMO_CODES[code] ?? {
      text: 'Unknown',
      icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
    }
  );
}
