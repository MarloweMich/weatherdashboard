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
        alert("City Not Found");
      } else {
        return response.json();
      }
    })
    .then(function (data) {
     console.log(data)
      city.textContent = data.name + " " + moment().format("MM/DD/YYYY");
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
          day1wind.textContent = "Wind speed: " + data.current.wind_speed + "MPH";


          fiveday[0].children[0].textContent = data.daily[0].temp.day + "\xB0F";
          fiveday[0].children[1].textContent = data.daily[0].wind_speed + "MPH";
          fiveday[0].children[2].textContent = data.daily[0].humidity + "%";

          fiveday[1].children[0].textContent = data.daily[1].temp.day + "\xB0F";
          fiveday[1].children[1].textContent = data.daily[1].wind_speed + "MPH";
          fiveday[1].children[2].textContent = data.daily[1].humidity + "%";

          fiveday[2].children[0].textContent = data.daily[2].temp.day + "\xB0F";
          fiveday[2].children[1].textContent = data.daily[2].wind_speed + "MPH";
          fiveday[2].children[2].textContent = data.daily[2].humidity + "%";
          
          fiveday[3].children[0].textContent = data.daily[3].temp.day + "\xB0F";
          fiveday[3].children[1].textContent = data.daily[3].wind_speed + "MPH";
          fiveday[3].children[2].textContent = data.daily[3].humidity + "%";

          fiveday[4].children[0].textContent = data.daily[4].temp.day + "\xB0F";
          fiveday[4].children[1].textContent = data.daily[4].wind_speed + "MPH";
          fiveday[4].children[2].textContent = data.daily[4].humidity + "%";
            //  for (i=0; i<fiveday.length; i++) {
            //      fiveday.forEach(element =>
            //     element.children[0].textContent = data.daily[0].temp.day);
            //     //  fiveday.forEach(element =>
            // //     console.log(element),
            // //      temp.textContent = data.daily[i].temp.day);
            //  }

        });
    });
}
