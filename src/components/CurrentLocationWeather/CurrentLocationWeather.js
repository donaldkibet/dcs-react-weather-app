import React from "react";
import { useCurrentPosition } from "react-use-geolocation";
import { useWeatherWithGeoCoordinates } from "../../hooks/useWeather";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import { AiOutlineLoading } from "react-icons/ai";

const CurrentLocationWeather = () => {
  const [position] = useCurrentPosition();
  const { data, error } = useWeatherWithGeoCoordinates(position);

  return (
    <>
      {position && (
        <>
          {!data && !error && <AiOutlineLoading title="loading spinner" />}
          {data && <WeatherDetails data={data}  />}
        </>
      )}
    </>
  );
};

export default CurrentLocationWeather;
