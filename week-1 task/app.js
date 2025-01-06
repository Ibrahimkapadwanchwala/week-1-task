// app.js
document.getElementById('fetchWeatherBtn').addEventListener('click', fetchWeather);
document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent page reload
        fetchWeather(); // Trigger the fetchWeather function
    }
});

async function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = ''; // Clear previous results

    if (!city) {
        resultDiv.innerHTML = '<p style="color: red;">Please enter a valid city name.</p>';
        return;
    }

    try {
        // Get latitude and longitude for the city using GeoCoding API
        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();

        if (!geocodeData.results || geocodeData.results.length === 0) {
            throw new Error('City not found');
        }

        const { latitude, longitude } = geocodeData.results[0];

        // Fetch weather data using Open-Meteo API
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (!weatherData.current_weather) {
            throw new Error('Weather data not available for the selected location.');
        }

        // Extract and display weather details
        const { temperature, windspeed, weathercode } = weatherData.current_weather;
        resultDiv.innerHTML = `
            <h3>Weather in ${city}</h3>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Wind Speed:</strong> ${windspeed} km/h</p>
            <p><strong>Weather Code:</strong> ${weathercode} (Refer to Open-Meteo docs for details)</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}
