import { useState } from "react";
import { useHistory } from "react-router";
import { useWeatherStoreContext } from "../../store/Store";
import styles from "./AddCity.module.css";

const AddCity = () => {
  const history = useHistory();
  const { addCity } = useWeatherStoreContext();
  const [newCity, setNewCity] = useState("");
  const [required, setRequired] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleAddNewCity = () => {
    if (newCity) {
      const response = addCity(newCity);
      response ? setErrorMessage(true) : history.push("/");
    } else {
      setRequired(true);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <label className="label" htmlFor="cityName">
        Enter city name to add to list
      </label>
      <input
        id="cityName"
        className="textInput"
        value={newCity}
        type="text"
        onChange={(event) => setNewCity(event.target.value)}
        placeholder="Enter city name"
        required
      />
      {required && <p className="labelDanger">City name is required *</p>}
      {errorMessage && <p className="labelDanger">{`${newCity} already exist on the list`}</p>}
      <button className="btn btn-primary" onClick={() => handleAddNewCity()}>
        Add New City
      </button>
    </div>
  );
};

export default AddCity;
