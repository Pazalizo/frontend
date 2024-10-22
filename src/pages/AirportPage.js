import React, { useState, useEffect } from 'react';
import AirportList from '../components/AirportList';
import AirportForm from '../components/AirportForm';
import { getAirports, createAirport, updateAirport, deleteAirport } from '../services/airportService';

function AirportPage() {
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);

  useEffect(() => {
    getAirports()
      .then(response => {
        setAirports(response.data);
      })
      .catch(error => console.error('Error al obtener los aeropuertos:', error));
  }, []);

  const handleDelete = (id) => {
    deleteAirport(id)
      .then(() => {
        setAirports(airports.filter(airport => airport.id !== id));
      })
      .catch(error => console.error('Error al eliminar el aeropuerto:', error));
  };

  const handleAirportSaved = (newAirport) => {
    if (selectedAirport) {
      // Actualiza el aeropuerto en la lista
      setAirports(airports.map(airport => (airport.id === newAirport.id ? newAirport : airport)));
      setSelectedAirport(null);
    } else {
      // Agrega un nuevo aeropuerto
      setAirports([...airports, newAirport]);
    }
  };

  return (
    <div>
      <h1>Gestión de Aeropuertos</h1>
      <AirportForm initialAirport={selectedAirport} onAirportSaved={handleAirportSaved} />
      <AirportList airports={airports} onDelete={handleDelete} />
    </div>
  );
}

export default AirportPage;
