import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://defaicreatorbackend-production.up.railway.app/v1/',
  timeout: 1000,
});
