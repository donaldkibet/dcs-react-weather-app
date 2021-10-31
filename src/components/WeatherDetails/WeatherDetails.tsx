import React from "react";
import dayjs from "dayjs";
import styles from "./WeatherDetails.module.css";
import { WeatherData } from "../../types";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const weatherIconBaseUrl = process.env.REACT_APP_WEATHER_ICON_BASE_URL;
const flagBaseUrl = process.env.REACT_APP_FLAGS_BASE_URL;

interface WeatherDetailsProps {
  data: WeatherData;
  displayAllDetails?: boolean;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data, displayAllDetails = false }) => {
  return (
    <div className={styles.weatherDetailsWrapper}>
      <div className={styles.headerSection}>
        <div>
          <p className={styles.title}>{data?.name}</p>
          <p className={styles.date}>
            {dayjs(data.dt * 1000)
              .utcOffset(data.timezone / 60)
              .format("dddd, h:mm A")}
          </p>
        </div>

        <div>
          <img
            src={`${flagBaseUrl}/${data?.sys?.country}/shiny/64.png`}
            alt="alt logo"
          />
        </div>
      </div>

      <div className={styles.iconWrapper}>
        <img
          alt="icon"
          src={`${weatherIconBaseUrl}${data?.weather[0]?.icon}@2x.png`}
        />
        <p className={styles.temp}>{Math.round(data.main.temp)}°</p>
        <p className={styles.description}>{data.weather[0].description}</p>
      </div>

      <div className={styles.currentConditionsWrapper}>
        <p className={styles.title01}>Today</p>
        <div className={styles.condition}>
          {displayAllDetails && (
            <>
              <span>
                <p className={styles.label01}>Temp</p>
                <p className={styles.label02}>
                  {Math.round(data.main.temp_max)}° ~{" "}
                  {Math.round(data.main.temp_min)}°
                </p>
              </span>
              <span>
                <p className={styles.label01}>Visibility</p>
                <p className={styles.label02}>
                  {Math.round(data.visibility / 1000)} Km
                </p>
              </span>
              <span>
                <p className={styles.label01}>Feels like</p>
                <p className={styles.label02}>
                  {Math.round(data.main.feels_like)}°
                </p>
              </span>
            </>
          )}
          <span>
            <p className={styles.label01}>Pressure</p>
            <p className={styles.label02}>{data.main.pressure} hPa</p>
          </span>
          <span>
            <p className={styles.label01}>Humidity</p>
            <p className={styles.label02}>{data.main.humidity}%</p>
          </span>
          <span>
            <p className={styles.label01}>Wind</p>
            <p className={styles.label02}>{data.wind.speed} m/sec</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
