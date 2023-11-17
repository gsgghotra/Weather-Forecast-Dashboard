//Today's Date 
var timeNow = dayjs();
var formattedDate = dayjs(timeNow).format('dddd, MMMM D');

console.log(formattedDate);

//Append the time to the page
var todayEl = document.getElementById('today');
todayEl.innerText = formattedDate;





//Search bar border focus
var search=document.getElementById('search');

//On focus
search.addEventListener('focus',(event)=>{
    document.getElementById('search-wrapper').style.border="1px solid #1dbf73";
});

//on Focus out
search.addEventListener('focusout',(event)=>{
    document.getElementById('search-wrapper').style.border="1px solid rgba(0, 0, 0, 0.276)";
});