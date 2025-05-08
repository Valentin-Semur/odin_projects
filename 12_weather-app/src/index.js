import "./styles.css";
import config from "./config.js";
import { convertToCelsius, convertToKmH } from "./utils.js";
import searchIcon from "./assets/icons/search.svg";
import { buildWeatherWidgetDOM } from "./weatherWidgetBuilder.js";

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
    return data;
}

// Display weather data on the page (update the DOM)
const displayWeatherData = (weatherData) => {
    document.getElementById("weather-temperature").textContent = `${weatherData.temperature} °C`;
    document.getElementById("weather-description").textContent = weatherData.description;
    document.getElementById("weather-location").textContent = weatherData.location;
    document.getElementById("weather-short-description").textContent = weatherData.shortDescription;
    document.getElementById("weather-datetime").textContent = weatherData.datetime;

    document.querySelector("#weather-precipitation .data").textContent = `${weatherData.precipitation} %`;   
    document.querySelector("#weather-humidity .data").textContent = `${weatherData.humidity} %`;
    document.querySelector("#weather-wind .data").textContent = `${weatherData.wind} km/h`;
    
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

// Add search icon to the button
document.getElementById("get-weather").innerHTML = `<img src="${searchIcon}" alt="search">`;

const weatherWidgetDOM = buildWeatherWidgetDOM();
document.body.appendChild(weatherWidgetDOM);




// Update weather data on page load to Paris
updateWeatherData();
console.log(document.body); 
// Print the DOM




