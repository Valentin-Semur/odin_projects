# Weather App

A simple weather application that allows users to enter a city name and retrieve the current weather conditions using the Visual Crossing Weather API.

## Features

- Input field for entering the city name
- Fetches and displays the current weather description
- Responsive design with basic styling

## Technologies Used

- HTML
- CSS
- JavaScript
- Webpack
- Visual Crossing Weather API

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Valentin-Semur/learn/the_odin_project/odin_projects/12_weather-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd 12_weather-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Usage

1. Start the development server:

   ```bash
   npm run start
   ```

2. Open your browser and go to `http://localhost:8080` to view the app.

3. Enter a city name in the input field and click the "Get Weather" button to see the current weather description.

### Build

To create a production build of the application, run:

```bash
npm run build
```

This will generate the necessary files in the `dist` directory.

## To Do

- [ ] Change grid for the weather container to make each part more autonomous
- [ ] Add error handling for invalid city names.
- [ ] Implement a loading spinner while fetching weather data.

## Acknowledgments

- [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) for providing the weather data.
- [Webpack](https://webpack.js.org/) for module bundling.
