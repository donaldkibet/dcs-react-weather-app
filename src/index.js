import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "./store/Store";
import { BrowserRouter, Route } from "react-router-dom";
import CityWeatherInfo from "./components/CityWeatherInfo/CityWeatherInfo";
import App from "./App";
import NavBar from "./components/NavBar/NavBar";
import Search from "./components/Search/Search";
import AddCity from "./components/TopCities/AddCity";
import { SWRConfig } from "swr";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import localStorageProvider from "./swr-cache/localStorageCache";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SWRConfig
        value={{
          provider: localStorageProvider,
          revalidateOnReconnect: true,
          revalidateOnMount: false
        }}
      >
        <Provider>
          <Route path="/" render={(props) => <NavBar {...props} />} />
          <Route exact path="/" render={(props) => <App {...props} />} />
          <Route
            exact
            path="/search"
            render={(props) => <Search {...props} />}
          />
          <Route
            exact
            path="/add-city"
            render={(props) => <AddCity {...props} />}
          />
          <Route
            exact
            path="/weather/:cityName"
            render={(props) => <CityWeatherInfo {...props} />}
          />
        </Provider>
      </SWRConfig>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
