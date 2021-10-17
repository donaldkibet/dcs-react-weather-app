import useSWR from "swr";
import fetcher from "../lib/fetcher";
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const useWeather = (cityName) =>
  useSWR(
    cityName.length
      ? `${baseUrl}/weather?q=${cityName}&appid=${apiKey}&units=metric`
      : null,
    fetcher
  );

export const useWeatherWithGeoCoordinates = (coordinates) => {
  console.log(coordinates);
  const { latitude, longitude } = coordinates;
  return useSWR(
    (latitude && longitude)
      ? `${baseUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      : null,
    fetcher
  );
};
