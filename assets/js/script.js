//Today's Date 
var timeNow = dayjs();
var formattedDate = dayjs(timeNow).format('dddd, MMMM D');

console.log(formattedDate);

//Append the time to the page
var todayEl = document.getElementById('todayDate');
todayEl.innerText = formattedDate;