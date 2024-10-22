import React, { useState } from 'react';
import { usePlanes } from '../hooks/usePlanes';
import PlaneList from '../components/PlaneList';
import PlaneForm from '../components/PlaneForm';
import { deletePlane } from '../services/planeService';

function PlanePage() {
  const { planes, loading, error } = usePlanes();
  const [planeList, setPlaneList] = useState([]);  // Definir el estado aquí
  const [selectedPlane, setSelectedPlane] = useState(null);

  // Sincroniza el estado planeList con los planes obtenidos del hook usePlanes
  React.useEffect(() => {
    if (planes.length > 0) {
      setPlaneList(planes);
    }
  }, [planes]);

  const handleDelete = (id) => {
    deletePlane(id)
      .then(() => {
        setPlaneList(planeList.filter(plane => plane.id !== id));  // Usar setPlaneList
      })
      .catch(error => console.error('Error al eliminar el avión:', error));
  };

  const handlePlaneSaved = (newPlane) => {
    if (selectedPlane) {
      // Actualiza el avión en la lista
      setPlaneList(planeList.map(plane => (plane.id === newPlane.id ? newPlane : plane)));
      setSelectedPlane(null);
    } else {
      // Agrega un nuevo avión a la lista
      setPlaneList([...planeList, newPlane]);
    }
  };

  if (loading) return <p>Cargando aviones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <PlaneForm initialPlane={selectedPlane} onPlaneSaved={handlePlaneSaved} />
      <PlaneList planes={planeList} onDelete={handleDelete} />
    </div>
  );
}

export default PlanePage;
