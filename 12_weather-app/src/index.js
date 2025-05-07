import "./styles.css";
import config from "../config.js";

const apiKey = config.apiKey;

const fetchWeather = async (city) => {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

const displayWeatherData = (weatherData) => {
    const weatherDescription = document.getElementById("weather-description");
    weatherDescription.textContent = weatherData.description;

    const weatherLocation = document.getElementById("weather-location");
    weatherLocation.textContent = weatherData.location;

    const weatherShortDescription = document.getElementById("weather-short-description");
    weatherShortDescription.textContent = weatherData.shortDescription;
}

// Convert temperature from Fahrenheit to Celsius with rounding .1
const convertToCelsius = (temperature) => {
    return Math.round((temperature - 32) * (5/9) * 10) / 10;
}

// Convert wind speed from mph to km/h
const convertToKmH = (windSpeed) => {
    return Math.round(windSpeed * 1.60934 * 10) / 10;
}

const getWeatherData = async () => {
    const city = document.getElementById("city-input").value;
    const data = await fetchWeather(city);

    const weatherData = {
        temperature: convertToCelsius(data.currentConditions.temp),
        description: data.description,
        location: data.resolvedAddress,
        shortDescription: data.currentConditions.conditions,
        datetime: data.currentConditions.datetime,
        precipitation: data.currentConditions.precipprob,
        humidity: data.currentConditions.humidity,
        wind: convertToKmH(data.currentConditions.windspeed),
    }

    displayWeatherData(weatherData);
    
    console.log(data);
    console.log(weatherData);
}

const getWeatherButton = document.getElementById("get-weather");
getWeatherButton.addEventListener("click", getWeatherData); 
