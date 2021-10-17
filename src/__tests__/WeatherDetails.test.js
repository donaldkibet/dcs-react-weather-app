import React from "react";
import WeatherDetails from "../components/WeatherDetails/WeatherDetails";
import { screen, render } from "@testing-library/react";
import { mockWeatherResponse } from "../__mocks__/weather.mock";

describe("<WeatherDetails/>", () => {

  test("should display weather details correctly", () => {
    const { container } = render(
        <WeatherDetails data={mockWeatherResponse} displayAllDetails={true} />
      );
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

    const countryFlag = container.querySelector('img');
    expect(countryFlag).toHaveProperty('src',`${process.env.REACT_APP_FLAGS_BASE_URL}/KE/shiny/64.png`)
  });
});
