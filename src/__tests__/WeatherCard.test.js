import React from 'react';
import { screen, render } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import { mockWeatherResponse } from '../__mocks__/weather.mock';

describe('<WeatherCard/>', () => {
    
    test('should display the weather information card correctly', () => {
        render(<WeatherCard currentWeather={mockWeatherResponse}/>)

        expect(screen.getByText(/26°/)).toBeInTheDocument();
        expect(screen.getByText(/Nairobi/)).toBeInTheDocument();
        expect(screen.getByText(/Saturday, 11:53 PM/i)).toBeInTheDocument();
    })
})
