import React from 'react';
import Dashboard from "./components/Dashboard";
/* import Dashboard2 from "./components/Dashboard2"; */
import CardDouble from './components/CardDouble';
import CardSimple from './components/CardSimple';
import CardSimpleTexto from './components/CardSimpleTexto';
import data from "./data/weatherData.json"
import { Soleado, Noche, Arriba, Abajo} from './helpers/icons';


function App() {
  return (
    <div className="container-fluid vh-100 bg-info text-white">

      <div className='row'> {/* renglon 1 que contiene la temperatura actual y Dashboard */}
        <div className='col-3 text-center my-2'>
          <CardSimple titulo={"Temperatura Actual"}  data={data.temperature.actual} factor={data.temperature.actual * 2.5}/>
        </div>
        <div className='col-9 my-2'>
          <h5>Hoy</h5>
          <Dashboard data={data.temperature.dia}/>
        </div>
      </div>


      <div className='row'> {/* renglon 2 que contiene la temperatura maxima - minima y el resto de la informacion */}
        <div className='col-3 text-center my-2'>
          <CardDouble titulo={"Maxima - Minima"}  data={[data.temperature.maxima, data.temperature.minima]} Imagen1={<Soleado />} Imagen2={<Noche />} />
        </div>
        <div className='col-9'>
          <div className='row'>
            <div className='col-4 text-center my-2'>
              <CardSimple titulo={"Indice UV"} data={data.uvIndice} factor={data.uvIndice/12 * 100}/>
            </div>
            <div className='col-4 text-center my-2'>
              <CardSimple titulo={"Estado del viento"} data={data.velocidadViento} factor={data.velocidadViento}/>
            </div>
            <div className='col-4 text-center my-2'>
              <CardDouble titulo={"Salida del sol/atardecer"}  data={[data.sunTimes.sunrise, data.sunTimes.sunset]} Imagen1={<Arriba />} Imagen2={<Abajo />} />
            </div>
            <div className='col-4 text-center my-2'>
              <CardSimple titulo={"Humedad"}  data={data.humedad} factor={data.humedad} />
            </div>
            <div className='col-4 text-center my-2'>
              <CardSimpleTexto titulo={"Visibilidad"}  data={data.visibilidad.valor} descripcion={data.visibilidad.descripcion} />
            </div>
            <div className='col-4 text-center my-2'>
              <CardSimpleTexto titulo={"Calidad del Aire"}  data={data.calidadAire.valor} descripcion={data.calidadAire.descripcion}/>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
