function currentWeatherDetails(response) {
  let temperatureElement = docuament.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#location");

  console.log(response.data);
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);
