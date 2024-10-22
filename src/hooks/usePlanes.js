import { useState, useEffect } from 'react';
import { getPlanes } from '../services/planeService';

export const usePlanes = () => {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlanes()
      .then(response => {
        setPlanes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching planes:', error);
        setError('Error fetching planes');
        setLoading(false);
      });
  }, []);

  return { planes, loading, error };
};
