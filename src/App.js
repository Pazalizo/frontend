import React, { useState } from 'react';
import { useAirports } from './hooks/useAirports';
import AirportList from './components/AirportList';
import AirportForm from './components/AirportForm';
import { deleteAirport } from './services/airportService';

function App() {
  const { airports, loading, error } = useAirports();
  const [airportList, setAirportList] = useState(airports);
  const [selectedAirport, setSelectedAirport] = useState(null); // Para manejar el aeropuerto seleccionado al editar

  const handleDelete = (id) => {
    deleteAirport(id)
      .then(() => {
        setAirportList(airportList.filter(a => a.id !== id));
      })
      .catch(error => console.error('Error al eliminar el aeropuerto', error));
  };

  const handleEdit = (airport) => {
    setSelectedAirport(airport); // Establece el aeropuerto que se va a editar
  };

  const handleAirportSaved = (newAirport) => {
    if (selectedAirport) {
      // Si está editando, actualiza el aeropuerto en la lista
      setAirportList(airportList.map(a => (a.id === newAirport.id ? newAirport : a)));
      setSelectedAirport(null); // Resetea el formulario
    } else {
      // Si está creando, agrega el aeropuerto a la lista
      setAirportList([...airportList, newAirport]);
    }
  };

  if (loading) return <p>Cargando aeropuertos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <AirportForm initialAirport={selectedAirport} onAirportSaved={handleAirportSaved} />
      <AirportList airports={airportList} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;
