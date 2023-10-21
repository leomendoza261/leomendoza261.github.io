import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"; // Asegúrate de importar la librería 'leaflet'
import 'leaflet/dist/leaflet.css';


const Transporte = () => {
    const customIcon = new L.Icon({
        iconUrl: require("../images/soleado.png"), // Reemplaza con la ruta a tu imagen personalizada
        iconSize: [32, 32], // Tamaño del icono [ancho, alto]
        iconAnchor: [16, 32], // Punto de anclaje del icono (punto inferior central)
    });

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

    if (!transportData) {
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
    }

    return (
        <div className='row bg-info vh-100'>
            <div className='col-lg-3 col-sm-12 text-center my-2'>
                <div class="list-group" style={{ maxHeight: '97vh', overflowY: 'auto' }}>
                    {transportData.map((item, index) => (
                        <a key={index} class="list-group-item list-group-item-action" href={item.id}>Linea {item.agency_id} {item.route_short_name} {item.trip_headsign}</a>
                    ))}
                </div>
            </div>
            <div className='col-lg-9 col-sm-12 text-center my-2'>
                <MapContainer center={[-34.60, -58.38]} zoom={12} scrollWheelZoom={false} style={{ height: "900px", width: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {transportData.map((item, index) => (
                        <Marker key={index} position={[item.latitude, item.longitude]} icon={customIcon} >
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