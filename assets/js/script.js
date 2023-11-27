//Today's Date 
let timeNow = dayjs();
let formattedDate = dayjs(timeNow).format('dddd, MMMM D');

//Append the time to the page
let todayEl = document.getElementById('todayDate');
todayEl.innerText = formattedDate;

//By deafult load London
if(!isDefaultSet){
    queryURL = urlGenerator('weather','London', 51.509865, -0.118092);
}

//The location will be used to get lon and lat cordinates
function urlGenerator (requestType, cityName, latitude, longitude){
    //Generate the url for weather fetch
    let baseURL = "https://api.openweathermap.org/data/2.5/"+requestType+"?lat="+latitude+"&lon="+longitude+"&units=metric&appid="+temp_token;
    
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
    $("#weather_image").attr("src", "https://openweathermap.org/img/wn/" +weather[0].icon+ "@2x.png");

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
    console.log(data)
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
        let forecastTempMax = `<div class="tempLabel">H: <p id="day${i}TempMax" class="tempMax"></p></div>`;
        let forecastTempMin = `<div class="tempLabel">L: <p id="day${i}TempMin" class="tempMin"></p></div>`;
        let forecastStatus = `<p id="day${i}Status" class="status"></p>`;
        let forecastWind = `<p id="day${i}wind" class="wind"></p>`;
        let forecastHumidity = `<p id="day${i}humidity" class="humidity"></p>`;

        //Append the elements
        $(`#day${i}`).append(forecastHeading).append(forecastImage).append(forecastTemp).append(forecastTempMin).append(forecastTempMax).append(forecastStatus).append(forecastHumidity).append(forecastWind);
    }

    const today = parseInt(dayjs().format('DD')); //Save it as a number
    let forecastingDay, weatherIcon, weatherStatus, averageTemp;
    let tempMax1 = [], tempMax2 = [], tempMax3 = [], tempMax4 = [], tempMax5 = []
    let tempMin1 = [], tempMin2 = [], tempMin3 = [], tempMin4 = [], tempMin5 = []

    for(let i = 0; i < data.list.length; i++){
        let date = parseInt(dayjs(data.list[i].dt_txt).format('DD')); //Save it as a number

        
    //Grab the mid day weather icon for future 5 days
    if (dayjs(data.list[i].dt_txt).format('HH') === '12'){
        weatherIcon =  data.list[i].weather[0].icon;
        weatherStatus = data.list[i].weather[0].main;
        averageTemp = Math.round(data.list[i].main.temp);
    }
    // Find day diff
    let futureDate = dayjs(data.list[i].dt_txt).format('YYYY-MM-DD');
    let curDate = dayjs().format('YYYY-MM-DD')
    const dateForecast = dayjs(futureDate)
    const dateToday = dayjs(curDate)
    let dayDiff = dateForecast.diff(dateToday ,'day')
    // console.log(dayDiff)


    //check the forcasting date with dayJs diff method
    if(dayDiff === 1){
        forecastingDay = '#day1';
        tempMax1.push(Math.round(data.list[i].main.temp_max));
        tempMin1.push(Math.round(data.list[i].main.temp_min));

        $(forecastingDay+'TempMax').text(Math.max(...tempMax1) + " °C");
        $(forecastingDay+'TempMin').text(Math.min(...tempMin1) + " °C");
    }
    else if(dayDiff === 2){
        forecastingDay = '#day2';
        tempMax2.push(Math.round(data.list[i].main.temp_max));
        tempMin2.push(Math.round(data.list[i].main.temp_min));

        $(forecastingDay+'TempMax').text(Math.max(...tempMax2) + " °C");
        $(forecastingDay+'TempMin').text(Math.min(...tempMin2) + " °C");
    }
    else if(dayDiff === 3){
        forecastingDay = '#day3';
        tempMax3.push(Math.round(data.list[i].main.temp_max));
        tempMin3.push(Math.round(data.list[i].main.temp_min));

        $(forecastingDay+'TempMax').text(Math.max(...tempMax3) + " °C");
        $(forecastingDay+'TempMin').text(Math.min(...tempMin3) + " °C");
    }
    else if(dayDiff === 4){
        forecastingDay = '#day4';
        tempMax4.push(Math.round(data.list[i].main.temp_max));
        tempMin4.push(Math.round(data.list[i].main.temp_min));

        $(forecastingDay+'TempMax').text(Math.max(...tempMax4) + " °C");
        $(forecastingDay+'TempMin').text(Math.min(...tempMin4) + " °C");
    }
    else if(dayDiff === 5){
        forecastingDay = '#day5';
        tempMax5.push(Math.round(data.list[i].main.temp_max));
        tempMin5.push(Math.round(data.list[i].main.temp_min));

        $(forecastingDay+'TempMax').text(Math.max(...tempMax5) + " °C");
        $(forecastingDay+'TempMin').text(Math.min(...tempMin5) + " °C");
    }

    //Create an element for date
    
    $(forecastingDay+'heading').text(dayjs(data.list[i].dt_txt).format('dddd, DD'));
    $(forecastingDay+'Temp').text(averageTemp+ " °C");
    $(forecastingDay+'Status').text(weatherStatus);
    $(forecastingDay+"icon").attr("src", "https://openweathermap.org/img/wn/" +weatherIcon+ "@2x.png");
    $(forecastingDay+'humidity').text(Math.ceil(data.list[i].main.humidity)+ "%");
    $(forecastingDay+'humidity').prepend(`<i class="fa-solid fa-droplet"></i>`);
    $(forecastingDay+'wind').text(Math.ceil(data.list[i].wind.speed * 3.6) + " KPH");
    $(forecastingDay+'wind').prepend(`<i class="fa-solid fa-wind"></i>`);
    }
}