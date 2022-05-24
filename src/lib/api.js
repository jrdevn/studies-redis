import { DOGS_TOKEN } from './config/secrets.js';
import pkg from 'axios';
const { create } = pkg;

const api = create({
  baseURL: "https://api.thedogapi.com/v1",
  headers: {
    'x-api-key' : DOGS_TOKEN,
  },
});

export default api;