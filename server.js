require('dotenv').config()
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;
const apiBasePath = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = process.env.OWM_API_KEY;
const defaultCity = "london";

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
   getWeatherForCity(defaultCity)
   .then(data => {
      res.send(data)
      res.end();
   })
   .catch(() => {
      res.status(404).send('myerror404')
   })
});

function getWeatherForCity(city) {
   const url = apiBasePath + `?q=${city}&appId=${apiKey}`;
   return getData(url);
}

function getWeatherForGeoLocation(lat, lon) {
   const url = apiBasePath + `?lat=${lat}&lon=${lon}&appId=${apiKey}`;
   return getData(url);
}

function getData(url) {
   return new Promise((resolve, reject) => {
      fetch(url)
      .then(response => {
         if(response.ok){
            resolve(response.json());
         } else {
            reject('problem at getData')
         }
      })
   });
}