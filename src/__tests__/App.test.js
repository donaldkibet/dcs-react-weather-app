import React from "react";
import App from "../App";
import { screen, render } from "@testing-library/react";
import { Provider } from "../store/Store";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useWeatherWithGeoCoordinates, useWeather } from "../hooks/useWeather";
// eslint-disable-next-line jest/no-mocks-import
import { mockWeatherResponse } from "../__mocks__/weather.mock";

jest.mock("../hooks/useGeoLocation");
jest.mock("../hooks/useWeather");
describe("<App/>", () => {
  const renderApp = () => {
    useWeather.mockImplementation((city) => {
      return {
        data: {
          main: {
            temp: 25.81,
            feels_like: 20.41,
            temp_min: 18.87,
            temp_max: 20.93,
            pressure: 1020,
            humidity: 56,
          },
          name: city,
          dt: 1634417587,
          timezone: 10800,
        },
        error: null,
      };
    });
    useWeatherWithGeoCoordinates.mockReturnValue({
      data: mockWeatherResponse,
      error: null,
    });
    useGeoLocation.mockReturnValue({
      permissionGrated: true,
      coordinates: { latitude: 1, longitude: -1 },
    });
    render(
      <Provider>
        <App />
      </Provider>
    );
  };

  it("should render the current location and default city list correctly", () => {
    renderApp();
    expect(
      screen.getByText(/Top 15 Cities around the world/)
    ).toBeInTheDocument();
    const citiesList = screen.getAllByRole("listitem");
    expect(citiesList.length).toBe(15);

    const cityNames = citiesList.map(
      (city) => city.querySelector("label").textContent
    );

    expect(cityNames).toStrictEqual([
      " Beijing",
      " Buenos Aires",
      " Cairo",
      " Chongqing",
      " Delhi",
      " Dhaka",
      " Istanbul",
      " Karachi",
      " Mexico City",
      " Mumbai",
      " New York",
      " Osaka",
      " Sao Paulo",
      " Shanghai",
      " Tokyo",
    ]);
  });
});
