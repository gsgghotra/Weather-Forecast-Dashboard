//Search bar border focus
var search=document.getElementById('search');

//On focus
search.addEventListener('focus',(event)=>{
    document.getElementById('search-form').style.border="1px solid #E01A59";
});

//on Focus out
search.addEventListener('focusout',(event)=>{
    document.getElementById('search-form').style.border="1px solid rgba(0, 0, 0, 0.276)";
});