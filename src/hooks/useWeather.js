import useSWR from "swr";
import fetcher from "../lib/fetcher";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const useWeather = (cityName, revalidateOnMount = false) => {
  return useSWR(
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

export const useWeatherWithGeoCoordinates = (coordinates, permissionGrated) => {
  return useSWR(
    coordinates !== undefined && permissionGrated
      ? `${baseUrl}/weather?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}&appid=${apiKey}&units=metric`
      : null,
    fetcher,
    {
      revalidateOnReconnect: true,
    }
  );
};
