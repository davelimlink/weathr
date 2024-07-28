import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchbtn from '../assets/search.png'
import clear from '../assets/clear.png'
import drizzle from '../assets/drizzle.png'
import cloud from '../assets/cloud.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  }

  const search = async (city) => {

    try {
      const url = 
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_ID}`
      //`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      
      /* to display error message if typing wrong city name
      if(!response.ok){
        alert(data.massage); 
        return;
      }*/

      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
        })
    } catch (error) {
      setWeatherData(false)
      console.error("Error in fetching data")
    }
  }

  useEffect(() => {
    search("");
  },[])


  return (
    <div className='weather'>
<div className="search-bar">
  {/*Search for cities*/}
  <input ref={inputRef} type="text" placeholder='Search'/>
  <img src={searchbtn} alt="" onClick={() => search(inputRef.current.value)}/>
</div>

  <img src={weatherData.icon} className='weather-icon' />
{!weatherData && <p className='enter-city'>Search for a city</p>}
<p className='temp'>{weatherData.temperature}°c</p>
<p className='location'>{weatherData.location}</p>
<div className="weather-data">
<div className="col">
    <img src={humidity} alt="" />
    <div>
      <p>{weatherData.humidity}%</p>
      <span>Humidity</span>
    </div>
  </div>
  <div className="col">
    <img src={wind} alt="" />
    <div>
      <p>{weatherData.windspeed} km/h</p>
      <span>Wind speed</span>
    </div>
  </div>
</div>
    </div>
  )
}

export default Weather