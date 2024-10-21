import axios from 'axios';

const API_URL = 'http://localhost:5110/api/airports';

export const getAirports = () => {
  return axios.get(API_URL);
};

export const createAirport = (airport) => {
  return axios.post(API_URL, airport);
};

export const updateAirport = (id, airport) => {
  return axios.put(`${API_URL}/${id}`, airport);
};

export const deleteAirport = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
