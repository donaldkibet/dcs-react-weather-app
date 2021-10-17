import { useWeatherStoreContext } from "../../store/Store";
import { isEmpty, sortBy } from "lodash";
import CityListItem from "./CityListItem";
import styles from "./CityList.module.css";
import EmptyState from "../EmptyState/EmptyState";

const CityList = () => {
  const { cityList } = useWeatherStoreContext();
  
  return (
    <div >
      <p className={styles.cityListTitle}>Top 15 Cities around the world</p>
      <div role="list">
      {!isEmpty(cityList) ? (
        sortBy(cityList, [(city) => city.name]).map((city) => (
          <CityListItem key={city.id} city={city} />
        ))
      ) : (
        <EmptyState headerTitle="Top Cities" displayText="city" />
      )}
      </div>
    </div>
  );
};

export default CityList;
