import { render, screen } from "@testing-library/react";
import React from "react";
import CurrentLocationWeather from "../components/CurrentLocationWeather/CurrentLocationWeather";
import { useWeatherWithGeoCoordinates } from "../hooks/useWeather";
// eslint-disable-next-line jest/no-mocks-import
import { mockWeatherResponse } from "../__mocks__/weather.mock";
import { useGeoLocation } from "../hooks/useGeoLocation";

jest.mock("../hooks/useGeoLocation");
jest.mock("../hooks/useWeather");
describe("<CurrentLocationWeather/>", () => {
  it("should display current location weather information, when granted location permission", () => {
    useGeoLocation.mockReturnValue(
      {
        permissionGrated: true,
        coordinates: { latitude: "", longitude: "" },
        error: null,
      },
    );
    useWeatherWithGeoCoordinates.mockReturnValue({
      data: mockWeatherResponse,
      error: null,
    });
    render(<CurrentLocationWeather />);
    expect(screen.getByText(/Today/i)).toBeInTheDocument();
    expect(screen.getByText(/26°/i)).toBeInTheDocument();
    expect(screen.getByText(/Pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/1020/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind/i)).toBeInTheDocument();
    expect(screen.getByText(/Nairobi/i)).toBeInTheDocument();
    expect(screen.getByText(/Saturday, 11:53 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/Today/i)).toBeInTheDocument();
    expect(screen.getByText(/broken clouds/i)).toBeInTheDocument();
  });

  it("should display loading spinner while loading weather information", () => {
    useGeoLocation.mockReturnValue(
      {
        permissionGrated: true,
        coordinates: { latitude: "", longitude: "" },
        error: null,
      },
    );
    useWeatherWithGeoCoordinates.mockReturnValue({ data: null, error: null });
    render(<CurrentLocationWeather />);

    expect(screen.getByTitle(/loading spinner/)).toBeInTheDocument();
  });
});
