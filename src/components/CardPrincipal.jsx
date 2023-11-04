import React from 'react';
import { useState, useEffect } from 'react';
import { Search } from '../helpers/icons';

const CardPrincipal = ({ titulo, fecha, data, data2, data3, data4, icono, factor, onCitySearch, ubicacion, ubi }) => {
    const [cityQuery, setCityQuery] = useState('');
    const [ciudades, setCiudades] = useState([])


    useEffect(() => {
        async function handleCitySearch() {
            const searchURL = `https://geocoding-api.open-meteo.com/v1/search?name=${cityQuery}&count=10&language=es&format=json`;
            try {
                const response = await fetch(searchURL);
                if (!response.ok) {
                    throw new Error('Error en la solicitud a la API');
                }
                const data = await response.json();
                setCiudades(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        handleCitySearch();
    }, [cityQuery]);


    if (!ciudades) {
        return (
            <div className="container-fluid vh-100 bg-info text-white">
                <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="card bg-transparent border border-0 text-white" >
            <h5>{titulo}</h5>

            <p type="button" class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                {ubicacion} <Search />
            </p>
            <div class="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-warning">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 text-dark" id="exampleModalLabel">Buscador de Ciudades</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <input
                                    type="text"
                                    className='btn bg-light border-white text-dark me-1'
                                    placeholder="Buscar ciudad"
                                    value={cityQuery}
                                    onChange={(e) => setCityQuery(e.target.value)}
                                />
                            </div>
                            <div className="list-group">
                                {ciudades.results ? (
                                    ciudades.results.map((item) => (
                                        <button key={item.id} class="btn btn-warning border-white text-white mt-1" data-bs-dismiss="modal" onClick={() => {onCitySearch(item.latitude, item.longitude); ubi(item.name)}} >
                                            {item.name}, {item.admin1}, {item.country}
                                        </button>
                                    ))
                                ) : null}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <p>{fecha}</p>
            <div className='row'>
                <img src={icono} alt="" height={200} width={200} />
                <p className='fs-4'>{data3}</p>
            </div>
            <div className='row'>
                <div className='col-6 align-items-center'>
                    <div className="card-body">
                        <p className="card-text fs-3 fw-medium">{data} {data2}</p>
                    </div>
                </div>
                <div className='col-6 d-flex align-items-center'>
                    <div className="progress w-75" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-warning " style={{ width: factor + "%" }}></div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <p className='fs-6 fw-lighter'>sensacion termica: {data4} {data2}</p>
            </div>

        </div>
    )
}

export default CardPrincipal;
