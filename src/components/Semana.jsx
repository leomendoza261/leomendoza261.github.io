import CardSemana from "./CardSemana"
import { useEffect, useState } from "react";

const Semana = ({ cityCoordinates, Imagen1, Imagen2 }) => {

    const [weatherWeekData, setWeatherData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityCoordinates.latitude}&longitude=${cityCoordinates.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo`);
                if (!response.ok) {
                    throw new Error('Error en la solicitud a la API');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [cityCoordinates]);

    if (!weatherWeekData) {
        return (
            <div className="bg-info text-white">
                <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    console.log("semana", weatherWeekData)


    return (
        <div className="container text-center">
            <div className="row ">
                {weatherWeekData.daily.time.map((dia, index) => (
                    <div className="d-inline col">
                        <CardSemana
                            key={index}
                            dia={dia}
                            code={weatherWeekData.daily.weathercode[index]}
                            data={weatherWeekData.daily.temperature_2m_max[index]}
                            data2={weatherWeekData.daily.temperature_2m_min[index]}
                            Imagen1={Imagen1}
                            Imagen2={Imagen2}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Semana