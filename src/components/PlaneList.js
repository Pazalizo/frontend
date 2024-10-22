import React from 'react';

const PlaneList = ({ planes, onDelete }) => {
  if (planes.length === 0) {
    return <p>No hay aviones disponibles.</p>;
  }

  return (
    <div>
      <h2>Lista de Aviones</h2>
      <ul>
        {planes.map(plane => (
          <li key={plane.id}>
            {plane.name} ({plane.model}) - {plane.capacity}
            <button onClick={() => onDelete(plane.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaneList;
