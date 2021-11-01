export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<Weather>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: string | number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface City {
  id: number;
  name: string;
}

export interface Note {
  cityId: number;
  note: Array<{ id: string; noteText: string }>;
}

export interface GeoLocation {
  permissionGrated: boolean;
  coordinates?: {
    latitude: string | number | null;
    longitude: string | number | null;
  };
  error?: GeolocationPositionError | null;
}
