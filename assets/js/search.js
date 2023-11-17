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
var tags = [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ];
$( "#search-input" ).autocomplete({
source: function( request, response ) {
        var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
        response( $.grep( tags, function( item ){
            return matcher.test( item );
        }) );
    }
});