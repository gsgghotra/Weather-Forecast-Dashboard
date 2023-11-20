//Search bar border focus
var search=document.getElementById('search-input');
let API_KEY = '';

//Temp variable for famous cities
const famousCities = [
    "New York City, USA",
    "Tokyo, Japan",
    "Paris, France",
    "London, United Kingdom",
    "Beijing, China",
    "Sydney, Australia",
    "Rio de Janeiro, Brazil",
    "Moscow, Russia",
    "Mumbai, India",
    "Cairo, Egypt",
    "Istanbul, Turkey",
    "Dubai, UAE",
    "Rome, Italy",
    "Berlin, Germany",
    "Cape Town, South Africa",
    "Buenos Aires, Argentina",
    "Seoul, South Korea",
    "Bangkok, Thailand",
    "Toronto, Canada",
    "Mexico City, Mexico",
    "Singapore",
    "Barcelona, Spain",
    "Los Angeles, USA",
    "Shanghai, China",
    "Amsterdam, Netherlands",
    "Hong Kong, China",
    "San Francisco, USA",
    "Vancouver, Canada",
    "Mumbai, India",
    "Stockholm, Sweden",
    "Athens, Greece",
    "Prague, Czech Republic",
    "Vienna, Austria",
    "Dublin, Ireland",
    "Copenhagen, Denmark",
    "Kuala Lumpur, Malaysia",
    "Johannesburg, South Africa",
    "Jakarta, Indonesia",
    "Warsaw, Poland",
    "Budapest, Hungary",
    "Oslo, Norway",
    "Helsinki, Finland",
    "Zurich, Switzerland",
    "Lisbon, Portugal",
    "Edinburgh, United Kingdom",
    "Melbourne, Australia",
    "Montreal, Canada",
    "Chicago, USA",
    "São Paulo, Brazil",
    // Add more cities as needed
];

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

    console.log(searchVal);

    var url =  "http://api.openweathermap.org/geo/1.0/direct?q="+searchVal+"&limit=5&appid="+API_KEY;
    fetch(url)
    .then(function(response){
        //console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data)
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
        console.log(response);
        return response.json();
    })
    .then(function(data){
        if (data.length > 0){
            console.log("Did you mean: ", data[0].name+", "+ data[0].country);
            let cityName = data[0].name+", "+ data[0].country;
            let locationLatitude = data[0].lat;
            let locationLongitude = data[0].lon;
            //load weather if city found on search click
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
