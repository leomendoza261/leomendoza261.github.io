import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';



const Dashboard2 = ({ dia }) => {
  // Extraer las horas y temperaturas del objeto dia
  const horas = dia.map(item => item.hora);
  const temperaturas = dia.map(item => item.temperatura);

  // Configuración del gráfico
  const data = {
    labels: horas,
    datasets: [
      {
        label: 'Variación de Temperatura',
        data: temperaturas,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
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
    <div>
      <h2>Variación de Temperatura durante el Día</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Dashboard2;
