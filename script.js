"use strict";
let HTML = "";
let weatherDataArray = [];
const containerReference = document.querySelector(".container");
const searchBoxReference = document.querySelector("#searchbox");

const weatherDataHTML = function (i, main, description) {
  let kelvinTempAtZeroCelzius = 273.15;
  let temperatureInCelzius =
    weatherDataArray[i].temp.day - kelvinTempAtZeroCelzius;
  const html = `
  <div class="content">
      <div class="weather-image">
        <img src="Images/${
          main ? main : description
        }.png" height="150" width="200" />
      </div>
      <div class="temp">
        <h1>${temperatureInCelzius.toFixed(0)} &#8451</h1>
    </div>
      <div class="weather-data">
        <span class="clouds all">clouds: ${
          weatherDataArray[i].clouds
        } % </span> 
        <span class="wind all">wind speed: ${
          weatherDataArray[i].wind_speed
        } km/h </span>   
        <span class="humidity all">humidity: ${weatherDataArray[i].humidity} %
         </span> 
        <span class="pressure all">pressure: ${
          weatherDataArray[i].pressure
        } mb </span> 
      
    </div>
    </div>

    
`;
  /* adding all strings of variable html for different weather data together, after looping */
  HTML += html;
};

searchBoxReference.addEventListener("change", (town) => {
  fetch(`https://geocode.xyz/${searchBoxReference.value}?json=1`)
    .then((res) => res.json())
    .then((data) => {
      const lattitude = data.latt;
      const longitude = data.longt;
      if (lattitude && longitude) {
        return fetch(`
https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&exclude=hours&appid=2e0141ee8d7a8a999deb09d7df83cb10`);
      } else {
        alert(`Something wen't wrong in the first AJAX call`);
      }
    })
    .then((res) => res.json())
    .then((data) => {
      weatherDataArray = data.daily;
      HTML = "";
      for (let i = 0; i < 7; i++) {
        let { main, description } = weatherDataArray[i].weather[0];

        if (description === "light rain") {
          weatherDataHTML(i, description);
        } else if (main === "Clear") {
          weatherDataHTML(i, main);
        } else if (main === "Clouds") {
          weatherDataHTML(i, main);
        } else if (description === "rain") {
          weatherDataHTML(i, description);
        } else if (main === "Snow") {
          weatherDataHTML(i, main);
        } else {
          weatherDataHTML(i, main);
        }
      }
      containerReference.innerHTML = HTML;
    })
    .catch((err) => alert(`${err.message}.Try again`));
});
