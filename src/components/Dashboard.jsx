import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css'

const Dashboard = ({ dia }) => { 
  // Extraer las horas y temperaturas del objeto dia
  console.log(dia[0].temperatura)
  const hora = dia?.map(item => item.hora);
  const temperatura = dia?.map(item => item.temperatura);


  // Configuración del gráfico
  const data = {
    labels: hora,
    datasets: [
      {
        label: 'Variación de Temperatura',
        data: temperatura,
        fill: false,
        backgroundColor: 'white',
        borderColor: 'white',
      },
    ],
  }; 

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='Dashboard d-flex justify-content-center'>
      <Line data={data} options={options} />
    </div>
  );
};

export default Dashboard;
