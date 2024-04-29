function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let date = new Date(response.data.time * 1000);

  let windSpeedElement = document.querySelector("#windSpeed");
  let timeElement = document.querySelector("#time");
  windSpeedElement.innerHTML = `${response.data.wind.speed}mi/h`;
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
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

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "faa6632e6o4d4eb073bt724d3e3780ff";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  //get temperature, wind speed, and humidity levels
  axios.get(apiUrl).then(refreshWeather);
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

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let forecastDays = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = "";

  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2" id="col-2">
    <div class="forecast-date">${day}</div>
    <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
      alt="weather icon"
      width="110"
    />
    <div class="forecast-temperatures">
      <span class="maximum-forecast-temp">10°</span>
      <span class="minimum-forecast-temp">1°</span>
    </div>
  </div>
`;
  });
  forecast.innerHTML = forecastHTML;
}

searchCity("Columbus");
displayForecast();
