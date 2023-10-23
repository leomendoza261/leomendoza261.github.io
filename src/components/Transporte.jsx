import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import dataTransporte from "../data/DataTransporte.json"


const Transporte = () => {
    const customIcon = new L.Icon({
        iconUrl: require("../images/bus.png"),
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(dataTransporte);
    const [selectedBus, setSelectedBus] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = dataTransporte.filter((item) =>
            item.route_short_name.includes(searchText)
        );
        setFilteredData(filtered);
        setSelectedBus(null);
    };

    const handleBusClick = (bus) => {
        setSelectedBus(bus);
        if (bus) {
            const { latitude, longitude } = bus;
            mapRef.current.setView([latitude, longitude], 15); 
        }
    };

    const mapRef = React.createRef();

    const [transportData, setTransportData] = useState(null);

    useEffect(() => {
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
        fetchTransportData();
    }, []);

    console.log(transportData)
    /* if (!transportData) {
        return (
            <div className='row bg-info vh-100'>
                <div className='col-lg-3 col-sm-12 text-center my-2'>
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div className='col-lg-9 col-sm-12 text-center my-2'>
                    <MapContainer center={[-34.60, -58.38]} zoom={12} scrollWheelZoom={false} style={{ height: "900px", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[0, 0]} icon={customIcon} >
                            <Popup>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        )
    } */

    return (
        <div className="row bg-info">
            <div className="col-lg-3 col-sm-12 text-center my-2">
                <form className="d-flex mb-1" role="search" onSubmit={handleSearch}>
                    <input
                        className="form-control bg-info text-white me-1"
                        type="search"
                        aria-label="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button className="btn btn-warning text-white " type="submit">
                        Buscar
                    </button>
                </form>
                <div className="list-group" style={{ maxHeight: '91vh', overflowY: 'auto' }}>
                    {filteredData.map((item, index) => (
                        <button
                            key={index}
                            className=" btn btn-outline-warning text-white"
                            href={item.id}
                            onClick={() => handleBusClick(item)}
                        >
                            <span className=''>Linea {item.agency_id} </span>{item.route_short_name} {item.trip_headsign}
                        </button>
                    ))}
                </div>
            </div>
            <div className="col-lg-9 col-sm-12 text-center my-2">
                <MapContainer
                    ref={mapRef}
                    center={[-34.60, -58.38]}
                    zoom={12}
                    scrollWheelZoom={false}
                    style={{ height: '900px', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredData.map((item, index) => (
                        <Marker
                            key={index}
                            position={[item.latitude, item.longitude]}
                            icon={customIcon}
                        >
                            <Popup>
                                <p>Bus ID: {item.id}</p>
                                <p>Route ID: {item.route_id}</p>
                                <p>Agencia: {item.agency_name}</p>
                                <p>Agencia ID: {item.agency_id}</p>
                                <p>Speed: {item.speed}</p>
                                <p>Timestamp: {item.timestamp}</p>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>

    )
}

export default Transporte