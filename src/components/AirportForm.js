import React, { useState, useEffect } from 'react';
import { createAirport, updateAirport } from '../services/airportService';

const AirportForm = ({ initialAirport = null, onAirportSaved }) => {
  const [name, setName] = useState('');
  const [codeIATA, setCodeIATA] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (initialAirport) {
      setName(initialAirport.name);
      setCodeIATA(initialAirport.codeIATA);
      setCity(initialAirport.city);
    }
  }, [initialAirport]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAirport = { name, codeIATA, city };

    if (initialAirport) {
      // Si estamos editando, hacemos la actualización
      updateAirport(initialAirport.id, newAirport)
        .then(response => {
          onAirportSaved(response.data);
          resetForm();
        })
        .catch(error => console.error('Error al actualizar el aeropuerto', error));
    } else {
      // Si es un nuevo aeropuerto, lo creamos
      createAirport(newAirport)
        .then(response => {
          onAirportSaved(response.data);
          resetForm();
        })
        .catch(error => console.error('Error al crear el aeropuerto', error));
    }
  };

  const resetForm = () => {
    setName('');
    setCodeIATA('');
    setCity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialAirport ? 'Editar Aeropuerto' : 'Agregar Aeropuerto'}</h2>
      <div>
        <label>Nombre:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Código IATA:</label>
        <input type="text" value={codeIATA} onChange={(e) => setCodeIATA(e.target.value)} required />
      </div>
      <div>
        <label>Ciudad:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>
      <button type="submit">{initialAirport ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default AirportForm;
