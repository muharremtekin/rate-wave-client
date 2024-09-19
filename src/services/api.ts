// api.ts (or similar file)
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://localhost:7037/api',
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
