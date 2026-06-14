import axios from 'axios';

const api = axios.create({
  baseURL: 'https://emp-backend-to7x.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

export const getUsers   = ()         => api.get('/users');
export const createUser = (data)     => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id)       => api.delete(`/users/${id}`);

