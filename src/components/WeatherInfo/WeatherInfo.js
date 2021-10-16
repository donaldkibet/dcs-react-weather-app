import dayjs from "dayjs";
import { FiMapPin } from "react-icons/fi";
import styles from "./WeatherInfo.module.css";

const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const WeatherInfo = ({ currentWeather }) => {
  const { main, name, dt, timezone } = currentWeather;
  return (
    <div className={styles.weatherInfoWrapper}>
      <span className={styles.temp}>{Math.round(main.temp)}°</span>
      <div className={styles.tile}>
        <span className={styles.iconWrapper}>
          <FiMapPin /> <span className={styles.label02}>{name}</span>
        </span>
        <p className={styles.label01}>
          {dayjs(dt * 1000)
              .utcOffset(timezone / 60)
              .format("dddd, h:mm A")}
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;
