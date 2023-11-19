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
        ({name, weather, main, wind, sys} = data);

        displayWeather(name, weather, main, wind, sys);
    })
}

function displayWeather(cityName, weather, main, wind, sys){
    console.log(cityName)
    //console.log(weather)
    //Display City Name
    $('#searchedLocation').text(cityName);

    //Display Current Weather condition
    $('#currentWeather').text( weather[0].main);

    //Add temprature, weather icon 
    $('#temprature').text(Math.ceil(main.temp) + " °C")
    $("#weather_image").attr("src", "http://openweathermap.org/img/wn/" +weather[0].icon+ "@2x.png");

    //More information section
    $('#humidity').text(main.humidity+"%");
    $('#wind').text(Math.round(wind.speed * 3.6)+ " KPH");
    $('#sunrise').text(sys.sunrise);
    $('#sunset').text(sys.sunset);
    $('#tempMin').text(Math.ceil(main.temp_min) + " °C");
    $('#tempMax').text(Math.ceil(main.temp_max) + " °C");

}


//Planning
