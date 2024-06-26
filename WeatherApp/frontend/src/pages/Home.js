
import Search from "../components/search/search";
import CurrentWeather from "../components/current-weather/current-weather";
import Forecast from "../components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api"
import "../App.css";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

import * as React from 'react';
import {useState, useMemo} from 'react';


const TOKEN = 'pk.eyJ1IjoiYXJ1Ymlvdm9sdW50ZWVyIiwiYSI6ImNscW1rNDY3ZjMyZGUybG11dW12MjdoeG8ifQ.aTRnrFNQkNOyYu-jl8DOXA'; // Set your mapbox token here





const Home = ()  => {
  const [popupInfo, setPopupInfo] = useState(null);





  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
        setInvisibleSuccess(true);
      })
      .catch(console.log);
  };
  const [position, setPosition] = useState("");
  const [invisibleSuccess, setInvisibleSuccess] = useState(false);
  return (
    <div className="container">
{invisibleSuccess && <Alert severity="success">Data loaded successfully.</Alert>}
<IconButton aria-label="delete" onClick={() => { navigator.geolocation.getCurrentPosition(function (position) {handleOnSearchChange({value: position.coords.latitude+" "+position.coords.longitude, label: position.coords.latitude+" "+position.coords.longitude})}) }}> 
          
  <GpsFixedIcon />
</IconButton>
<br></br><br></br>
      <Button variant="contained" color="success" onClick={() => { handleOnSearchChange({value: '40.67 -111.93', label: 'Salt Lake County, US'}); }}>Salt Lake County, US</Button><br></br><br></br>
      <Button variant="contained" color="success" onClick={() => { handleOnSearchChange({value: '25.269722222 55.309444444', label: 'Dubai, AE'}  ); }}>Dubai, AE</Button><br></br><br></br>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}


      <br></br><br></br>


      <Button variant="contained" color="error" target="_blank" href="http://127.0.0.1:5173/">Map</Button><br></br><br></br>

    </div>




  );
}

export default Home;