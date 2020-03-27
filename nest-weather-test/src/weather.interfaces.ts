export interface WeatherGeolocation {
  lat: string,
  lon: string
}

export interface WeatherData {
  temp: number,
  humidity: number,
  city: string,
  date: number,
  time: string,
  country: string;
}

export interface WeatherResponse {
  coord: {
    lat: string;
    lon: string;
  },
  weather: [
    {
      id: number,
      main: string,
      description: string;
      icon: string
    }
  ],
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  },
  wind: {
    speed: number;
    deg: number;
  },
  clouds: {
    all: number;
  },
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string,
    sunrise: number;
    sunset: number;
  },
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
