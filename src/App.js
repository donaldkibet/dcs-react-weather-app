import "./App.css";
import CityList from './components/TopCities/CityList';
import Geolocation from './components/GeoLocation/GeoLocation'

function App() {
  return (
    <div className="App">
      <Geolocation/>
      <CityList/>
    </div>
  );
}

export default App;
