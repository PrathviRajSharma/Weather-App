import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CurrentDateTime from './DateTimeComp';

function App() {
  let [city, setCity] = useState('');
  let [weatherDetails, setWeatherDetails] = useState();

  let gettingData = (event) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=840e111e10ae6f87cd8a2383d812f2d6&units=metric`)
      .then((response) => response.json())
      .then((finalResponse) => {
          if(finalResponse.cod=="404") {
            console.log(finalResponse.cod);
            toast.error("Opps!   No City Found");
          }else{
            setWeatherDetails(finalResponse);
          }
      })

    console.log(city);
    setCity('');
    event.preventDefault();
  }
  return (
    <>
      <div class="container">
        <div class="background-image"></div>
        <div class="content">
          <form class="search-bar" onSubmit={gettingData}>
            <input type="text" placeholder="Search City" value={city} onChange={(event) => { setCity(event.target.value) }} />
          </form>

          {weatherDetails !== undefined ?
            <>
              <div class="city-name">
                <h1>{weatherDetails.name}<span className='country'>{weatherDetails.sys.country}</span> </h1> <sup>{weatherDetails.weather[0].main}</sup> 
              </div>
              <div class="weather-info">
                <img src={`https://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`} alt="Image not Found" />
                <div class="temperature">
                  <span>{weatherDetails.main.temp} </span> 
                  <sup className='degreeCel'>°C</sup>
                </div>
              </div>
            </>
            :
            <div className="enterCity">Enter City Name</div>
            
          }


          {/* <div class="date-time">
            <p>5 May 2024, Sunday</p>
            <p className='time'>08:30 AM</p>
          </div> */}
          <CurrentDateTime/>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default App;
