import { useParams } from "react-router";
import { useWeather } from "../../hooks/useWeather";
import Notes from "../Notes/Notes";
import { useWeatherStoreContext } from "../../store/Store";
import React, { useMemo } from "react";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import EmptyState from "../EmptyState/EmptyState";

const CityWeatherInfo: React.FC = () => {
  const { cityName } = useParams();
  const { cityList } = useWeatherStoreContext();

  const cityId = useMemo(
    () => cityList.findIndex((city) => city.name === cityName),
    [cityList, cityName]
  );
  const { data, error } = useWeather(cityName);

  if(!data) return <EmptyState headerTitle={cityName} displayText={`${cityName} weather information not found`}/>
 
  return (
    <>
      {data && !error && (
        <div style={{position: 'relative'}}>
          <WeatherDetails data={data} displayAllDetails={true}/>
          <h3>Notes</h3>
          <Notes cityName={cityName} cityId={cityId} />
        </div>
      )}
    </>
  );
};

export default CityWeatherInfo;

