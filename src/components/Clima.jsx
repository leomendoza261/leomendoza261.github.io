import React, { useState, useEffect } from 'react';
import Dashboard from "../components/Dashboard";
import CardDouble from '../components/CardDouble';
import CardSimple from '../components/CardSimple';
import CardSimpleTexto from '../components/CardSimpleTexto';
import CardPrincipal from '../components/CardPrincipal';
import { Soleado, Noche, Arriba, Abajo } from '../helpers/icons';
import obtenerVisibilidad from '../helpers/visibilidad';
import obtenerNivelUV from '../helpers/indiceUV';
import formatearFecha from '../helpers/fecha';
import traduccionClima from "../data/weatherData.json"
import obtenerCalidadAire from '../helpers/european_AQI';
import Semana from './Semana';


const Clima = () => {
    const [mostrarDashboard, setMostrarDashboard] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [airQuality, setAirQuality] = useState(null);
    const [ubicacion, setUbicacion] = useState("Tinogasta");
    const [cityCoordinates, setCityCoordinates] = useState({ latitude: -28.0632, longitude: -67.5649 });

    const handleCitySearch = (latitude, longitude) => {
        setCityCoordinates({ latitude, longitude });
        // Luego, realiza la solicitud de clima con las nuevas coordenadas.
    };

    const handleUbicacion = (ubi) => {
        setUbicacion(ubi);
        // Luego, realiza la solicitud de clima con las nuevas coordenadas.
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityCoordinates.latitude}&longitude=${cityCoordinates.longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=America%2FSao_Paulo&forecast_days=1`);
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
        fetchData();
        fetchAirQuality();
    }, [cityCoordinates]);


    if (!weatherData || !airQuality) {
        return (
            <div className="container-fluid vh-100 bg-info text-white">
                <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    console.log(weatherData)
    const weatherCode = weatherData.current_weather.weathercode;

    return (
        <div>
            <div className='row bg-info'> {/* renglon 1 que contiene la temperatura actual y Dashboard */}
                <div className='col-lg-3 col-sm-12 text-center my-2'>
                    <CardPrincipal titulo={"Temperatura Actual"}
                        fecha={formatearFecha(weatherData.current_weather.time.substring(0, 10))}
                        data={weatherData.current_weather.temperature}
                        data2={weatherData.current_weather_units.temperature}
                        data4={10}
                        data3={traduccionClima[weatherCode]?.name} /* aqui quiero que vaya el name */
                        icono={traduccionClima[weatherCode]?.image_src}  /* aqui quiero que vaya el image_src */
                        factor={weatherData.current_weather.temperature * 2.5}
                        onCitySearch={handleCitySearch} // Pasa la función de búsqueda de ciudades
                        ubicacion={ubicacion}
                        ubi={handleUbicacion}
                    />
                </div>
                <div className='col-lg-9 col-sm-12 text-center my-2'>
                    <button className='btn btn-outline-warning border-info text-white py-0' onClick={() => setMostrarDashboard(true)}>Hoy</button>
                    <button className='btn btn-outline-warning border-info text-white py-0' onClick={() => setMostrarDashboard(false)}>Semana</button>
                    {mostrarDashboard? 
                        <Dashboard dia={weatherData.hourly} /> : 
                        <Semana
                        cityCoordinates={cityCoordinates}    
                        Imagen1={<Soleado />} Imagen2={<Noche />} 
                        /> 
                    }
                </div>
            </div>


            <div className='row bg-info'> {/* renglon 2 que contiene la temperatura maxima - minima y el resto de la informacion */}
                <div className='col-lg-3 col-sm-12 text-center my-2'>
                    <CardDouble titulo={"Maxima - Minima"}
                        data={[weatherData.daily.temperature_2m_max, weatherData.daily.temperature_2m_min]}
                        data2={[weatherData.daily_units.temperature_2m_max, weatherData.daily_units.temperature_2m_min]}
                        Imagen1={<Soleado />} Imagen2={<Noche />}
                    />
                </div>
                <div className='col-lg-9 col-sm-12'>
                    <div className='row'>
                        <div className='col-lg-4 text-center my-2'>
                            <CardSimple titulo={"Indice UV"}
                                data={weatherData.daily.uv_index_max}
                                data2={obtenerNivelUV(weatherData.daily.uv_index_max)}
                                factor={weatherData.daily.uv_index_max / 12 * 100}
                            />
                        </div>
                        <div className='col-lg-4 text-center my-2'>
                            <CardSimple titulo={"Velocidad del viento"}
                                data={weatherData.current_weather.windspeed}
                                data2={weatherData.current_weather_units.windspeed}
                                factor={weatherData.current_weather.windspeed} />
                        </div>
                        <div className='col-lg-4 text-center my-2'>
                            <CardDouble titulo={"Salida del sol/atardecer"}
                                data={[weatherData.daily.sunrise.map(e => e.substring(11, 16)), weatherData.daily.sunset.map(e => e.substring(11, 16))]}
                                data2={["HS", "HS"]}
                                Imagen1={<Arriba />} Imagen2={<Abajo />}
                            />
                        </div>
                        <div className='col-lg-4 text-center my-2'>
                            <CardSimple titulo={"Humedad"}
                                data={weatherData.hourly.relativehumidity_2m[parseInt(weatherData.current_weather.time.substring(11, 13), 10)]}
                                data2={"%"}
                                factor={weatherData.hourly.relativehumidity_2m[parseInt(weatherData.current_weather.time.substring(11, 13), 10)]} />
                        </div>
                        <div className='col-lg-4 text-center my-2'>
                            <CardSimpleTexto titulo={"Visibilidad"}
                                data={weatherData.hourly.visibility[parseInt(weatherData.current_weather.time.substring(11, 13), 10)] + " m"}
                                descripcion={obtenerVisibilidad(weatherData.hourly.visibility[parseInt(weatherData.current_weather.time.substring(11, 13), 10)])}
                            />
                        </div>
                        <div className='col-lg-4 text-center my-2'>
                            <CardSimpleTexto titulo={"Calidad del Aire"}
                                data={airQuality.current.european_aqi}
                                descripcion={obtenerCalidadAire(airQuality.current.european_aqi)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Clima