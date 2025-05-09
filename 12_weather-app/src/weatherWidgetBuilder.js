import { createDiv } from "./utils.js";

const buildWeatherIconTemperature = () => {
    const weatherIconTemperature = createDiv("weather-icon-temperature");
    const weatherIcon = createDiv("weather-icon");
    const weatherTemperature = createDiv("weather-temperature");

    weatherIconTemperature.appendChild(weatherIcon);
    weatherIconTemperature.appendChild(weatherTemperature);

    return weatherIconTemperature;
}

const buildTopLeftContainer = () => {
    const topLeftContainer = createDiv("top-left-container");
    const weatherIconTemperature = buildWeatherIconTemperature();
    const weatherDescription = createDiv("weather-description");

    topLeftContainer.appendChild(weatherIconTemperature);
    topLeftContainer.appendChild(weatherDescription);

    return topLeftContainer;
}

const buildTopRightContainer = () => {
    const topRightContainer = createDiv("top-right-container");
    const weatherLocation = createDiv("weather-location");
    const weatherShortDescription = createDiv("weather-short-description");
    const weatherDatetime = createDiv("weather-datetime");

    topRightContainer.appendChild(weatherLocation);
    topRightContainer.appendChild(weatherShortDescription);
    topRightContainer.appendChild(weatherDatetime);

    return topRightContainer;
}

const buildTopContainer = () => {
    const topContainer = createDiv("top-container");
    const topLeftContainer = buildTopLeftContainer();
    const topRightContainer = buildTopRightContainer();

    topContainer.appendChild(topLeftContainer);
    topContainer.appendChild(topRightContainer);

    return topContainer;
} 

const buildWeatherDetailContainer = (id, label) => {
    const weatherDetailContainer = createDiv(id);
    const weatherDetailLabel = createDiv(null, "label");
    weatherDetailLabel.textContent = label;
    const weatherDetailValue = createDiv(null, "data");

    weatherDetailContainer.appendChild(weatherDetailLabel);
    weatherDetailContainer.appendChild(weatherDetailValue);

    return weatherDetailContainer;
}
const buildBottomContainer = () => {
    const bottomContainer = createDiv("bottom-container");
    const weatherPrecipitation = buildWeatherDetailContainer("weather-precipitation", "Precipitation");
    const weatherHumidity = buildWeatherDetailContainer("weather-humidity", "Humidity");
    const weatherWind = buildWeatherDetailContainer("weather-wind", "Wind");

    bottomContainer.appendChild(weatherPrecipitation);
    bottomContainer.appendChild(weatherHumidity);
    bottomContainer.appendChild(weatherWind);

    return bottomContainer;
}

export const buildWeatherWidgetDOM = () => {
    const weatherContainer = createDiv("weather-container");
    const topContainer = buildTopContainer();
    const bottomContainer = buildBottomContainer();

    weatherContainer.appendChild(topContainer);
    weatherContainer.appendChild(bottomContainer);

    return weatherContainer;
}