import React from "react";
import CityList from "../components/TopCities/CityList";
import { screen, render } from "@testing-library/react";
import { Provider } from "../store/Store";
import { useWeather } from "../hooks/useWeather";
import userEvent from "@testing-library/user-event";

const mockHistory = jest.fn();

jest.mock("../hooks/useWeather");
jest.mock("react-router", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: mockHistory
    }),
  }));
describe("<CityList/>", () => {
  let result;
  beforeEach(() => {
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
    result = render(
      <Provider>
        <CityList />
      </Provider>
    );
  });

  afterEach(() => {
      jest.resetAllMocks()
  })

  test("renders the default list of top 15 cities in alphabetical order", () => {
    expect(
      screen.getByText("Top 15 Cities around the world")
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

  

  test('should navigate to details page for selected city to view more weather information', () => {
      const firstCityListItem = screen.getByText(/Beijing/i);
      userEvent.click(firstCityListItem);

      expect(mockHistory).toHaveBeenCalled();
      expect(mockHistory).toHaveBeenCalledWith('/weather/Beijing')
  })

  test("should be able to delete city name from the default list", () => {
    expect(
      screen.getByText("Top 15 Cities around the world")
    ).toBeInTheDocument();
    const citiesList = screen.getAllByRole("listitem");
    expect(citiesList.length).toBe(15);

    const cityNames = citiesList.map(
      (city) => city.querySelector("label").textContent
    );
    // Delete all cities from the list
    cityNames.map((city) => {
      userEvent.click(screen.getByTestId(city.trim()));
    });
    
    expect(
      screen.getByText(/There is no city to display at the moment/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Top Cities/)).toBeInTheDocument();
  });
});
