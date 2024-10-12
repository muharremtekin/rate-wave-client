// api.ts (or similar file)
import axios from 'axios';

const localBaseURL = 'https://localhost:8081/api';
const productionBaseURL = 'http://164.92.178.240:8080/api'; 
// Create an Axios instance
const api = axios.create({
  baseURL: localBaseURL,
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
