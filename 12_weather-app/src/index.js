import "./styles.css";
import { buildWeatherWidgetDOM } from "./weatherWidgetBuilder.js";
import { getProcessedWeatherData } from "./weatherService.js";
import { displayWeatherData, setLoadingState, initStaticUI } from "./uiUpdater.js";
import config from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Element References ---
    // It's good practice to get references to frequently used DOM elements once.
    // These are for the input form, not part of the dynamically built widget.
    const cityInputElement = document.getElementById("city-input");
    const getWeatherButtonElement = document.getElementById("get-weather");

    if (!cityInputElement || !getWeatherButtonElement) {
        console.error("Essential UI elements (city input, get weather button) are missing from the DOM. App cannot initialize.");
        return;
    }

    // --- Build and Append Weather Widget ---
    // This creates the structure of the weather display area.
    const weatherWidgetElement = buildWeatherWidgetDOM();
    document.body.appendChild(weatherWidgetElement);

    // --- Initialize Static UI Parts ---
    // e.g., setting the search icon on the button.
    initStaticUI();

    // --- Core Weather Update Function ---
    async function handleWeatherUpdateRequest() {
        const city = cityInputElement.value.trim() || config.defaultCity;
        if (!city) {
            // Optionally display a message to the user to enter a city
            console.warn("City input is empty, using default city.");
            // cityInputElement.value = config.defaultCity; // Or, just proceed with default
        }

        setLoadingState(true); // Show loading indicator

        try {
            const weatherData = await getProcessedWeatherData(city);
            displayWeatherData(weatherData, weatherWidgetElement); // Pass the widget element
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3s seconds to simulate loading
        } catch (error) {
            // This catch is more for unexpected errors in the flow itself.
            // getProcessedWeatherData should ideally handle its own errors and return null.
            console.error("An unexpected error occurred during weather update:", error);
            displayWeatherData(null, weatherWidgetElement); // Display error state in UI
        } finally {
            setLoadingState(false); // Hide loading indicator regardless of success/failure
        }
    }

    // --- Event Listeners ---
    getWeatherButtonElement.addEventListener("click", handleWeatherUpdateRequest);

    cityInputElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission if it's part of a form
            handleWeatherUpdateRequest();
        }
    });

    // --- Initial Weather Data Load ---
    // Set a default city in the input for the initial load if desired
    if (!cityInputElement.value) {
        cityInputElement.value = config.defaultCity;
    }
    handleWeatherUpdateRequest(); // Load weather for the default or pre-filled city

    console.log("Weather application initialized.");
});