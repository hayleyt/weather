import React from 'react'
import '../App.css'

class Weather extends React.Component {
   state = {
      errorMessage: null,
      location: '',
      temp: 0,
      desc: '',
      icon: '10d',
      feelsLike: 0,
      humidity: '',
      wind: '',
      sunrise: '',
      sunset: ''
   }

   callBackendAPI = async () => {
      const response = await fetch('/express_backend');
      // const body = await response.json();
      // console.log('response' + response)
      // console.log('body' + body)

      // if (response.status !== 200) {
      //    throw Error(body.message) 
      // }
      return response;
   };

   componentDidMount() {
      this.callBackendAPI()
      .then(response => {
         if(response.ok){
            return response.json();
         } else if (response.status >= 400 && response.status < 500) {
            this.setState({
               errorMessage: "We couldn't find that place"
               // clear the rest of the state
            });
         } else {
            this.setState({
               errorMessage: "Oops, we've run into a problem. Try again later"
               // clear the rest of the state
            })
         }
      })
      .then(
         data => {
            if (this.state.errorMessage === null) {
               this.setState({
                  temp: parseInt(data.main.temp - 273),
                  location: data.name,
                  desc: data.weather[0].main,
                  icon: data.weather[0].icon,
                  feelsLike: parseInt(data.main.feels_like - 273),
                  humidity: data.main.humidity,
                  wind: parseInt(data.wind.speed * 2.237)
               });
            }
      })
      .catch(err => console.log(err));
      // let long;
      // let lat;

      // if(navigator.geolocation){
      //    navigator.geolocation.getCurrentPosition(position => {
      //       long = position.coords.longitude;
      //       lat = position.coords.latitude;
      //       const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_OWM_API_KEY}`

      //       //this.fetchData(api);
      //    })
      // } 
      // else {
      //    const api = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.REACT_APP_OWM_API_KEY}`
      //    this.fetchData(api)
      // }
   }

   handleSubmit = (e) => {
      e.preventDefault();
      let city = e.target.city.value;
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OWM_API_KEY}`;

      try {
         this.fetchData(api);
      }
      catch(err) {
         console.log(err.message);
      }
   }

   fetchData = (api) => {
      fetch(api)
         .then(response =>{
            if(response.ok){
               return response.json();
            } else {
               this.setState({location: 'Enter a valid city name'})
               throw new Error('Not a valid city')
            }
         })
         .then(data =>{
            this.setState({
               temp: parseInt(data.main.temp - 273),
               location: data.name,
               desc: data.weather[0].main,
               icon: data.weather[0].icon,
               feelsLike: parseInt(data.main.feels_like - 273),
               humidity: data.main.humidity,
               wind: parseInt(data.wind.speed * 2.237)
            })
         })
         .catch((error) => {
            console.log(error)
         })
   }

   render(){
      return (
         <div className="App">

            <div className="head">
               <h1 className="location">{this.state.location}</h1>
               <div className="description">{this.state.desc}</div>
               <div className="degree">
                  <h2 className="degree-number">
                     {this.state.temp}
                  </h2>
                  <span>C</span>
               </div>
               <div className="icon">
                     <img src={`https://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt={this.state.desc} />
               </div>
            </div>

            <div className="details">
               <div className="feels-like">
                  Feels like {this.state.feelsLike}C
               </div>
               <div className="humidity">
                  Humidity {this.state.humidity}%
               </div>
               <div className="wind">
                  Wind {this.state.wind} mph
               </div>
            </div>

            <div className="change-location">
               <form onSubmit={this.handleSubmit}>
                  <input 
                     type="text"
                     name="city"
                     placeholder="Enter city name"
                  />
                  <button>Change location</button>
               </form>
               <div>{this.state.errorMessage}</div>
            </div>

         </div>
      )
   }
}

export default Weather
