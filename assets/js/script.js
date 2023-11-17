//Today's Date 
var timeNow = dayjs();
var formattedDate = dayjs(timeNow).format('dddd, MMMM D');

console.log(formattedDate);

//Append the time to the page
var todayEl = document.getElementById('todayDate');
todayEl.innerText = formattedDate;


//link generator
function linkGenerator(){
var url =  "https://api.openweathermap.org/data/2.5/weather?q=London,Burundi&appid=";
    fetch(url)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}

//Location finder
function locationFinder(){

}

//Plan
//Search the location
$('#search-button').on("click", function(event){
    event.preventDefault();
    console.log('Button Clicked');
});

//The location will 