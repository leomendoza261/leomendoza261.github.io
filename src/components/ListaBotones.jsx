import React, { useState, useEffect } from "react";

function App({ data, onBusClick}) {

    const [buses, setBuses] = useState(data);
    const [agencies, setAgencies] = useState([]);
    const [selectedAgency, setSelectedAgency] = useState("All");
    const [searchDestination, setSearchDestination] = useState("");

    useEffect(() => {
        // Recopila todos los agency_id de autobuses sin repetir
        const uniqueAgencies = [...new Set(buses.map((bus) => bus.agency_id))];
        setAgencies(["All", ...uniqueAgencies]);
    }, [buses]);

    // Filtra la lista de autobuses según el agency_id seleccionado
    const filteredBuses = selectedAgency === "All"
        ? buses
        : buses.filter((bus) => parseInt(bus.agency_id, 10) === parseInt(selectedAgency, 10));

    // Filtra la lista de autobuses por destino
    const filteredBusesByDestination = filteredBuses.filter(
        (bus) => bus.trip_headsign.toLowerCase().includes(searchDestination.toLowerCase())
    );

    return (
        <div>
            <div className="d-flex mb-1">
                {/* Dropdown para seleccionar el agency_id */}
                <select className="btn btn-info border-white text-white me-1" value={selectedAgency} onChange={(e) => setSelectedAgency(e.target.value)}>
                    {agencies.map((agencyId) => (
                        <option class="btn btn-warning" key={agencyId} value={agencyId}>
                            {agencyId}
                        </option>
                    ))}
                </select>

                {/* Input para buscar por destino */}
                <input
                    className="form-control bg-info text-white me-1"
                    type="text"
                    placeholder="Buscar por destino"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                />
            </div>


            {/* Lista de autobuses filtrada */}
            <div className="list-group" style={{ maxHeight: '91vh', overflowY: 'auto' }}>
                {filteredBusesByDestination.map((bus) => (
                    <button key={bus.id}
                        className=" btn btn-outline-warning text-white"
                        onClick={() => onBusClick(bus)}
                    >
                        Linea {bus.agency_id} {bus.route_short_name} {bus.trip_headsign}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App;
