// api.ts (or similar file)
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://164.92.178.240:8080/api',
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
