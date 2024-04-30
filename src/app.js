function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  let unit = document.querySelector("#unit");
  unit.innerHTML = "°F";

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let date = new Date(response.data.time * 1000);

  let windSpeedElement = document.querySelector("#windSpeed");
  let timeElement = document.querySelector("#time");
  windSpeedElement.innerHTML = `${response.data.wind.speed}mi/h`;
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#weather-img");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
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

  if (hours > 12) {
    hours = hours - 12;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "faa6632e6o4d4eb073bt724d3e3780ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  //get temperature, wind speed, and humidity levels

  axios.get(apiUrl).then(refreshWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function cityReplacer(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let user_input_city = document.querySelector("#search-form");
user_input_city.addEventListener("submit", cityReplacer);
let unit_change_request = document.querySelector("#unit");
unit_change_request.addEventListener("click", unitReplacer);

function getForecast(city) {
  let apiKey = "faa6632e6o4d4eb073bt724d3e3780ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2" id="col-2">
    <div class="forecast-date">${formatDay(day.time)}</div>
    <img 
      src= ${day.condition.icon_url}
      alt="weather icon" class="weather-forecast-icon"
    />
    <div class="forecast-temperatures">
      <span class="maximum-forecast-temp"><strong>${Math.round(
        day.temperature.maximum
      )}°</strong></span>
      <span class="minimum-forecast-temp">${Math.round(
        day.temperature.minimum
      )}°</span>
    </div>
  </div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Columbus");
getForecast("Columbus");

function fahrenheit_to_celsius(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let unit = document.querySelector("#unit");
  unit.innerHTML = "°C";

  let unit_change_request = document.querySelector("#unit");
  unit_change_request.addEventListener("click", cityReplacer);
}

function changeUnit(city) {
  let apiKey = "faa6632e6o4d4eb073bt724d3e3780ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(fahrenheit_to_celsius);
}

function unitReplacer(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector(".city");
  changeUnit(searchInput.value);
}
