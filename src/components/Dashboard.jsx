import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css'

const Dashboard = ({ dia }) => {
  // Extraer las horas y temperaturas del objeto dia
  const hora = dia.time.map(e => e.substring(11, 13));
  const temperatura = dia.temperature_2m;

  // Configuración del gráfico
  const data = {
    labels: hora,
    datasets: [
      {
        label: 'Variación de Temperatura',
        data: temperatura,
        fill: false,
        backgroundColor: '#FFC107',
        borderColor: '#FFC107',
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
