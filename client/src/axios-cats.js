import axios from 'axios';
const dotenv = require('dotenv');

dotenv.config();

const instance = axios.create({
  // baseURL: process.env.SERVER_URL,
  // baseURL: 'http://localhost:5000',
  baseURL: 'https://wilfred-cat-manager.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
