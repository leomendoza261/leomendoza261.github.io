import React, { useState } from 'react';

const WeatherDashboard = ({ data }) => {
  const itemsPerPage = 6; // Cantidad de elementos a mostrar por página
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="weather-dashboard">
      <div className="row">
        {currentData.map((item, index) => (
          <div key={index} className="col-md-4">
            <div className="hourly-data card mb-4">
              <div className="card-body">
                <h5 className="card-title">{item.hora}</h5>
                <p className="card-text">{item.temperatura} °C</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default WeatherDashboard;
