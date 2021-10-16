import { useState } from "react";
import { useHistory } from "react-router";
import { useWeatherStoreContext } from "../../store/Store";
import styles from "./AddTopCity.module.css";

const AddTopCity = () => {
  const history = useHistory();
  const { addCity } = useWeatherStoreContext();
  const [newCity, setNewCity] = useState("");
  const [required, setRequired] = useState(false);

  const handleAddNewCity = () => {
    if (newCity) {
      addCity(newCity);
      history.push("/");
    } else {
      setRequired(true)
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <label className="label" htmlFor="cityName">Enter city name to add to list</label>
      <input
        id="cityName"
        className="textInput"
        value={newCity}
        type="text"
        onChange={(event) => setNewCity(event.target.value)}
        placeholder="Enter city name"
        required
      />
      {required && <p className="labelDanger">Note is required *</p>}
      <button className="btn btn-primary" onClick={() => handleAddNewCity()}>
        Add New City
      </button>
    </div>
  );
};

export default AddTopCity;
