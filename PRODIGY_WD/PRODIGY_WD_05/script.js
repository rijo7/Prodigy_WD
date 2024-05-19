const form = document.getElementById('location-form');
const input = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');

form.addEventListener('submit', e => {
  e.preventDefault();
  const location = input.value.trim();
  if (location) {
    getWeather(location);
    input.value = '';
  }
});

async function getWeather(location) {
  const apiKey = 'cc2e917f5902aec53dade2026e2b50b7'; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      const { name, main, weather } = data;
      const { temp, humidity } = main;
      const weatherDescription = weather[0].description;
      const icon = weather[0].icon;

      weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Weather: ${weatherDescription}</p>
        <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
      `;
    } else {
      weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfo.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
}
