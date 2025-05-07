import "./styles.css";
import config from "../config.js";
import { convertToCelsius, convertToKmH } from "./utils.js";
import cloudIcon from "./assets/icons/cloudy.svg";

const apiKey = config.apiKey;
const weatherIcons = {
    "clear-day": '<img src="./src/assets/icons/clear-day.svg" alt="Clear Day">',
    "clear-night": '<img src="./src/assets/icons/clear-night.svg" alt="Clear Night">',
    "cloudy": '<img src="./src/assets/icons/cloudy.svg" alt="Cloudy">',
    "fog": '<img src="./src/assets/icons/fog.svg" alt="Fog">',
    "hail": '<img src="./src/assets/icons/hail.svg" alt="Hail">',
    "partly-cloudy-day": '<img src="./src/assets/icons/partly-cloudy-day.svg" alt="Partly Cloudy Day">',
    "partly-cloudy-night": '<img src="./src/assets/icons/partly-cloudy-night.svg" alt="Partly Cloudy Night">',
    "rain": '<img src="./src/assets/icons/rain.svg" alt="Rain">',
    "showers-day": '<img src="./src/assets/icons/showers-day.svg" alt="Showers Day">',
    "snow": '<img src="./src/assets/icons/snow.svg" alt="Snow">',
    "thunder-rain": '<img src="./src/assets/icons/thunder-rain.svg" alt="Thunder Rain">',
};

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

    console.log(weatherData.icon);
    if (weatherData.icon === 'cloudy') {
        document.getElementById("weather-icon").innerHTML = `<img src="${cloudIcon}" alt="Cloudy">`;
    }
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