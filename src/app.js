function cityReplacer(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = searchInput.value;
}

let searchedCity = document.querySelector("#search-form");
searchedCity.addEventListener("submit", cityReplacer);
