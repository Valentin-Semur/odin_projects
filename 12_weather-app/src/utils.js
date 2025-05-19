// src/utils.js

/**
 * Convert temperature from Fahrenheit to Celsius
 * @param {number} fahrenheitTemp - The temperature in Fahrenheit
 * @returns {number} The temperature in Celsius, rounded to 1 decimal place
 */
export const convertToCelsius = (fahrenheitTemp) => {
    if (typeof fahrenheitTemp !== 'number') {
        throw new Error('Input must be a number');
    }
    return Math.round((fahrenheitTemp - 32) * (5 / 9) * 10) / 10;
}

/**
 * Convert wind speed from mph to km/h
 * @param {number} mphWindSpeed - The wind speed in mph
 * @returns {number} The wind speed in km/h, rounded to 1 decimal place
 */
export const convertToKmH = (mphWindSpeed) => {
    if (typeof mphWindSpeed !== 'number') {
        throw new Error('Input must be a number');
    }
    return Math.round(mphWindSpeed * 1.60934 * 10) / 10;
}

// Create a div element
export const createDiv = (id, ...classes) => {
    const div = document.createElement("div");
    if (id) {
        div.id = id;
    }
    if (classes.length > 0) {
        classes.forEach(className => div.classList.add(className));
    }
    return div;
}

// Format epoch to weekday HH:mm
export const formatEpochToWeekdayHHmm = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}