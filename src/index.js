function currentWeatherDetails(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#location");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = response.data.temperature.feels_like;
  let iconElement = document.querySelector("#icon");

  console.log(response.data);

  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
  feelsLikeElement.innerHTML = `${Math.round(feelsLike)}°`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchFormInputElement = document.querySelector("#search-form-input");
  searchCity(searchFormInputElement.value);
}

function searchCity(city) {
  let apiKey = "033b43a04493c2b0f53e8fe8bdote92d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeatherDetails);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "033b43a04493c2b0f53e8fe8bdote92d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function forecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 3) {
      forecastHtml =
        forecastHtml +
        `  <div class ="daily-forecast" id="daily-forecast">
        <div class="forecast-day" id="forecast-day">${forecastDay(
          day.time
        )}</div>
        <br/ >
          <img src="${day.condition.icon_url}" class ="weather-forecast-icon" />
          <div class="display-temp">
          <span class="forecast-min" id="forecast-min">${Math.round(
            day.temperature.minimum
          )}°</span>
          <span id="forecast-max">${Math.round(
            day.temperature.maximum
          )}°</span></div></div>`;
    }
  });
  let forecastElement = document.querySelector("#daily-forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

searchCity("Perth");
