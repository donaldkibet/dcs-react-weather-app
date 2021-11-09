import React, { Component } from "react";
import "./App.css";
import CityList from "./components/TopCities/CityList";
import CurrentLocationWeather from "./components/CurrentLocationWeather/CurrentLocationWeather";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurrentLocationWeather />
        <CityList />
      </div>
    );
  }
}
export default App;
