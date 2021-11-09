import React from "react";
import AddCity from "../components/TopCities/AddCity";
import { screen, render } from "@testing-library/react";
import { Provider } from "../store/Store";
import userEvent from "@testing-library/user-event";

const mockHistory = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router-dom") as any,
  useHistory: () => ({
    push:mockHistory
  }),
}));

describe("<AddCity/>", () => {
  test("should be able to add city to the list", () => {
    render(
      <Provider>
        <AddCity />
      </Provider>
    );

    expect(
      screen.getByText(/Enter city name to add to list/)
    ).toBeInTheDocument();
    const textInput = screen.getByRole("textbox");
    const addCityButton = screen.getByRole("button", { name: /Add New City/ });

    expect(textInput).toBeInTheDocument();
    expect(addCityButton).toBeInTheDocument();

    userEvent.click(addCityButton);
    // Prevent adding empty strings as city name
    expect(screen.getByText(/City name is required/i)).toBeInTheDocument();

    userEvent.type(textInput, "Mexico City");
    userEvent.click(addCityButton);
    
    // Prevent double entry of same city
    userEvent.type(textInput, "Mexico City");
    userEvent.click(addCityButton);
    expect(screen.getByText(/Mexico City already exist on the list/)).toBeInTheDocument()

    expect(mockHistory).toHaveBeenCalled();
    expect(mockHistory).toHaveBeenCalledWith('/')
    
  });
});
