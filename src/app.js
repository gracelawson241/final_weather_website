function refreshWeather(response) {
  console.log(response.data.temperature.current);
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
