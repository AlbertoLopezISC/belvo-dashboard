import axios from 'axios';

const api = axios.create({ baseURL: 'https://sandbox.belvo.com' });

export default api;