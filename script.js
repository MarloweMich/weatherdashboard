//GLOBAL VARIABLES

var APIKey = "4afcf2545fe74a0ac9054bd3660678f4";
var input = document.getElementById("search");
var btn = document.getElementById("searchform");

//CURRENT CITY/CURRENT DAY WEATHER

var cityEl = document.getElementById("cityname");
var day1info = document.getElementById("info1");
var day1temp = document.getElementById("temp1");
var day1wind = document.getElementById("wind1");
var day1hum = document.getElementById("hum1");
var day1uvi = document.getElementById("uvi1");
var day1icon = document.getElementById("icon1");

//FIVEDAY FORECAST VARIABLES

var iconUrl = document.createElement("img");
var fiveday = [
  document.getElementById("day2"),
  document.getElementById("day3"),
  document.getElementById("day4"),
  document.getElementById("day5"),
  document.getElementById("day6"),
];

//SAVELOCAL VARIABLES
var prevsearchbar = [
  document.getElementById("p0"),
  document.getElementById("p1"),
  document.getElementById("p2"),
  document.getElementById("p3"),
  document.getElementById("p4"),
  document.getElementById("p5"),
  document.getElementById("p6"),
];
var cityhistory = JSON.parse(localStorage.getItem("input"))||[];

//BEGINS PROCESS
btn.addEventListener("submit", getAPI);

//FETCHING OPENWEATHER API'S
function getWeather(city){
  
  var weather =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&units=imperial&appid=" +
  APIKey;
fetch(weather)
  .then(function (response) {
    if (response.status === 404) {
      alert("No city in the world is even called that.");
    }
    if (city === "") {
      alert("Please specify a city. Like, literally anywhere in the world.");
    } else {
      return response.json();
    }
  })
  .then(function (data) {
    console.log(data);
    cityEl.textContent = data.name + " " + moment().format("MM/DD/YYYY");
    iconUrl.src =
      "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    var lat = data.coord.lat;
    //window.latglob = lat;
    var lon = data.coord.lon;
    var onecall =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial&appid=" +
      APIKey;
    return fetch(onecall)
      .then(function (response) {
        {
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data);
        day1temp.textContent = "Temp: " + data.current.temp + "\xB0F";
        day1hum.textContent = "Humidity: " + data.current.humidity + "%";
        day1uvi.textContent = "UV Index: " + data.current.uvi;
        day1wind.textContent = "Wind: " + data.current.wind_speed + "MPH";
        day1icon.appendChild(iconUrl);
        if (data.current.uvi < 3)
          day1info.children[3].setAttribute(
            "style",
            "background-color: green"
          );
        else if (3 < data.current.uvi <= 5)
          day1info.children[3].setAttribute(
            "style",
            "background-color: yellow"
          );
        else if (5 < data.current.uvi <= 8)
          day1info.children[3].setAttribute(
            "style",
            "background-color: orange"
          );
        else if (8 < data.current.uvi <= 11)
          day1info.children[3].setAttribute("style", "background-color: red");
        else if (11 < data.current.uvi)
          day1info.children[3].setAttribute(
            "style",
            "background-color: purple"
          );

        //PLACING PERTINENT INFO IN 5 DAY FORECAST

        for (var i = 0; i < fiveday.length; i++) {
          var icon5 = document.createElement("img");
          icon5.src =
            "http://openweathermap.org/img/wn/" +
            data.daily[i].weather[0].icon +
            "@2x.png";
          fiveday[i].children[4].replaceWith(icon5);
          fiveday[i].children[0].textContent = moment()
            .add(i + 1, "days")
            .format("MM/DD/YYYY");
          fiveday[i].children[1].textContent =
            "Temp: " + data.daily[i].temp.day + "\xB0F";
          fiveday[i].children[2].textContent =
            "Wind: " + data.daily[i].wind_speed + "MPH";
          fiveday[i].children[3].textContent =
            "Humidity: " + data.daily[i].humidity + "%";
        }
        displayHistory();
      });
  });
}

function getAPI(event) {
  event.preventDefault();
  var city = input.value;
  getWeather(city);
  
}

//LOCAL STORAGE STUFF
function saveLocal() {
  if(cityhistory.indexOf(input.value) === -1){
    cityhistory.push(input.value);
    localStorage.setItem("input", JSON.stringify(cityhistory));
  }
}
btn.addEventListener("submit", function (event) {
  event.preventDefault();
  saveLocal();
});
function displayHistory() {
  for (var i = 0; i < prevsearchbar.length; i++) {
    prevsearchbar[i].textContent = cityhistory[i];
    prevsearchbar[i].addEventListener("click", function(event){
      var city = event.target.innerText;
      getWeather(city);
    });
  }
}
function init() {
  displayHistory();
}
init();