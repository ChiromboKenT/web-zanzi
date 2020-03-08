function countDown(){
   let now = new Date();
let event = new Date(2020, 8, 24)

let currentTime = now.getTime();
let eventTime = event.getTime();

let remTime = eventTime - currentTime;

let sec = Math.floor(remTime/1000);
let min = Math.floor(sec/60);
let hour = Math.floor(min/60);
let day = Math.floor(hour/24);

hour %= 24;
min %= 60;
sec %= 60;

day = day < 10 ? "0" + day: day;
hour = hour < 10 ?"0" + hour : hour;
min = min < 10 ? "0" + min : min;
sec = sec < 10? "0" + sec : sec;  

document.querySelector('.timer-days').innerText = day;
document.querySelector('.timer-hours').innerText = hour;
document.querySelector('.timer-minutes').innerText = min;
document.querySelector('.timer-seconds').innerText = sec;

setTimeout(countDown, 1000)
}

countDown();