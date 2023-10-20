import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"; // Asegúrate de importar la librería 'leaflet'
import 'leaflet/dist/leaflet.css';
import dataTransporte from "../data/DataTransporte.json"


const Transporte = (data) => {

    const customIcon = new L.Icon({
        iconUrl: require("../images/soleado.png"), // Reemplaza con la ruta a tu imagen personalizada
        iconSize: [32, 32], // Tamaño del icono [ancho, alto]
        iconAnchor: [16, 32], // Punto de anclaje del icono (punto inferior central)
    });

    if (!data) {
        return <div className="container-fluid vh-100 bg-info text-white">cargando...</div>;
    }

    return (
        <div>
            <MapContainer center={[-34.60, -58.38]} zoom={12} scrollWheelZoom={false} style={{ height: "900px", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {dataTransporte.map((item, index) => (
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
    )
}

export default Transporte