import React from 'react';

const AirportList = ({ airports, onDelete, onEdit }) => {
  if (airports.length === 0) {
    return <p>No hay aeropuertos disponibles.</p>;
  }

  return (
    <div>
      <h2>Lista de Aeropuertos</h2>
      <ul>
        {airports.map(airport => (
          <li key={airport.id}>
            {airport.name} ({airport.codeIATA}) - {airport.city}
            <button onClick={() => onDelete(airport.id)}>Eliminar</button>
            <button onClick={() => onEdit(airport)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AirportList;
