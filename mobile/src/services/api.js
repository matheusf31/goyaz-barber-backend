import axios from 'axios';

// baseURL via USB: 'http://192.168.0.14:3333'
// baseURL via USB lord wi-fi: 'http://192.168.0.115:3333'
// baseURL via USB 4g: 'http://192.168.43.223:3333'
// baseURL via Genymotion: 'http://10.0.3.2:3333'
const api = axios.create({
  baseURL: 'http://192.168.43.223:3333',
});

export default api;
