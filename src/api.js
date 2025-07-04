import axios from 'axios';
import router from './router';

const api = axios.create({
  baseURL: 'http://localhost:5135/api'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response){
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('authToken');

        router.push('/login'); 
      }
      if (error.response && error.response.status === 500){
        router.push('/erro-servidor');
      }
    }
    return Promise.reject(error);
  }
);

export default api;