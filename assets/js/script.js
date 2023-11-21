//Today's Date 
var timeNow = dayjs();
var formattedDate = dayjs(timeNow).format('dddd, MMMM D');

var API = "";
//Append the time to the page
var todayEl = document.getElementById('todayDate');
todayEl.innerText = formattedDate;

//By deafult load London
let queryURL = urlGenerator('weather','London', 51.509865, -0.118092);

//The location will be used to get lon and lat cordinates
function urlGenerator (requestType, cityName, latitude, longitude){
    //Generate the url for weather fetch
    let baseURL = "https://api.openweathermap.org/data/2.5/"+requestType+"?lat="+latitude+"&lon="+longitude+"&units=metric&appid="+API;
    
    if (requestType === 'weather'){ //If request type is weather, fetch weather
        fetchWeather(baseURL, cityName);
    }
    else if (requestType === 'forecast'){ // return baseURL;
        return baseURL;
    }
}

//Fetch current weather
function fetchWeather(queryURL, cityName){
    fetch(queryURL)
    .then(function(response){
        //Response
        return response.json();
    })
    .then(function(data){
        //Display Weather data
        //console.log("This is weather data ", data);

        //Information structure using ES6+ object destructuring
        ({name, weather, main, wind, sys, timezone} = data);

        //Forecasting 5 days url
        queryURL = urlGenerator('forecast',cityName, data.coord.lat, data.coord.lon);
        fetchForecasting(queryURL);
        //Display
        displayWeather(cityName, weather, main, wind, sys, timezone);
    })
}

//5 Days forecasting
function fetchForecasting(queryURL){
    //console.log(queryURL);
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //console.log(data);
       displayforecasting(data);
    })
}
//Display the weather
function displayWeather(cityName, weather, main, wind, sys, timezone){

    const sunriseTime = new Date((sys.sunrise+timezone)*1000);
    const sunsetTime = new Date((sys.sunset+timezone)*1000);

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
    $('#sunrise').text(dayjs(new Date(sunriseTime)).format('h:mm A')); 
    //Converted into localtime using ( - timezone * 60 * 1000) timezone formula
    $('#sunset').text(dayjs(new Date(sunsetTime)).format('h:mm A'));
    $('#tempMin').text(Math.ceil(main.temp_min) + " °C");
    $('#tempMax').text(Math.ceil(main.temp_max) + " °C");

}

//Display 5 days forecasting
function displayforecasting(data){
    //Create HTML elements for 5 days
    for(let i = 1; i < 6 ; i++){
        //Remove if the element already exists
        $(`#day${i}`).remove();

        //Create new element
        let forecastingEl = `<div id="day${i}"></div>`;
        $(".fiveDayForecast").append(forecastingEl);
        $(`#day${i}`).addClass("col-2").addClass("forecastDay");

        //Add Heading to Daily forecast
        let forecastHeading = `<h5 id="day${i}heading"></h5>`;
        let forecastImage = `<img id="day${i}icon" class="icon"></img>`;
        let forecastTemp = `<p id="day${i}Temp" class="temp"></p>`;
        let forecastStatus = `<p id="day${i}Status" class="status"></p>`;
        let forecastWind = `<p id="day${i}wind" class="wind"></p>`;
        let forecastHumidity = `<p id="day${i}humidity" class="humidity"></p>`;

        //Append the elements
        $(`#day${i}`).append(forecastHeading).append(forecastImage).append(forecastTemp).append(forecastStatus).append(forecastHumidity).append(forecastWind);
    }

    const today = parseInt(dayjs().format('DD')); //Save it as a number
    let forecastingDay, weatherIcon, weatherStatus, averageTemp;

    for(let i = 0; i < data.cnt; i++){
        let date = parseInt(dayjs(data.list[i].dt_txt).format('DD')); //Save it as a number

        
    //Grab the mid day weather icon for future 5 days
    if (dayjs(data.list[i].dt_txt).format('HH') === '12'){
        weatherIcon =  data.list[i].weather[0].icon;
        weatherStatus = data.list[i].weather[0].main;
        averageTemp = Math.ceil(data.list[i].main.temp);
    }

    //check if that date is today + 1
    if(date-1 === today){
        forecastingDay = '#day1';
    }
    else if(date-2 === today){
        forecastingDay = '#day2';
    }
    else if(date-3 === today){
        forecastingDay = '#day3';
    }
    else if(date-4 === today){
        forecastingDay = '#day4';
    }
    else if(date-5 === today){
        forecastingDay = '#day5';
    }

    //Create an element for date
    $(forecastingDay+'heading').text(dayjs(data.list[i].dt_txt).format('dddd, DD'));
    $(forecastingDay+'Temp').text(averageTemp+ " °C");
    $(forecastingDay+'Status').text(weatherStatus);
    $(forecastingDay+"icon").attr("src", "http://openweathermap.org/img/wn/" +weatherIcon+ "@2x.png");
    $(forecastingDay+'humidity').text(Math.ceil(data.list[i].main.humidity)+ "%");
    $(forecastingDay+'humidity').prepend(`<i class="fa-solid fa-droplet"></i>`);
    $(forecastingDay+'wind').text(Math.ceil(data.list[i].wind.speed * 3.6) + " KPH");
    $(forecastingDay+'wind').prepend(`<i class="fa-solid fa-wind"></i>`);
    

    //Maybe find the average temp for that day

    //
    }
}