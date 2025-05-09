import config from "./config.js";
import { convertToCelsius, convertToKmH, formatEpochToWeekdayHHmm } from "./utils.js";

/**
 * Fetches raw weather data from the Visual Crossing API.
 * @param {string} city - The city for which to fetch weather data.
 * @returns {Promise<Object>} A promise that resolves to the raw API data.
 * @throws {Error} If the API request fails or returns an error.
 */
async function fetchRawWeatherData(city) {
    // Use default city if no city is provided
    const apiUrl = `${config.apiUrl}${city || config.defaultCity}?key=${config.apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
            throw new Error(`Failed to fetch weather data for ${city}: ${errorMessage}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("fetchRawWeatherData error:", error);
        throw error;
    }
}

/**
 * Extracts and transforms relevant weather data from the API response.
 * @param {Object} apiData - The raw data object from the Visual Crossing API.
 * @returns {Object|null} An object containing structured weather data, or null if essential data is missing.
 */
function extractWeatherData(apiData) {
    if (!apiData || !apiData.currentConditions || !apiData.resolvedAddress) {
        console.error("extractWeatherData: Essential data missing from API response.", apiData);
        return null;
    }

    const { currentConditions, resolvedAddress, description: overallDescription } = apiData;
    const { temp, conditions, datetimeEpoch, precipprob, windspeed, humidity, icon } = currentConditions;

    // Ensure values are numbers before conversion, provide defaults if not.
    const tempF = typeof temp === 'number' ? temp : null;
    const windMph = typeof windspeed === 'number' ? windspeed : null;
    const precipProbability = typeof precipprob === 'number' ? precipprob : 0; // Default to 0 if null/undefined
    const humidityPercent = typeof humidity === 'number' ? humidity : 0; // Default to 0 if null/undefined

    return {
        temperature: tempF !== null ? convertToCelsius(tempF) : "N/A",
        description: overallDescription || conditions || "N/A", // Use overall description if available
        location: resolvedAddress || "Unknown Location",
        shortDescription: conditions || "N/A",
        datetimeEpoch: datetimeEpoch, // Keep epoch for potential future use (e.g., formatting)
        datetimeFormatted: datetimeEpoch ? formatEpochToWeekdayHHmm(datetimeEpoch) : "N/A",
        precipitation: precipProbability,
        humidity: humidityPercent,
        wind: windMph !== null ? convertToKmH(windMph) : "N/A",
        icon: icon || "unknown", // Provide a default icon name
    };
}

/**
 * Fetches and processes weather data for a given city.
 * This is the main public function of this service.
 * @param {string} city - The city name.
 * @returns {Promise<Object|null>} A promise that resolves to the processed weather data, or null on error.
 */
export async function getProcessedWeatherData(city) {
    try {
        const rawData = await fetchRawWeatherData(city);
        const processedData = extractWeatherData(rawData);
        return processedData;
    } catch (error) {
        console.error("getProcessedWeatherData error:", error);
        throw error;
    }
}