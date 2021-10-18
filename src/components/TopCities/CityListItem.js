import { useHistory } from "react-router";
import { useWeatherStoreContext } from "../../store/Store";
import { useWeather } from "../../hooks/useWeather";
import { AiFillDelete, AiOutlineLoading } from "react-icons/ai";
import WeatherCard from "../WeatherCard/WeatherCard";
import styles from "./CityListItem.module.css";

const CityListItem = ({ city }) => {
  const history = useHistory();
  const { removeCity } = useWeatherStoreContext();
  const { data, error } = useWeather(city.name, navigator.onLine);

  const handleDelete = (event) => {
    event.stopPropagation();
    removeCity(city.id);
  };
  const displayMoreDetails = () => {
    history.push(`/weather/${city.name}`);
  };

  if (!data && !error) {
    return (
      <div className={styles.listItem} onClick={displayMoreDetails}>
        <AiOutlineLoading size={20} /> loading ...
      </div>
    );
  }

  if (error)
    return (
      <div
        title={city.name}
        className={styles.listItem}
        onClick={displayMoreDetails}
      >
        <h4>{`${city.name} not found`}</h4>
        <AiFillDelete color="grey" size={25} onClick={handleDelete} />
      </div>
    );

  return (
    <div
      role="listitem"
      className={styles.listItem}
      onClick={displayMoreDetails}
    >
      {data && <WeatherCard currentWeather={data} />}
      <AiFillDelete
        data-testid={city.name}
        color="grey"
        size={25}
        onClick={handleDelete}
      />
    </div>
  );
};

export default CityListItem;
