function currentWeatherDetails(response) {
  let temperatureElement = docuament.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#location");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);

  console.log(response.data);
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
  timeElement.innerHTML = formatDate(date);
}

function search(event) {
  event.preventdefault();
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
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);
