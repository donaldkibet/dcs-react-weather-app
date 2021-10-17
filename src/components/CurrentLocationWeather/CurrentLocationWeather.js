import React from "react";
import { useWeatherWithGeoCoordinates } from "../../hooks/useWeather";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import { AiOutlineLoading } from "react-icons/ai";
import { useGeoLocation } from "../../hooks/useGeoLocation";

const CurrentLocationWeather = () => {
  const { permissionGrated, coordinates} = useGeoLocation()
  const { data, error: apiError } = useWeatherWithGeoCoordinates(coordinates);
  
  return (
    <>
      {permissionGrated && (
        <div>
          {!data && !apiError && <AiOutlineLoading title="loading spinner" />}
          {data && <WeatherDetails data={data}  />}
        </div>
      )}
    </>
  );
};

export default CurrentLocationWeather;
