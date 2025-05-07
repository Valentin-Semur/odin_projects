import "./styles.css";
import config from "../config.js";
import { convertToCelsius, convertToKmH } from "./utils.js";
import searchIcon from "./assets/icons/search.svg";

// Load icons
const icons = require.context("./assets/weather-icons", false, /\.svg$/);
const weatherIcons = {};
icons.keys().forEach(key => {
    const iconName = key.replace("./", "").replace(/\.svg$/, '');
    weatherIcons[iconName] = icons(key);
});


const apiKey = config.apiKey;

// Fetch weather data from the API
const fetchWeather = async (city) => {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data;
}

// Display weather data on the page (update the DOM)
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

// Extract weather data from the API response
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

// Update weather data
const updateWeatherData = async () => {
    const defaultCity = "Paris";
    const city = document.getElementById("city-input").value || defaultCity;
    const data = await fetchWeather(city);
    const weatherData = extractWeatherData(data);

    displayWeatherData(weatherData);
}

// Event listeners
const getWeatherButton = document.getElementById("get-weather");
getWeatherButton.addEventListener("click", updateWeatherData); 

const cityInput = document.getElementById("city-input");
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        updateWeatherData();
    }
});

document.getElementById("get-weather").innerHTML = `<img src="${searchIcon}" alt="search">`;
console.log(document.getElementById("get-weather"));

const createElement = (tag, parent, { id = null, classes = []}) => {
    const element = document.createElement(tag);
    if (id) element.id = id;
    if (classes.length > 0) classes.forEach(className => element.classList.add(className));
    parent.appendChild(element);
    return element;
}

const container = document.getElementById("container");
console.log(container);
const weatherContainer = createElement("div", container, { id: "weather-container" });

const weatherDivIds = [
    "weather-description",
    "weather-location",
    "weather-short-description",
    "weather-datetime",
    "weather-precipitation",
    "weather-humidity",
    "weather-wind",
]

weatherDivIds.map(id => createElement("div", weatherContainer, { id: id }));

const createWeatherIconTemperature = () => {
    const weatherIconTemperature = createElement("div", weatherContainer, { id: "weather-icon-temperature" });
    const weatherIcon = createElement("div", weatherIconTemperature, { id: "weather-icon" });
    const weatherTemperature = createElement("div", weatherIconTemperature, { id: "weather-temperature" });
    console.log(weatherIconTemperature);
    return weatherIconTemperature;
}

createWeatherIconTemperature();



// Update weather data on page load to Paris
updateWeatherData();
console.log(weatherContainer);

