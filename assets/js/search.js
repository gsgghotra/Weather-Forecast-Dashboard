//Search bar border focus
let search=document.getElementById('search-input');
let recentSearch = new Map();
let API_KEY = '';

let locallyStored = localStorage.getItem("searchmap");
//Converting stored array into map
locallyStored = new Map(JSON.parse(locallyStored));

let searchedCities = [];
// Adding locally stored searched list into map
if (locallyStored.size){
    recentSearch = locallyStored;

    //Add cities into the array that will store recent search
    searchedCities.unshift(Array.from(locallyStored.keys()));
}



//Variable for saving the saerch
let searchVal;
let cordinates = new Map();

//Auto complete using jQuery with dynamic array
var locations = [];
//locations = famousCities;
$( "#search-input" ).autocomplete({
    source: locations
});

//Search the location and update the auto complete array on each key up
$('#search-input').on("keyup", function(event){
    //console.log(event)
    searchVal = $('#search-input').val();
    //if search exists and is greater than 3 characters
    if (searchVal.length > 1){
        //console.log(searchVal);
        //pass the searched characters to the location finder function
        autoCompleteGenerator(searchVal);
    }
    
});

//Auto complete Array generator and update search suggestion
function autoCompleteGenerator(searchVal){

    //console.log(searchVal);

    var url =  "http://api.openweathermap.org/geo/1.0/direct?q="+searchVal+"&limit=5&appid="+API_KEY;
    fetch(url)
    .then(function(response){
        //console.log(response);
        return response.json();
    })
    .then(function(data){
        //console.log(data)
        for(let i = 0; i < data.length; i++){
            //console.log(location.name+",", location.country);
            var newLocation = data[i].name+", "+ [data[i].country];
            cordinates.set(newLocation, {"lat":data[i].lat, "lon": data[i].lon})
            locations[i] = newLocation;
            //console.log(locations)
            }
    })
}


function manualGeoSearch(searchVal){
    var url =  "http://api.openweathermap.org/geo/1.0/direct?q="+searchVal+"&limit=1&appid="+API_KEY;
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if (data.length > 0){
            //console.log("Did you mean: ", data[0].name+", "+ data[0].country);
            let cityName = data[0].name+", "+ data[0].country;
            let locationLatitude = data[0].lat;
            let locationLongitude = data[0].lon;

            //Store the searched city in local storage
            searchHistory(cityName, locationLatitude, locationLongitude);
            //load weather! if city found on search click
            urlGenerator('weather', cityName, locationLatitude, locationLongitude);
        } else {
            console.log("City not found")
        }
        
    })


}
//When clicked on the auto completion part
$('#ui-id-1').on('click', (event)=>{
    event.preventDefault();
    //console.log(event);
    let searchedLocation = document.getElementById('searchedLocation');
    
    const cityName = event.target.innerText;

    //If map has the valuses of the selected city
    if(cordinates.has(cityName)){
        const locationLatitude = cordinates.get(cityName).lat;
        const locationLongitude = cordinates.get(cityName).lon;

        //Store the searched city in local storage
        searchHistory(cityName, locationLatitude, locationLongitude);
        urlGenerator('weather', cityName, locationLatitude, locationLongitude);
    }
});

//when search button is clicked
//Search Button
$('#search-button').on('click', (event)=>{
    event.preventDefault();
    //console.log(event);
    searchVal = $('#search-input').val();
    
    //add saerched Location the screen
    let searchedLocation = document.getElementById('searchedLocation');
    manualGeoSearch(searchVal);
})


//Function to process search history
function searchHistory(cityName, locationLatitude, locationLongitude){
    recentSearch.set(cityName, {"lat" : locationLatitude, "lon": locationLongitude})
    localStorage.setItem("searchmap", JSON.stringify(Array.from(recentSearch.entries())));
}

//On focus add border
search.addEventListener('focus',(event)=>{
    document.getElementById('search-form').style.border="1px solid #E01A59";
});
//on Focus out remove border
search.addEventListener('focusout',(event)=>{
    document.getElementById('search-form').style.border="1px solid rgba(0, 0, 0, 0.276)";
});
//Show auto completion suggestion on click
search.addEventListener('click',()=>{
    document.getElementById('ui-id-1').style.display="block";
})
