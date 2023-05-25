# Project Title

Travel Planner
FIND & TRAVEL

## Demo link:

Access my site at [eraka93.github.io](https://eraka93.github.io/)

## Table of Content:

- [Setup](#setup)
- [About The App](#about-the-app)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Project Structure](#structure)

## Setup

- download or clone the repository
- run `cd travel-planner`
- run `npm install`
  Note: The project already includes an .env file for easier testing purposes. However, in a production environment, it is recommended to create your own .env file and insert the API key for the Country Layer API and the YouTube Data API.
- run `npm run dev`
- open your browser and navigate to `http://localhost:5173` to view the application.

## About The App

[Travel Planner] is a web application that allows users to explore different countries. It consists of three main pages:

- Countries List Page:

This page displays a list of all countries.
Users can browse through the list to see the names of different countries.
When a user clicks on a specific country, they are redirected to the Country Details Page for that country.

- Country Details Page:

This page provides basic information about the selected country, such as its name, capital, region, and country code.
Additionally, a YouTube video clip related to travel destinations in that country is embedded on this page.
Users can watch the video to get a glimpse of the country's attractions and tourist spots.
Below the video, there is a comment section where users can leave comments about their experiences or ask questions related to the country.
Users can submit their comments, which are then displayed along with the existing comments.

## Screenshots

## Technologies

Technologies Used

- `React` : A JavaScript library for building user interfaces.
- `React Router` : A library for implementing routing in a React application.
- `CountryLayer API` : Used to retrieve basic information about countries. Axios is employed to make HTTP requests to the API and fetch the required data.
- `YouTube Data API` : An API for fetching and displaying YouTube video clips.
- `Redux` : A state management library for handling user comments.
- `Axios` : A JavaScript library for making HTTP requests to retrieve country information.
- `Vite` : A development build tool for fast and efficient bundling.
- `TypeScript` : A statically typed superset of JavaScript for enhanced code quality.
- `HTML` : The foundation of the application's user interface, providing the structure and markup for the different pages and components.
- `CSS` : Used to enhance styling and layout.
