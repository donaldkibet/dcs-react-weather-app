import { render, screen } from "@testing-library/react";
import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

describe("<NavBar/>", () => {
    
  beforeEach(() => {
    render(
        <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });

  test("should enable user navigate to within the application", () => {
    
      const homeLink = screen.getByRole('link', { name: /Home/});
      const AddCityLink = screen.getByRole('link', { name: /Add City/});
      const searchLink = screen.getByRole('link', { name: /Search/});

      expect(homeLink).toBeInTheDocument();
      expect(AddCityLink).toBeInTheDocument();
      expect(searchLink).toBeInTheDocument();

      // User can navigate in the app
        userEvent.click(AddCityLink);
        expect(location.pathname).toBe('/add-city')
        userEvent.click(searchLink);
        expect(location.pathname).toBe('/search')
        userEvent.click(homeLink);
        expect(location.pathname).toBe('/')

  });
});
