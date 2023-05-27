let weatherImg = document.getElementById("weatherStatusImage")
let weatherStatusTxt = document.getElementById("weatherStatusTxt")
let minTemp = document.querySelector("#minTemp")
let maxTemp = document.querySelector("#maxTemp")
let degree_in_celcius = document.getElementById("degree_in_celcius");
let area_name = document.getElementById("area_name");
let current_date_time = document.getElementById("current_date_time");
let windSpeed = document.getElementById("windSpeed");


let clearSkyDay = document.createElement("i")
let clearSkyNight = document.createElement("i")

let cloudySkyDay = document.createElement("i")
let cloudySkyNight = document.createElement("i")

let rainySkyDay = document.createElement("i")
let rainySkyNight = document.createElement("i")


clearSkyDay.setAttribute("class", "fas fa-sun");
clearSkyNight.setAttribute("class", "fa-solid fa-moon");

cloudySkyDay.setAttribute("class", "fas fa-cloud-sun");
cloudySkyNight.setAttribute("class", "fa-solid fa-cloud-moon");

rainySkyDay.setAttribute("class", "fa-solid fa-cloud-sun-rain");
rainySkyNight.setAttribute("class", "fa-solid fa-cloud-moon-rain");


let changeWeather = (weatherCondition) => {
    console.log(weatherCondition);
    if (weatherCondition == "offline") { weatherImg.innerText = "OFFLINE" }
    else {
        if (new Date().getHours() < 18 && new Date().getHours() > 5) {
            if (weatherCondition == "Haze" || weatherCondition == "Clouds") {
                weatherImg.append(cloudySkyDay)
            } else if (weatherCondition == "Thunderstorm" || weatherCondition == "Rain") {
                weatherImg.append(rainySkyDay)
            }
        } else {
            if (weatherCondition == "Haze") { weatherImg.append(cloudySkyDay) }
            else if (weatherCondition == "Thunderstorm" || weatherCondition == "Rain") {
                weatherImg.append(rainySkyNight)
            }
        }

        weatherStatusTxt.innerText = weatherCondition
    }
}


let weatherAPIKey = null; // replace null with your api key here, otherwise it is an error...
let unit = 'metric';
let area = 'Kolkata'
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=${weatherAPIKey}&units=${unit}`;

const weatherRequest = new XMLHttpRequest();
weatherRequest.open("GET", weatherUrl, true);
weatherRequest.onload = function () {
    if (weatherRequest.status === 200) {
        let obj = JSON.parse(weatherRequest.responseText);
        area_name.innerText = `${obj.name}, ${obj.sys.country}`
        degree_in_celcius.innerText = `${(obj.main.temp)}° C`;
        minTemp.innerText = `MIN ${obj.main.temp_min}° C`;
        maxTemp.innerText = `MAX ${obj.main.temp_max}° C`;
        windSpeed.innerText = `Wind Speed: ${obj.wind.speed}`
        changeWeather(obj.weather[0].main)
    }
}
weatherRequest.onerror = function () {
    console.log("YOU ARE OFFLINE NOW");
    changeWeather("offline")
}
weatherRequest.send()


let monthList = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
let dayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

let newDate;
let currentDate;
let currentDay;
let currentMonth;
let currentYear;
let hour;
let minute;
let seconds;
let dayNight = "AM"

setInterval(() => {
    if (window.navigator.onLine) {
        newDate = new Date();
        currentDate = newDate.getDate();
        currentDay = dayList[newDate.getDay()]
        currentMonth = monthList[newDate.getMonth()]
        currentYear = newDate.getFullYear()
        hour = newDate.getHours();
        minute = newDate.getMinutes()
        seconds = newDate.getSeconds()

        if (currentDate <= 9) { currentDate = `0${currentDate}` }

        if (hour > 12) { dayNight = "PM" }

        if (hour > 12) { hour = hour - 12 }

        if (hour == 0) { hour = 12 }

        if (hour <= 9) { hour = `0${hour}` }

        if (minute <= 9) { minute = `0${minute}` }

        if (seconds <= 9) { seconds = `0${seconds}` }

        let fullDate = `${currentDay}, ${currentDate} ${currentMonth}, ${currentYear}`
        let fullTime = `${hour}:${minute}:${seconds} ${dayNight}`

        document.getElementById("date").innerText = fullDate;
        document.getElementById("time").innerText = fullTime;
    }
}, 900);
