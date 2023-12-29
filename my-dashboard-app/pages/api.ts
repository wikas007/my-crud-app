// src/api.ts
import axios from 'axios';

const baseURL = 'http://127.0.0.1:5001/crud-app-cloud/us-central1';

const api = axios.create({
  baseURL,
});

export const addUser = (userData) => api.post('/addUser', userData);
export const getUsers = () => api.get('/getUsers');
export const updateUser = (userId, userData) => api.put(`/updateUser/${userId}`, userData);
export const deleteUser = (userId) => api.delete(`/deleteUser/${userId}`);

export default api;
