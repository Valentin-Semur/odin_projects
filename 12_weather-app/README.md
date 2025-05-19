# Weather App

A modern weather application that provides real-time weather information using the Visual Crossing Weather API. Built with vanilla JavaScript and modern web development tools.

## Features

- Real-time weather data fetching for any city
- Displays comprehensive weather information including:
  - Current temperature (in Celsius)
  - Weather conditions and description
  - Precipitation probability
  - Humidity levels
  - Wind speed (in km/h)
  - Location details
- Responsive and modern UI design
- Loading states for better user experience
- Error handling for failed API requests
- Support for both click and Enter key to submit
- Default city fallback

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Webpack 5 for module bundling
- ESLint and Prettier for code quality
- Visual Crossing Weather API

## Project Structure

```
weather-app/
├── src/
│   ├── assets/         # Static assets
│   ├── index.js        # Main application entry
│   ├── weatherService.js    # API and data handling
│   ├── uiUpdater.js    # UI state management
│   ├── weatherWidgetBuilder.js  # DOM structure
│   ├── utils.js        # Utility functions
│   ├── config.js       # Configuration
│   ├── styles.css      # Styling
│   └── template.html   # HTML template
├── webpack.common.js   # Shared webpack config
├── webpack.dev.js      # Development config
├── webpack.prod.js     # Production config
└── package.json        # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Valentin-Semur/learn/the_odin_project/odin_projects/12_weather-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd 12_weather-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `config.js` file in the root directory and add your Visual Crossing API key:
   ```
   const config = {
    apiKey: '',
    apiUrl: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
    defaultCity: 'Paris',
};
   ```

### Development

To start the development server with hot reloading:

```bash
npm run start
```

The application will be available at `http://localhost:8080`

### Production Build

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist` directory.


## Acknowledgments

- [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api) for providing the weather data