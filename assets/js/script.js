//Today's Date 
var timeNow = dayjs();
var formattedDate = dayjs(timeNow).format('dddd, MMMM D');

console.log(formattedDate);

//Append the time to the page
var todayEl = document.getElementById('todayDate');
todayEl.innerText = formattedDate;


//The location will be used to get lon and lat cordinates

function urlGenerator (cityName, latitude, longitude){
    //Generate the url for weather fetch
    let baseURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
}

function fetchWeather(){
    fetch()
    .then(function(response){
        //Response
    })
    .then(function(data){
        //Display Weather
    })
}

function displayWeather(cityName, latitude, longitude){
    console.log(cityName)
    let searchedLocation = document.getElementById('searchedLocation');
    searchedLocation.innerText = cityName;
}


urlGenerator('London City', 51.509865, -0.118092);


//Planning
