# DCS react weather app

[![Node.js CI](https://github.com/donaldkibet/Frontend/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/donaldkibet/Frontend/actions/workflows/node.js.yml)

[See it live ](https://dcs-weather-app-ochih5uj5-dkibetwork-gmailcom.vercel.app)

![Desktop View](https://raw.githubusercontent.com/donaldkibet/dcs-react-weather-app/master/docs/desktop-view.png)

A simple weather application that has the following capabilities

-   Request user for location permission and display user location weather information
-   Display weather conditions for top 15 Cities around the world 
-   Ability to customized list of cities as `favorites` to view their current weather locations
-   Ability to search and view detailed city weather information
-   Ability to add, edit and remove notes for a specific city 
-   Work Offline, 


## Getting started

-   Sign up at [openweathermap.org](https://openweathermap.org/) to get API Key
-   Clone this project by running 
    ```bash
        https://github.com/donaldkibet/dcs-react-weather-app.git
    ```
-   Create a file on the root level of the project name `.env` with the following 
    ```bash
    REACT_APP_API_KEY= 'The API key from openweathermap.org'
    REACT_APP_BASE_URL=https://api.openweathermap.org/data/2.5
    REACT_APP_WEATHER_ICON_BASE_URL=http://openweathermap.org/img/wn/
    REACT_APP_FLAGS_BASE_URL=https://www.countryflags.io
    ```

-   Install dependencies, run
    ```bash
        yarn or npm install
    ```
-   Run the project by running 

    ```bash
        yarn start or npm start
    ```
-   The project should be running on [http://localhost:3000](http://localhost:3000)

-   Verify tests 
    ```bash 
    yarn test 
    ```


## User guide

Detailed user guide found 
    [user-guide](https://github.com/donaldkibet/dcs-react-weather-app/blob/master/docs/USERGUIDE.md)

