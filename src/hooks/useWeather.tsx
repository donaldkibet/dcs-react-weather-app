import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { WeatherData } from "../types";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

interface Coordinate {
  latitude: string | number | null;
  longitude: string | number | null;
}

export const useWeather = (cityName: string, revalidateOnMount = false) => {
  return useSWR<WeatherData>(
    cityName.length
      ? `${baseUrl}/weather?q=${cityName}&appid=${apiKey}&units=metric`
      : null,
    fetcher,

    {
      revalidateOnMount,
      refreshInterval: 0,
      revalidateOnReconnect: true,
    }
  );
};

export const useWeatherWithGeoCoordinates = (
  coordinates: Coordinate | undefined,
  permissionGrated: boolean
) => {
  return useSWR<WeatherData>(
    coordinates !== undefined && permissionGrated
      ? `${baseUrl}/weather?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}&appid=${apiKey}&units=metric`
      : null,
    fetcher,
    {
      revalidateOnReconnect: true,
    }
  );
};
