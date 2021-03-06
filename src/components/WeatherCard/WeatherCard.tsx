import React from "react";
import dayjs from "dayjs";
import { FiMapPin } from "react-icons/fi";
import { WeatherData } from "../../types";
import styles from "./WeatherCard.module.css";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface WeatherCardProps {
  currentWeather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ currentWeather }) => {
  const { main, name, dt, timezone } = currentWeather;
  return (
    <div className={styles.weatherInfoWrapper}>
      <span className={styles.temp}>{Math.round(main.temp)}°</span>
      <div className={styles.tile}>
        <label className={styles.iconWrapper}>
          <FiMapPin /> <span className={styles.label02}>{name}</span>
        </label>
        <p className={styles.label01}>
          {dayjs(dt * 1000)
            .utcOffset(timezone / 60)
            .format("dddd, h:mm A")}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
