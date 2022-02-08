//1) search cities

//add searc bar and submission button that call the weather api for whatever city
// !!!!!!!!!!!--------record lat and lon from WEATHER API and transfer those into parameters for ONECALL API to get five day forecast--------!!!!!!!!!!!
//2)recent searches

//have 10 last searches created as li's in a manner that they can be called back to

//3)current city current day

//from search bar in section one habe the information displayed for the current day
//and the current city here, calling information from the weatheer api. This section
// section 4 can also be called by the list of recent searches in section 2

//4) current city five day forcast

// display information for five days after the current day in section three for the current city

var APIKey = "4afcf2545fe74a0ac9054bd3660678f4";
var input = document.getElementById("search");
var btn = document.getElementById("searchbtn");
var city = document.getElementById("cityname");
var day1info = document.getElementById("info1");
var day1temp = document.getElementById("temp1");
var day1wind = document.getElementById("wind1");
var day1hum = document.getElementById("hum1");
var day1uvi = document.getElementById("uvi1");
var day1icon = document.getElementById("icon1");
var iconUrl = document.createElement("img");
var fiveday = [
    document.getElementById("0"), 
    document.getElementById("1"), 
    document.getElementById("2"), 
    document.getElementById("3"), 
    document.getElementById("4")
]
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var hum = document.getElementById("hum");
btn.addEventListener("click", getAPI);

function getAPI() {
  var weather = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&units=imperial&appid=" + APIKey;
  fetch(weather)
    .then(function (response) {
      if (response.status === 404) {
        alert("No city in the world is even called that.");
      }
      if (input.value === ""){
        alert("Please specify a city. Like, literally anywhere in the world.")
      }
       else {
        return response.json();
      }
    })
    .then(function (data) {
     console.log(data)
      city.textContent = data.name + " " + moment().format("MM/DD/YYYY");
      iconUrl.src = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var onecall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
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

              if (data.current.uvi>3){
                //day1info.children[3].setAttribute("style", "background-color: green");
              }
                       
// Category	UVI Range	Color
// Low	0 – 2	Green
// Moderate	3 – 5	Yellow
// High	6 – 7	Orange
// Very High	8 – 10	Red
// Extreme	11 +	Purple

              for (var i=0; i<fiveday.length; i++) {

                var icon5 = document.createElement("img")
                icon5.src = "http://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+"@2x.png";
                fiveday[i].children[3].replaceWith(icon5);

                fiveday[i].children[0].textContent = "Temp: " + data.daily[i].temp.day + "\xB0F";
                fiveday[i].children[1].textContent = "Wind: " + data.daily[i].wind_speed + "MPH";
                fiveday[i].children[2].textContent = "Humidity: " + data.daily[i].humidity + "%";
                 // fiveday.forEach(element =>

                 //element.children[i].textContent = data.daily[i].temp.day;
                 //  fiveday.forEach(element =>
            // //     console.log(element),
            // //      temp.textContent = data.daily[i].temp.day);
              }

        });
    });
}
