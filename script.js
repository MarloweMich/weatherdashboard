//1) search cities

//add searc bar and submission button that call the weather api for whatever city

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
var weather = document.getElementById("info")

function getAPI(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&units=imperial&appid=" + APIKey;
fetch(queryURL)
    .then(function (response){
        if (response.status === 404){
            alert("City Not Found")
        }
        else{
    return response.json();}
    })
    .then(function (data){
        console.log(data)
        console.log(data.sys.country)
         console.log(data.main.temp)
         console.log("City: " + data.name)
         console.log(data.wind)
         city.textContent = data.name + ", " + data.sys.country;
         weather.textContent ="Temp: " + data.main.temp + " deg F";
    });
}
    btn.addEventListener("click", getAPI);