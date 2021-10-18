import {  useState } from "react";
import styles from "./Search.module.css";
import { useWeather } from "../../hooks/useWeather";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import EmptyState from "../EmptyState/EmptyState";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data } = useWeather(debouncedSearchTerm, true);

  return (
    <div className={styles.searchContainer}>
      <label className="label" htmlFor="searchInput">
        Search for city
      </label>
      <input
        className="textInput"
        type="text"
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Enter city name "
        role="search"
        disabled={!navigator.onLine}
      />
      <div className={styles.resultPanel}>
        {data?.cod === "404" && (
          <EmptyState
            headerTitle={`${searchTerm} City not found`}
            displayText={`${searchTerm} weather information`}
          />
        )}

        {data?.cod === 200 && (
          <WeatherDetails data={data} displayAllDetails={true} />
        )}
      </div>
    </div>
  );
};

export default Search;
