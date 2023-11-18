//Search bar border focus
var search=document.getElementById('search-input');
let API_KEY = '';

//Variable for saving the saerch
let searchVal;
let cordinates = new Map();

//Auto complete using jQuery with dynamic array
var locations = [];
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
        //autoCompleteGenerator(searchVal)
    }
    
});

//Auto complete Array generator and update search suggestion
function autoCompleteGenerator(searchVal){
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
            var newLocation = data[i].name+","+ [data[i].country];
            cordinates.set(newLocation, {"lat":data[i].lat, "lon": data[i].lon})
            locations[i] = newLocation;
            //console.log(locations)
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
        displayWeather(cityName, locationLatitude, locationLongitude);
    }
});


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
