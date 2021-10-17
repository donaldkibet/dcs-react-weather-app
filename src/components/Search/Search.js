import { useState } from "react";
import debounce from "lodash/debounce";
import "./Search.css";
import { useWeather } from "../../hooks/useWeather";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import EmptyState from "../EmptyState/EmptyState";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const handleSearch = debounce((searchTerm) => setSearchTerm(searchTerm), 300);
  const handleSearch = (searchTerm) => setSearchTerm(searchTerm);

  const { data, error } = useWeather(searchTerm);

  return (
    <div className="searchContainer">
      <label className="label" htmlFor="searchInput">
        Search for city
      </label>
      <input
        className="textInput"
        type="text"
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="Enter city name "
        role="search"
      />
      <div className="resultPanel">
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
