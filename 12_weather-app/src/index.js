import "./styles.css";
import config from "../config.js";
import { convertToCelsius, convertToKmH } from "./utils.js";

// Load icons
const icons = require.context("./assets/icons", false, /\.svg$/);
const weatherIcons = {};
icons.keys().forEach(key => {
    const iconName = key.replace("./", "").replace(/\.svg$/, '');
    weatherIcons[iconName] = icons(key);
});


const apiKey = config.apiKey;


const fetchWeather = async (city) => {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data;
}

const displayWeatherData = (weatherData) => {
    document.getElementById("weather-description").textContent = weatherData.description;
    document.getElementById("weather-location").textContent = weatherData.location;
    document.getElementById("weather-short-description").textContent = weatherData.shortDescription;
    document.getElementById("weather-datetime").textContent = weatherData.datetime;
    document.getElementById("weather-precipitation").textContent = `${weatherData.precipitation} %`;   
    document.getElementById("weather-humidity").textContent = `${weatherData.humidity} %`;
    document.getElementById("weather-wind").textContent = `${weatherData.wind} km/h`;
    document.getElementById("weather-temperature").textContent = `${weatherData.temperature} °C`;

    const iconSrc = weatherIcons[weatherData.icon];
    document.getElementById("weather-icon").innerHTML = `<img src="${iconSrc}" alt="${weatherData.icon}">`;
}

const extractWeatherData = (data) => {
    const { currentConditions, resolvedAddress } = data;
    const { temp, conditions, datetime, precipprob, windspeed, humidity, icon } = currentConditions;

    const weatherData = {
        temperature: convertToCelsius(temp),
        description: data.description,
        location: resolvedAddress,
        shortDescription: conditions,
        datetime: datetime,
        precipitation: precipprob,
        humidity: humidity,
        wind: convertToKmH(windspeed),
        icon: icon,
    }
    return weatherData;
}

const updateWeatherData = async () => {
    const defaultCity = "Paris";
    const city = document.getElementById("city-input").value || defaultCity;
    const data = await fetchWeather(city);
    const weatherData = extractWeatherData(data);

    displayWeatherData(weatherData);
}

const getWeatherButton = document.getElementById("get-weather");
getWeatherButton.addEventListener("click", updateWeatherData); 

const cityInput = document.getElementById("city-input");
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        updateWeatherData();
    }
});

// Update weather data on page load to Paris
updateWeatherData();