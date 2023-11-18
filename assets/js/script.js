//Today's Date 
var timeNow = dayjs();
var formattedDate = dayjs(timeNow).format('dddd, MMMM D');
console.log(formattedDate);

var API = "";
//Append the time to the page
var todayEl = document.getElementById('todayDate');
todayEl.innerText = formattedDate;


//The location will be used to get lon and lat cordinates

function urlGenerator (cityName, latitude, longitude){
    //Generate the url for weather fetch
    let baseURL = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&appid="+API;
    return baseURL;
}
let queryURL = urlGenerator('London', 51.509865, -0.118092);
fetchWeather(queryURL)

function fetchWeather(queryURL){
    fetch(queryURL)
    .then(function(response){
        //Response
        return response.json();
    })
    .then(function(data){
        //Display Weather data
        console.log(data);

        //Information structure using ES6+ object destructuring
        ({name, weather, main, wind} = data);

        displayWeather(name, weather, main, wind);
    })
}

function displayWeather(cityName, weather, main, wind){
    console.log(cityName)
    //console.log(weather)
    //Display City Name
    let searchedLocation = document.getElementById('searchedLocation');
    searchedLocation.innerText = cityName;

    //Display Current Weather condition
    let currentWeather = document.getElementById('currentWeather');
    currentWeather.innerHTML = weather[0].main;

    //Add temprature, wind and humidity to the app
    let tempratureEl = document.getElementById('temprature');
    tempratureEl.innerText = "Temp: " + Math.ceil(main.temp) + " °C";
    let humidityEl = document.getElementById('humidity');
    humidityEl.innerText = "Humidity: " + main.humidity+"%";
    let windEl = document.getElementById('wind');
    windEl.innerText = "Speed: " + Math.round(wind.speed * 3.6)+ " KPH";

}


//Planning
