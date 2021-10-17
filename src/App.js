import "./App.css";
import CityList from './components/TopCities/CityList';
import CurrentLocationWeather from './components/CurrentLocationWeather/CurrentLocationWeather'

function App() {
  return (
    <div className="App">
      <CurrentLocationWeather/>
      <CityList/>
    </div>
  );
}

export default App;
