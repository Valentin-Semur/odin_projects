// src/utils.js

// Convert temperature from Fahrenheit to Celsius with rounding to 1 decimal place
export const convertToCelsius = (temperature) => {
    return Math.round((temperature - 32) * (5 / 9) * 10) / 10;
}

// Convert wind speed from mph to km/h
export const convertToKmH = (windSpeed) => {
    return Math.round(windSpeed * 1.60934 * 10) / 10;
}

export const createElement = (tag, parent, { id = null, classes = []}) => {
    const element = document.createElement(tag);
    if (id) element.id = id;
    if (classes.length > 0) classes.forEach(className => element.classList.add(className));
    parent.appendChild(element);
    return element;
}
