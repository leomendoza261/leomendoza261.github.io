/* import React, { useState, useEffect } from 'react'; */

import Transporte from './components/Transporte';
import Clima from './components/Clima';
/* import dataTransporte from "./data/DataTransporte.json" */


function App() {
  /* const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [transportData, setTransportData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-28.0632&longitude=-67.5649&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=auto&forecast_days=1');
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    async function fetchAirQuality() {
      try {
        const response = await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-28.0632&longitude=-67.5649&current=european_aqi&forecast_days=1');
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        const data = await response.json();
        setAirQuality(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    async function fetchTransportData() {
      try {
        const response = await fetch('https://apitransporte.buenosaires.gob.ar/colectivos/vehiclePositionsSimple?client_id=cb6b18c84b3b484d98018a791577af52&client_secret=3e3DB105Fbf642Bf88d5eeB8783EE1E6');
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        const data = await response.json();
        setTransportData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
    fetchAirQuality();
    fetchTransportData();
  }, []);


  if (!weatherData || !airQuality) {
    return (
      <div className="container-fluid vh-100 bg-info text-white">
        <span className="fs-4">Cargando...</span>
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } */

  return (
    <div className="container-fluid vh-100 bg-info text-white">
      <Clima /* weatherData={weatherData} airQuality={airQuality} *//>  
      <Transporte/>
    </div>
  );
}

export default App;
