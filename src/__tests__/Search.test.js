import React from "react";
import { screen, render } from "@testing-library/react";
import Search from "../components/Search/Search";
import userEvent from "@testing-library/user-event";
import { useWeather }from "../hooks/useWeather";
import { mockWeatherResponse } from "../__mocks__/weather.mock";

jest.mock('../hooks/useWeather');
describe("<Search/>", () => {

  test("user should be able to search for a city and display weather conditions", () => {
    useWeather.mockReturnValue({data: mockWeatherResponse, error: null})
    render(<Search />);
    const searchLabel = screen.getByText(/Search for city/i);
    const searchInput = screen.getByRole("search");

    expect(searchInput).toBeInTheDocument();
    expect(searchLabel).toBeInTheDocument();
    
    userEvent.type(searchInput, "Nairobi");

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

  test("should display not found test when the searched city is not found", () => {
    useWeather.mockReturnValue({data: { cod: '404', message: 'city not found'}, error: {statusCode: 404}})
    render(<Search />);
    const searchLabel = screen.getByText(/Search for city/i);
    const searchInput = screen.getByRole("search");

    expect(searchInput).toBeInTheDocument();
    expect(searchLabel).toBeInTheDocument();

    userEvent.type(searchInput, "Dallas");

    expect(screen.getByRole('heading', { name: /Dallas City not found/})).toBeInTheDocument()
    expect(screen.getByText(/There is no dallas weather information to display at the moment/)).toBeInTheDocument()
  });
});
