import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3002/v1/'
  // baseURL: 'http://192.168.0.219:3002/v1/'
});