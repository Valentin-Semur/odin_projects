import searchIconSvg from "./assets/icons/search.svg";
import spinnerSvg from "./assets/icons/spinner.svg";

let weatherIconsMap = {};
try {
    const icons = require.context("./assets/weather-icons", false, /\.svg$/);
    icons.keys().forEach(key => {
        const iconName = key.replace("./", "").replace(/\.svg$/, '');
        weatherIconsMap[iconName] = icons(key);
    });
} catch (error) {
    console.error("Error loading weather icons:", error);
}

/**
 * Initializes static UI elements, like the search button icon.
 * Assumes the button with ID "get-weather" exists in the DOM.
 */
export function initStaticUI() {
    const getWeatherButton = document.getElementById("get-weather");
    if (getWeatherButton) {
        getWeatherButton.innerHTML = `<img src="${searchIconSvg}" alt="Search">`;
    } else {
        console.warn("Search button (#get-weather) not found in DOM for icon initialization.");
    }
}

/**
 * Displays the weather data on the page.
 * @param {Object|null} weatherData - The processed weather data object. If null, displays an error/default state.
 * @param {HTMLElement} weatherWidgetElement - The root DOM element of the weather widget.
 */
export function displayWeatherData(weatherData, weatherWidgetElement) {
    if (!weatherWidgetElement) {
        console.error("displayWeatherData: Weather widget element not provided.");
        return;
    }

    // Helper function to safely set text content
    const setText = (selector, text) => {
        const element = weatherWidgetElement.querySelector(selector);
        if (element) {
            element.textContent = text !== undefined && text !== null ? String(text) : "N/A";
        } else {
            console.warn(`Element with selector "${selector}" not found in widget.`);
        }
    };

    // Helper function to set icon
    const setIcon = (selector, iconName) => {
        const element = weatherWidgetElement.querySelector(selector);
        if (element) {
            const iconSrc = weatherIconsMap[iconName] || weatherIconsMap['unknown']; // Fallback to an 'unknown' icon if specific one isn't found
            if (iconSrc) {
                element.innerHTML = `<img src="${iconSrc}" alt="${iconName || 'Weather icon'}">`;
            } else {
                element.innerHTML = 'Icon N/A'; // Fallback if no icon source
                console.warn(`Icon source for "${iconName}" not found.`);
            }
        } else {
            console.warn(`Element with selector "${selector}" for icon not found.`);
        }
    };

    if (!weatherData) {
        // Handle case where weatherData is null (e.g., API error)
        // You might want to display an error message within the widget
        setText("#weather-location", "Could not load data");
        setText("#weather-temperature", "N/A");
        setText("#weather-description", "Please try again.");
        // Clear other fields or set to defaults
        setText("#weather-short-description", "");
        setText("#weather-datetime", "");
        setText("#weather-precipitation .data", "");
        setText("#weather-humidity .data", "");
        setText("#weather-wind .data", "");
        setIcon("#weather-icon", "unknown"); // Show an error/unknown icon
        return;
    }

    // Populate the weather widget using the selectors relative to weatherWidgetElement
    setText("#weather-temperature", `${weatherData.temperature}°C`);
    setText("#weather-description", weatherData.description);
    setText("#weather-location", weatherData.location);
    setText("#weather-short-description", weatherData.shortDescription);
    setText("#weather-datetime", weatherData.datetimeFormatted);

    setText("#weather-precipitation .data", `${weatherData.precipitation}%`);
    setText("#weather-humidity .data", `${weatherData.humidity}%`);
    setText("#weather-wind .data", `${weatherData.wind} km/h`);

    setIcon("#weather-icon", weatherData.icon);
}

/**
 * Toggles a loading state on the UI.
 * @param {boolean} isLoading - True to show loading, false to hide.
 */
export function setLoadingState(isLoading) {
    const getWeatherButton = document.getElementById("get-weather");
    const cityInput = document.getElementById("city-input");

    if (getWeatherButton) {
        getWeatherButton.disabled = isLoading;
        
        if (isLoading) {
            getWeatherButton.innerHTML = `<img src="${spinnerSvg}" alt="Loading">`;
        } else {
            getWeatherButton.innerHTML = `<img src="${searchIconSvg}" alt="Search">`;
        }
    }
    if (cityInput) {
        cityInput.disabled = isLoading;
    }
    // You could also show/hide a global loading indicator on the widget itself.
}