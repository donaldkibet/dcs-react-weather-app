import React from "react";
import { screen, render } from "@testing-library/react";
import CityWeatherInfo from "../components/CityWeatherInfo/CityWeatherInfo";
import { Provider } from "../store/Store";
import { useWeather } from "../hooks/useWeather";
// eslint-disable-next-line jest/no-mocks-import
import { mockWeatherResponse } from "../__mocks__/weather.mock";

jest.mock("../hooks/useWeather");

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    cityName: "Nairobi",
  }),
}));
describe("<CityWeatherInfo", () => {
  const renderCityWeatherInfo = () => {
    useWeather.mockReturnValue({ data: mockWeatherResponse, error: null });
    render(
      <Provider>
        <CityWeatherInfo />
      </Provider>
    );
  };

  const renderEmptyCityWeatherInfo = () => {
    useWeather.mockReturnValue({ data: null, error: null });
    render(
      <Provider>
        <CityWeatherInfo />
      </Provider>
    );
  };

  test("renders city weather information correctly, together with the notes section", () => {
    renderCityWeatherInfo();
    expect(screen.getByText(/^Notes$/i)).toBeInTheDocument();
    expect(
      screen.getByText(/There is no Notes to display at the moment/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Temp/i)).toBeInTheDocument();
    expect(screen.getByText(/26°/i)).toBeInTheDocument();
    expect(screen.getByText(/Visibility/i)).toBeInTheDocument();
    expect(screen.getByText(/Feels like/i)).toBeInTheDocument();
    expect(screen.getByText(/21° ~ 19°/i)).toBeInTheDocument();
    expect(screen.getByText(/Pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/1020/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity/i)).toBeInTheDocument();
    expect(screen.getByText(/Visibility/i)).toBeInTheDocument();
    expect(screen.getByText(/10 Km/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind/i)).toBeInTheDocument();
    expect(screen.getByText(/Nairobi/i)).toBeInTheDocument();
    expect(screen.getByText(/Saturday, 11:53 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Today/i)).toBeInTheDocument();
  });

  test("should display empty state when weather information is not found", () => {
    renderEmptyCityWeatherInfo();

    expect(
      screen.getByText(/Nairobi weather information not found/i)
    ).toBeInTheDocument();
  });
});
