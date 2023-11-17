//Search bar border focus
var search=document.getElementById('search-input');

//On focus
search.addEventListener('focus',(event)=>{
    document.getElementById('search-form').style.border="1px solid #E01A59";
});

//on Focus out
search.addEventListener('focusout',(event)=>{
    document.getElementById('search-form').style.border="1px solid rgba(0, 0, 0, 0.276)";
});

//Auto complete
var locations = [];
$( "#search-input" ).autocomplete({
source: function( request, response ) {
        var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
        response( $.grep( locations, function( item ){
            return matcher.test( item );
        }) );
    }
});

//Auto complete Array generator
function autoCompleteGenerator(searchVal){
    var url =  "http://api.openweathermap.org/geo/1.0/direct?q="+searchVal+"&limit=5&appid=";
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

//Search the location and update the auto complete on each key up
$('#search-input').on("keyup", function(event){
    event.preventDefault();
    searchVal = $('#search-input').val();
    //if search exists
    if (searchVal.length > 2){
        console.log(searchVal);
        autoCompleteGenerator(searchVal)
    }
    
});
