import React from 'react';
import { screen, render } from '@testing-library/react';
import WeatherInfo from '../components/WeatherInfo/WeatherInfo';
import { mockWeatherResponse } from '../__mocks__/weather.mock';

describe('WeatherInfo', () => {
    
    test('should display the weather information card correctly', () => {
        render(<WeatherInfo currentWeather={mockWeatherResponse}/>)

        expect(screen.getByText(/26°/)).toBeInTheDocument();
        expect(screen.getByText(/Nairobi/)).toBeInTheDocument();
        expect(screen.getByText(/Saturday, 11:53 PM/i)).toBeInTheDocument();
    })
})
