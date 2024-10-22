import React, { useState, useEffect } from 'react';
import { createPlane, updatePlane } from '../services/planeService';

const PlaneForm = ({ initialPlane = null, onPlaneSaved }) => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    if (initialPlane) {
      setName(initialPlane.name);
      setModel(initialPlane.model);
      setCapacity(initialPlane.capacity);
    }
  }, [initialPlane]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlane = { name, model, capacity };

    if (initialPlane) {
      updatePlane(initialPlane.id, newPlane)
        .then(response => {
          onPlaneSaved(response.data);
          resetForm();
        })
        .catch(error => console.error('Error al actualizar el avión', error));
    } else {
      createPlane(newPlane)
        .then(response => {
          onPlaneSaved(response.data);
          resetForm();
        })
        .catch(error => console.error('Error al crear el avión', error));
    }
  };

  const resetForm = () => {
    setName('');
    setModel('');
    setCapacity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialPlane ? 'Editar Avión' : 'Agregar Avión'}</h2>
      <div>
        <label>Nombre:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Modelo:</label>
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
      </div>
      <div>
        <label>Capacidad:</label>
        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
      </div>
      <button type="submit">{initialPlane ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default PlaneForm;
