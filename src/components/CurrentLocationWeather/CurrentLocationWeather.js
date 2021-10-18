import React from "react";
import { useWeatherWithGeoCoordinates } from "../../hooks/useWeather";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import { AiOutlineLoading } from "react-icons/ai";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import styles from "./CurrentLocatonWeather.module.css";


const CurrentLocationWeather = () => {
  const { permissionGrated, coordinates } = useGeoLocation();
  const { data, error: apiError } = useWeatherWithGeoCoordinates(
    coordinates,
    permissionGrated
  );
  
  return (
    <>
      {permissionGrated && (
        <div className={styles.currentConditionWeatherWrapper}>
          {!data && !apiError && (
            <>
            <AiOutlineLoading size={55} title="loading spinner" /> loading...
            </>
          )}
          {data && <WeatherDetails data={data} />}
        </div>
      )}
    </>
  );
};

export default CurrentLocationWeather;
