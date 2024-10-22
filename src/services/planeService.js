import axios from 'axios';

const API_URL = 'http://localhost:5110/api/planes';

export const getPlanes = () => {
  return axios.get(API_URL);
};

export const createPlane = (plane) => {
  return axios.post(API_URL, plane);
};

export const updatePlane = (id, plane) => {
  return axios.put(`${API_URL}/${id}`, plane);
};

export const deletePlane = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
