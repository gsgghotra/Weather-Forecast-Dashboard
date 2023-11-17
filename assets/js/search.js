//Search bar border focus
var search=document.getElementById('search-input');
let API_KEY = '';
//On focus
search.addEventListener('focus',(event)=>{
    document.getElementById('search-form').style.border="1px solid #E01A59";
});

//on Focus out
search.addEventListener('focusout',(event)=>{
    document.getElementById('search-form').style.border="1px solid rgba(0, 0, 0, 0.276)";
});

//Variable for saving the saerch
let searchVal;

//Auto complete using jQuery with dynamic array
var locations = [];
$( "#search-input" ).autocomplete({
source: function( request, response ) {
        var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
        response( $.grep( locations, function( item ){
            return matcher.test( item );
        }) );
    }
});

//Search the location and update the auto complete array on each key up
$('#search-input').on("keyup", function(event){
    searchVal = $('#search-input').val();
    //if search exists and is greater than 3 characters
    if (searchVal.length > 2){
        console.log(searchVal);
        //pass the searched characters to the location finder function
        autoCompleteGenerator(searchVal)
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
            //console.log(data)
            for(let i = 0; i < data.length; i++){
                //console.log(location.name+",", location.country);
                var newLocation = data[i].name+","+ [data[i].country];
                locations[i] = newLocation;
                //console.log(locations)
        }
    })
}

//Search Button
$('#search-button').on('click', (event)=>{
    event.preventDefault();
    //console.log(event);
    searchVal = $('#search-input').val();
    
    //add saerched Location the screen
    let searchedLocation = document.getElementById('searchedLocation');
    searchedLocation.innerText = searchVal;

})