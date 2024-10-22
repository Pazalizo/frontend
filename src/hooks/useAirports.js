import { useState, useEffect } from 'react';
import { getAirports } from '../services/airportService';

export const useAirports = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAirports()
      .then(response => {
        console.log(response.data); // Verifica si los datos están llegando correctamente
        setAirports(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching airports:', error);
        setError('Error fetching airports');
        setLoading(false);
      });
  }, []);

  return { airports, loading, error };
};
