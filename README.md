# Travel Planner - FIND & TRAVEL

Welcome to the Travel Planner - FIND & TRAVEL project!

This application allows you to plan your travel adventures by exploring countries, accessing essential information, watching destination videos, and leaving comments. It's a convenient tool to discover new places and share your travel experiences.

## Demo link:

Access my site at [eraka93.github.io](https://eraka93.github.io/)

## Table of Content:

- [Setup](#setup)
- [About The App](#about-the-app)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Project Structure](#structure)
- [Data Flow](#data-flow)

## Setup

Follow these steps to set up the project:

1. Download or clone the repository.
2. Navigate to the project directory:
   ```
   cd travel-planner
   ```
3. **Note**: The project already includes an `.env` file for easier testing purposes. However, in a production environment, it is recommended to create your own `.env` file and insert the API key for the Country Layer API and the YouTube Data API.
4. Install project dependencies:
   ```
   npm install
   ```
5. Start the development server:
   ```
   npm run dev
   ```
6. Open your browser and visit `http://localhost:5173` to view the application.

Now you're all set up and ready to use the "Travel Planner" application!

## About The App

Travel Planner is a web application that allows users to explore different countries. It consists of three main pages:

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

## Architecture

The "Travel Planner - FIND & TRAVEL" application follows a component-based architecture using React and Redux. It is designed to provide a seamless user experience for planning travel adventures. The application consists of the following main components:

1. **App**: The entry point of the application that handles routing and renders other components based on the current URL.

2. **Home Page**: Renders the home page, displaying a list of countries available for exploration.

3. **Countries Page**: Displays a list of all countries, allowing users to click on a specific country to view more detailed information.

4. **Country Page**: Shows essential information about a specific country, including basic details and a YouTube video showcasing popular destinations in that country.

5. **Error Page**: Displays an error page when there is an issue with fetching data or encountering an error during the user's interaction with the application.

6. **Comments Component**: Enables users to leave comments and share their travel experiences related to a particular country.

7. **Loading Component**: Displays a loading spinner while data is being fetched from external APIs.

## Project Structure

The project structure of the Travel Planner - FIND & TRAVEL application is as follows:

```
travel-planner/
  ├── src/
  │   ├── components/
  │   │   ├── Comments.css
  │   │   ├── Comments.tsx
  │   │   ├── Loading.tsx
  │   │   ├── Loading.css
  │   ├── pages/
  │   │   ├── Countries.css
  │   │   ├── Countries.tsx
  │   │   ├── Country.css
  │   │   ├── Country.tsx
  │   │   ├── ErrorPage.css
  │   │   ├── ErrorPage.tsx
  │   │   ├── Home.css
  │   │   ├── Home.tsx
  │   ├── services/
  │   │   ├── api.tsx
  │   ├── app/
  │   │   ├── store.ts
  │   ├── App.tsx
  │   ├── index.css
  │   ├── main.tsx
  │   ├── vite-env.d.ts
  ├── .env
  ├── .gitignore
  ├── index.html
  ├── package.json
  ├── package-lock.json
  ├── README.md
  ├── tsconfig.json
  ├── tsconfig.node.json
  └── vite.config.js
```

This structure represents the organization of Travel Planner project, with directories such as `src/`, `components/`, `pages/`, `services/`, `app/`, and various files like `index.html`, `App.tsx`, `index.html`, `.env`, and more.

## Data Flow

The data flow for the described process is as follows:

1. User clicks on the "List of countries" button on the home page, redirecting them to the Countries page.
2. The Countries page fetches the list of countries using the CountryLayer API with the API key. The API response returns an array of country objects.
3. The country flags are displayed using the alpha-2 country code from each country object. The flag images are retrieved from the flagcdn website, which contains images of all country flags.
4. The user can enter a country name in the search input, triggering the search handler. The search handler filters the array of countries based on the country name and displays the filtered array.
5. When the user clicks on a country, they are redirected to the Country page.
6. The Country page fetches country-specific data using the CountryLayer API. Additionally, it embeds a YouTube video using the YouTubeDataAPI. The video search query includes the country name in the format "{countryName} travel" or "best place to visit".
7. The YouTubeDataAPI response returns an object containing video data, including the video ID. The video ID is used to generate the embedded video player.
8. For YouTube comments, a similar process is followed. The video ID is used as a parameter to fetch the comments from the YouTubeDataAPI.
9. Redux store is used to manage comments. When a user enters a comment, it is saved in the store. The comments are displayed on the specific country page. If the user returns to the same country, the comments are loaded from the store.
10. However, if the application is reloaded, the store is cleared, and the comments are lost. To address this issue, implementing a database solution would be recommended for reading and storing comments persistently.

The described data flow ensures that the application fetches country data, displays country information, embeds YouTube videos, and manages comments efficiently and consistently throughout the user's interaction.
